import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Peer from 'peerjs';
import type { DataConnection } from 'peerjs';
import type { ChatMessage, FloatingReaction, Participant, PeerMessage, WatchSyncState } from '../types/watchTogether';
import type { MediaItem } from '../types/tmdb';

interface WatchTogetherContextType {
  roomId: string | null;
  isHost: boolean;
  myPeerId: string | null;
  userName: string;
  userColor: string;
  setUserName: (name: string) => void;
  setUserColor: (color: string) => void;
  members: Participant[];
  chatMessages: ChatMessage[];
  syncState: WatchSyncState | null;
  isRoomModalOpen: boolean;
  setIsRoomModalOpen: (open: boolean) => void;
  floatingReactions: FloatingReaction[];
  isConnecting: boolean;
  error: string | null;
  
  // Actions
  createRoom: () => Promise<string>;
  joinRoom: (code: string) => Promise<boolean>;
  leaveRoom: () => void;
  broadcastMediaChange: (media: MediaItem, season?: number, episode?: number, episodeTitle?: string, serverId?: string) => void;
  broadcastPlaybackSync: (time?: number, playing?: boolean) => void;
  sendChatMessage: (text: string) => void;
  sendReaction: (emoji: string) => void;
  copyRoomLink: () => boolean;
}

const WatchTogetherContext = createContext<WatchTogetherContextType | undefined>(undefined);

const USER_NAME_KEY = 'gostream_wt_username';
const USER_COLOR_KEY = 'gostream_wt_usercolor';

const AVATAR_COLORS = [
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#f97316', // Orange
];

