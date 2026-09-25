import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Send,
  Share2,
  Check,
  Crown,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Tv,
} from 'lucide-react';
import { useWatchTogether } from '../context/WatchTogetherContext';
import { useApp } from '../context/AppContext';

const EMOJI_PRESETS = ['❤️', '😂', '🔥', '🍿', '😮', '👏', '🚀', '💯'];

interface WatchTogetherSidebarProps {
  onReloadPlayer?: () => void;
}

export const WatchTogetherSidebar: React.FC<WatchTogetherSidebarProps> = ({ onReloadPlayer }) => {
  const {
    roomId,
    members,
    chatMessages,
    syncState,
    userName,
    userColor,
    sendChatMessage,
    sendReaction,
    copyRoomLink,
    broadcastPlaybackSync,
    setIsRoomModalOpen,
  } = useWatchTogether();

  const { playMedia, playerState } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'members'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Sync player state when room syncState changes from host/other member
  useEffect(() => {
    if (!syncState || !syncState.media) return;

    // Check if player is currently showing different media
    const currentMediaId = playerState?.media?.id;
    const currentSeason = playerState?.season;
    const currentEpisode = playerState?.episode;

    if (
      currentMediaId !== syncState.media.id ||
      currentSeason !== syncState.season ||
      currentEpisode !== syncState.episode
    ) {
      // Sync media player
      playMedia(
        syncState.media,
        syncState.season || 1,
        syncState.episode || 1,
        syncState.episodeTitle
      );
    }
  }, [syncState, playerState, playMedia]);

  if (!roomId) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  const handleCopyLink = () => {
    const success = copyRoomLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSyncPlayback = () => {
    broadcastPlaybackSync(Date.now(), true);
    if (onReloadPlayer) {
      onReloadPlayer();
    }
  };

  return (
    <aside
      className={`relative h-full bg-slate-900/95 border-l border-slate-800 flex flex-col transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-12 sm:w-14' : 'w-80 sm:w-96'
      }`}
    >
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3.5 top-6 z-40 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-lg hover:bg-amber-400 hover:scale-110 transition-all cursor-pointer"
        title={isCollapsed ? 'Expand Chat' : 'Collapse Chat'}
      >
        {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Collapsed State View */}
      {isCollapsed ? (
        <div className="flex flex-col items-center py-4 space-y-6 h-full justify-between">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
              title="Watch Party Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-300 mt-1">{members.length}</span>
            </div>
          </div>

          {/* Quick Sync Button */}
          <button
            onClick={handleSyncPlayback}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Sync Video Player"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Expanded State View */
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-2 bg-slate-950/40 shrink-0">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Watch Party</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-extrabold border border-amber-500/30">
                    {roomId}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {members.length} {members.length === 1 ? 'member' : 'members'} online
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={handleSyncPlayback}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Sync Video with Party"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 hover:text-amber-300 transition-colors"
                title="Copy Room Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Chat / Viewers) */}
          <div className="flex border-b border-slate-800 bg-slate-950/20 shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 text-xs font-bold transition-all flex items-center justify-center space-x-2 border-b-2 ${
                activeTab === 'chat'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
              {chatMessages.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                  {chatMessages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`flex-1 py-2.5 text-xs font-bold transition-all flex items-center justify-center space-x-2 border-b-2 ${
                activeTab === 'members'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Viewers</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                {members.length}
              </span>
            </button>
          </div>

          {/* Tab Content: Chat Feed */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Messages Scroll Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-800"
              >
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Tv className="w-8 h-8 mb-2 opacity-50 text-amber-400" />
                    <p className="text-xs font-semibold text-slate-300">Room is live!</p>
                    <p className="text-[11px] mt-1 text-slate-500">
                      Send a message or react with emojis while watching.
                    </p>
                  </div>
                ) : (
                  chatMessages.map((msg) => {
                    if (msg.type === 'system') {
                      return (
                        <div key={msg.id} className="text-center my-2">
                          <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-[10px] font-medium text-amber-300 inline-block shadow-sm">
                            {msg.text}
                          </span>
                        </div>
                      );
                    }

                    const isMe = msg.senderName === userName;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                          isMe ? 'ml-auto' : 'mr-auto'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-slate-400 px-1">
                          <span
                            className="font-bold truncate"
                            style={{ color: msg.senderColor || '#f59e0b' }}
                          >
                            {msg.senderName}
                          </span>
                          <span>&bull;</span>
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div
                          className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-words shadow-sm ${
                            isMe
                              ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                              : 'bg-slate-800 text-slate-100 rounded-tl-xs border border-slate-700/60'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Emoji Reactions Toolbar */}
              <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-1 shrink-0 overflow-x-auto scrollbar-none">
                {EMOJI_PRESETS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => sendReaction(emoji)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-lg transition-transform hover:scale-125 active:scale-95 cursor-pointer shrink-0"
                    title={`Send ${emoji} reaction`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Say something to room..."
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-xl bg-amber-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors shrink-0"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab Content: Viewers List */}
          {activeTab === 'members' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
                <span>Room Members ({members.length})</span>
                <button
                  onClick={() => setIsRoomModalOpen(true)}
                  className="text-amber-400 hover:underline text-[11px]"
                >
                  Room Settings
                </button>
              </div>

              {members.map((member) => {
                const isCurrent = member.name === userName;
                return (
                  <div
                    key={member.id}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-slate-950 text-xs shadow-md"
                        style={{ backgroundColor: member.avatarColor || userColor }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white">{member.name}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-700 text-[10px] text-slate-300">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">Connected</span>
                      </div>
                    </div>

                    {member.isHost && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold flex items-center space-x-1">
                        <Crown className="w-3 h-3" />
                        <span>Host</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
