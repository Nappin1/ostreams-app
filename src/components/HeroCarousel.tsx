import React, { useEffect, useState } from 'react';
import { Bookmark, Check, ChevronLeft, ChevronRight, Info, Play, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchTMDBLogo, getBackdropUrl, getPosterUrl } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

interface HeroCarouselProps {
  items: MediaItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const { openDetails, playMedia, isInWatchlist, toggleWatchlist } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logos, setLogos] = useState<Record<number, string | null>>({});

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items.length]);

  // Fetch title logos for hero items
  useEffect(() => {
    if (!items || items.length === 0) return;
    let isMounted = true;
    items.forEach(async (item) => {
      const type = item.media_type || (item.title ? 'movie' : 'tv');
      const logoPath = await fetchTMDBLogo(item.id, type);
      if (isMounted && logoPath) {
        setLogos((prev) => ({ ...prev, [item.id]: logoPath }));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex];
  const title = current.title || current.name || 'Untitled';
  const date = current.release_date || current.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : '';
  const isSaved = isInWatchlist(current.id);
  const logoPath = logos[current.id];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[550px] sm:h-[620px] lg:h-[680px] overflow-hidden rounded-3xl mb-10 border border-slate-800/80 shadow-2xl group">
      {/* Backdrop Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url(${getBackdropUrl(current.backdrop_path, 'original')})`,
        }}
      >
        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-10 flex items-end pb-12 sm:pb-16 z-10">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-[11px] shadow-lg shadow-amber-500/20">
              Featured {current.media_type === 'tv' ? 'TV Series' : 'Movie'}
            </span>
            {current.vote_average > 0 && (
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{current.vote_average.toFixed(1)} TMDB</span>
              </span>
            )}
            {year && (
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
                {year}
              </span>
            )}
          </div>

          {/* Title or Logo Image */}
          {logoPath ? (
            <div className="py-2">
              <img
                src={getPosterUrl(logoPath, 'w500')}
                alt={title}
                className="max-h-24 sm:max-h-36 max-w-[85%] sm:max-w-[70%] object-contain drop-shadow-2xl origin-left"
              />
            </div>
          ) : (
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-lg">
              {title}
            </h1>
          )}

          {/* Overview */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-xl font-normal drop-shadow">
            {current.overview || 'No overview available for this title.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => playMedia(current, 1, 1)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm sm:text-base flex items-center space-x-2.5 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Play Now</span>
            </button>

            <button
              onClick={() => toggleWatchlist(current)}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-sm sm:text-base flex items-center space-x-2 backdrop-blur-md transition-all duration-200 ${
                isSaved
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-slate-900/70 border-slate-700/80 text-white hover:bg-slate-800'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>In Library</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  <span>Add to Library</span>
                </>
              )}
            </button>

            <button
              onClick={() => openDetails(current)}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-all duration-200"
              title="More Details"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 sm:right-12 flex items-center space-x-2 z-20">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                : 'w-2 bg-slate-600/80 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
