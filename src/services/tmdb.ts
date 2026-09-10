import type { Genre, MediaDetails, MediaItem, TVSeasonDetails } from '../types/tmdb';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Excluded Genre IDs requested by user
const EXCLUDED_MOVIE_GENRES = [10770]; // TV Movie
const EXCLUDED_TV_GENRES = [10763, 10767, 10764]; // News, Talk, Reality

export function filterUnwantedGenres(items: MediaItem[]): MediaItem[] {
  return items.filter((item) => {
    const isMovie = item.media_type === 'movie' || !!item.title;
    if (isMovie) {
      if (item.genre_ids?.some((g) => EXCLUDED_MOVIE_GENRES.includes(g))) return false;
    } else {
      if (item.genre_ids?.some((g) => EXCLUDED_TV_GENRES.includes(g))) return false;
    }
    return true;
  });
}

export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w500'): string {
  if (!path) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1280&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE}/${size}${path}`;
}

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'day'): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>(`/trending/${mediaType}/${timeWindow}`);
  const mapped = data.results.map((item) => ({
    ...item,
    media_type: item.media_type || (item.title ? 'movie' : 'tv'),
  }));
  return filterUnwantedGenres(mapped);
}

export async function getPopularMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/movie/popular', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getPopularTV(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/tv/popular', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getTopRatedMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/movie/top_rated', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getTopRatedTV(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/tv/top_rated', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getNowPlayingMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/movie/now_playing', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getOnTheAirTV(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/tv/on_the_air', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'tv' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getUpcomingMovies(page: number = 1): Promise<MediaItem[]> {
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/movie/upcoming', { page });
  const mapped = data.results.map((item) => ({ ...item, media_type: 'movie' as const }));
  return filterUnwantedGenres(mapped);
}

export async function getMovieDetails(id: number): Promise<MediaDetails> {
  const data = await fetchFromTMDB<MediaDetails>(`/movie/${id}`, {
    append_to_response: 'videos,credits,recommendations,similar',
  });
  return { ...data, media_type: 'movie' };
}

export async function getTVDetails(id: number): Promise<MediaDetails> {
  const data = await fetchFromTMDB<MediaDetails>(`/tv/${id}`, {
    append_to_response: 'videos,credits,recommendations,similar',
  });
  return { ...data, media_type: 'tv' };
}

export async function getTVSeasonDetails(id: number, seasonNumber: number): Promise<TVSeasonDetails> {
  return fetchFromTMDB<TVSeasonDetails>(`/tv/${id}/season/${seasonNumber}`);
}

const logoCache: Record<string, string | null> = {};

export async function fetchTMDBLogo(id: number, mediaType: 'movie' | 'tv'): Promise<string | null> {
  const cacheKey = `${mediaType}-${id}`;
  if (cacheKey in logoCache) return logoCache[cacheKey];

  try {
    const data = await fetchFromTMDB<{ logos?: Array<{ file_path: string; iso_639_1: string | null }> }>(
      `/${mediaType}/${id}/images`,
      { include_image_language: 'en,null' }
    );
    if (data?.logos && data.logos.length > 0) {
      const englishLogos = data.logos.filter((l) => l.iso_639_1 === 'en');
      const best = englishLogos.length > 0 ? englishLogos[0] : data.logos[0];
      logoCache[cacheKey] = best.file_path;
      return best.file_path;
    }
  } catch (err) {
    console.warn('TMDB logo fetch failed:', err);
  }
  logoCache[cacheKey] = null;
  return null;
}

export async function searchMulti(query: string, page: number = 1): Promise<MediaItem[]> {
  if (!query.trim()) return [];
  const data = await fetchFromTMDB<{ results: MediaItem[] }>('/search/multi', { query, page });
  const mapped = data.results
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map((item) => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv'),
    }));
  return filterUnwantedGenres(mapped);
}

export interface DiscoverOptions {
  genreId?: number | null;
  providerId?: number | null;
  networkId?: number | null;
  country?: string;
  status?: string;
  year?: string;
  sortBy?: string;
  page?: number;
}

export async function discoverMedia(
  mediaType: 'movie' | 'tv',
  options: DiscoverOptions = {}
): Promise<MediaItem[]> {
  const params: Record<string, string | number> = {
    page: options.page || 1,
    sort_by: options.sortBy || 'popularity.desc',
  };

  // Exclude unwanted genres via API parameter
  if (mediaType === 'movie') {
    params.without_genres = '10770'; // Exclude TV Movie
  } else {
    params.without_genres = '10763,10767'; // Exclude News & Talk
  }

  if (options.genreId) {
    params.with_genres = options.genreId;
  }

  if (options.providerId) {
    params.with_watch_providers = options.providerId;
    params.watch_region = 'US';
    params.with_watch_monetization_types = 'flatrate|free|ads';
  }

  if (options.networkId) {
    params.with_networks = options.networkId;
  }

  if (options.country) {
    params.with_origin_country = options.country;
  }

  if (options.year) {
    if (mediaType === 'movie') {
      params.primary_release_year = options.year;
    } else {
      params.first_air_date_year = options.year;
    }
  }

  if (options.status) {
    const today = new Date().toISOString().split('T')[0];
    if (mediaType === 'movie') {
      if (options.status === 'upcoming') {
        params['primary_release_date.gte'] = today;
      } else if (options.status === 'released') {
        params['primary_release_date.lte'] = today;
      }
    } else {
      params.with_status = options.status;
    }
  }

  const data = await fetchFromTMDB<{ results: MediaItem[] }>(`/discover/${mediaType}`, params);
  const mapped = data.results.map((item) => ({ ...item, media_type: mediaType }));
  return filterUnwantedGenres(mapped);
}

export async function getGenres(mediaType: 'movie' | 'tv'): Promise<Genre[]> {
  const data = await fetchFromTMDB<{ genres: Genre[] }>(`/genre/${mediaType}/list`);
  return data.genres.filter((g) => {
    if (mediaType === 'movie') return g.id !== 10770;
    return g.id !== 10763 && g.id !== 10767;
  });
}

export const COUNTRIES = [
  { code: '', name: 'All Countries' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'FR', name: 'France' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'IN', name: 'India' },
  { code: 'ES', name: 'Spain' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
  { code: 'RU', name: 'Russia' },
];

export const MOVIE_GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

export const MOVIE_STATUS = [
  { value: '', name: 'All Status' },
  { value: 'released', name: 'Released' },
  { value: 'upcoming', name: 'Upcoming' },
];

export const TV_STATUS = [
  { value: '', name: 'All Status' },
  { value: '0', name: 'Returning Series' },
  { value: '3', name: 'Ended' },
  { value: '4', name: 'Canceled' },
  { value: '2', name: 'In Production' },
  { value: '5', name: 'Pilot' },
];
