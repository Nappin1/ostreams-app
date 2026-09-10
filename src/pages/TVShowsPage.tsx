import React, { useEffect, useState } from 'react';
import { Tv } from 'lucide-react';
import { MediaCard } from '../components/MediaCard';
import {
  COUNTRIES,
  discoverMedia,
  getOnTheAirTV,
  getTopRatedTV,
  getTrending,
  TV_STATUS,
} from '../services/tmdb';
import type { Genre, MediaItem } from '../types/tmdb';

const TV_GENRES: Genre[] = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

export const TVShowsPage: React.FC = () => {
  const [tvShows, setTvShows] = useState<MediaItem[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const [browseTab, setBrowseTab] = useState<'trending' | 'popularity.desc' | 'top_rated' | 'on_the_air'>('trending');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const hasBrowseFilters = !!(selectedGenre || country || status || year);

  useEffect(() => {
    const fetchTV = async () => {
      setLoading(true);
      try {
        if (browseTab === 'trending' && !hasBrowseFilters) {
          const res = await getTrending('tv', 'day');
          setTvShows(res);
        } else if (browseTab === 'top_rated' && !hasBrowseFilters) {
          const res = await getTopRatedTV(page);
          setTvShows((prev) => (page === 1 ? res : [...prev, ...res]));
        } else if (browseTab === 'on_the_air' && !hasBrowseFilters) {
          const res = await getOnTheAirTV(page);
          setTvShows((prev) => (page === 1 ? res : [...prev, ...res]));
        } else {
          const sortParam = browseTab === 'trending' ? 'popularity.desc' : browseTab === 'top_rated' ? 'vote_average.desc' : browseTab === 'on_the_air' ? 'first_air_date.desc' : browseTab;
          const res = await discoverMedia('tv', {
            genreId: selectedGenre,
            country,
            status,
            year,
            sortBy: sortParam,
            page,
          });
          setTvShows((prev) => (page === 1 ? res : [...prev, ...res]));
        }
      } catch (err) {
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTV();
  }, [browseTab, selectedGenre, country, status, year, page, hasBrowseFilters]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center space-x-3">
            <Tv className="w-8 h-8 text-indigo-400" />
            <span>TV Shows & Series</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Binge trending series, anime, and television networks</p>
        </div>

        {/* Browse Tabs (from app.js) */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 self-start sm:self-auto">
          {[
            { id: 'trending', label: '🔥 Trending' },
            { id: 'popularity.desc', label: 'Popular' },
            { id: 'top_rated', label: 'Top Rated' },
            { id: 'on_the_air', label: 'On The Air' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setBrowseTab(tab.id as any);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${browseTab === tab.id
                  ? 'bg-indigo-500 text-white shadow'
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
            className="w-full bg-slate-900 text-slate-200 font-medium px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 text-xs cursor-pointer"
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
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Show Status</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-900 text-slate-200 font-medium px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 text-xs cursor-pointer"
          >
            {TV_STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* First Air Year */}
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
            className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 text-xs"
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
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedGenre === null
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
        >
          All Series
        </button>
        {TV_GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setSelectedGenre(g.id);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedGenre === g.id
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {tvShows.map((tv, idx) => (
          <MediaCard key={`${tv.id}-${idx}`} item={tv} isGrid />
        ))}
      </div>

      {/* Load More Button */}
      {!loading && tvShows.length > 0 && (
        <div className="text-center pt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-8 py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-indigo-400 font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg"
          >
            Load More TV Series
          </button>
        </div>
      )}

      {loading && (
        <div className="py-12 text-center text-slate-400 flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading TV shows...</span>
        </div>
      )}
    </div>
  );
};
