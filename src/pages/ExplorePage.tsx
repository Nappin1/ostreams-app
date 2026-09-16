import React, { useEffect, useState } from 'react';
import { Compass, Search, X } from 'lucide-react';
import { MediaCard } from '../components/MediaCard';
import { useApp } from '../context/AppContext';
import { COUNTRIES, discoverMedia, MOVIE_STATUS, searchMulti, TV_STATUS } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

export const ExplorePage: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedProvider, setSelectedProvider } = useApp();
  const [results, setResults] = useState<MediaItem[]>([]);
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchQuery.trim()) {
          const searchRes = await searchMulti(searchQuery);
          let filtered = searchRes;
          if (mediaType !== 'all') {
            filtered = filtered.filter((item) => item.media_type === mediaType);
          }
          setResults(filtered);
        } else if (selectedProvider) {
          if (selectedProvider.kind === 'provider') {
            if (mediaType === 'all') {
              const [movies, tvShows] = await Promise.all([
                discoverMedia('movie', { providerId: selectedProvider.id, country, status, year, sortBy, page: 1 }),
                discoverMedia('tv', { providerId: selectedProvider.id, country, status, year, sortBy, page: 1 }),
              ]);
              const combined: MediaItem[] = [];
              const maxLen = Math.max(movies.length, tvShows.length);
              for (let i = 0; i < maxLen; i++) {
                if (movies[i]) combined.push(movies[i]);
                if (tvShows[i]) combined.push(tvShows[i]);
              }
              setResults(combined);
            } else {
              const res = await discoverMedia(mediaType, {
                providerId: selectedProvider.id,
                country,
                status,
                year,
                sortBy,
                page: 1,
              });
              setResults(res);
            }
          } else {
            // Network filter (TV Shows)
            const res = await discoverMedia('tv', {
              networkId: selectedProvider.id,
              country,
              status,
              year,
              sortBy,
              page: 1,
            });
            setResults(res);
          }
        } else {
          const typeToFetch = mediaType === 'all' ? 'movie' : mediaType;
          const discoverRes = await discoverMedia(typeToFetch, {
            country,
            status,
            year,
            sortBy,
            page: 1,
          });
          setResults(discoverRes);
        }
      } catch (err) {
        console.error('Explore fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, selectedProvider, mediaType, country, status, year, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
              <Compass className="w-8 h-8 text-amber-400" />
              <span>Explore & Search</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Search millions of titles or filter by streaming provider & network</p>
          </div>

          <div className="flex items-center space-x-2">
            {selectedProvider && (
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center space-x-2">
                <span>
                  {selectedProvider.kind === 'provider' ? 'Provider' : 'Network'}: {selectedProvider.name}
                </span>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="p-0.5 hover:bg-amber-500/20 rounded transition-colors"
                  title="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-colors flex items-center space-x-1"
              >
                <span>Clear query</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Multi Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Media Type Toggle */}
          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
            {(['all', 'movie', 'tv'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setMediaType(type)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  mediaType === type
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
              </button>
            ))}
          </div>

          {/* Country Selector */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-slate-900 text-slate-200 font-medium px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 text-xs sm:text-sm cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-900 text-slate-200 font-medium px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 text-xs sm:text-sm cursor-pointer"
          >
            {(mediaType === 'movie' ? MOVIE_STATUS : TV_STATUS).map((s) => (
              <option key={s.value} value={s.value}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Release Year Input */}
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year (e.g. 2024)"
            className="bg-slate-900 text-slate-100 placeholder-slate-500 px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 text-xs sm:text-sm"
          />

          {/* Sort Order */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-slate-200 font-semibold px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500 text-xs sm:text-sm cursor-pointer"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="primary_release_date.desc">Release Date</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : selectedProvider
            ? `Titles on ${selectedProvider.name}`
            : 'Discovered Content'}
        </span>
        <span>{results.length} items found</span>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading titles from TMDB...</span>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
          {results.map((item, idx) => (
            <MediaCard key={`${item.id}-${idx}`} item={item} isGrid />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-900/50 rounded-3xl border border-slate-800/80 p-8 space-y-3">
          <Search className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No Content Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords, clearing filters, or switching media types.
          </p>
        </div>
      )}
    </div>
  );
};
