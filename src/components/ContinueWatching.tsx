import React from 'react';
import { Film, Play, Trash2, Tv } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getBackdropUrl } from '../services/tmdb';

export const ContinueWatching: React.FC = () => {
  const { watchHistory, playMedia, removeFromHistory, clearHistory } = useApp();

  if (!watchHistory || watchHistory.length === 0) return null;

  // Show top 6 items
  const recentItems = watchHistory.slice(0, 6);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Continue Watching</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Resume where you left off</p>
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentItems.map((item, idx) => (
          <div
            key={`${item.mediaId}-${item.season}-${item.episode}-${idx}`}
            className="group relative bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex space-x-3 p-3 items-center"
          >
            {/* Thumbnail */}
            <div className="relative w-28 h-18 sm:w-32 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-950">
              <img
                src={getBackdropUrl(item.backdropPath || item.posterPath, 'w780')}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    playMedia(
                      {
                        id: item.mediaId,
                        title: item.title,
                        name: item.title,
                        poster_path: item.posterPath,
                        backdrop_path: item.backdropPath,
                        media_type: item.mediaType,
                        overview: '',
                        vote_average: 0,
                      },
                      item.season || 1,
                      item.episode || 1,
                      item.episodeTitle
                    )
                  }
                  className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                >
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </button>
              </div>

              {/* Progress bar line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div className="h-full bg-amber-500 w-3/4 rounded-r-full" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/60 font-medium">
                  {item.mediaType === 'movie' ? (
                    <Film className="w-3 h-3 text-amber-400 inline mr-1" />
                  ) : (
                    <Tv className="w-3 h-3 text-indigo-400 inline mr-1" />
                  )}
                  {item.mediaType === 'movie' ? 'Movie' : 'TV'}
                </span>
                {item.mediaType === 'tv' && item.season && item.episode && (
                  <span className="text-amber-400 font-semibold">
                    S{item.season}:E{item.episode}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              {item.episodeTitle && (
                <p className="text-xs text-slate-400 truncate mt-0.5">{item.episodeTitle}</p>
              )}
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromHistory(item.mediaId, item.season, item.episode)}
              className="p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800/50"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
