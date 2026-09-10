export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count?: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  networks?: Network[];
  production_companies?: Company[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface Company {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TVEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date: string;
  episode_number: number;
  season_number: number;
  vote_average: number;
  runtime?: number;
}

export interface TVSeasonDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episodes: TVEpisode[];
}

export interface MediaDetails extends MediaItem {
  credits?: {
    cast: CastMember[];
  };
  videos?: {
    results: VideoResult[];
  };
  recommendations?: {
    results: MediaItem[];
  };
  similar?: {
    results: MediaItem[];
  };
  seasons?: TVSeasonDetails[];
}

export interface PlayerSource {
  id: string;
  name: string;
  baseUrl: string;
  badge?: string;
}

export interface WatchProgress {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  season?: number;
  episode?: number;
  episodeTitle?: string;
  updatedAt: number;
}

export interface FilterState {
  genreId: number | null;
  mediaType: 'all' | 'movie' | 'tv';
  sortBy: string;
  year: string;
  searchQuery: string;
}
