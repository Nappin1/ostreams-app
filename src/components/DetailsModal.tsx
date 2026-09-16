import React, { useEffect, useState } from 'react';
import { Bookmark, Check, Layers, Play, Star, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  fetchTMDBLogo,
  getBackdropUrl,
  getCollectionDetails,
  getMovieDetails,
  getPosterUrl,
  getTVDetails,
  getTVSeasonDetails,
} from '../services/tmdb';
import type { CollectionDetails, MediaDetails, TVSeasonDetails } from '../types/tmdb';
import { MediaCard } from './MediaCard';

export const DetailsModal: React.FC = () => {
  const { selectedMedia, closeDetails, playMedia, isInWatchlist, toggleWatchlist } = useApp();
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'collection' | 'recommendations'>('overview');
  const [logoPath, setLogoPath] = useState<string | null>(null);

  // TV Season state
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState<TVSeasonDetails | null>(null);
  const [seasonLoading, setSeasonLoading] = useState(false);

  // Collection state
  const [collectionData, setCollectionData] = useState<CollectionDetails | null>(null);
  const [collectionLoading, setCollectionLoading] = useState(false);

  useEffect(() => {
    if (!selectedMedia) return;

    let isMounted = true;
    setLogoPath(null);
    setCollectionData(null);

    const isTv = selectedMedia.media_type === 'tv' || (!selectedMedia.title && !!selectedMedia.name);
    fetchTMDBLogo(selectedMedia.id, isTv ? 'tv' : 'movie').then((path) => {
      if (isMounted) setLogoPath(path);
    });

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = isTv
          ? await getTVDetails(selectedMedia.id)
          : await getMovieDetails(selectedMedia.id);

        if (isMounted) {
          setDetails(data);
          if (isTv && data.number_of_seasons && data.number_of_seasons > 0) {
            setSelectedSeason(1);
          }
        }
      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();
    setActiveTab('overview');

    return () => {
      isMounted = false;
    };
  }, [selectedMedia]);

  // Fetch Season Details when season selection changes for TV shows
  useEffect(() => {
    if (!details || details.media_type !== 'tv') return;

    let isMounted = true;
    const fetchSeason = async () => {
      setSeasonLoading(true);
      try {
        const data = await getTVSeasonDetails(details.id, selectedSeason);
        if (isMounted) setSeasonData(data);
      } catch (err) {
        console.error('Error fetching season details:', err);
        if (isMounted) setSeasonData(null);
      } finally {
        if (isMounted) setSeasonLoading(false);
      }
    };

    fetchSeason();
    return () => {
      isMounted = false;
    };
  }, [details, selectedSeason]);

  // Fetch Collection Details when Collection tab is selected
  useEffect(() => {
    if (activeTab !== 'collection' || !details?.belongs_to_collection?.id) return;
    if (collectionData && collectionData.id === details.belongs_to_collection.id) return;

    let isMounted = true;
    const fetchCollection = async () => {
      setCollectionLoading(true);
      try {
        const data = await getCollectionDetails(details.belongs_to_collection!.id);
        if (isMounted) setCollectionData(data);
      } catch (err) {
        console.error('Error fetching collection details:', err);
        if (isMounted) setCollectionData(null);
      } finally {
        if (isMounted) setCollectionLoading(false);
      }
    };

    fetchCollection();
    return () => {
      isMounted = false;
    };
  }, [activeTab, details, collectionData]);

  // Key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetails();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeDetails]);

  if (!selectedMedia) return null;

  const isTv = details?.media_type === 'tv' || selectedMedia.media_type === 'tv';
  const title = details?.title || details?.name || selectedMedia.title || selectedMedia.name || 'Untitled';
  const isSaved = isInWatchlist(selectedMedia.id);
  const date = details?.release_date || details?.first_air_date || selectedMedia.release_date || selectedMedia.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeDetails}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md hover:bg-slate-800 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Hero Backdrop */}
        <div className="relative h-64 sm:h-80 flex-shrink-0">
          <img
            src={getBackdropUrl(selectedMedia.backdrop_path || selectedMedia.poster_path, 'w1280')}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div className="flex items-end space-x-4">
              <img
                src={getPosterUrl(selectedMedia.poster_path, 'w185')}
                alt={title}
                className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-xl border-2 border-slate-700 shadow-xl hidden sm:block bg-slate-800"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold uppercase text-[10px]">
                    {isTv ? 'TV Series' : 'Movie'}
                  </span>
                  {year && <span>{year}</span>}
                  {selectedMedia.vote_average > 0 && (
                    <span className="flex items-center text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {selectedMedia.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Title or Logo */}
                {logoPath ? (
                  <div className="py-1">
                    <img
                      src={getPosterUrl(logoPath, 'w500')}
                      alt={title}
                      className="max-h-16 sm:max-h-24 max-w-[85%] sm:max-w-[70%] object-contain drop-shadow-2xl origin-left"
                    />
                  </div>
                ) : (
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {title}
                  </h2>
                )}

                {details?.tagline && (
                  <p className="text-xs sm:text-sm text-amber-400/90 italic font-normal">
                    "{details.tagline}"
                  </p>
                )}
              </div>
            </div>

            {/* Play Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => playMedia(selectedMedia, 1, 1)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Play Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(selectedMedia)}
                className={`p-3 rounded-2xl border backdrop-blur-md transition-colors ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-slate-950/80 border-slate-700/80 text-white hover:bg-slate-800'
                }`}
                title={isSaved ? 'Remove from Library' : 'Add to Library'}
              >
                {isSaved ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-800 bg-slate-900/90 flex items-center space-x-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>

          {isTv && (
            <button
              onClick={() => setActiveTab('episodes')}
              className={`py-3.5 border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === 'episodes'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Seasons & Episodes</span>
              {details?.number_of_seasons && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300">
                  {details.number_of_seasons}
                </span>
              )}
            </button>
          )}

          {details?.belongs_to_collection && (
            <button
              onClick={() => setActiveTab('collection')}
              className={`py-3.5 border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === 'collection'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Collection</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'recommendations'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Similar Titles
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-400 flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading details from TMDB...</span>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Genres Pills */}
                  {details?.genres && details.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {details.genres.map((g) => (
                        <span
                          key={g.id}
                          className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Synopsis
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                      {details?.overview || selectedMedia.overview || 'No synopsis available.'}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-1">Status</span>
                      <span className="text-slate-200 font-medium">{details?.status || 'Released'}</span>
                    </div>
                    {details?.runtime && (
                      <div>
                        <span className="text-slate-500 block mb-1">Runtime</span>
                        <span className="text-slate-200 font-medium">{details.runtime} mins</span>
                      </div>
                    )}
                    {details?.number_of_episodes && (
                      <div>
                        <span className="text-slate-500 block mb-1">Total Episodes</span>
                        <span className="text-slate-200 font-medium">{details.number_of_episodes}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-500 block mb-1">Rating</span>
                      <span className="text-amber-400 font-bold">
                        ⭐ {selectedMedia.vote_average.toFixed(1)} / 10
                      </span>
                    </div>
                  </div>

                  {/* Cast Section */}
                  {details?.credits?.cast && details.credits.cast.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Top Cast
                      </h3>
                      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none">
                        {details.credits.cast.slice(0, 10).map((actor) => (
                          <div key={actor.id} className="w-24 flex-none text-center">
                            <img
                              src={
                                actor.profile_path
                                  ? getPosterUrl(actor.profile_path, 'w185')
                                  : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                              }
                              alt={actor.name}
                              className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border border-slate-700/80 shadow"
                            />
                            <p className="text-xs font-medium text-slate-200 truncate">{actor.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{actor.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EPISODES (FOR TV SHOWS) */}
              {activeTab === 'episodes' && isTv && (
                <div className="space-y-6">
                  {/* Season Dropdown Selector */}
                  <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <label className="text-sm font-semibold text-slate-300">Select Season:</label>
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(Number(e.target.value))}
                      className="bg-slate-800 text-amber-400 font-semibold px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 text-sm cursor-pointer"
                    >
                      {Array.from({ length: details?.number_of_seasons || 1 }, (_, i) => i + 1).map((s) => (
                        <option key={s} value={s}>
                          Season {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Episodes List */}
                  {seasonLoading ? (
                    <div className="py-8 text-center text-slate-400 flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading Season {selectedSeason} episodes...</span>
                    </div>
                  ) : seasonData && seasonData.episodes ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {seasonData.episodes.map((ep) => (
                        <div
                          key={ep.id}
                          onClick={() => playMedia(selectedMedia, selectedSeason, ep.episode_number, ep.name)}
                          className="group bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3 flex space-x-3 cursor-pointer transition-all duration-200"
                        >
                          <div className="relative w-28 h-18 flex-shrink-0 rounded-xl overflow-hidden bg-slate-900">
                            <img
                              src={getBackdropUrl(ep.still_path || selectedMedia.backdrop_path, 'w780')}
                              alt={ep.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-8 h-8 text-amber-400 fill-amber-400" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                              Episode {ep.episode_number}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-100 truncate group-hover:text-amber-400 transition-colors">
                              {ep.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                              {ep.overview || 'No description for this episode.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-400">
                      No episode data available for Season {selectedSeason}.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: COLLECTION (FOR MOVIE FRANCHISES) */}
              {activeTab === 'collection' && details?.belongs_to_collection && (
                <div className="space-y-6">
                  {collectionLoading ? (
                    <div className="py-12 text-center text-slate-400 flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading movie collection...</span>
                    </div>
                  ) : collectionData ? (
                    <div className="space-y-6">
                      {/* Collection Header Banner */}
                      <div className="relative rounded-2xl overflow-hidden border border-slate-800 p-6 bg-slate-950/80 flex flex-col sm:flex-row items-center gap-6">
                        {collectionData.backdrop_path && (
                          <div
                            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                            style={{ backgroundImage: `url(${getBackdropUrl(collectionData.backdrop_path, 'w1280')})` }}
                          />
                        )}
                        <img
                          src={getPosterUrl(collectionData.poster_path || details.poster_path, 'w185')}
                          alt={collectionData.name}
                          className="relative z-10 w-28 h-40 object-cover rounded-xl border border-slate-700 shadow-xl flex-shrink-0"
                        />
                        <div className="relative z-10 space-y-2 text-center sm:text-left flex-1">
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                            Movie Franchise
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{collectionData.name}</h3>
                          {collectionData.overview && (
                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                              {collectionData.overview}
                            </p>
                          )}
                          <p className="text-xs font-semibold text-slate-400 pt-1">
                            {collectionData.parts.length} {collectionData.parts.length === 1 ? 'film' : 'films'} in this collection
                          </p>
                        </div>
                      </div>

                      {/* Collection Parts Grid */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                          Films in chronological order
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {collectionData.parts.map((item) => (
                            <MediaCard key={item.id} item={item} isGrid />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      Collection details unavailable.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: RECOMMENDATIONS */}
              {activeTab === 'recommendations' && (
                <div>
                  {details?.recommendations?.results && details.recommendations.results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {details.recommendations.results.slice(0, 8).map((item) => (
                        <MediaCard key={item.id} item={item} isGrid />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      No similar titles found.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
