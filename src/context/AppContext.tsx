import React, { createContext, useContext, useEffect, useState } from 'react';
import type { MediaItem, WatchProgress } from '../types/tmdb';

export type ActivePage = 'home' | 'movies' | 'tv' | 'explore' | 'library' | 'history';

interface PlayerState {
  isOpen: boolean;
  media: MediaItem | null;
  season?: number;
  episode?: number;
  episodeTitle?: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedMedia: MediaItem | null;
  openDetails: (media: MediaItem) => void;
  closeDetails: () => void;
  playerState: PlayerState | null;
  playMedia: (media: MediaItem, season?: number, episode?: number, episodeTitle?: string) => void;
  closePlayer: () => void;
  activeServerId: string;
  setActiveServerId: (id: string) => void;
  watchlist: MediaItem[];
  toggleWatchlist: (media: MediaItem) => void;
  isInWatchlist: (id: number) => boolean;
  watchHistory: WatchProgress[];
  recordWatchHistory: (progress: WatchProgress) => void;
  clearHistory: () => void;
  removeFromHistory: (mediaId: number, season?: number, episode?: number) => void;
  isDMCAModalOpen: boolean;
  setIsDMCAModalOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProvider: { kind: 'provider' | 'network'; id: number; name: string } | null;
  setSelectedProvider: (provider: { kind: 'provider' | 'network'; id: number; name: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const WATCHLIST_KEY = 'gostream_watchlist_v1';
const HISTORY_KEY = 'gostream_history_v1';
const SERVER_KEY = 'gostream_active_server_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [activeServerId, setActiveServerId] = useState<string>(() => {
    return localStorage.getItem(SERVER_KEY) || 'vaplayer';
  });
  const [isDMCAModalOpen, setIsDMCAModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<{ kind: 'provider' | 'network'; id: number; name: string } | null>(null);

  const [watchlist, setWatchlist] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [watchHistory, setWatchHistory] = useState<WatchProgress[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem(SERVER_KEY, activeServerId);
  }, [activeServerId]);

  const openDetails = (media: MediaItem) => {
    setSelectedMedia(media);
  };

  const closeDetails = () => {
    setSelectedMedia(null);
  };

  const playMedia = (media: MediaItem, season: number = 1, episode: number = 1, episodeTitle?: string) => {
    setPlayerState({
      isOpen: true,
      media,
      season: media.media_type === 'tv' ? season : undefined,
      episode: media.media_type === 'tv' ? episode : undefined,
      episodeTitle,
    });

    // Record in watch history
    recordWatchHistory({
      mediaId: media.id,
      mediaType: media.media_type || (media.title ? 'movie' : 'tv'),
      title: media.title || media.name || 'Untitled',
      posterPath: media.poster_path,
      backdropPath: media.backdrop_path,
      season: media.media_type === 'tv' ? season : undefined,
      episode: media.media_type === 'tv' ? episode : undefined,
      episodeTitle,
      updatedAt: Date.now(),
    });
  };

  const closePlayer = () => {
    setPlayerState(null);
  };

  const toggleWatchlist = (media: MediaItem) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === media.id);
      if (exists) {
        return prev.filter((item) => item.id !== media.id);
      } else {
        return [media, ...prev];
      }
    });
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((item) => item.id === id);
  };

  const recordWatchHistory = (progress: WatchProgress) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(
            item.mediaId === progress.mediaId &&
            item.season === progress.season &&
            item.episode === progress.episode
          )
      );
      return [progress, ...filtered];
    });
  };

  const clearHistory = () => {
    setWatchHistory([]);
  };

  const removeFromHistory = (mediaId: number, season?: number, episode?: number) => {
    setWatchHistory((prev) =>
      prev.filter(
        (item) =>
          !(item.mediaId === mediaId && item.season === season && item.episode === episode)
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedMedia,
        openDetails,
        closeDetails,
        playerState,
        playMedia,
        closePlayer,
        activeServerId,
        setActiveServerId,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        watchHistory,
        recordWatchHistory,
        clearHistory,
        removeFromHistory,
        isDMCAModalOpen,
        setIsDMCAModalOpen,
        searchQuery,
        setSearchQuery,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
