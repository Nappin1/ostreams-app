import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getEmbedUrl, PLAYER_SOURCES } from '../services/player';
import { getTVDetails, getTVSeasonDetails } from '../services/tmdb';
import type { TVSeasonDetails } from '../types/tmdb';

export const VideoPlayerModal: React.FC = () => {
  const { playerState, closePlayer, activeServerId, setActiveServerId, playMedia } = useApp();
  const [iframeKey, setIframeKey] = useState(0);
  const [seasonData, setSeasonData] = useState<TVSeasonDetails | null>(null);
  const [totalSeasons, setTotalSeasons] = useState<number>(1);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    // Escape key listener to close player
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePlayer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closePlayer]);

  const media = playerState?.media;
  const season = playerState?.season || 1;
  const episode = playerState?.episode || 1;
  const isTv = !!media && (media.media_type === 'tv' || (!media.title && !!media.name));

  // Fetch season and total seasons data when player is active for TV shows
  useEffect(() => {
    if (!playerState?.isOpen || !media || !isTv) return;

    let isMounted = true;
    const fetchEpisodeData = async () => {
      setLoadingEpisodes(true);
      try {
        const sData = await getTVSeasonDetails(media.id, season);
        if (isMounted) setSeasonData(sData);

        if (!media.number_of_seasons) {
          const tvDet = await getTVDetails(media.id);
          if (isMounted && tvDet.number_of_seasons) {
            setTotalSeasons(tvDet.number_of_seasons);
          }
        } else {
          if (isMounted) setTotalSeasons(media.number_of_seasons);
        }
      } catch (err) {
        console.error('Error fetching season data for player:', err);
      } finally {
        if (isMounted) setLoadingEpisodes(false);
      }
    };

    fetchEpisodeData();
    return () => {
      isMounted = false;
    };
  }, [playerState?.isOpen, media?.id, season, isTv]);

  if (!playerState || !playerState.isOpen || !media) return null;

  const title = media.title || media.name || 'Untitled';
  const embedUrl = getEmbedUrl(
    activeServerId,
    isTv ? 'tv' : 'movie',
    media.id,
    season,
    episode
  );

  const maxEpisodesInSeason = seasonData?.episodes?.length || 0;
  const hasNextInSeason = maxEpisodesInSeason > 0 ? episode < maxEpisodesInSeason : true;
  const hasNextSeason = totalSeasons > 0 && season < totalSeasons;
  const hasNextEpisode = isTv ? hasNextInSeason || hasNextSeason : false;
  const hasPrevEpisode = isTv ? episode > 1 || season > 1 : false;

  const handlePrevEpisode = () => {
    if (!hasPrevEpisode) return;

    if (episode > 1) {
      const prevEp = seasonData?.episodes?.find((e) => e.episode_number === episode - 1);
      playMedia(media, season, episode - 1, prevEp?.name);
    } else if (season > 1) {
      playMedia(media, season - 1, 1);
    }
  };

  const handleNextEpisode = () => {
    if (!hasNextEpisode) return;

    if (hasNextInSeason) {
      const nextEp = seasonData?.episodes?.find((e) => e.episode_number === episode + 1);
      playMedia(media, season, episode + 1, nextEp?.name);
    } else if (hasNextSeason) {
      playMedia(media, season + 1, 1);
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between animate-in fade-in duration-200 overflow-hidden">
      {/* 1. Mobile-Friendly Header Control Bar */}
      <header className="h-14 sm:h-16 px-3 sm:px-6 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-2 z-20 backdrop-blur-xl shrink-0">
        {/* Left: Back Button & Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <button
            onClick={closePlayer}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Close Player"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-white truncate flex items-center gap-1.5">
              <span className="truncate">{title}</span>
              {isTv && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[11px] font-bold shrink-0">
                  S{season}:E{episode}
                </span>
              )}
            </h2>
            {playerState.episodeTitle && (
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">{playerState.episodeTitle}</p>
            )}
          </div>
        </div>

        {/* Right: Server Provider Selector & Close */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <select
            value={activeServerId}
            onChange={(e) => {
              setActiveServerId(e.target.value);
              handleReload();
            }}
            className="bg-slate-800 text-amber-400 font-bold px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs sm:text-sm cursor-pointer outline-none max-w-[125px] sm:max-w-none truncate"
          >
            {PLAYER_SOURCES.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleReload}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Reload Video Player"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={closePlayer}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Main Video Frame Container */}
      <div className="relative flex-1 bg-black w-full h-full flex items-center justify-center overflow-hidden">
        <iframe
          key={`${embedUrl}-${iframeKey}`}
          src={embedUrl}
          title={title}
          allowFullScreen
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full border-0"
        />
      </div>

      {/* 3. Dedicated Bottom Binging Bar (TV Shows) for Mobile & Desktop */}
      {isTv && (
        <footer className="bg-slate-900/95 border-t border-slate-800 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shrink-0 z-20 backdrop-blur-xl">
          {/* Prev Episode */}
          <button
            onClick={handlePrevEpisode}
            disabled={!hasPrevEpisode || loadingEpisodes}
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-1.5 transition-all cursor-pointer"
            title={hasPrevEpisode ? 'Previous Episode' : 'No previous episodes'}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Prev</span>
          </button>

          {/* Center: Season & Episode Quick Selectors */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {totalSeasons > 1 && (
              <select
                value={season}
                onChange={(e) => playMedia(media, Number(e.target.value), 1)}
                className="bg-slate-800 text-slate-200 font-semibold px-2 py-1.5 rounded-xl border border-slate-700 text-xs cursor-pointer outline-none"
              >
                {Array.from({ length: totalSeasons }, (_, i) => i + 1).map((s) => (
                  <option key={s} value={s}>
                    S{s}
                  </option>
                ))}
              </select>
            )}

            {seasonData?.episodes && seasonData.episodes.length > 0 && (
              <select
                value={episode}
                onChange={(e) => {
                  const epNum = Number(e.target.value);
                  const epObj = seasonData.episodes.find((item) => item.episode_number === epNum);
                  playMedia(media, season, epNum, epObj?.name);
                }}
                className="bg-slate-800 text-amber-400 font-bold px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs cursor-pointer outline-none max-w-[130px] sm:max-w-[220px] truncate"
              >
                {seasonData.episodes.map((ep) => (
                  <option key={ep.id} value={ep.episode_number}>
                    E{ep.episode_number}: {ep.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Next Episode */}
          <button
            onClick={handleNextEpisode}
            disabled={!hasNextEpisode || loadingEpisodes}
            className="px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            title={hasNextEpisode ? 'Next Episode' : 'No more episodes available'}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      )}
    </div>
  );
};
