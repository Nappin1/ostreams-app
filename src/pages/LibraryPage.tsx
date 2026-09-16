import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { MediaCard } from '../components/MediaCard';
import { useApp } from '../context/AppContext';

export const LibraryPage: React.FC = () => {
  const { watchlist } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'tv'>('all');

  const filteredItems = watchlist.filter((item) => {
    if (filterType === 'all') return true;
    return item.media_type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Bookmark className="w-8 h-8 text-amber-400" />
            <span>My Library</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Your saved movies and TV shows for later</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          {(['all', 'movie', 'tv'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                filterType === type
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {type === 'all' ? 'All Saved' : type === 'movie' ? 'Movies' : 'TV Shows'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Empty state */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredItems.map((item, idx) => (
            <MediaCard key={`${item.id}-${idx}`} item={item} isGrid />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Library is Empty</h3>
          <p className="text-sm text-slate-400">
            Click the bookmark icon on any movie or TV series to save it to your personal library for easy access anytime.
          </p>
        </div>
      )}
    </div>
  );
};
