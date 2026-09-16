import React, { useEffect, useState } from 'react';
import { Film } from 'lucide-react';
import { MediaCard } from '../components/MediaCard';
import {
  COUNTRIES,
  discoverMedia,
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrending,
  MOVIE_GENRES,
  MOVIE_STATUS,
} from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

export const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [browseTab, setBrowseTab] = useState<'trending' | 'popularity.desc' | 'top_rated' | 'now_playing'>('trending');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const hasBrowseFilters = !!(selectedGenre || country || status || year);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        if (browseTab === 'trending' && !hasBrowseFilters) {
          const res = await getTrending('movie', 'day');
          setMovies(res);
        } else if (browseTab === 'top_rated' && !hasBrowseFilters) {
          const res = await getTopRatedMovies(page);
          setMovies((prev) => (page === 1 ? res : [...prev, ...res]));
        } else if (browseTab === 'now_playing' && !hasBrowseFilters) {
          const res = await getNowPlayingMovies(page);
          setMovies((prev) => (page === 1 ? res : [...prev, ...res]));
        } else {
          const sortParam = browseTab === 'trending' ? 'popularity.desc' : browseTab === 'top_rated' ? 'vote_average.desc' : browseTab === 'now_playing' ? 'primary_release_date.desc' : browseTab;
          const res = await discoverMedia('movie', {
            genreId: selectedGenre,
            country,
            status,
            year,
            sortBy: sortParam,
            page,
          });
          setMovies((prev) => (page === 1 ? res : [...prev, ...res]));
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [browseTab, selectedGenre, country, status, year, page, hasBrowseFilters]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Film className="w-8 h-8 text-amber-400" />
            <span>Movies</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Explore blockbusters, indie films, and cinema classics</p>
        </div>

        {/* Browse Tabs (from app.js) */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 self-start sm:self-auto">
          {[
            { id: 'trending', label: '🔥 Trending' },
            { id: 'popularity.desc', label: 'Popular' },
            { id: 'top_rated', label: 'Top Rated' },
            { id: 'now_playing', label: 'Now Playing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setBrowseTab(tab.id as any);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                browseTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Filters Row (Genre, Country, Status, Year) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Country */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-900 text-slate-200 font-medium px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-500 text-xs cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Release Status</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-900 text-slate-200 font-medium px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-500 text-xs cursor-pointer"
          >
            {MOVIE_STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Release Year */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            placeholder="e.g. 2024"
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-500 text-xs"
          />
        </div>

        {/* Reset Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedGenre(null);
              setCountry('');
              setStatus('');
              setYear('');
              setPage(1);
            }}
            className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700/60"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Genres Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => {
            setSelectedGenre(null);
            setPage(1);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedGenre === null
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          All Genres
        </button>
        {MOVIE_GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setSelectedGenre(g.id);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedGenre === g.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
        {movies.map((movie, idx) => (
          <MediaCard key={`${movie.id}-${idx}`} item={movie} isGrid />
        ))}
      </div>

      {/* Load More Button */}
      {!loading && movies.length > 0 && (
        <div className="text-center pt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-8 py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-amber-400 font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg"
          >
            Load More Movies
          </button>
        </div>
      )}

      {loading && (
        <div className="py-12 text-center text-slate-400 flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading movies...</span>
        </div>
      )}
    </div>
  );
};
