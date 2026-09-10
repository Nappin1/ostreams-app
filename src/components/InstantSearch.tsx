import React, { useEffect, useRef, useState } from 'react';
import { Film, Search, Star, Tv, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getPosterUrl, searchMulti } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

export const InstantSearch: React.FC = () => {
  const { searchQuery, setSearchQuery, openDetails, setActivePage } = useApp();
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setLoading(true);
        try {
          const res = await searchMulti(searchQuery);
          setResults(res.slice(0, 8)); // Top 8 items
          setIsOpen(true);
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: MediaItem) => {
    setIsOpen(false);
    openDetails(item);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      setActivePage('explore');
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md">
      <form onSubmit={handleFullSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim().length >= 2 && setIsOpen(true)}
          placeholder="Search movies, TV shows..."
          className="w-full bg-slate-900/80 text-slate-100 placeholder-slate-400 pl-10 pr-10 py-2 rounded-full border border-slate-700/60 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all duration-200 shadow-inner"
        />
        <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Live Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-slate-400 text-sm flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Searching TMDB...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2 divide-y divide-slate-800/60">
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Instant Results</span>
                <span className="text-amber-500 text-[10px]">{results.length} found</span>
              </div>
              {results.map((item) => {
                const title = item.title || item.name || 'Untitled';
                const date = item.release_date || item.first_air_date || '';
                const year = date ? new Date(date).getFullYear() : '';
                const type = item.media_type === 'movie' ? 'Movie' : 'TV Series';

                return (
                  <button
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => handleSelect(item)}
                    className="w-full px-4 py-2.5 flex items-center space-x-3 hover:bg-slate-800/70 transition-colors text-left group"
                  >
                    <img
                      src={getPosterUrl(item.poster_path, 'w185')}
                      alt={title}
                      className="w-10 h-14 object-cover rounded-lg shadow group-hover:scale-105 transition-transform duration-200 bg-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-100 group-hover:text-amber-400 transition-colors truncate">
                        {title}
                      </h4>
                      <div className="flex items-center space-x-2.5 mt-1 text-xs text-slate-400">
                        <span className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-[11px]">
                          {item.media_type === 'movie' ? (
                            <Film className="w-3 h-3 text-amber-400 inline mr-1" />
                          ) : (
                            <Tv className="w-3 h-3 text-indigo-400 inline mr-1" />
                          )}
                          {type}
                        </span>
                        {year && <span>{year}</span>}
                        {item.vote_average > 0 && (
                          <span className="flex items-center text-amber-400 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400 mr-0.5 inline" />
                            {item.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              <button
                onClick={handleFullSearch}
                className="w-full px-4 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-medium text-xs text-center transition-colors block"
              >
                View all results for "{searchQuery}" &rarr;
              </button>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 text-sm">
              No content found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
