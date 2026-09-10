import type { PlayerSource } from '../types/tmdb';

export const PLAYER_SOURCES: PlayerSource[] = [
  { id: 'vaplayer', name: 'VaPlayer', baseUrl: 'https://vaplayer.ru', badge: 'Server 1 (Fast)' },
  { id: 'vidsrc-embed', name: 'VidSrc Embed', baseUrl: 'https://vidsrc-embed.ru', badge: 'Server 2 (HD)' },
  { id: 'vidsrc-icu', name: 'VidSrc ICU', baseUrl: 'https://vidsrc.icu', badge: 'Server 3 (Multi-Sub)' },
  { id: 'vidlink', name: 'VidLink', baseUrl: 'https://vidlink.pro', badge: 'Server 4 (Pro)' },
  { id: '111movies', name: '111Movies', baseUrl: 'https://111movies.com', badge: 'Server 5 (Ultra)' },
  { id: 'videasy', name: 'Videasy', baseUrl: 'https://player.videasy.net', badge: 'Server 6 (Backup)' },
];

export function getEmbedUrl(
  sourceId: string,
  mediaType: 'movie' | 'tv',
  tmdbId: number,
  season: number = 1,
  episode: number = 1
): string {
  const source = PLAYER_SOURCES.find((s) => s.id === sourceId) || PLAYER_SOURCES[0];
  const base = source.baseUrl;

  switch (source.id) {
    case 'vaplayer':
    case 'vidsrc-embed':
    case 'vidsrc-icu':
      return mediaType === 'movie'
        ? `${base}/embed/movie/${tmdbId}`
        : `${base}/embed/tv/${tmdbId}/${season}/${episode}`;

    case 'vidlink':
    case '111movies':
    case 'videasy':
    default:
      return mediaType === 'movie'
        ? `${base}/movie/${tmdbId}`
        : `${base}/tv/${tmdbId}/${season}/${episode}`;
  }
}
