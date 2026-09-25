import type { MediaItem } from './tmdb';

export interface Participant {
  id: string;
  name: string;
  avatarColor: string;
  isHost: boolean;
  joinedAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderColor?: string;
  text: string;
  timestamp: number;
  type: 'chat' | 'system' | 'reaction';
  emoji?: string;
}

export interface WatchSyncState {
  media: MediaItem | null;
  season?: number;
  episode?: number;
  episodeTitle?: string;
  serverId?: string;
  isPlaying?: boolean;
  playbackTime?: number;
  updatedAt: number;
}

export type MessageType =
  | 'JOIN_REQUEST'
  | 'ROOM_STATE'
  | 'MEDIA_CHANGE'
  | 'PLAYBACK_SYNC'
  | 'CHAT'
  | 'REACTION'
  | 'MEMBER_JOINED'
  | 'MEMBER_LEFT'
  | 'HEARTBEAT';

export interface PeerMessage {
  type: MessageType;
  payload: any;
  senderId: string;
  senderName?: string;
  timestamp: number;
}

export interface FloatingReaction {
  id: string;
  emoji: string;
  senderName: string;
  x: number; // percentage horizontal position (10 - 90)
}
