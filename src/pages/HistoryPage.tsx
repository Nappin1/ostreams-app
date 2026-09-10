import React from 'react';
import { Clock, Film, Play, Trash2, Tv } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getBackdropUrl } from '../services/tmdb';

export const HistoryPage: React.FC = () => {
  const { watchHistory, playMedia, removeFromHistory, clearHistory } = useApp();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Clock className="w-8 h-8 text-amber-400" />
            <span>Watch History</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track of movies and TV episodes you've recently played
          </p>
        </div>

        {watchHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 text-xs font-semibold transition-colors flex items-center space-x-2 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Watch History</span>
          </button>
        )}
      </div>

      {/* History Items List */}
      {watchHistory.length > 0 ? (
        <div className="space-y-3">
          {watchHistory.map((item, idx) => {
            const formattedDate = new Date(item.updatedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={`${item.mediaId}-${item.season}-${item.episode}-${idx}`}
                className="group bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="relative w-28 sm:w-36 aspect-video flex-shrink-0 rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={getBackdropUrl(item.backdropPath || item.posterPath, 'w780')}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-amber-400 fill-amber-400" />
                    </div>
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 font-semibold text-[10px]">
                        {item.mediaType === 'movie' ? (
                          <Film className="w-3 h-3 text-amber-400 inline mr-1" />
                        ) : (
                          <Tv className="w-3 h-3 text-indigo-400 inline mr-1" />
                        )}
                        {item.mediaType === 'movie' ? 'Movie' : 'TV Series'}
                      </span>
                      {item.mediaType === 'tv' && item.season && item.episode && (
                        <span className="text-amber-400 font-bold">
                          Season {item.season}, Episode {item.episode}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>

                    {item.episodeTitle && (
                      <p className="text-xs text-slate-400 truncate">
                        Episode: {item.episodeTitle}
                      </p>
                    )}

                    <p className="text-[11px] text-slate-500">Watched on {formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
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
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow hover:bg-amber-400 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Resume</span>
                  </button>

                  <button
                    onClick={() => removeFromHistory(item.mediaId, item.season, item.episode)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Watch History Yet</h3>
          <p className="text-sm text-slate-400">
            Start streaming any movie or TV series and your watch progress will be automatically recorded here.
          </p>
        </div>
      )}
    </div>
  );
};
