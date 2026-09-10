import React, { useEffect, useState } from 'react';
import { ContinueWatching } from '../components/ContinueWatching';
import { HeroCarousel } from '../components/HeroCarousel';
import { MediaCarousel } from '../components/MediaCarousel';
import { PlatformFilter } from '../components/PlatformFilter';
import { getPopularMovies, getPopularTV, getTopRatedMovies, getTopRatedTV, getTrending } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

export const HomePage: React.FC = () => {
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [top10, setTop10] = useState<MediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
  const [popularTV, setPopularTV] = useState<MediaItem[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MediaItem[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [trendRes, popMovieRes, popTVRes, topMovieRes, topTVRes] = await Promise.all([
          getTrending('all', 'day'),
          getPopularMovies(1),
          getPopularTV(1),
          getTopRatedMovies(1),
          getTopRatedTV(1),
        ]);

        setTrending(trendRes);
        setTop10(trendRes.slice(0, 10));
        setPopularMovies(popMovieRes);
        setPopularTV(popTVRes);
        setTopRatedMovies(topMovieRes);
        setTopRatedTV(topTVRes);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Fetching latest trending content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Hero Banner Carousel */}
      <HeroCarousel items={trending.slice(0, 6)} />

      {/* Continue Watching Section */}
      <ContinueWatching />

      {/* TOP 10 Content Today */}
      <MediaCarousel
        title="TOP 10 Content Today"
        subtitle="Most watched movies and TV shows across the world"
        items={top10}
        isTop10
      />

      {/* Streaming Platform Filter */}
      <PlatformFilter />

      {/* Trending Now */}
      <MediaCarousel title="Trending Movies & Series" items={trending} />

      {/* Popular Movies */}
      <MediaCarousel title="Popular Movies" items={popularMovies} />

      {/* Popular TV Shows */}
      <MediaCarousel title="Popular TV Shows" items={popularTV} />

      {/* Top Rated Movies */}
      <MediaCarousel title="Top Rated Movies" items={topRatedMovies} />

      {/* Top Rated TV Shows */}
      <MediaCarousel title="Top Rated TV Series" items={topRatedTV} />
    </div>
  );
};
