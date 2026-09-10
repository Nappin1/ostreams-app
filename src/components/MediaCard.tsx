import React from 'react';
import { Bookmark, Check, Film, Play, Star, Tv } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getPosterUrl } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

interface MediaCardProps {
  item: MediaItem;
  rank?: number;
  isGrid?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, rank, isGrid = false }) => {
  const { openDetails, playMedia, isInWatchlist, toggleWatchlist } = useApp();
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : '';
  const isSaved = isInWatchlist(item.id);

  return (
    <div className={`group relative cursor-pointer select-none ${isGrid ? 'w-full min-w-0' : 'flex-none w-40 sm:w-48 lg:w-56'}`}>
      {/* Poster Image Container */}
      <div
        onClick={() => openDetails(item)}
        className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-lg group-hover:shadow-amber-500/10 group-hover:border-slate-700 transition-all duration-300 transform group-hover:-translate-y-1.5"
      >
        <img
          src={getPosterUrl(item.poster_path, 'w500')}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
          {/* Top Actions */}
          <div className="flex justify-between items-start">
            <span className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
              {item.media_type === 'movie' ? (
                <Film className="w-3 h-3 text-amber-400 inline mr-1" />
              ) : (
                <Tv className="w-3 h-3 text-indigo-400 inline mr-1" />
              )}
              {item.media_type === 'movie' ? 'Movie' : 'TV'}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(item);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900/80 text-white hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          {/* Center Play Button Icon */}
          <div className="self-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                playMedia(item, 1, 1);
              }}
              className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transform scale-90 group-hover:scale-100 hover:bg-amber-400 transition-all"
            >
              <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
            </button>
          </div>

          {/* Bottom Info */}
          <div>
            {item.vote_average > 0 && (
              <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{item.vote_average.toFixed(1)}</span>
              </div>
            )}
            <p className="text-xs text-slate-300 line-clamp-2">{item.overview}</p>
          </div>
        </div>

        {/* Top 10 Rank Number Badge */}
        {rank !== undefined && (
          <div className="absolute top-2 left-2 w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-amber-500/40 border border-amber-300">
            {rank}
          </div>
        )}
      </div>

      {/* Title & Metadata */}
      <div className="mt-2.5 space-y-0.5">
        <h3
          onClick={() => openDetails(item)}
          className="text-sm font-semibold text-slate-100 truncate group-hover:text-amber-400 transition-colors"
        >
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{year || 'N/A'}</span>
          {item.vote_average > 0 && (
            <span className="flex items-center text-amber-400/90 font-medium">
              <Star className="w-3 h-3 fill-amber-400 mr-1 inline" />
              {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