const generateRandomName = () => {
  const adjectives = ['Cool', 'Swift', 'Cosmic', 'Golden', 'Epic', 'Retro', 'Neon', 'Shadow'];
  const nouns = ['Viewer', 'Cinephile', 'Watcher', 'Streamer', 'Buddy', 'Critic', 'Fan', 'Pirate'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${adj}${noun}${num}`;
};

const generateRandomColor = () => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};

const formatRoomCode = (raw: string) => {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (cleaned.length <= 6) return cleaned;
  return cleaned.substring(0, 6);
};

export const WatchTogetherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [myPeerId, setMyPeerId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);

  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem(USER_NAME_KEY) || generateRandomName();
  });

  const [userColor, setUserColorState] = useState<string>(() => {
    return localStorage.getItem(USER_COLOR_KEY) || generateRandomColor();
  });

  const [members, setMembers] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [syncState, setSyncState] = useState<WatchSyncState | null>(null);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  // PeerJS and connection refs
  const peerRef = useRef<Peer | null>(null);
  const connectionsRef = useRef<Map<string, DataConnection>>(new Map());
  const hostConnRef = useRef<DataConnection | null>(null);
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const myUserIdRef = useRef<string>(Math.random().toString(36).substring(2, 10));

  // Mutable refs to prevent stale closures and infinite loop re-subscriptions
  const isHostRef = useRef(isHost);
  const membersRef = useRef(members);
  const syncStateRef = useRef(syncState);
  const chatMessagesRef = useRef(chatMessages);
  const processedMsgIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => { isHostRef.current = isHost; }, [isHost]);
  useEffect(() => { membersRef.current = members; }, [members]);
  useEffect(() => { syncStateRef.current = syncState; }, [syncState]);
  useEffect(() => { chatMessagesRef.current = chatMessages; }, [chatMessages]);

  const setUserName = (name: string) => {
    const trimmed = name.trim() || generateRandomName();
    setUserNameState(trimmed);
    localStorage.setItem(USER_NAME_KEY, trimmed);
    
    if (roomId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === myUserIdRef.current ? { ...m, name: trimmed } : m))
      );
    }
  };

  const setUserColor = (color: string) => {
    setUserColorState(color);
    localStorage.setItem(USER_COLOR_KEY, color);
    
    if (roomId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === myUserIdRef.current ? { ...m, avatarColor: color } : m))
      );
    }
  };

  // Message Deduplication Helper
  const isDuplicateMessage = (msg: PeerMessage): boolean => {
    const id = msg.payload?.chatMessage?.id || `${msg.timestamp}-${msg.senderId}-${msg.type}`;
    if (!id) return false;
    if (processedMsgIdsRef.current.has(id)) return true;
    processedMsgIdsRef.current.add(id);
    if (processedMsgIdsRef.current.size > 500) {
      const first = processedMsgIdsRef.current.values().next().value;
      if (first) processedMsgIdsRef.current.delete(first);
    }
    return false;
  };

  // Helper to add chat message locally
  const addChatMessage = useCallback((msg: ChatMessage) => {
    setChatMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev.slice(-99), msg];
    });
  }, []);

  // Helper to add floating reaction
  const triggerFloatingReaction = useCallback((emoji: string, senderName: string) => {
    const newReaction: FloatingReaction = {
      id: Math.random().toString(36).substring(2, 9),
      emoji,
      senderName,
      x: Math.floor(15 + Math.random() * 70),
    };

    setFloatingReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  }, []);

  // Broadcast message to all connected peers and broadcast channel
  const broadcastPeerMessage = useCallback((msg: PeerMessage) => {
    // Register message id locally so we ignore echo
    const msgId = msg.payload?.chatMessage?.id || `${msg.timestamp}-${msg.senderId}-${msg.type}`;
    if (msgId) processedMsgIdsRef.current.add(msgId);

    // Send to BroadcastChannel
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage(msg);
      } catch (e) {
        console.error('BroadcastChannel error:', e);
      }
    }

    // If host, send to all connected guests
    connectionsRef.current.forEach((conn) => {
      if (conn.open) {
        try { conn.send(msg); } catch (e) { console.error('Send error:', e); }
      }
    });

    // If guest, send to host
    if (hostConnRef.current && hostConnRef.current.open) {
      try { hostConnRef.current.send(msg); } catch (e) { console.error('Send host error:', e); }
    }
  }, []);

  // Clean up connections
  const cleanup = useCallback(() => {
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.close();
      broadcastChannelRef.current = null;
    }

    connectionsRef.current.forEach((conn) => conn.close());
    connectionsRef.current.clear();

    if (hostConnRef.current) {
      hostConnRef.current.close();
      hostConnRef.current = null;
    }

    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }

    processedMsgIdsRef.current.clear();
    setRoomId(null);
    setIsHost(false);
    setMyPeerId(null);
    setMembers([]);
    setChatMessages([]);
    setSyncState(null);
    setIsConnecting(false);
    setError(null);
  }, []);

  // Handle incoming peer messages (using refs for zero stale closures)
  const handleIncomingMessage = useCallback(
    (msg: PeerMessage, fromConn?: DataConnection) => {
      if (!msg || isDuplicateMessage(msg)) return;

      switch (msg.type) {
        case 'JOIN_REQUEST': {
          if (!isHostRef.current) break;
          const newMember: Participant = {
            id: msg.senderId,
            name: msg.senderName || 'Guest',
            avatarColor: msg.payload?.userColor || generateRandomColor(),
            isHost: false,
            joinedAt: Date.now(),
          };

          setMembers((prev) => {
            const exists = prev.some((m) => m.id === newMember.id);
            const updated = exists ? prev : [...prev, newMember];

            if (fromConn && fromConn.open) {
              const stateMsg: PeerMessage = {
                type: 'ROOM_STATE',
                senderId: myUserIdRef.current,
                timestamp: Date.now(),
                payload: {
                  members: updated,
                  syncState: syncStateRef.current,
                  chatHistory: chatMessagesRef.current,
                },
              };
              fromConn.send(stateMsg);
            }

            const systemMsg: ChatMessage = {
              id: Math.random().toString(36).substring(2, 9),
              senderId: 'system',
              senderName: 'System',
              text: `${newMember.name} joined the room! 🎉`,
              timestamp: Date.now(),
              type: 'system',
            };
            addChatMessage(systemMsg);

            const memberJoinedMsg: PeerMessage = {
              type: 'MEMBER_JOINED',
              senderId: myUserIdRef.current,
              timestamp: Date.now(),
              payload: {
                members: updated,
                systemMsg,
              },
            };
            connectionsRef.current.forEach((c) => {
              if (c.open && c.peer !== fromConn?.peer) {
                c.send(memberJoinedMsg);
              }
            });

            return updated;
          });
          break;
        }

        case 'ROOM_STATE': {
          if (msg.payload) {
            if (msg.payload.members) setMembers(msg.payload.members);
            if (msg.payload.syncState) setSyncState(msg.payload.syncState);
            if (msg.payload.chatHistory && Array.isArray(msg.payload.chatHistory)) {
              setChatMessages(msg.payload.chatHistory);
            }
          }
          break;
        }

        case 'MEMBER_JOINED': {
          if (msg.payload?.members) setMembers(msg.payload.members);
          if (msg.payload?.systemMsg) addChatMessage(msg.payload.systemMsg);
          break;
        }

        case 'MEMBER_LEFT': {
          if (msg.payload?.leftId) {
            setMembers((prev) => prev.filter((m) => m.id !== msg.payload.leftId));
          }
          if (msg.payload?.systemMsg) addChatMessage(msg.payload.systemMsg);
          break;
        }

        case 'MEDIA_CHANGE': {
          if (msg.payload?.syncState) {
            setSyncState(msg.payload.syncState);

            const systemText = msg.payload.mediaTitle
              ? `Changed media to: ${msg.payload.mediaTitle}`
              : 'Changed active media';

            addChatMessage({
              id: Math.random().toString(36).substring(2, 9),
              senderId: 'system',
              senderName: 'System',
              text: systemText,
              timestamp: Date.now(),
              type: 'system',
            });
          }

          if (isHostRef.current && fromConn) {
            connectionsRef.current.forEach((c) => {
              if (c.open && c.peer !== fromConn.peer) {
                c.send(msg);
              }
            });
          }
          break;
        }

        case 'PLAYBACK_SYNC': {
          if (msg.payload) {
            setSyncState((prev) => (prev ? { ...prev, ...msg.payload, updatedAt: Date.now() } : null));
          }

          if (isHostRef.current && fromConn) {
            connectionsRef.current.forEach((c) => {
              if (c.open && c.peer !== fromConn.peer) {
                c.send(msg);
              }
            });
          }
          break;
        }

        case 'CHAT': {
          if (msg.payload?.chatMessage) {
            addChatMessage(msg.payload.chatMessage);
          }

          if (isHostRef.current && fromConn) {
            connectionsRef.current.forEach((c) => {
              if (c.open && c.peer !== fromConn.peer) {
                c.send(msg);
              }
            });
          }
          break;
        }

        case 'REACTION': {
          if (msg.payload?.emoji && msg.senderName) {
            triggerFloatingReaction(msg.payload.emoji, msg.senderName);
          }

          if (isHostRef.current && fromConn) {
            connectionsRef.current.forEach((c) => {
              if (c.open && c.peer !== fromConn.peer) {
                c.send(msg);
              }
            });
          }
          break;
        }

        default:
          break;
      }
    },
    [addChatMessage, triggerFloatingReaction]
  );

  // Init BroadcastChannel for local tab multi-window sync
  const initBroadcastChannel = useCallback(
    (code: string) => {
      if (typeof window.BroadcastChannel === 'undefined') return;
      if (broadcastChannelRef.current) broadcastChannelRef.current.close();

      const channel = new BroadcastChannel(`gostream_wt_${code.toUpperCase()}`);
      channel.onmessage = (event) => {
        const msg = event.data as PeerMessage;
        if (msg && msg.senderId !== myUserIdRef.current) {
          handleIncomingMessage(msg);
        }
      };

      broadcastChannelRef.current = channel;
    },
    [handleIncomingMessage]
  );

  // Create Room (as Host)
  const createRoom = async (): Promise<string> => {
    cleanup();
    setIsConnecting(true);
    setError(null);

    const rawCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = formatRoomCode(rawCode);
    const peerId = `gostream-room-${code.toLowerCase()}`;

    return new Promise((resolve, reject) => {
      try {
        const peer = new Peer(peerId, {
          debug: 1,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
            ],
          },
        });

        peerRef.current = peer;

        peer.on('open', (id) => {
          setRoomId(code);
          setIsHost(true);
          setMyPeerId(id);
          setIsConnecting(false);

          const hostMember: Participant = {
            id: myUserIdRef.current,
            name: userName,
            avatarColor: userColor,
            isHost: true,
            joinedAt: Date.now(),
          };

          setMembers([hostMember]);
          initBroadcastChannel(code);

          addChatMessage({
            id: Math.random().toString(36).substring(2, 9),
            senderId: 'system',
            senderName: 'System',
            text: `Watch party created! Share Room Code ${code} or link to invite friends.`,
            timestamp: Date.now(),
            type: 'system',
          });

          resolve(code);
        });

        peer.on('connection', (conn) => {
          conn.on('open', () => {
            connectionsRef.current.set(conn.peer, conn);
          });

          conn.on('data', (data) => {
            const msg = data as PeerMessage;
            handleIncomingMessage(msg, conn);
          });

          conn.on('close', () => {
            connectionsRef.current.delete(conn.peer);
          });
        });

        peer.on('error', (err) => {
          console.warn('Peer error during room creation:', err);
          if (err.type === 'unavailable-id') {
            const fallbackPeer = new Peer({ debug: 1 });
            peerRef.current = fallbackPeer;
            fallbackPeer.on('open', (id) => {
              setRoomId(code);
              setIsHost(true);
              setMyPeerId(id);
              setIsConnecting(false);
              setMembers([
                {
                  id: myUserIdRef.current,
                  name: userName,
                  avatarColor: userColor,
                  isHost: true,
                  joinedAt: Date.now(),
                },
              ]);
              initBroadcastChannel(code);
              resolve(code);
            });
          } else {
            setError(`Failed to create room: ${err.message}`);
            setIsConnecting(false);
            reject(err);
          }
        });
      } catch (err: any) {
        setError(`Failed to create room: ${err.message}`);
        setIsConnecting(false);
        reject(err);
      }
    });
  };

  // Join Room (as Guest)
  const joinRoom = async (rawCode: string): Promise<boolean> => {
    const code = formatRoomCode(rawCode);
    if (!code || code.length < 4) {
      setError('Please enter a valid room code.');
      return false;
    }

    cleanup();
    setIsConnecting(true);
    setError(null);

    const targetPeerId = `gostream-room-${code.toLowerCase()}`;

    return new Promise((resolve) => {
      try {
        const peer = new Peer({
          debug: 1,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:stun1.l.google.com:19302' },
            ],
          },
        });

        peerRef.current = peer;

        peer.on('open', (myId) => {
          setMyPeerId(myId);
          setRoomId(code);
          setIsHost(false);

          initBroadcastChannel(code);

          const conn = peer.connect(targetPeerId, {
            reliable: true,
          });

          hostConnRef.current = conn;

          conn.on('open', () => {
            setIsConnecting(false);
            const joinMsg: PeerMessage = {
              type: 'JOIN_REQUEST',
              senderId: myUserIdRef.current,
              senderName: userName,
              timestamp: Date.now(),
              payload: { userColor },
            };
            conn.send(joinMsg);

            if (broadcastChannelRef.current) {
              broadcastChannelRef.current.postMessage(joinMsg);
            }

            resolve(true);
          });

          conn.on('data', (data) => {
            const msg = data as PeerMessage;
            handleIncomingMessage(msg, conn);
          });

          conn.on('error', (err) => {
            console.error('Host connection error:', err);
            setError('Could not connect to host. Room might be full or closed.');
            setIsConnecting(false);
            resolve(false);
          });

          conn.on('close', () => {
            setError('Disconnected from host.');
            setMembers((prev) => prev.filter((m) => !m.isHost));
          });
        });

        peer.on('error', (err) => {
          console.warn('Peer guest error:', err);
          initBroadcastChannel(code);
          setRoomId(code);
          setIsHost(false);
          setIsConnecting(false);

          const joinMsg: PeerMessage = {
            type: 'JOIN_REQUEST',
            senderId: myUserIdRef.current,
            senderName: userName,
            timestamp: Date.now(),
            payload: { userColor },
          };
          if (broadcastChannelRef.current) {
            broadcastChannelRef.current.postMessage(joinMsg);
          }

          resolve(true);
        });
      } catch (err: any) {
        setError(`Failed to join room: ${err.message}`);
        setIsConnecting(false);
        resolve(false);
      }
    });
  };

  // Leave Room
  const leaveRoom = () => {
    if (roomId) {
      const leaveMsg: PeerMessage = {
        type: 'MEMBER_LEFT',
        senderId: myUserIdRef.current,
        timestamp: Date.now(),
        payload: {
          leftId: myUserIdRef.current,
          systemMsg: {
            id: Math.random().toString(36).substring(2, 9),
            senderId: 'system',
            senderName: 'System',
            text: `${userName} left the room.`,
            timestamp: Date.now(),
            type: 'system',
          },
        },
      };
      broadcastPeerMessage(leaveMsg);
    }
    cleanup();
  };

  // Broadcast Media Change
  const broadcastMediaChange = (
    media: MediaItem,
    season?: number,
    episode?: number,
    episodeTitle?: string,
    serverId?: string
  ) => {
    const newSyncState: WatchSyncState = {
      media,
      season,
      episode,
      episodeTitle,
      serverId,
      isPlaying: true,
      updatedAt: Date.now(),
    };

    setSyncState(newSyncState);

    if (!roomId) return;

    const mediaTitle = media.title || media.name || 'Title';
    const msg: PeerMessage = {
      type: 'MEDIA_CHANGE',
      senderId: myUserIdRef.current,
      senderName: userName,
      timestamp: Date.now(),
      payload: {
        syncState: newSyncState,
        mediaTitle: isNaN(Number(season)) ? mediaTitle : `${mediaTitle} (S${season}:E${episode})`,
      },
    };

    broadcastPeerMessage(msg);
  };

  // Broadcast Playback Sync Signal
  const broadcastPlaybackSync = (time?: number, playing: boolean = true) => {
    if (!roomId || !syncStateRef.current) return;

    const updatedState: WatchSyncState = {
      ...syncStateRef.current,
      isPlaying: playing,
      playbackTime: time ?? syncStateRef.current.playbackTime,
      updatedAt: Date.now(),
    };

    setSyncState(updatedState);

    const msg: PeerMessage = {
      type: 'PLAYBACK_SYNC',
      senderId: myUserIdRef.current,
      senderName: userName,
      timestamp: Date.now(),
      payload: {
        isPlaying: playing,
        playbackTime: time,
        updatedAt: Date.now(),
      },
    };

    broadcastPeerMessage(msg);
  };

  // Send Chat Message
  const sendChatMessage = (text: string) => {
    if (!text.trim() || !roomId) return;

    const msgId = Math.random().toString(36).substring(2, 9);
    const chatMsg: ChatMessage = {
      id: msgId,
      senderId: myUserIdRef.current,
      senderName: userName,
      senderColor: userColor,
      text: text.trim(),
      timestamp: Date.now(),
      type: 'chat',
    };

    addChatMessage(chatMsg);

    const peerMsg: PeerMessage = {
      type: 'CHAT',
      senderId: myUserIdRef.current,
      senderName: userName,
      timestamp: Date.now(),
      payload: {
        chatMessage: chatMsg,
      },
    };

    broadcastPeerMessage(peerMsg);
  };

  // Send Emoji Reaction
  const sendReaction = (emoji: string) => {
    if (!roomId) return;

    triggerFloatingReaction(emoji, userName);

    const peerMsg: PeerMessage = {
      type: 'REACTION',
      senderId: myUserIdRef.current,
      senderName: userName,
      timestamp: Date.now(),
      payload: {
        emoji,
      },
    };

    broadcastPeerMessage(peerMsg);
  };

  // Copy Room Link to Clipboard
  const copyRoomLink = (): boolean => {
    if (!roomId) return false;
    const url = `${window.location.origin}${window.location.pathname}?watchRoom=${roomId}`;
    navigator.clipboard.writeText(url);
    return true;
  };

  // Check URL params on initial load for auto-join room code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('watchRoom') || params.get('room');
    if (roomParam) {
      setIsRoomModalOpen(true);
      joinRoom(roomParam);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return (
    <WatchTogetherContext.Provider
      value={{
        roomId,
        isHost,
        myPeerId,
        userName,
        userColor,
        setUserName,
        setUserColor,
        members,
        chatMessages,
        syncState,
        isRoomModalOpen,
        setIsRoomModalOpen,
        floatingReactions,
        isConnecting,
        error,
        createRoom,
        joinRoom,
        leaveRoom,
        broadcastMediaChange,
        broadcastPlaybackSync,
        sendChatMessage,
        sendReaction,
        copyRoomLink,
      }}
    >
      {children}
    </WatchTogetherContext.Provider>
  );
};

export const useWatchTogether = () => {
  const context = useContext(WatchTogetherContext);
  if (!context) {
    throw new Error('useWatchTogether must be used within a WatchTogetherProvider');
  }
  return context;
};
