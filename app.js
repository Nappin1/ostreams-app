/**
 * GLOBAL CONFIGURATION & DATA
 */

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const NETWORK_LOGO_URL = 'https://image.tmdb.org/t/p/w185';
const PROVIDER_LOGO_URL = 'https://image.tmdb.org/t/p/original';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
const WATCH_REGION = 'US';

/** Popular TMDB network IDs for the Discover TV grid */
const POPULAR_TV_NETWORK_IDS = [
    213, 49, 1024, 2739, 2552, 453, 67, 174, 2, 6, 16, 19, 54, 318, 64, 43, 13, 14, 47, 34, 33, 156, 435, 332, 41, 71, 126, 4
];
const ANILIST_API_URL = 'https://graphql.anilist.co';

const MOVIE_SOURCES = [
    // { name: '1', url: (id) => `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true` },
    { name: '0', url: (id) => `https://vaplayer.ru/embed/movie/${id}?skin=netflix&color=cae962&secondaryColor=cae962&iconColor=cae962` },
    { name: '1', url: (id) => `https://vidsrc-embed.ru/embed/movie/${id}?ds_lang=en` },
    { name: '2', url: (id) => `https://vidrock.net/movie/${id}?autoplay=true&download=false&lang=en` },
    { name: '3', url: (id) => `https://vidsrc.fyi/embed/movie/${id}` },
    { name: '4', url: (id) => `https://vidlink.pro/movie/${id}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=vid&title=true&poster=true&autoplay=true` },
    { name: '5', url: (id) => `https://111movies.com/movie/${id}` },
    { name: '6', url: (id) => `https://player.videasy.net/movie/${id}?poster=true&adFree=true&overlay=true` }
];

const TV_SOURCES = [
    { name: '0', url: (id, s, e) => `https://vaplayer.ru/embed/tv/${id}/${s}/${e}?skin=netflix&color=cae962&secondaryColor=cae962&iconColor=cae962` },
    { name: '1', url: (id, s, e) => `https://vidsrc-embed.ru/embed/tv/${id}/${s}/${e}?autoplay=1&ds_lang=en` },
    { name: '2', url: (id, s, e) => `https://vidrock.net/tv/${id}/${s}/${e}?autoplay=true&download=false&episodeselector=false&lang=en` },
    { name: '3', url: (id, s, e) => `https://vidsrc.fyi/embed/tv/${id}/${s}/${e}` },
    { name: '4', url: (id, s, e) => `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=vid&player=jw&title=true&poster=true&autoplay=true&nextbutton=false` },
    { name: '5', url: (id, s, e) => `https://111movies.com/tv/${id}/${s}/${e}` },
    { name: '6', url: (id, s, e) => `https://player.videasy.net/tv/${id}/${s}/${e}?poster=true&adFree=true&overlay=true` }
];

const ANIME_SOURCES = [
    { name: '1', url: (id, ep) => `https://vidnest.fun/animepahe/${id}/${ep}/sub?servericon=hide` },
    { name: '2', url: (id, ep) => `https://vidsrc.icu/embed/anime/${id}/${ep}/0` },
    { name: '3', url: (id, ep) => `https://vidsrc.cc/v2/embed/anime/ani${id}/${ep}/sub` },
    { name: '4', url: (id, ep) => `https://vidnest.fun/anime/${id}/${ep}/sub?servericon=hide` }
];

// Constants for Filters
const COUNTRIES = [
    { code: '', name: 'All Countries' }, { code: 'CN', name: 'China' }, { code: 'FR', name: 'France' },
    { code: 'HK', name: 'Hongkong' }, { code: 'IN', name: 'India' }, { code: 'JP', name: 'Japan' },
    { code: 'RU', name: 'Russia' }, { code: 'KR', name: 'South Korea' }, { code: 'ES', name: 'Spain' },
    { code: 'TH', name: 'Thailand' }, { code: 'TR', name: 'Turkey' }, { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' }
];

const TMDB_GENRES = [
    { id: '', name: 'All Genres' }, { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, { id: 36, name: 'History' }, { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' }
];

const MOVIE_GENRES = TMDB_GENRES;
const TV_GENRES = [
    { id: '', name: 'All Genres' }, { id: 10759, name: 'Action & Adventure' }, { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' }, { id: 10762, name: 'Kids' }, { id: 9648, name: 'Mystery' }, { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' }, { id: 10765, name: 'Sci-Fi & Fantasy' }, { id: 10766, name: 'Soap' }, { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' }, { id: 37, name: 'Western' }
];

const TV_STATUS = [
    { value: '0', name: 'Returning Series' }, { value: '3', name: 'Ended' },
    { value: '4', name: 'Canceled' }, { value: '2', name: 'In Production' }, { value: '5', name: 'Pilot' }
];

const MOVIE_STATUS = [
    { value: 'released', name: 'Released' }, { value: 'upcoming', name: 'Upcoming' }
];

const ANILIST_GENRES = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mecha', 'Music', 'Mystery',
    'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
];

// Names must match AniList MediaTagCollection exactly (genres belong in ANILIST_GENRES).
const ANILIST_TAGS = [
    'Isekai', 'Female Harem', 'Male Harem', 'Mixed Gender Harem',
    'School', 'Magic', 'Demons', 'Samurai', 'Ninja', 'Vampire', 'Zombie',
    'Post-Apocalyptic', 'Military', 'Super Power', 'Martial Arts', 'Gods', 'Mythology',
    'Time Manipulation', 'Time Loop', 'Time Skip', 'Reincarnation', 'Anti-Hero',
    'Female Protagonist', 'Male Protagonist', 'Ensemble Cast',
    'Shounen', 'Shoujo', 'Seinen', 'Josei',
    'Love Triangle', 'Tsundere', 'Kuudere',
    'Slapstick', 'Parody', 'Satire', 'Gore',
    'Dystopian', 'Space', 'Cyberpunk', 'Steampunk',
    'Cute Girls Doing Cute Things', 'Food', 'Video Games',
    'Chibi', 'Anthology', 'Episodic'
];



// Global State
const appState = {
    currentView: 'home',
    lastView: 'home',
    lastContentSection: null,
    historyTab: 'all',
    watchlist: (function () { try { return JSON.parse(localStorage.getItem('goStreamWatchlist')) || []; } catch (e) { return []; } })(),
    continueWatching: (function () { try { return JSON.parse(localStorage.getItem('goStreamContinueWatching')) || []; } catch (e) { return []; } })(),
    episodeViewMode: 'numbers', // 'numbers' or 'thumbnails'
    bannerInterval: null,
    bannerItems: [],
    bannerIndex: 0,
    tmdb: {
        movies: { page: 1, filters: { sort: 'trending', genre: '', country: '', status: '', year: '' }, data: [] },
        tv: { page: 1, filters: { sort: 'trending', genre: '', country: '', status: '', year: '' }, data: [] }
    },
    anilist: {
        currentTab: 'anime', // anime or va
        page: 1,
        filters: { sort: 'TRENDING_DESC', genre: '', country: '', upcoming: '', year: '', tag: '' },
        data: [],
        hero: [],
        currentAnime: null,
        currentEp: 1,
        currentServerIdx: 0,
        // Voice Actor State
        vaPage: 1,
        vaSearch: '',
        vaData: []
    },
    search: {
        query: '',
        page: 1,
        totalPages: 1
    },
    scrollPositions: {},
    episodeSort: 'asc',
    details: {
        id: null,
        type: null,
        activeTab: 'information',
        tvSeason: 1
    },
    playerReturnView: null,
    discover: {
        kind: null,
        id: null,
        name: '',
        page: 1,
        restoreResultsOnPlayerReturn: false
    }
};

function isDiscoverResultsModalOpen() {
    const modal = document.getElementById('discover-results-modal');
    return modal?.classList.contains('open');
}

let activeCardElement = null;

let scrollLockCount = 0;
let scrollLockPosition = 0;

function lockBodyScroll() {
    scrollLockCount++;
    if (scrollLockCount === 1) {
        scrollLockPosition = window.scrollY;
        document.body.classList.add('scroll-locked');
        document.body.style.top = `-${scrollLockPosition}px`;
    }
}

function unlockBodyScroll() {
    if (scrollLockCount <= 0) return;
    scrollLockCount--;
    if (scrollLockCount === 0) {
        document.body.classList.remove('scroll-locked');
        document.body.style.top = '';
        // Use requestAnimationFrame so the browser reflows the unfixed body
        // before restoring scroll position (important on iOS where scrollTo
        // can be silently ignored if called synchronously after unfixing).
        const pos = scrollLockPosition;
        requestAnimationFrame(() => {
            window.scrollTo(0, pos);
        });
    }
}

function clearBodyScrollLock() {
    scrollLockCount = 0;
    document.body.classList.remove('scroll-locked');
    document.body.style.top = '';
}

function setPlayerViewActive(active) {
    const tmdbView = document.getElementById('view-tmdb-player');
    const aniView = document.getElementById('view-anilist-player');
    if (tmdbView) tmdbView.classList.toggle('player-active', active);
    if (aniView) aniView.classList.toggle('player-active', active);
}

function transitionToDetails(cardEl, callback) {
    activeCardElement = cardEl;
    // Simple fade — no image morphing
    if (!document.startViewTransition) {
        callback();
        return;
    }
    document.startViewTransition(() => {
        callback();
    });
}

function clearDetailsTransitionName() {
    // No-op — no view-transition names used
}

function formatTmdbTvEpisodeLabel(seasonNum, episodeNum, episodeTitle) {
    const s = Number(seasonNum) || 1;
    const e = Number(episodeNum) || 1;
    const safeTitle = (episodeTitle || '').replace(/"/g, '\\"').trim();
    return safeTitle ? `S${s}:E${e} "${safeTitle}"` : `S${s}:E${e}`;
}

/** Restore the page that was visible before player/details — no router reload. */
function showUnderlyingView() {
    setPlayerViewActive(false);

    const tmdbFrame = document.getElementById('tmdb-player');
    const aniFrame = document.getElementById('anilist-iframe');
    if (tmdbFrame) tmdbFrame.src = '';
    if (aniFrame) aniFrame.src = '';

    const view = appState.lastView || 'home';
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    const viewEl = document.getElementById('view-' + view);
    if (viewEl) viewEl.classList.remove('hidden');

    const banner = document.getElementById('shared-banner');
    if (banner) {
        if (view === 'home') banner.classList.remove('hidden');
        else banner.classList.add('hidden');
    }

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.target === view);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(l => {
        l.classList.toggle('active', l.dataset.target === view);
    });

    appState.currentView = view;
    window.scrollTo(0, appState.scrollPositions[view] || 0);
}

function reopenDetailsModal() {
    const { id, type } = appState.details;
    if (!id || !type) return;
    if (type === 'anime') openAnilistDetails(id);
    else openTMDBDetails(id, type);
}

function openPlayerWithReturn(playFn) {
    appState.playerReturnView = 'details';
    if (isDiscoverResultsModalOpen() || appState.discover.restoreResultsOnPlayerReturn) {
        appState.discover.restoreResultsOnPlayerReturn = true;
        document.getElementById('discover-results-modal')?.classList.remove('open');
    }
    closeDetailsModal({ preserveDetails: true });
    clearBodyScrollLock();
    window.scrollTo(0, 0);
    playFn();
}

function closePlayerAndReturn() {
    const returnTo = appState.playerReturnView;
    const restoreDiscover = appState.discover.restoreResultsOnPlayerReturn;
    appState.playerReturnView = null;
    appState.discover.restoreResultsOnPlayerReturn = false;

    showUnderlyingView();

    if (returnTo === 'details' && appState.details.id) {
        reopenDetailsModal();
    }
    if (restoreDiscover && appState.discover.kind) {
        document.getElementById('discover-results-modal')?.classList.add('open');
        lockBodyScroll();
    }
}

function switchDetailsTab(tabId) {
    appState.details.activeTab = tabId;
    const modal = document.getElementById('details-modal');
    if (!modal) return;
    modal.querySelectorAll('.details-tab-btn[data-tab]').forEach(btn => {
        const isActive = btn.dataset.tab === tabId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    modal.querySelectorAll('.details-tab-panel').forEach(panel => {
        panel.classList.toggle('hidden', panel.dataset.tab !== tabId);
    });
}

function buildDetailsTabsHtml(visibleTabs) {
    const labels = {
        information: 'Information',
        episodes: 'Episodes',
        collection: 'Collection',
        relations: 'Relations',
        recommendations: 'More like this'
    };
    const active = appState.details.activeTab;
    if (!visibleTabs.includes(active)) appState.details.activeTab = visibleTabs[0] || 'information';

    const tabsHtml = visibleTabs.map(tab => {
        const isActive = tab === appState.details.activeTab;
        return `<button type="button" class="details-tab-btn${isActive ? ' active' : ''}" data-tab="${tab}" aria-selected="${isActive}" onclick="switchDetailsTab('${tab}')">${labels[tab] || tab}</button>`;
    }).join('');

    const panelsHtml = visibleTabs.map(tab => {
        const isActive = tab === appState.details.activeTab;
        return `<div class="details-tab-panel${isActive ? '' : ' hidden'}" data-tab="${tab}" id="details-panel-${tab}"></div>`;
    }).join('');

    return `<div class="details-tabs-bar" role="tablist">${tabsHtml}</div><div class="details-tab-panels">${panelsHtml}</div>`;
}

window.toggleVolume = function (iframeId, btnId) {
    const iframe = document.getElementById(iframeId);
    const btn = document.getElementById(btnId);
    const icon = btn.querySelector('i');

    if (iframe.dataset.muted === 'false') {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":[]}', '*');
        iframe.dataset.muted = 'true';
        icon.innerText = 'volume_off';
    } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":[]}', '*');
        iframe.dataset.muted = 'false';
        icon.innerText = 'volume_up';
    }
};

/**
 * YouTube availability check — uses the oEmbed endpoint which is CORS-safe
 * and returns a non-OK status for geo-blocked or embedding-disabled videos.
 * Falls back to true (optimistic) on network failure so slow connections
 * don't always show the backdrop.
 * Result is cached per video ID for the session.
 */
const _ytAvailabilityCache = {};
async function checkYouTubeAvailable(videoId) {
    if (videoId in _ytAvailabilityCache) return _ytAvailabilityCache[videoId];
    try {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&format=json`;
        const res = await fetch(url, { method: 'GET', mode: 'cors' });
        // 200 = video is embeddable and available in this region
        // 401 = embedding disabled by owner
        // 404 = video not found / removed
        // Other non-200 = region-blocked or otherwise unavailable
        const available = res.ok; // true only for HTTP 200
        _ytAvailabilityCache[videoId] = available;
        return available;
    } catch (e) {
        // Network error — be optimistic so normal connections still get trailers
        _ytAvailabilityCache[videoId] = true;
        return true;
    }
}

/**
 * Post-load iframe fallback: listens for YouTube postMessage events.
 * If the player reports an error (codes 2, 5, 100, 101, 150 = unavailable/
 * blocked) after the iframe loads, the container is swapped to the backdrop.
 */
(function initYouTubeFallbackListener() {
    window.addEventListener('message', (event) => {
        if (!event.origin.includes('youtube.com')) return;
        let data;
        try { data = JSON.parse(event.data); } catch (e) { return; }

        // YouTube sends {event:"infoDelivery", info:{playerState, ...}}
        // Error event: {event:"onError", info: errorCode}
        if (data.event !== 'onError' && data.event !== 'infoDelivery') return;

        const errorCode = data.event === 'onError' ? data.info : null;
        // Error codes that mean unavailable/blocked: 2, 5, 100, 101, 150
        const isFatal = errorCode !== null && [2, 5, 100, 101, 150].includes(errorCode);
        if (!isFatal) return;

        // Find the iframe that sent this message by matching source
        document.querySelectorAll('iframe[id$="-bg-player"]').forEach(iframe => {
            try {
                // Can't directly match iframe to event.source cross-origin,
                // so fall back to swapping all bg-player iframes that have a
                // fallback-bg attribute if an error fires.
                const fallbackBg = iframe.dataset.fallbackBg;
                if (!fallbackBg) return;
                const container = iframe.closest('div');
                if (!container) return;

                // Swap: remove iframe + unmute btn, set backdrop image
                iframe.remove();
                const unmuteBtn = container.querySelector('button[id$="-unmute-btn"]');
                if (unmuteBtn) unmuteBtn.remove();
                container.style.backgroundImage = `url('${fallbackBg}')`;
                container.style.backgroundSize  = 'cover';
                container.style.backgroundPosition = 'center';
                container.style.backgroundColor = '';
            } catch (e) { /* ignore */ }
        });
    });
})();

/**
 * CORE UTILITIES
 */
const loader = {
    count: 0, isInitialBoot: true,
    show: () => {
        loader.count++;
        if (loader.isInitialBoot) document.getElementById('global-loader').classList.remove('hidden-loader');
    },
    hide: () => {
        loader.count--;
        if (loader.count <= 0) {
            loader.count = 0;
            if (loader.isInitialBoot) { document.getElementById('global-loader').classList.add('hidden-loader'); loader.isInitialBoot = false; }
        }
    }
};

const getPosterUrl = (path) => {
    if (!path) return 'https://placehold.co/500x750/333/FFF?text=No+Image';
    return path.startsWith('http') ? path : IMG_URL + path;
};

const getBackdropUrl = (path) => {
    if (!path) return 'https://placehold.co/1920x1080/202125/FFF?text=No+Banner+available';
    return path.startsWith('http') ? path : BACKDROP_URL + path;
};

function parseTMDBCertification(ratingData, mediaType) {
    if (!ratingData?.results?.length) return null;
    const country = ratingData.results.find(r => r.iso_3166_1 === 'US') || ratingData.results[0];
    let value = null;
    if (mediaType === 'movie') {
        const release = (country.release_dates || []).find(d => d.certification);
        value = release?.certification;
    } else {
        value = country.rating;
    }
    return value && String(value).trim() ? String(value).trim() : null;
}

function buildTMDBNetworksHtml(networks) {
    if (!networks?.length) return '';
    const items = networks.map(n => {
        const safeName = (n.name || '').replace(/"/g, '&quot;');
        if (n.logo_path) {
            return `<span class="details-network-logo-wrap" title="${safeName}"><img src="${NETWORK_LOGO_URL}${n.logo_path}" alt="${safeName}" class="details-network-logo" loading="lazy"></span>`;
        }
        return `<span class="text-text-main font-medium text-xs">${safeName}</span>`;
    }).join('');
    return `<div><span class="text-text-muted">Network</span><div class="details-network-logos mt-0.5">${items}</div></div>`;
}

function stopBannerRotation() {
    if (appState.bannerInterval) {
        clearInterval(appState.bannerInterval);
        appState.bannerInterval = null;
    }
}

function router(viewName) {
    const tmdbFrame = document.getElementById('tmdb-player');
    const aniFrame = document.getElementById('anilist-iframe');
    if (tmdbFrame) tmdbFrame.src = "";
    if (aniFrame) aniFrame.src = "";

    const tmdbBgPlayer = document.getElementById('tmdb-bg-player');
    if (tmdbBgPlayer) tmdbBgPlayer.src = "";
    const anilistBgPlayer = document.getElementById('anilist-bg-player');
    if (anilistBgPlayer) anilistBgPlayer.src = "";

    stopBannerRotation();

    // List of top-level navigation pages
    const mainViews = ['home', 'movies', 'tv', 'anime-anilist', 'watchlist', 'history', 'search', 'legal'];
    // Content sections that have grids — refresh when switching between them
    const contentSections = ['movies', 'tv', 'anime-anilist'];

    // 1. Update History Strategy
    if (mainViews.includes(appState.currentView)) {
        appState.lastView = appState.currentView;
        appState.scrollPositions[appState.currentView] = window.scrollY;
        if (contentSections.includes(appState.currentView)) {
            appState.lastContentSection = appState.currentView;
        }
    }

    let activeTarget = viewName;
    if (!mainViews.includes(viewName)) {
        activeTarget = appState.lastView || 'home';
    }

    const doRoute = () => {
        // Apply classes
        document.querySelectorAll('.nav-link').forEach(l => {
            if (l.dataset.target === activeTarget) l.classList.add('active');
            else l.classList.remove('active');
        });

        document.querySelectorAll('.bottom-nav-item').forEach(l => {
            if (l.dataset.target === activeTarget) l.classList.add('active');
            else l.classList.remove('active');
        });

        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('shared-banner').classList.add('hidden');

        appState.currentView = viewName;

        if (mainViews.includes(viewName)) {
            window.scrollTo(0, appState.scrollPositions[viewName] || 0);
        } else {
            window.scrollTo(0, 0);
        }

        switch (viewName) {
            case 'home':
                document.getElementById('view-home').classList.remove('hidden');
                document.getElementById('shared-banner').classList.remove('hidden');
                loadHomeData();
                break;
            case 'movies': {
                document.getElementById('view-movies').classList.remove('hidden');
                renderBrowseSortTabs('movies');
                const needsRefresh = document.getElementById('grid-movies').innerHTML === '' ||
                    (appState.lastContentSection && appState.lastContentSection !== 'movies');
                if (needsRefresh) {
                    document.getElementById('grid-movies').innerHTML = '';
                    appState.tmdb.movies.page = 1;
                    const _mf = document.getElementById('movies-filters'); if (_mf) { _mf.innerHTML = ''; delete _mf.dataset.rendered; }
                    renderFilters('movies');
                    loadTMDBSection('movies', '/discover/movie');
                }
                break;
            }
            case 'tv': {
                document.getElementById('view-tv').classList.remove('hidden');
                renderBrowseSortTabs('tv');
                const needsRefresh = document.getElementById('grid-tv').innerHTML === '' ||
                    (appState.lastContentSection && appState.lastContentSection !== 'tv');
                if (needsRefresh) {
                    document.getElementById('grid-tv').innerHTML = '';
                    appState.tmdb.tv.page = 1;
                    const _tf = document.getElementById('tv-filters'); if (_tf) { _tf.innerHTML = ''; delete _tf.dataset.rendered; }
                    renderFilters('tv');
                    loadTMDBSection('tv', '/discover/tv');
                }
                break;
            }
            case 'anime-anilist': {
                document.getElementById('view-anime-anilist').classList.remove('hidden');
                if (appState.anilist.currentTab === 'anime') renderBrowseSortTabs('anilist');
                const needsRefresh = document.getElementById('grid-anilist').innerHTML === '' ||
                    (appState.lastContentSection && appState.lastContentSection !== 'anime-anilist');
                if (needsRefresh) {
                    document.getElementById('grid-anilist').innerHTML = '';
                    const _af = document.getElementById('anilist-filters'); if (_af) { _af.innerHTML = ''; delete _af.dataset.rendered; }
                    renderFilters('anilist');
                    switchAnilistTab(appState.anilist.currentTab);
                }
                break;
            }
            case 'watchlist':
                document.getElementById('view-watchlist').classList.remove('hidden');
                renderWatchlist();
                break;
            case 'history':
                document.getElementById('view-history').classList.remove('hidden');
                renderHistory();
                break;
            case 'search':
                document.getElementById('view-search').classList.remove('hidden');
                break;
            case 'legal':
                document.getElementById('view-legal').classList.remove('hidden');
                break;
            case 'anilist-player':
                document.getElementById('view-anilist-player').classList.remove('hidden');
                break;
            case 'tmdb-player':
                document.getElementById('view-tmdb-player').classList.remove('hidden');
                break;
            case 'actor':
                document.getElementById('view-actor').classList.remove('hidden');
                break;
        }
    };

    doRoute();
}

/**
 * FEATURE: Continue Watching
 */
function addToHistory(id, type, title, poster, backdrop, season = null, episode = null, overview = '', vote = 0, year = '') {
    // Remove if exists
    appState.continueWatching = appState.continueWatching.filter(i => i.id !== id);
    // Add to top
    appState.continueWatching.unshift({
        id, type, title, poster, backdrop, season, episode, overview, vote, year, timestamp: new Date().getTime()
    });
    // Limit to 100
    if (appState.continueWatching.length > 100) appState.continueWatching.pop();

    localStorage.setItem('goStreamContinueWatching', JSON.stringify(appState.continueWatching));
}


function renderContinueWatching() {
    const container = document.getElementById('row-continue-watching');
    const wrapper = document.getElementById('continue-watching-container');

    container.innerHTML = '';

    if (appState.continueWatching.length === 0) {
        wrapper.classList.add('hidden');
        return;
    }

    wrapper.classList.remove('hidden');

    appState.continueWatching.slice(0, 20).forEach(item => {
        // Use backdrop if available, otherwise poster
        let imgUrl;
        if (item.backdrop) {
            imgUrl = getBackdropUrl(item.backdrop);
        } else {
            imgUrl = getPosterUrl(item.poster);
        }

        const card = document.createElement('div');
        card.className = 'movie-card cursor-pointer rounded-md relative group';

        let badge = '';
        if (item.type === 'tv' && item.season) {
            badge = `<div class="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">S${item.season} E${item.episode}</div>`;
        } else if (item.type === 'anime') {
            badge = `<div class="absolute top-2 right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">EP ${item.episode}</div>`;
        }

        // Use aspect-video (landscape) to match other home rows
        card.innerHTML = `
                    <div class="aspect-video overflow-hidden relative">
                        <img src="${imgUrl}" class="w-full h-full object-cover">
                        ${badge}
                        <div class="absolute inset-0 bg-[#020617]/40 opacity-0 md:group-hover:opacity-100 flex items-center justify-center transition-opacity z-20 pointer-events-none">
                            <i class="mdi mdi-play-circle text-primary text-5xl drop-shadow-lg"></i>
                        </div>
                    </div>
                    <div class="absolute bottom-0 left-0 w-full p-3 card-info">
                        <h3 class="text-text-main text-sm font-semibold truncate">${item.title}</h3>
                        <div class="flex justify-between items-center text-xs text-text-muted mt-1">
                            <span class="uppercase text-[10px]">Resume</span>
                            <span class="uppercase border border-border-color px-1 rounded text-[10px]">${item.type}</span>
                        </div>
                    </div>
                `;

        card.onclick = () => {
            if (item.type === 'movie') openTMDBPlayer(item.id, 'movie');
            else openDetailsWrapper(item.id, item.type, item.season, item.episode, card);
        };
        container.appendChild(card);
    });
}


/**
 * BROWSE SORT TABS (Movies / TV / Anime grid)
 */

const TMDB_SORT_TABS = {
    movies: [
        { id: 'trending', label: 'Trending' },
        { id: 'popularity.desc', label: 'Popular' },
        { id: 'top_rated', label: 'Top Rated' },
        { id: 'now_playing', label: 'Now Playing' }
    ],
    tv: [
        { id: 'trending', label: 'Trending' },
        { id: 'popularity.desc', label: 'Popular' },
        { id: 'top_rated', label: 'Top Rated' },
        { id: 'on_the_air', label: 'Airing Today + On the Air' }
    ]
};

const ANILIST_SORT_TABS = [
    { id: 'TRENDING_DESC', label: 'Trending' },
    { id: 'POPULARITY_DESC', label: 'Popular' },
    { id: 'SCORE_DESC', label: 'Top Rated' },
    { id: 'RECENTLY_UPDATED', label: 'Recently Updated' },
    { id: 'TOP_ANIME_MOVIES', label: 'Top Anime Movies' }
];

function renderBrowseSortTabs(section) {
    const containerId = section === 'anilist' ? 'anilist-sort-tabs' : `${section}-sort-tabs`;
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabs = section === 'anilist' ? ANILIST_SORT_TABS : TMDB_SORT_TABS[section];
    if (!tabs) return;

    const stateRef = section === 'anilist' ? appState.anilist.filters : appState.tmdb[section].filters;
    const activeSort = stateRef.sort;

    container.className = 'browse-sort-tabs details-tabs-bar mb-4';
    container.setAttribute('role', 'tablist');
    container.innerHTML = tabs.map(tab => {
        const isActive = activeSort === tab.id;
        const handler = section === 'anilist'
            ? `switchAnilistBrowseTab('${tab.id}')`
            : `switchTMDBBrowseTab('${section}', '${tab.id}')`;
        return `<button type="button" role="tab" aria-selected="${isActive}" class="details-tab-btn${isActive ? ' active' : ''}" data-sort="${tab.id}" onclick="${handler}">${tab.label}</button>`;
    }).join('');
}

function switchTMDBBrowseTab(section, sortId) {
    if (!appState.tmdb[section]) return;
    appState.tmdb[section].filters.sort = sortId;
    appState.tmdb[section].page = 1;
    renderBrowseSortTabs(section);
    updateFilterBadge(section);
    const endpoint = section === 'movies' ? '/discover/movie' : '/discover/tv';
    loadTMDBSection(section, endpoint);
}

function switchAnilistBrowseTab(sortId) {
    appState.anilist.filters.sort = sortId;
    appState.anilist.page = 1;
    renderBrowseSortTabs('anilist');
    updateFilterBadge('anilist');
    loadAnilistSection();
}

/**
 * FILTER LOGIC
 */

// Track which section's filter modal is open
let _filterModalSection = null;

function openFilterModal(section) {
    _filterModalSection = section;
    refreshFilterModalBody(section);
    document.getElementById('filter-modal').classList.add('open');
    lockBodyScroll();
    updateFilterBadge(section);
}

function refreshFilterModalBody(section) {
    _filterModalSection = section;
    const isAnilist = section === 'anilist';
    const stateRef = isAnilist ? appState.anilist.filters : appState.tmdb[section].filters;
    const body = document.getElementById('filter-modal-body');
    body.innerHTML = '';

    const defaults = isAnilist ? getAnilistFilterDefaults() : {
        sort: 'trending', genre: '', status: '', country: '', year: ''
    };

    // Build a filter group
    const buildGroup = (key, label, options) => {
        const group = document.createElement('div');

        const lbl = document.createElement('div');
        lbl.className = 'filter-group-label';
        lbl.textContent = label;
        group.appendChild(lbl);

        const grid = document.createElement('div');
        grid.className = 'filter-options-grid';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'filter-option-btn';
            btn.textContent = opt.label;
            btn.dataset.value = opt.value;
            if (String(stateRef[key] ?? '') === String(opt.value)) btn.classList.add('selected');

            btn.onclick = () => {
                // Deselect siblings
                grid.querySelectorAll('.filter-option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                stateRef[key] = opt.value;
                updateFilterBadge(section);
                resetAndLoad(section);
            };

            grid.appendChild(btn);
        });

        group.appendChild(grid);
        return group;
    };

    // Genre (sort is controlled by browse tabs above the grid)
    let genreList = [{ value: '', label: 'All' }];
    if (isAnilist) {
        genreList = genreList.concat(ANILIST_GENRES.map(g => ({ value: g, label: g })));
    } else if (section === 'movies') {
        genreList = genreList.concat(MOVIE_GENRES.filter(g => g.id !== '').map(g => ({ value: String(g.id), label: g.name })));
    } else {
        genreList = genreList.concat(TV_GENRES.filter(g => g.id !== '').map(g => ({ value: String(g.id), label: g.name })));
    }
    body.appendChild(buildGroup('genre', 'Genre', genreList));

    if (!isAnilist) {
        const statusList = section === 'movies'
            ? [{ value: '', label: 'All' }].concat(MOVIE_STATUS.map(s => ({ value: s.value, label: s.name })))
            : [{ value: '', label: 'All' }].concat(TV_STATUS.map(s => ({ value: s.value, label: s.name })));
        body.appendChild(buildGroup('status', 'Status', statusList));

        const countryList = COUNTRIES.map(c => ({ value: c.code, label: c.name }));
        body.appendChild(buildGroup('country', 'Country', countryList));
    }

    if (isAnilist) {
        const upcomingList = [
            { value: '', label: 'Off' },
            { value: 'POPULARITY_DESC', label: 'By Popularity' },
            { value: 'TRENDING_DESC', label: 'By Trending' },
            { value: 'START_DATE', label: 'By Release Date' }
        ];
        body.appendChild(buildGroup('upcoming', 'Upcoming', upcomingList));

        const tagList = [{ value: '', label: 'All' }].concat(
            ANILIST_TAGS.map(t => ({ value: t, label: t }))
        );
        body.appendChild(buildGroup('tag', 'Tag', tagList));
    }

    const currentYear = new Date().getFullYear() + 1;
    const yearList = [{ value: '', label: 'All' }];
    for (let y = currentYear; y >= 1970; y--) yearList.push({ value: String(y), label: String(y) });
    body.appendChild(buildGroup('year', 'Year', yearList));
}

function closeFilterModal(e) {
    // Called from close button (no event) or backdrop click (event with target = overlay)
    if (e && e.target !== document.getElementById('filter-modal')) return;
    document.getElementById('filter-modal').classList.remove('open');
    unlockBodyScroll();
}

function resetAllFilters() {
    if (!_filterModalSection) return;
    const isAnilist = _filterModalSection === 'anilist';
    const stateRef = isAnilist ? appState.anilist.filters : appState.tmdb[_filterModalSection].filters;
    const defaults = isAnilist ? getAnilistFilterDefaults() : { sort: 'trending', genre: '', status: '', country: '', year: '' };
    Object.assign(stateRef, defaults);
    if (_filterModalSection === 'anilist') renderBrowseSortTabs('anilist');
    else renderBrowseSortTabs(_filterModalSection);
    // Rebuild modal UI in-place — do NOT call openFilterModal() as that would
    // add another lockBodyScroll() call and break the scroll lock counter.
    refreshFilterModalBody(_filterModalSection);
    updateFilterBadge(_filterModalSection);
    resetAndLoad(_filterModalSection);
}

function getAnilistFilterDefaults() {
    return { sort: 'TRENDING_DESC', genre: '', country: '', upcoming: '', year: '', tag: '' };
}

function getActiveFilterCount(section) {
    const isAnilist = section === 'anilist';
    const stateRef = isAnilist ? appState.anilist.filters : appState.tmdb[section].filters;
    const defaults = isAnilist ? getAnilistFilterDefaults() : { sort: 'trending', genre: '', status: '', country: '', year: '' };
    return Object.entries(stateRef).filter(([k, v]) => k !== 'sort' && v && v !== defaults[k]).length;
}

function updateFilterBadge(section) {
    const containerId = section === 'anilist' ? 'anilist-filters' : `${section}-filters`;
    const container = document.getElementById(containerId);
    const activeCount = getActiveFilterCount(section);

    if (container) {
        const toggleBtn = container.querySelector('.filter-toggle-btn');
        const badge = container.querySelector('.filter-badge');
        if (toggleBtn) toggleBtn.classList.toggle('has-active', activeCount > 0);
        if (badge) {
            badge.textContent = activeCount;
            badge.style.display = activeCount > 0 ? 'inline-flex' : 'none';
        }
    }

    if (_filterModalSection === section) {
        const modalBadge = document.getElementById('filter-modal-badge');
        if (modalBadge) {
            modalBadge.textContent = activeCount;
            modalBadge.classList.toggle('hidden', activeCount === 0);
        }
    }
}

function renderFilters(section) {
    const containerId = section === 'anilist' ? 'anilist-filters' : `${section}-filters`;
    const container = document.getElementById(containerId);
    if (!container || container.dataset.rendered === 'true') return;

    container.innerHTML = '';
    container.dataset.rendered = 'true';
    container.className = 'filter-bar flex-wrap gap-2';

    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'filter-toggle-btn';
    toggleBtn.innerHTML = `<i class="ph ph-funnel-simple"></i> Filters <span class="filter-badge" style="display:none">0</span>`;
    toggleBtn.onclick = () => openFilterModal(section);
    container.appendChild(toggleBtn);

    updateFilterBadge(section);
}

function resetAndLoad(section) {
    if (section === 'anilist') {
        renderBrowseSortTabs('anilist');
        appState.anilist.page = 1;
        loadAnilistSection();
    } else {
        renderBrowseSortTabs(section);
        appState.tmdb[section].page = 1;
        const endpoint = section === 'movies' ? '/discover/movie' : '/discover/tv';
        loadTMDBSection(section, endpoint);
    }
}

/**
 * TMDB API
 */
async function fetchTMDB(endpoint, params = {}, showLoader = true) {
    if (showLoader) loader.show();
    params.api_key = API_KEY;
    const qs = new URLSearchParams(params).toString();
    try {
        const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${qs}`);
        const data = await res.json();
        if (showLoader) loader.hide();
        return data;
    } catch (e) {
        console.error("TMDB Error", e);
        if (showLoader) loader.hide();
        return null;
    }
}

async function fetchTMDBLogo(id, type) {
    try {
        // Determine correct endpoint based on type
        // Anime from Anilist might strictly be 'anime' type in our appState, 
        // but we need to know if we can find a TMDB equivalent or if wait, 
        // Anilist doesn't track TMDB IDs easily unless we mapped them.
        // For this implementation, we will primarily support Movies/TV from TMDB.
        // If the item has a 'media_type' of 'anime', we might skip or try to search. 
        // BUT, our bannerItems coming from mappedAnilist have type 'anime'.
        // For now, let's focus on 'movie' and 'tv'. 

        let tmdbType = type;
        if (type === 'anime') return null; // Skip for now unless we have a mapping

        const data = await fetchTMDB(`/${tmdbType}/${id}/images`, { include_image_language: 'en,null' }, false);
        if (data && data.logos && data.logos.length > 0) {
            // Find the best logo: preferably English, highest vote or width
            const englishLogos = data.logos.filter(l => l.iso_639_1 === 'en');
            const bestLogo = englishLogos.length > 0 ? englishLogos[0] : data.logos[0];
            return bestLogo.file_path;
        }
    } catch (e) {
        console.warn("Logo fetch failed", e);
    }
    return null;
}

function getWatchProviderLogoUrl(logoPath) {
    if (!logoPath) return null;
    return logoPath.startsWith('http') ? logoPath : PROVIDER_LOGO_URL + logoPath;
}

function renderDiscoverLogoSkeletons(container, count = 12) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'discover-logo-skeleton';
        el.setAttribute('aria-hidden', 'true');
        container.appendChild(el);
    }
}

function renderDiscoverLogoGrid(container, items, kind) {
    container.innerHTML = '';
    items.forEach(item => {
        const id = kind === 'provider' ? item.provider_id : item.id;
        const name = kind === 'provider' ? item.provider_name : item.name;
        const logoUrl = getWatchProviderLogoUrl(item.logo_path);
        if (!logoUrl) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'discover-logo-btn';
        btn.title = name;
        btn.setAttribute('aria-label', name);
        btn.innerHTML = `<img src="${logoUrl}" alt="" loading="lazy">`;
        btn.onclick = () => openDiscoverResults(kind, id, name);
        container.appendChild(btn);
    });
}

async function fetchPopularTVNetworks() {
    const networks = await Promise.all(
        POPULAR_TV_NETWORK_IDS.map(id => fetchTMDB(`/network/${id}`, {}, false))
    );
    return networks.filter(n => n && n.logo_path);
}

async function loadDiscoverSection() {
    const section = document.getElementById('discover-section');
    const providersGrid = document.getElementById('discover-providers-grid');
    const networksGrid = document.getElementById('discover-networks-grid');
    if (!providersGrid || !networksGrid) return;
    if (providersGrid.dataset.loaded === 'true') return;

    renderDiscoverLogoSkeletons(providersGrid, 14);
    renderDiscoverLogoSkeletons(networksGrid, 14);

    const providersData = await fetchTMDB('/watch/providers/movie', { watch_region: WATCH_REGION }, false);
    const networks = await fetchPopularTVNetworks();

    const providers = (providersData?.results || [])
        .filter(p => p.logo_path && p.display_priorities?.[WATCH_REGION] != null)
        .sort((a, b) => a.display_priorities[WATCH_REGION] - b.display_priorities[WATCH_REGION]);

    renderDiscoverLogoGrid(providersGrid, providers, 'provider');
    renderDiscoverLogoGrid(networksGrid, networks, 'network');

    providersGrid.dataset.loaded = 'true';
    if (section && (providers.length || networks.length)) {
        section.classList.remove('hidden');
    }
}

function openDiscoverResults(kind, id, name) {
    appState.discover = { kind, id, name, page: 1, restoreResultsOnPlayerReturn: false };
    const modal = document.getElementById('discover-results-modal');
    const titleEl = document.getElementById('discover-results-title');
    if (titleEl) {
        titleEl.textContent = kind === 'provider' ? `${name} — Movies` : `${name} — TV Shows`;
    }
    document.getElementById('discover-results-grid').innerHTML = getGridSkeleton(12);
    document.getElementById('discover-results-pagination').innerHTML = '';
    modal.classList.add('open');
    lockBodyScroll();
    loadDiscoverResultsPage(1);
}

function closeDiscoverResults(e) {
    if (e && e.target !== document.getElementById('discover-results-modal')) return;
    const modal = document.getElementById('discover-results-modal');
    modal.classList.remove('open');
    unlockBodyScroll();
    document.getElementById('discover-results-grid').innerHTML = '';
    document.getElementById('discover-results-pagination').innerHTML = '';
    appState.discover = { kind: null, id: null, name: '', page: 1, restoreResultsOnPlayerReturn: false };
}

async function loadDiscoverResultsPage(page) {
    const { kind, id } = appState.discover;
    if (!kind || !id) return;

    const grid = document.getElementById('discover-results-grid');
    grid.innerHTML = getGridSkeleton(12);
    loader.show();

    const mediaType = kind === 'provider' ? 'movie' : 'tv';
    const endpoint = kind === 'provider' ? '/discover/movie' : '/discover/tv';
    const params = {
        language: 'en-US',
        sort_by: 'popularity.desc',
        page
    };

    if (kind === 'provider') {
        params.with_watch_providers = String(id);
        params.watch_region = WATCH_REGION;
        params.with_watch_monetization_types = 'flatrate|free|ads';
    } else {
        params.with_networks = String(id);
    }

    const data = await fetchTMDB(endpoint, params, false);
    loader.hide();

    grid.innerHTML = '';
    if (data?.results?.length) {
        await renderTMDBGrid('discover-results-grid', data.results, mediaType);
        const totalPages = Math.min(data.total_pages || 1, 500);
        renderPagination('discover-results-pagination', page, totalPages, (p) => {
            appState.discover.page = p;
            loadDiscoverResultsPage(p);
        });
    } else {
        grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-12">No results found.</p>';
        document.getElementById('discover-results-pagination').innerHTML = '';
    }
}

async function loadHomeData() {
    // Render Continue Watching first
    renderContinueWatching();
    loadDiscoverSection();

    const container = document.getElementById('row-trending');
    if (container.innerHTML !== '') {
        startBannerRotation();
        return;
    }

    document.getElementById('row-trending').innerHTML = getRowSkeleton(6);
    document.getElementById('row-top-rated').innerHTML = getRowSkeleton(6);
    document.getElementById('row-top-rated-tv').innerHTML = getRowSkeleton(6);
    document.getElementById('row-action').innerHTML = getRowSkeleton(6);
    // Fetch TMDB Trending
    const trendingTMDBPromise = fetchTMDB('/trending/all/day');

    // Fetch Anilist Trending for Banner
    const anilistQuery = `
            query {
                Page(page: 1, perPage: 6) {
                    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
                        id title { romaji english } coverImage { extraLarge } bannerImage description averageScore status episodes seasonYear genres
                    }
                }
            }`;
    const anilistPromise = fetchAnilist(anilistQuery);

    const topRatedMoviesPromise = fetchTMDB('/movie/top_rated');
    const topRatedTvPromise = fetchTMDB('/tv/top_rated');
    const actionPromise = fetchTMDB('/discover/movie', { with_genres: 28 });

    const [trendingTMDB, anilistData, topRatedMovies, topRatedTv, action] = await Promise.all([
        trendingTMDBPromise,
        anilistPromise,
        topRatedMoviesPromise,
        topRatedTvPromise,
        actionPromise
    ]);

    // Combine for Banner: Top 10 TMDB
    let bannerCandidates = [];
    if (trendingTMDB && trendingTMDB.results) {
        renderTMDBGrid('row-trending', trendingTMDB.results, null, true);

        // Render Top 10 Content Today
        document.getElementById('top-10-container').classList.remove('hidden');
        renderTop10List('row-top-10', trendingTMDB.results.slice(0, 10));

        const now = new Date();
        const releasedTrending = trendingTMDB.results.filter(item => {
            const dateStr = item.release_date || item.first_air_date;
            if (!dateStr) return false;
            return new Date(dateStr) <= now;
        });

        bannerCandidates = [...bannerCandidates, ...releasedTrending.slice(0, 10)];
    }

    // Shuffle once for randomness as requested, but then act as a carousel
    appState.bannerItems = bannerCandidates.sort(() => 0.5 - Math.random());

    // FETCH LOGOS for banner items (Concurrent)
    if (appState.bannerItems.length > 0) {
        // Fire off requests but don't block the initial render completely if possible?
        // Actually, let's just fetch them. It's only ~10 items.
        await Promise.all(appState.bannerItems.map(async (item) => {
            // Only fetch if TMDB type
            if (item.media_type === 'movie' || item.media_type === 'tv') {
                item.logo_path = await fetchTMDBLogo(item.id, item.media_type);
            }
        }));

        appState.bannerIndex = 0;
        renderBannerIndicators();
        updateSharedBanner();
        startBannerRotation();
    }

    if (topRatedMovies?.results) {
        renderTMDBGrid('row-top-rated', topRatedMovies.results, 'movie', true);
    }
    if (topRatedTv?.results) {
        renderTMDBGrid('row-top-rated-tv', topRatedTv.results, 'tv', true);
    }
    if (action) renderTMDBGrid('row-action', action.results, null, true);
}

function startBannerRotation() {
    if (appState.bannerInterval) clearInterval(appState.bannerInterval);
    appState.bannerInterval = setInterval(() => {
        nextBanner();
    }, 5000);
}

function nextBanner() {
    appState.bannerIndex = (appState.bannerIndex + 1) % appState.bannerItems.length;
    updateSharedBanner();
    startBannerRotation(); // Reset timer on manual interaction
}

function prevBanner() {
    appState.bannerIndex = (appState.bannerIndex - 1 + appState.bannerItems.length) % appState.bannerItems.length;
    updateSharedBanner();
    startBannerRotation(); // Reset timer
}

function goToBanner(index) {
    appState.bannerIndex = index;
    updateSharedBanner();
    startBannerRotation();
}

function renderBannerIndicators() {
    const container = document.getElementById('banner-indicators');
    container.innerHTML = '';
    appState.bannerItems.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `carousel-indicator ${idx === 0 ? 'active' : ''}`;
        dot.onclick = () => goToBanner(idx);
        container.appendChild(dot);
    });
}

function updateSharedBanner() {
    const item = appState.bannerItems[appState.bannerIndex];
    if (!item) return;

    const bgUrl = getBackdropUrl(item.backdrop_path);
    const container = document.getElementById('banner-bg-container');

    // Background Fade Logic
    const newBg = document.createElement('div');
    newBg.className = 'banner-bg-wrapper';
    newBg.style.backgroundImage = `url(${bgUrl})`;
    container.appendChild(newBg);

    // Force reflow
    void newBg.offsetWidth;
    newBg.classList.add('active');

    // Remove old backgrounds
    if (container.children.length > 1) {
        setTimeout(() => {
            if (container.children.length > 1) {
                container.removeChild(container.firstElementChild);
            }
        }, 800); // Match CSS transition duration
    }

    const title = item.title || item.name;
    const desc = item.overview || 'No description available.';
    const type = item.media_type || 'movie';
    const safeTitle = title.replace(/'/g, "");
    const vote = item.vote_average || 0;
    const date = item.release_date || item.first_air_date || '';
    const year = date.split('-')[0] || '';

    const contentDiv = document.getElementById('banner-content');

    // Check History for Resume Status & Button Action
    const historyItem = appState.continueWatching.find(i => i.id === item.id && i.type === type);
    let btnText = "Play Now";
    // Default action: Play S1 E1 immediately
    let playParams = `${item.id}, '${type}', 1, 1`;

    if (historyItem) {
        if (type === 'movie') {
            btnText = "Resume";
        } else if (type === 'anime') {
            const e = historyItem.episode || 1;
            btnText = `Resume E${e}`;
            playParams = `${item.id}, '${type}', 1, ${e}`;
        } else {
            // TV
            const s = historyItem.season || 1;
            const e = historyItem.episode || 1;
            btnText = `Resume S${s} E${e}`;
            playParams = `${item.id}, '${type}', ${s}, ${e}`;
        }
    }

    // Fade out content slightly before changing
    contentDiv.style.opacity = '0';

    setTimeout(() => {
        // LOGO or TITLE Selection
        // Adjusted for better mobile scaling
        let titleHtml = `<h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-xl text-white line-clamp-2 break-words max-w-full">${title}</h1>`;

        if (item.logo_path) {
            const logoUrl = IMG_URL + item.logo_path;
            // Responsive logo constraints
            titleHtml = `<img src="${logoUrl}" alt="${title}" class="max-h-20 sm:max-h-20 md:max-h-44 max-w-[90%] sm:max-w-[60%] mt-6 md:mt-10 object-contain mb-6 drop-shadow-lg origin-left">`;
        }


        // Determine Status and Genres for Watchlist
        let status = item.status || 'Released'; // Default for TMDB if missing
        if (!item.status && (item.release_date || item.first_air_date)) {
            const d = new Date(item.release_date || item.first_air_date);
            status = d > new Date() ? 'Upcoming' : 'Released';
        }

        let genres = item.genres || [];
        if (!genres.length && item.genre_ids) {
            const list = type === 'tv' ? TV_GENRES : MOVIE_GENRES;
            genres = item.genre_ids.map(id => list.find(g => g.id === id)?.name).filter(Boolean);
        }
        const genresStr = Array.isArray(genres) ? genres.slice(0, 3).join(', ') : 'N/A';

        contentDiv.innerHTML = `
                    ${titleHtml}
                    <div class="flex items-center gap-3 text-sm font-medium text-white mb-4 drop-shadow-md">
                        <span class="text-yellow-400 font-bold"><i class="ph-fill ph-star text-xs"></i> ${vote.toFixed(1)}</span>
                        <span class="text-gray-500">|</span>
                        <span>${year}</span>
                        <span class="text-gray-500">|</span>
                        <span>${genresStr}</span>
                        <span class="text-gray-500">|</span>
                        <span class="uppercase text-[#cae962]">${type}</span>
                    </div>
                    <p class="text-white text-sm md:text-base mb-8 drop-shadow-md line-clamp-3 md:line-clamp-4 max-w-2xl font-medium leading-relaxed">${desc}</p>
                    
                    <div class="flex gap-4 mt-2">
                        <button class="bg-white text-black font-semibold py-2.5 px-6 rounded-md md:hover:bg-gray-200 transition-colors flex items-center gap-2" onclick="openDetailsWrapper(${playParams})">
                            <i class="ph-fill ph-play text-lg"></i> <span class="capitalize">${btnText}</span>
                        </button>
                        <button id="banner-watchlist-btn-${item.id}" class="wl-btn bg-white/10 border border-white/15 text-white font-semibold py-2.5 px-4 rounded-md md:hover:bg-white/20 md:hover:border-primary transition-colors flex items-center justify-center" onclick="toggleWatchlist(${item.id}, '${type}', '${safeTitle}', '${item.poster_path}', 'banner-watchlist-btn-${item.id}', ${vote}, '${year}', '${desc.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/ /g, ' ')}', '${status}', '${genresStr}')">
                           <i class="ph ph-plus text-lg"></i>
                        </button>
                    </div>
                `;
        contentDiv.style.opacity = '1';
        updateWatchlistButtonState(item.id, `banner-watchlist-btn-${item.id}`);
    }, 300); // Short delay for content fade

    // Update Indicators
    const dots = document.querySelectorAll('.carousel-indicator');
    dots.forEach((d, i) => {
        if (i === appState.bannerIndex) d.classList.add('active');
        else d.classList.remove('active');
    });
}

function mergeDedupeTMDBResults(items) {
    const seen = new Set();
    const merged = [];
    for (const item of items) {
        if (!item?.id || seen.has(item.id)) continue;
        seen.add(item.id);
        merged.push(item);
    }
    return merged;
}

async function loadTMDBSection(key, endpoint, extraParams = {}) {
    const stateRef = appState.tmdb[key];
    const gridId = `grid-${key}`;
    const grid = document.getElementById(gridId);

    grid.innerHTML = getGridSkeleton(12);
    loader.show();

    const params = {
        language: 'en-US',
        ...extraParams
    };

    const useTopRatedList = stateRef.filters.sort === 'top_rated';
    const useNowPlaying = key === 'movies' && stateRef.filters.sort === 'now_playing';
    const useTvAiring = key === 'tv' && stateRef.filters.sort === 'on_the_air';
    const hasBrowseFilters = !!(stateRef.filters.genre || stateRef.filters.country || stateRef.filters.year || stateRef.filters.status);

    // Handle Sorting & Endpoints
    let finalEndpoint = endpoint;

    if (stateRef.filters.sort === 'trending') {
        const type = key === 'movies' ? 'movie' : 'tv';
        finalEndpoint = `/trending/${type}/day`;
    } else if (useTopRatedList && !hasBrowseFilters) {
        finalEndpoint = key === 'movies' ? '/movie/top_rated' : '/tv/top_rated';
    } else if (useNowPlaying && !hasBrowseFilters) {
        finalEndpoint = '/movie/now_playing';
    } else if (useTvAiring && !hasBrowseFilters) {
        finalEndpoint = null;
    } else {
        if (useTopRatedList) {
            params.sort_by = 'vote_average.desc';
            params['vote_count.gte'] = 200;
        } else if (useNowPlaying) {
            params.sort_by = 'primary_release_date.desc';
            params['vote_count.gte'] = 0;
        } else if (useTvAiring) {
            params.sort_by = 'first_air_date.desc';
            params['vote_count.gte'] = 0;
        } else {
            params.sort_by = stateRef.filters.sort;
            params['vote_count.gte'] = 0;
        }
    }

    const today = new Date().toISOString().split('T')[0];

    if (finalEndpoint && finalEndpoint.includes('discover') && stateRef.filters.status) {
        if (key === 'movies') {
            if (stateRef.filters.status === 'upcoming') {
                params['primary_release_date.gte'] = today;
            } else if (stateRef.filters.status === 'released') {
                params['primary_release_date.lte'] = today;
            }
        } else {
            params.with_status = stateRef.filters.status;
        }
    }

    if (finalEndpoint && finalEndpoint.includes('discover') &&
        (stateRef.filters.sort.includes('date') || stateRef.filters.sort.includes('first_air_date'))) {
        if (stateRef.filters.status !== 'upcoming') {
            if (key === 'movies') params['primary_release_date.lte'] = today;
            else params['first_air_date.lte'] = today;
        }
        delete params['vote_count.gte'];
        params['vote_count.gte'] = 0;
    }

    if (finalEndpoint && finalEndpoint.includes('discover')) {
        if (stateRef.filters.genre) params.with_genres = stateRef.filters.genre;
        if (stateRef.filters.country) params.with_origin_country = stateRef.filters.country;
        if (stateRef.filters.year) {
            if (key === 'movies') params.primary_release_year = stateRef.filters.year;
            else params.first_air_date_year = stateRef.filters.year;
        }
    }

    // DOUBLE FETCH LOGIC
    const tmdbPage1 = (stateRef.page - 1) * 2 + 1;
    const tmdbPage2 = tmdbPage1 + 1;

    const isCuratedList = !hasBrowseFilters && (useTopRatedList || useNowPlaying);
    const curatedParams = { language: 'en-US' };

    let results = [];
    let totalPagesRef = 0;

    // TV SECTION: ALL tabs use /discover/tv with with_type=4 (Scripted) + with_type=2
    // (Miniseries) so that non-scripted formats (Reality, Talk, News, Documentary, etc.)
    // are always hidden. Two parallel fetches (one per type, two pages each) are merged
    // and re-sorted to match the intent of each tab as closely as possible.
    //
    // EXCEPTION — Trending tab: uses the real /trending/tv/day endpoint for accurate
    // TMDB trending order, then post-filters by show type (Scripted=4, Miniseries=2)
    // via batch detail calls so the result matches TMDB's own Trending TV page.
    if (key === 'tv') {

        if (stateRef.filters.sort === 'trending') {
            // Fetch two pages of real trending TV
            const trendParams = { language: 'en-US' };
            const [t1, t2] = await Promise.all([
                fetchTMDB('/trending/tv/day', { ...trendParams, page: tmdbPage1 }, false),
                fetchTMDB('/trending/tv/day', { ...trendParams, page: tmdbPage2 }, false),
            ]);
            const trendingRaw = mergeDedupeTMDBResults([
                ...(t1?.results || []),
                ...(t2?.results || []),
            ]);
            totalPagesRef = t1?.total_pages || t2?.total_pages || 0;

            // Batch-fetch show details to get the `type` field.
            // TMDB detail endpoint returns type as a string: "Scripted", "Miniseries", etc.
            const ALLOWED_TYPES = new Set(['Scripted', 'Miniseries']);
            const detailFetches = trendingRaw.map(item =>
                fetchTMDB(`/tv/${item.id}`, { language: 'en-US' }, false)
            );
            const details = await Promise.all(detailFetches);

            // Keep items whose `type` is Scripted or Miniseries, preserving trending order
            results = trendingRaw.filter((item, i) => {
                const d = details[i];
                return d && ALLOWED_TYPES.has(d.type);
            });

        } else {
        // Build the discover params for the active tab
        const tvBase = { language: 'en-US' };

        if (stateRef.filters.sort === 'popularity.desc') {
            tvBase.sort_by = 'popularity.desc';
            tvBase['vote_count.gte'] = 0;
        } else if (useTopRatedList) {
            tvBase.sort_by = 'vote_average.desc';
            tvBase['vote_count.gte'] = 200;
        } else if (useTvAiring) {
            const todayStr  = new Date().toISOString().split('T')[0];
            const weekAhead = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            tvBase.sort_by = 'popularity.desc';
            tvBase['air_date.gte'] = todayStr;
            tvBase['air_date.lte'] = weekAhead;
        } else {
            tvBase.sort_by = stateRef.filters.sort || 'popularity.desc';
            tvBase['vote_count.gte'] = 0;
        }

        // Apply any active browse filters
        if (stateRef.filters.genre)   tvBase.with_genres         = stateRef.filters.genre;
        if (stateRef.filters.country) tvBase.with_origin_country = stateRef.filters.country;
        if (stateRef.filters.year)    tvBase.first_air_date_year = stateRef.filters.year;
        if (stateRef.filters.status)  tvBase.with_status         = stateRef.filters.status;

        // Fetch Scripted (4) + Miniseries (2) across two TMDB pages each, all in parallel
        const [s1, s2, m1, m2] = await Promise.all([
            fetchTMDB('/discover/tv', { ...tvBase, with_type: 4, page: tmdbPage1 }, false),
            fetchTMDB('/discover/tv', { ...tvBase, with_type: 4, page: tmdbPage2 }, false),
            fetchTMDB('/discover/tv', { ...tvBase, with_type: 2, page: tmdbPage1 }, false),
            fetchTMDB('/discover/tv', { ...tvBase, with_type: 2, page: tmdbPage2 }, false),
        ]);

        results = mergeDedupeTMDBResults([
            ...(s1?.results || []), ...(s2?.results || []),
            ...(m1?.results || []), ...(m2?.results || []),
        ]);

        // Re-sort the merged pool to match the tab's intended ordering
        if (tvBase.sort_by === 'vote_average.desc') {
            results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        } else {
            results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }

        totalPagesRef = Math.max(
            s1?.total_pages || 0, s2?.total_pages || 0,
            m1?.total_pages || 0, m2?.total_pages || 0,
        );
        } // end non-trending branch

    } else if (useTvAiring && !hasBrowseFilters) {
        const [airing1, onAir1, airing2, onAir2] = await Promise.all([
            fetchTMDB('/tv/airing_today', { ...curatedParams, page: tmdbPage1 }, false),
            fetchTMDB('/tv/on_the_air', { ...curatedParams, page: tmdbPage1 }, false),
            fetchTMDB('/tv/airing_today', { ...curatedParams, page: tmdbPage2 }, false),
            fetchTMDB('/tv/on_the_air', { ...curatedParams, page: tmdbPage2 }, false)
        ]);
        results = mergeDedupeTMDBResults([
            ...(airing1?.results || []),
            ...(onAir1?.results || []),
            ...(airing2?.results || []),
            ...(onAir2?.results || [])
        ]);
        totalPagesRef = Math.max(
            airing1?.total_pages || 0,
            onAir1?.total_pages || 0,
            airing2?.total_pages || 0,
            onAir2?.total_pages || 0
        );
    } else {
        const p1 = isCuratedList
            ? { ...curatedParams, page: tmdbPage1 }
            : { ...params, page: tmdbPage1 };
        const p2 = isCuratedList
            ? { ...curatedParams, page: tmdbPage2 }
            : { ...params, page: tmdbPage2 };

        const [d1, d2] = await Promise.all([
            fetchTMDB(finalEndpoint, p1, false),
            fetchTMDB(finalEndpoint, p2, false)
        ]);

        if (d1?.results) results.push(...d1.results);
        if (d2?.results) results.push(...d2.results);
        totalPagesRef = d1?.total_pages || d2?.total_pages || 0;
    }

    const totalUIPages = Math.ceil(totalPagesRef / 2);

    grid.innerHTML = '';
    if (results.length > 0) {
        // Banner is now handled separately in loadHomeData for the Home view.

        await renderTMDBGrid(gridId, results, key === 'movies' ? 'movie' : 'tv');

        renderPagination(`pag-${key}`, stateRef.page, totalUIPages, (p) => {
            stateRef.page = p;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            loadTMDBSection(key, endpoint, extraParams);
        });
    } else {
        grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
    }
    loader.hide();
}

/**
 * ANILIST API
 */
async function fetchAnilist(query, variables = {}) {
    loader.show();
    try {
        const res = await fetch(ANILIST_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        loader.hide();
        return json.data;
    } catch (e) {
        console.error("Anilist Error", e);
        loader.hide();
        return null;
    }
}

function mapAnilistToShared(anime) {
    return {
        id: anime.id,
        title: anime.title.english || anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        overview: anime.description,
        backdrop_path: anime.bannerImage || anime.coverImage.extraLarge,
        poster_path: anime.coverImage.extraLarge,
        vote_average: (anime.averageScore || 0) / 10,
        media_type: 'anime',
        release_date: anime.seasonYear ? String(anime.seasonYear) : (anime.startDate && anime.startDate.year ? String(anime.startDate.year) : 'N/A'),
        status: anime.status,
        format: anime.format,
        genres: anime.genres || [],
        recentEpisode: anime.recentEpisode || null
    };
}

// --- NEW: Tab Switching Logic for Anime Section ---
function switchAnilistTab(tab) {
    appState.anilist.currentTab = tab;
    const animeTab = document.getElementById('anilist-tab-anime');
    const vaTab = document.getElementById('anilist-tab-va');
    const btnAnime = document.getElementById('tab-btn-anime');
    const btnVa = document.getElementById('tab-btn-va');

    if (tab === 'anime') {
        animeTab.classList.remove('hidden');
        vaTab.classList.add('hidden');

        // Active Styles
        btnAnime.classList.add('text-primary', 'border-b-2', 'border-primary');
        btnAnime.classList.remove('text-text-muted', 'hover:text-white');

        // Inactive Styles
        btnVa.classList.remove('text-primary', 'border-b-2', 'border-primary');
        btnVa.classList.add('text-text-muted', 'hover:text-white');

        // Reset Pagination & Load Data
        appState.anilist.page = 1;
        renderBrowseSortTabs('anilist');
        loadAnilistSection();

    } else {
        animeTab.classList.add('hidden');
        vaTab.classList.remove('hidden');

        // Active Styles
        btnVa.classList.add('text-primary', 'border-b-2', 'border-primary');
        btnVa.classList.remove('text-text-muted', 'hover:text-white');

        // Inactive Styles
        btnAnime.classList.remove('text-primary', 'border-b-2', 'border-primary');
        btnAnime.classList.add('text-text-muted', 'hover:text-white');

        // Reset Pagination & Load Data
        appState.anilist.vaPage = 1;
        loadAnilistVoiceActors();
    }
}

function renderAnilistPagination(currentPage, totalPages) {
    const total = Math.max(1, totalPages || 1);
    renderPagination('pag-anilist', currentPage, total, (page) => {
        appState.anilist.page = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadAnilistSection();
    });
}

function browseByAnilistTag(tagName) {
    closeDetailsModal();
    appState.anilist.filters.tag = tagName;
    appState.anilist.page = 1;
    router('anime-anilist');
    setTimeout(() => {
        switchAnilistTab('anime');
        renderBrowseSortTabs('anilist');
        renderFilters('anilist');
        updateFilterBadge('anilist');
        loadAnilistSection();
    }, 50);
}

function hasAnilistBrowseFilters() {
    const f = appState.anilist.filters;
    return !!(f.genre || f.country || f.year || f.tag || f.upcoming);
}

function getAnilistFilterVars() {
    const state = appState.anilist;
    const vars = {};
    if (state.filters.genre) vars.genre = state.filters.genre;
    if (state.filters.country) vars.country = state.filters.country;
    if (state.filters.year) vars.year = parseInt(state.filters.year, 10);
    if (state.filters.tag) {
        vars.tags = [state.filters.tag];
        vars.minimumTagRank = 20;
    }
    return vars;
}

async function loadAnilistSection() {
    const state = appState.anilist;
    const gridId = 'grid-anilist';
    const grid = document.getElementById(gridId);
    grid.innerHTML = getGridSkeleton(12);

    if (state.filters.sort === 'RECENTLY_UPDATED' && !hasAnilistBrowseFilters()) {
        const query = `
                query ($page: Int) {
                    Page(page: $page, perPage: 24) {
                        pageInfo { hasNextPage lastPage }
                        airingSchedules(sort: TIME_DESC, notYetAired: false) {
                            episode
                            airingAt
                            media {
                                id title { romaji english } coverImage { extraLarge } bannerImage description averageScore status episodes seasonYear genres format isAdult
                            }
                        }
                    }
                }`;
        const data = await fetchAnilist(query, { page: state.page });
        grid.innerHTML = '';
        if (data && data.Page && data.Page.airingSchedules) {
            const uniqueData = [];
            const seen = new Set();
            data.Page.airingSchedules.filter(s => s.media && !s.media.isAdult).forEach(schedule => {
                if (!seen.has(schedule.media.id)) {
                    seen.add(schedule.media.id);
                    // Attach the aired episode number so cards can display it
                    uniqueData.push({ ...schedule.media, recentEpisode: schedule.episode });
                }
            });
            state.data = uniqueData;
            if (uniqueData.length > 0) {
                renderAnilistGrid(gridId, uniqueData.map(mapAnilistToShared));
            } else {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            }
            const lastPage = data.Page.pageInfo.lastPage || (data.Page.pageInfo.hasNextPage ? state.page + 1 : state.page);
            renderAnilistPagination(state.page, lastPage);
        } else {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            renderAnilistPagination(1, 1);
        }

    } else if (state.filters.sort === 'TOP_ANIME_MOVIES') {
        const query = `
                query ($page: Int, $genre: String, $country: CountryCode, $year: Int, $tags: [String], $minimumTagRank: Int) {
                    Page(page: $page, perPage: 24) {
                        pageInfo { hasNextPage lastPage }
                        media(
                            sort: SCORE_DESC
                            type: ANIME
                            format: MOVIE
                            genre: $genre
                            countryOfOrigin: $country
                            seasonYear: $year
                            tag_in: $tags
                            minimumTagRank: $minimumTagRank
                            isAdult: false
                        ) {
                            id title { romaji english } coverImage { extraLarge } bannerImage description averageScore status seasonYear genres format
                        }
                    }
                }`;
        const vars = { page: state.page, ...getAnilistFilterVars() };
        const data = await fetchAnilist(query, vars);
        grid.innerHTML = '';
        if (data && data.Page && data.Page.media) {
            state.data = data.Page.media;
            if (state.data.length > 0) {
                renderAnilistGrid(gridId, state.data.map(mapAnilistToShared));
            } else {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No anime movies found.</p>';
            }
            renderAnilistPagination(state.page, data.Page.pageInfo.lastPage || 1);
        } else {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No anime movies found.</p>';
            renderAnilistPagination(1, 1);
        }

    } else {
        const query = `
                query ($page: Int, $sort: [MediaSort], $genre: String, $country: CountryCode, $status: MediaStatus, $year: Int, $tags: [String], $minimumTagRank: Int) {
                    Page(page: $page, perPage: 24) {
                        pageInfo { hasNextPage lastPage }
                        media(sort: $sort, genre: $genre, countryOfOrigin: $country, status: $status, seasonYear: $year, tag_in: $tags, minimumTagRank: $minimumTagRank, type: ANIME, format_in: [TV, OVA, ONA, SPECIAL, MUSIC], isAdult: false) {
                            id title { romaji english } coverImage { extraLarge } bannerImage description averageScore status episodes seasonYear genres format
                        }
                    }
                }`;

        const vars = { page: state.page, ...getAnilistFilterVars() };

        if (state.filters.upcoming) {
            vars.status = 'NOT_YET_RELEASED';
            vars.sort = state.filters.upcoming;
        } else if (state.filters.sort === 'RECENTLY_UPDATED') {
            vars.sort = 'UPDATED_AT_DESC';
        } else {
            vars.sort = state.filters.sort;
        }

        const data = await fetchAnilist(query, vars);
        grid.innerHTML = '';
        if (data && data.Page && data.Page.media) {
            state.data = data.Page.media;
            if (state.data.length > 0) {
                renderAnilistGrid(gridId, state.data.map(mapAnilistToShared));
            } else {
                grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            }
            renderAnilistPagination(state.page, data.Page.pageInfo.lastPage || 1);
        } else {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No results found.</p>';
            renderAnilistPagination(1, 1);
        }
    }
}

// --- NEW: Voice Actor Loading Logic ---
async function loadAnilistVoiceActors() {
    const gridId = 'grid-anilist-va';
    const grid = document.getElementById(gridId);
    const state = appState.anilist;
    grid.innerHTML = getGridSkeleton(12);

    const query = `
            query ($page: Int, $search: String) {
                Page(page: $page, perPage: 24) {
                    pageInfo { total perPage currentPage lastPage hasNextPage }
                    staff(search: $search, sort: [FAVOURITES_DESC]) {
                        id
                        name { full }
                        image { large }
                        primaryOccupations
                    }
                }
            }`;

    const vars = { page: state.vaPage };
    if (state.vaSearch && state.vaSearch.trim() !== '') {
        vars.search = state.vaSearch;
    }

    const data = await fetchAnilist(query, vars);

    grid.innerHTML = '';
    if (data && data.Page.staff) {
        state.vaData = data.Page.staff;

        if (state.vaData.length === 0) {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center">No voice actors found.</p>';
        } else {
            state.vaData.forEach(staff => {
                const imgUrl = staff.image ? staff.image.large : 'https://placehold.co/300x450/333/FFF?text=No+Image';
                const occupations = staff.primaryOccupations ? staff.primaryOccupations[0] : 'Voice Actor';

                // Using createCardHTML adapted for VA
                // We use 'actor' type to trigger the round icon logic in standard card creation, 
                // but since createCardHTML is strict about layout, we'll manually create a nice card for VAs or reuse.
                // Actually, reusing createCardHTML with type 'actor' works well if we tweak the click handler.

                const card = createCardHTML(
                    staff.id,
                    'actor', // Visual style
                    staff.name.full,
                    imgUrl,
                    null, // No rating 
                    occupations, // Subtext instead of year
                    '',
                    false,
                    null
                );

                // OVERRIDE CLICK for Voice Actor
                card.onclick = () => openVoiceActorDetails(staff.id);

                grid.appendChild(card);
            });
        }

        document.getElementById('anilist-va-page-num').innerText = state.vaPage;
    }
}

// --- NEW: Voice Actor Pagination ---
function changeAnilistVAPage(dir) {
    const currentPage = parseInt(appState.anilist.vaPage) || 1;
    const next = currentPage + dir;
    if (next > 0) {
        appState.anilist.vaPage = next;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadAnilistVoiceActors();
    }
}

// --- NEW: Voice Actor Search Listener ---
// Deferred — element lives in a fetched partial, attach after DOM is ready
function attachVASearchListener() {
    const vaSearchInput = document.getElementById('va-search-input');
    if (!vaSearchInput) return;
    vaSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            appState.anilist.vaSearch = e.target.value;
            appState.anilist.vaPage = 1;
            loadAnilistVoiceActors();
            vaSearchInput.value = '';
        }
    });
}

function getAnilistResumeEpisode(anime) {
    const historyItem = appState.continueWatching.find(i => i.id === anime.id && i.type === 'anime');
    if (historyItem && historyItem.episode) return historyItem.episode;
    return 1;
}

function populateAnilistDetailsEpisodesTab(anime, startEp) {
    const panel = document.getElementById('details-panel-episodes');
    if (!panel) return;

    if (anime.status === 'NOT_YET_RELEASED') {
        panel.innerHTML = '<p class="text-sm text-text-muted">Not yet aired.</p>';
        return;
    }

    let maxEps = anime.episodes || 12;
    if (anime.nextAiringEpisode) maxEps = anime.nextAiringEpisode.episode - 1;
    if (maxEps <= 0) {
        panel.innerHTML = '<p class="text-sm text-text-muted">No aired episodes yet.</p>';
        return;
    }

    const coverUrl = anime.coverImage ? anime.coverImage.extraLarge : null;
    panel.innerHTML = `
        <div class="details-episodes-toolbar">
            <h3 class="text-base font-bold text-text-main">Episodes</h3>
            <div class="flex gap-2">
                <button id="ep-sort-btn" type="button" onclick="toggleEpisodeSort()" class="px-3 py-1.5 text-xs rounded-lg border border-border-color bg-input-bg text-text-main md:hover:border-primary transition-colors">
                    <i class="ph ph-sort-ascending mr-1"></i> ${appState.episodeSort === 'asc' ? 'Oldest' : 'Newest'}
                </button>
            </div>
        </div>
        <div id="details-episodes-list" class="flex flex-col gap-3"></div>`;

    const targetId = anime.id;
    renderEpisodeList('details-episodes-list', maxEps, 'anilist', startEp, (epNum) => {
        openPlayerWithReturn(() => openAnilistPlayer(targetId, epNum));
    }, { layout: 'details', coverStill: coverUrl });
}

function populateAnilistDetailsRelationsTab(anime) {
    const panel = document.getElementById('details-panel-relations');
    if (!panel) return;
    panel.innerHTML = '';

    const validRelations = (anime.relations && anime.relations.edges)
        ? anime.relations.edges.filter(r => r.node.format !== 'MANGA' && r.node.format !== 'NOVEL' && r.node.format !== 'MUSIC' && r.node.format !== 'ONE_SHOT')
        : [];

    if (validRelations.length === 0) {
        panel.innerHTML = '<p class="text-sm text-text-muted">No relations found.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'results-grid';
    validRelations.forEach(edge => {
        const imgUrl = edge.node.coverImage?.extraLarge || 'https://placehold.co/160x240?text=No+Img';
        const relYear = edge.node.seasonYear || '';
        const relVote = edge.node.averageScore ? edge.node.averageScore / 10 : null;
        const card = createCardHTML(
            edge.node.id, 'anime', edge.node.title.romaji, imgUrl, relVote, relYear,
            `<div class="absolute top-2 right-2 bg-card-bg text-white text-[10px] font-bold px-2 py-0.5 rounded border border-primary uppercase shadow-md z-10">${edge.relationType.replace(/_/g, ' ')}</div>`,
            false, edge.node.description,
            edge.node.genres ? edge.node.genres.slice(0, 3).join(', ') : '',
            edge.node.status ? edge.node.status.replace(/_/g, ' ') : ''
        );
        grid.appendChild(card);
    });
    panel.appendChild(grid);
}

function populateAnilistDetailsRecommendationsTab(anime) {
    const panel = document.getElementById('details-panel-recommendations');
    if (!panel) return;
    panel.innerHTML = '';

    if (!anime.recommendations || !anime.recommendations.nodes || anime.recommendations.nodes.length === 0) {
        panel.innerHTML = '<p class="text-sm text-text-muted">No recommendations found.</p>';
        return;
    }

    const recItems = anime.recommendations.nodes
        .map(n => n.mediaRecommendation).filter(m => m).map(mapAnilistToShared);
    const grid = document.createElement('div');
    grid.id = 'details-anilist-recommendations';
    grid.className = 'results-grid';
    panel.appendChild(grid);
    renderAnilistGrid('details-anilist-recommendations', recItems, false);
}

// NEW: Open Anime Details (modal with tabs)
async function openAnilistDetails(id) {
    const content = document.getElementById('details-modal-content');
    if (!content) return;

    if (appState.details.id !== id || appState.details.type !== 'anime') {
        appState.details = { id, type: 'anime', activeTab: 'information', tvSeason: 1 };
        appState.playerReturnView = null;
    }
    content.innerHTML = getModalDetailsSkeleton();
    openDetailsModal('Loading...');

    const state = appState.anilist;
    const query = `query ($id: Int) { Media(id: $id) { id title { romaji english } 
            description coverImage { extraLarge } bannerImage episodes
            nextAiringEpisode { episode } averageScore format duration status season seasonYear
            trailer { id site }
            studios { nodes { name isAnimationStudio } }
            startDate { year month day } genres
            tags { name }
            relations { edges { relationType node { id title { romaji } description seasonYear averageScore format status coverImage { extraLarge } genres } } }
            recommendations(sort: RATING_DESC, perPage: 10) {
                nodes { mediaRecommendation { id title { romaji english } description coverImage { extraLarge } bannerImage format averageScore status seasonYear genres } }
            }
            characters(page: 1, perPage: 25, sort: [ROLE, FAVOURITES_DESC]) {
                edges {
                    role
                    voiceActors(language: JAPANESE, sort: [FAVOURITES_DESC]) { id name { full } image { medium } }
                    node { id name { userPreferred } image { medium } }
                }
            }
        } }`;

    const data = await fetchAnilist(query, { id });
    if (!data || !data.Media) {
        content.innerHTML = '<p class="text-center text-red-500 p-10">Error loading details.</p>';
        return;
    }

    const anime = data.Media;
    state.currentAnime = anime;

    const title = anime.title.english || anime.title.romaji;
    const poster = anime.coverImage.extraLarge;
    const bannerUrl = getBackdropUrl(anime.bannerImage || anime.coverImage.extraLarge);
    const trailerId = (anime.trailer && anime.trailer.site === 'youtube') ? anime.trailer.id : null;
    const safeTitle = title.replace(/'/g, '');
    const resumeEp = getAnilistResumeEpisode(anime);

    const averageScore = typeof anime.averageScore === 'number' ? (anime.averageScore / 10).toFixed(1) : '??';
    const yearStr = anime.seasonYear || (anime.startDate && anime.startDate.year ? anime.startDate.year : 'N/A');
    const currentAired = anime.nextAiringEpisode ? anime.nextAiringEpisode.episode - 1 : (anime.episodes || '?');
    const totalEps = anime.episodes || '?';
    const seas = anime.season ? anime.season.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startDate = anime.startDate && anime.startDate.year
        ? `${months[(anime.startDate.month || 1) - 1]} ${anime.startDate.day || 1} ${anime.startDate.year}` : '?';

    const studios = [];
    if (anime.studios && anime.studios.nodes) {
        anime.studios.nodes.forEach(s => { if (s.isAnimationStudio) studios.push(s.name); });
    }

    let anilistStatus = anime.status ? anime.status.replace(/_/g, ' ') : 'Unknown';
    if (anime.status === 'RELEASING') anilistStatus = 'Releasing';
    const genresStr = anime.genres ? anime.genres.join(', ') : 'N/A';
    const tagsArr = Array.isArray(anime.tags)
        ? anime.tags.map(t => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
        : (anime.tags && Array.isArray(anime.tags.nodes)
            ? anime.tags.nodes.map(t => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
            : []);
    const tagsStr = tagsArr.length
        ? tagsArr.slice(0, 10).join(', ').replace(/</g, '&lt;')
        : 'N/A';
    const descriptionHtml = (anime.description || 'No description available.');

    let castHtml = '';
    if (anime.characters && anime.characters.edges) {
        castHtml = '<div class="flex overflow-x-auto gap-4 pb-2 scrollbar-thin">';
        anime.characters.edges.forEach(charEdge => {
            if (charEdge.voiceActors && charEdge.voiceActors.length > 0) {
                charEdge.voiceActors.forEach(va => {
                    castHtml += `<div class="flex flex-col gap-1 min-w-[72px] cursor-pointer group" onclick="closeDetailsModal(); openVoiceActorDetails(${va.id})">
                        <div class="w-16 h-16 rounded-full overflow-hidden border border-border-color mx-auto md:group-hover:border-primary transition-colors">
                            <img src="${va.image.medium}" alt="" class="w-full h-full object-cover">
                        </div>
                        <p class="text-[10px] text-text-main font-semibold truncate text-center md:group-hover:text-primary transition-colors">${va.name.full}</p>
                        <p class="text-[9px] text-text-muted truncate text-center">${charEdge.node.name.userPreferred}</p>
                    </div>`;
                });
            }
        });
        castHtml += '</div>';
    }

    const titleEl = document.getElementById('details-modal-title');
    if (titleEl) titleEl.textContent = title;

    // Embed the trailer optimistically — the postMessage error listener will
    // fall back to the backdrop image if YouTube rejects the video at runtime.
    const showAniTrailer = !!trailerId;

        let bgHtml = `<div class="w-full h-40 md:h-52 relative overflow-hidden flex-shrink-0" style="${showAniTrailer ? 'background-color:#000' : `background-image:url('${bannerUrl}');background-size:cover;background-position:center`}">
        <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent z-10 pointer-events-none"></div>`;
    if (showAniTrailer) {
        bgHtml += `<iframe id="anilist-bg-player" class="absolute w-[200%] md:w-full aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            src="https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerId}&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(location.origin)}"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" data-muted="true" data-fallback-bg="${bannerUrl}" allowfullscreen></iframe>
        <button id="anilist-unmute-btn" type="button" onclick="toggleVolume('anilist-bg-player','anilist-unmute-btn')" class="absolute top-3 right-3 z-50 p-2 text-white transition-colors">
            <i class="material-icons text-sm flex items-center justify-center w-4 h-4">volume_off</i>
        </button>`;
    }
    bgHtml += `</div>`;

    const hasRelations = anime.relations && anime.relations.edges && anime.relations.edges.some(r =>
        r.node.format !== 'MANGA' && r.node.format !== 'NOVEL' && r.node.format !== 'MUSIC' && r.node.format !== 'ONE_SHOT');
    const hasRecs = anime.recommendations && anime.recommendations.nodes && anime.recommendations.nodes.length > 0;
    const visibleTabs = ['information', 'episodes'];
    if (hasRelations) visibleTabs.push('relations');
    if (hasRecs) visibleTabs.push('recommendations');

    const historyItem = appState.continueWatching.find(i => i.id === id && i.type === 'anime');
    const btnText = historyItem && historyItem.episode ? `Resume EP ${historyItem.episode}` : 'Play';

    const detailsSecondaryBtnClass = 'flex-1 bg-white/10 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md md:hover:bg-white/20 md:hover:border-primary transition-colors';
    const trailerBtnHtml = trailerId
        ? `<button type="button" id="anilist-details-trailer-btn" class="${detailsSecondaryBtnClass}" title="Trailer"><i class="ph ph-youtube-logo text-2xl"></i></button>`
        : `<button type="button" disabled class="flex-1 bg-white/10 border border-white/15 text-gray-500 font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md opacity-50 cursor-not-allowed" title="No trailer"><i class="ph ph-youtube-logo text-2xl text-gray-500"></i></button>`;

    content.innerHTML = bgHtml + `
    <div class="px-4 md:px-6 pb-6 -mt-12 relative z-10">
        <div class="flex gap-4 md:gap-5">
            <div class="flex-shrink-0 w-24 md:w-32">
                <img src="${poster}" alt="${safeTitle}" class="w-full rounded-xl shadow-2xl border border-white/10">
            </div>
            <div class="flex-1 min-w-0 pt-12 md:pt-14">
                <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted mb-2">
                    <span class="text-yellow-500 font-bold"><i class="ph-fill ph-star mr-0.5"></i>${averageScore}</span>
                    <span class="px-1.5 py-0.5 border border-border-color rounded">${yearStr}</span>
                    <span class="uppercase">${anime.format || 'TV'}</span>
                </div>
                <h1 class="text-lg md:text-xl font-extrabold text-white mb-1 leading-tight">${title}</h1>
                ${anime.title.romaji !== title ? `<p class="text-text-muted text-xs italic mb-2">${anime.title.romaji}</p>` : ''}
            </div>
        </div>
        <div class="mt-4 space-y-2">
            ${anime.status === 'NOT_YET_RELEASED'
                ? `<button type="button" disabled class="w-full bg-gray-600 text-gray-300 font-bold text-xl py-3 px-6 rounded flex items-center justify-center gap-2 cursor-not-allowed opacity-70"><i class="fas fa-clock"></i> Not yet released</button>`
                : `<button type="button" id="anilist-details-play-btn" class="w-full bg-white text-black font-bold md:text-xl py-3 px-6 rounded border-2 border-transparent md:hover:border-main transition-colors flex items-center justify-center gap-2"><i class="ph-fill ph-play text-2xl"></i> ${btnText}</button>`
            }
            <div class="flex gap-2">
                <button type="button" id="anilist-details-watchlist-btn" class="wl-btn flex-1 bg-white/10 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md md:hover:bg-white/20 md:hover:border-primary transition-colors">
                    <i class="ph ph-plus text-2xl"></i>
                </button>
                ${trailerBtnHtml}
            </div>
        </div>
        <div class="mt-8">${buildDetailsTabsHtml(visibleTabs)}</div>
    </div>`;

    const infoPanel = document.getElementById('details-panel-information');
    if (infoPanel) {
        infoPanel.innerHTML = `
            <p class="text-text-muted text-sm mb-6 leading-relaxed">${descriptionHtml}</p>
            <div class="bg-card-bg p-4 rounded border border-border-color text-sm space-y-3">
                <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                    <div><span class="text-text-muted">Status</span><p class="text-primary font-medium mt-0.5">${anilistStatus}</p></div>
                    <div><span class="text-text-muted">Episodes</span><p class="text-text-main font-medium mt-0.5">${currentAired} / ${totalEps}</p></div>
                    <div><span class="text-text-muted">Season</span><p class="text-text-main font-medium mt-0.5">${seas} ${yearStr}</p></div>
                    <div><span class="text-text-muted">Start Date</span><p class="text-text-main font-medium mt-0.5">${startDate}</p></div>
                    <div><span class="text-text-muted">Studios</span><p class="text-text-main font-medium mt-0.5">${studios.join(', ') || 'N/A'}</p></div>
                    <div><span class="text-text-muted">Genres</span><p class="text-text-main font-medium mt-0.5">${genresStr}</p></div>
                    ${tagsArr.length ? `<div class="col-span-2">
                        <span class="text-text-muted">Tags<i class="ph ph-tag ml-1"></i></span>
                        <div class="anime-tag-chips mt-1.5">${tagsArr.slice(0, 10).map(t =>
            `<button type="button" class="anime-tag-chip" onclick="browseByAnilistTag('${t.replace(/'/g, "\\'")}')">${t}</button>`
        ).join('')}</div>
                    </div>` : ''}
                </div>
                ${castHtml ? `<div class="mt-5 border-t border-border-color pt-2"><h3 class="text-base font-bold text-text-main mb-3">Cast & Voice Actors</h3>${castHtml}</div>` : ''}
            </div>`;
    }

    populateAnilistDetailsEpisodesTab(anime, resumeEp);
    if (hasRelations) populateAnilistDetailsRelationsTab(anime);
    if (hasRecs) populateAnilistDetailsRecommendationsTab(anime);

    document.getElementById('anilist-details-watchlist-btn').onclick = () => toggleWatchlist(
        anime.id, 'anime', safeTitle, anime.coverImage.extraLarge,
        'anilist-details-watchlist-btn', (anime.averageScore || 0) / 10, yearStr,
        anime.description, anilistStatus, genresStr
    );
    updateWatchlistButtonState(anime.id, 'anilist-details-watchlist-btn');

    // Only wire play button if anime is not unreleased
    const playBtn = document.getElementById('anilist-details-play-btn');
    if (playBtn) {
        playBtn.onclick = () => {
            openPlayerWithReturn(() => openAnilistPlayer(id, resumeEp));
        };
    }

    if (trailerId) {
        document.getElementById('anilist-details-trailer-btn').onclick = () =>
            openTrailerModal([{ key: trailerId, name: 'Main Trailer', site: 'YouTube' }]);
    }
}
function toggleEpisodeSort() {
    appState.episodeSort = appState.episodeSort === 'asc' ? 'desc' : 'asc';
    const btn = document.getElementById('ep-sort-btn');
    if (btn) btn.innerHTML = `<i class="ph ph-sort-ascending mr-1"></i> ${appState.episodeSort === 'asc' ? 'Oldest' : 'Newest'}`;

    if (appState.details.id && appState.details.type === 'anime' && appState.anilist.currentAnime) {
        populateAnilistDetailsEpisodesTab(appState.anilist.currentAnime, getAnilistResumeEpisode(appState.anilist.currentAnime));
    } else if (appState.details.id && appState.details.type === 'tv' && window.renderDetailsTMDBEpisodes) {
        window.renderDetailsTMDBEpisodes();
    }
}

function toggleEpisodeView() {
    appState.episodeViewMode = appState.episodeViewMode === 'thumbnails' ? 'numbers' : 'thumbnails';
    const btn = document.getElementById('ep-view-btn');
    if (btn) {
        btn.innerHTML = appState.episodeViewMode === 'thumbnails' ? '<i class="ph ph-grid-nine"></i>' : '<i class="ph ph-list"></i>';
    }
    if (window.renderDetailsTMDBEpisodes) window.renderDetailsTMDBEpisodes();
}

function renderEpisodeList(containerId, episodes, type, currentEp, onPlayClick, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const layout = options.layout || 'player';
    const coverStill = options.coverStill || null;

    let data = [];
    if (type === 'anilist') {
        const count = typeof episodes === 'number' ? episodes : 0;
        for (let i = 1; i <= count; i++) {
            data.push({
                number: i,
                title: `Episode ${i}`,
                id: i,
                still: coverStill,
                overview: '',
                air_date: ''
            });
        }
    } else {
        data = episodes.map(e => ({
            number: e.episode_number,
            title: e.name,
            id: e.id,
            still: e.still_path,
            overview: e.overview,
            air_date: e.air_date,
            runtime: e.runtime
        }));
    }

    if (appState.episodeSort === 'desc') data.reverse();

    const isThumbMode = layout === 'details' || (appState.episodeViewMode === 'thumbnails' && type !== 'anilist');

    if (isThumbMode) {
        container.className = 'flex flex-col gap-3';
    } else {
        container.className = 'grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2';
    }

    data.forEach(ep => {
        const isCurrent = ep.number == currentEp;
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group w-full';

        if (isThumbMode) {
            wrapper.className = `w-full relative group cursor-pointer flex flex-col rounded-lg border transition-colors ${isCurrent ? 'border-primary bg-primary/10' : 'border-border-color bg-card-bg md:hover:border-primary/50'}`;
            wrapper.onclick = () => onPlayClick(ep.number);

            const imgUrl = ep.still
                ? (String(ep.still).startsWith('http') ? ep.still : IMG_URL + ep.still)
                : 'https://placehold.co/300x170/202125/FFF?text=Ep+' + ep.number;
            const overviewText = ep.overview || 'No description available.';
            const dateText = ep.air_date || '';
            let relDate = '';
            if (dateText) relDate = new Date(dateText).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const metaParts = [];
            if (relDate) metaParts.push(relDate);
            if (ep.runtime) metaParts.push(`${ep.runtime}m`);
            const metaLine = metaParts.length
                ? `<p class="text-[11px] text-text-muted font-medium mb-2">${metaParts.join(' · ')}</p>`
                : '';
            const safeTitle = (ep.title || '').replace(/"/g, '&quot;');

            wrapper.innerHTML = `
                <div class="flex flex-col sm:flex-row gap-3 p-3 items-start">
                    <div class="w-full sm:w-40 aspect-video flex-shrink-0 relative rounded overflow-hidden shadow-sm bg-[#020617]">
                        <img src="${imgUrl}" alt="" class="w-full h-full object-cover opacity-90 md:group-hover:opacity-100 transition-opacity">
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity z-10 bg-[#020617]/30">
                            <i class="ph-fill ph-play text-white text-3xl drop-shadow-lg"></i>
                        </div>
                        ${isCurrent ? '<div class="absolute top-1 left-1 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded z-20">Now playing</div>' : ''}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-bold text-white leading-tight mb-1"><span class="text-primary mr-1">E${ep.number}</span>${ep.title}</h4>
                        ${metaLine}
                        <p class="text-xs text-text-muted leading-relaxed line-clamp-3">${overviewText.replace(/</g, '&lt;')}</p>
                    </div>
                </div>`;
        } else {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.onclick = () => onPlayClick(ep.number);
            btn.className = `w-full p-2 rounded border border-border-color text-xs transition-colors truncate ${isCurrent ? 'bg-primary text-white font-bold border-primary' : 'bg-input-bg text-white md:hover:border-primary md:hover:text-primary'}`;
            btn.innerText = ep.number;
            btn.title = ep.title;
            wrapper.appendChild(btn);
        }

        container.appendChild(wrapper);
    });
}

// Updated for separated view (player only — episodes/relations/recs live in details)
async function openAnilistPlayer(id, startEpisode = 1) {
    router('anilist-player');
    setPlayerViewActive(true);
    window.scrollTo(0, 0);
    const state = appState.anilist;
    const targetId = parseInt(id, 10);

    document.getElementById('anilist-player-title').innerText = 'Loading...';

    if (!state.currentAnime || state.currentAnime.id !== targetId) {
        loader.show();
        const query = `query ($id: Int) { Media(id: $id) { 
                    id title { romaji english } coverImage { extraLarge } bannerImage 
                    episodes nextAiringEpisode { episode } status averageScore seasonYear description
                } }`;
        const data = await fetchAnilist(query, { id: targetId });
        if (!data || !data.Media) { loader.hide(); return; }
        state.currentAnime = data.Media;
        loader.hide();
    }

    state.currentEp = startEpisode;
    const anime = state.currentAnime;
    const title = anime.title.english || anime.title.romaji;
    document.getElementById('anilist-player-title').innerText = title;

    // ── Server selector (Anime player) ─────────────────────────────
    // Panel is rendered inline inside a relative-positioned wrapper so it
    // doesn't need body-appending, getBoundingClientRect, or stored IDs.
    const serverBtnContainer = document.getElementById('anime-server-buttons');
    serverBtnContainer.innerHTML = '';

    // Build wrapper → toggle button + inline panel
    const srvWrapper = document.createElement('div');
    srvWrapper.style.position = 'relative';

    const activeSrcIdx = state.currentServerIdx;
    const activeSrc = ANIME_SOURCES[activeSrcIdx];
    const activeLabel = activeSrc ? `Server ${activeSrc.name}` : 'Server';

    const srvToggleBtn = document.createElement('button');
    srvToggleBtn.className = 'server-toggle-btn';
    srvToggleBtn.innerHTML = `<i class="ph ph-hard-drives"></i> ${activeLabel} <i class="ph ph-caret-down" style="font-size:0.65rem;opacity:0.7"></i>`;

    const srvPanel = document.createElement('div');
    srvPanel.className = 'server-panel';

    const closeSrvPanel = () => {
        srvPanel.classList.remove('open');
        srvToggleBtn.classList.remove('open');
    };

    srvToggleBtn.onclick = (e) => {
        e.stopPropagation();
        const isOpen = srvPanel.classList.contains('open');
        document.querySelectorAll('.server-panel.open').forEach(p => p.classList.remove('open'));
        document.querySelectorAll('.server-toggle-btn.open').forEach(b => b.classList.remove('open'));
        if (!isOpen) {
            srvPanel.classList.add('open');
            srvToggleBtn.classList.add('open');
        }
    };

    const srvOutsideClick = (e) => {
        if (!srvWrapper.contains(e.target)) closeSrvPanel();
    };
    document.addEventListener('click', srvOutsideClick);

    ANIME_SOURCES.forEach((src, idx) => {
        const item = document.createElement('div');
        item.className = `server-panel-item${idx === state.currentServerIdx ? ' active' : ''}`;
        const dot = document.createElement('span');
        dot.className = 'server-dot';
        const label = document.createElement('span');
        label.textContent = `Server ${src.name}`;
        item.append(dot, label);
        item.onclick = (e) => {
            e.stopPropagation();
            state.currentServerIdx = idx;
            srvPanel.querySelectorAll('.server-panel-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            srvToggleBtn.innerHTML = `<i class="ph ph-hard-drives"></i> Server ${src.name} <i class="ph ph-caret-down" style="font-size:0.65rem;opacity:0.7"></i>`;
            closeSrvPanel();
            playAnilistEp(state.currentEp);
        };
        srvPanel.appendChild(item);
    });

    srvWrapper.appendChild(srvToggleBtn);
    srvWrapper.appendChild(srvPanel);
    serverBtnContainer.appendChild(srvWrapper);

    let maxEps = anime.episodes || 12;
    if (anime.nextAiringEpisode) maxEps = anime.nextAiringEpisode.episode - 1;
    if (maxEps > 0) playAnilistEp(state.currentEp);
}

function playAnilistEp(ep) {
    appState.anilist.currentEp = ep;
    document.getElementById('anilist-player-ep').innerText = `Episode ${ep}`;
    const source = ANIME_SOURCES[appState.anilist.currentServerIdx];
    const url = source.url(appState.anilist.currentAnime.id, ep);

    document.getElementById('anilist-iframe').src = url;

    // SAVE HISTORY
    // Extract enrichment data
    const overview = appState.anilist.currentAnime.description || '';
    const vote = (appState.anilist.currentAnime.averageScore / 10).toFixed(1) || 0;
    const year = appState.anilist.currentAnime.seasonYear || '';

    addToHistory(
        appState.anilist.currentAnime.id,
        'anime',
        appState.anilist.currentAnime.title.english || appState.anilist.currentAnime.title.romaji,
        appState.anilist.currentAnime.coverImage.extraLarge,
        appState.anilist.currentAnime.bannerImage, // backdrop
        null,
        ep,
        overview, vote, year
    );

    // Update next/prev buttons state
    const prevBtn = document.getElementById('btn-anilist-prev');
    const nextBtn = document.getElementById('btn-anilist-next');
    const anime = appState.anilist.currentAnime;
    // Use aired episode count for currently airing shows, not total planned episodes
    const maxEps = anime.nextAiringEpisode
        ? anime.nextAiringEpisode.episode - 1
        : (anime.episodes || 9999);
    if (prevBtn) prevBtn.disabled = ep <= 1;
    if (nextBtn) nextBtn.disabled = ep >= maxEps;
}

function changeAnilistEp(dir) {
    const anime = appState.anilist.currentAnime;
    const maxEps = anime && anime.nextAiringEpisode
        ? anime.nextAiringEpisode.episode - 1
        : (anime && anime.episodes ? anime.episodes : 9999);
    const next = appState.anilist.currentEp + dir;
    if (next >= 1 && next <= maxEps) playAnilistEp(next);
}

/**
 * SEARCH
 */
/**
 * SEARCH
 */
function setupSearchListener(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value.trim();
            if (val.length > 0) {
                const otherId = id === 'sidebar-search-input' ? 'mobile-search-input' : 'sidebar-search-input';
                const otherEl = document.getElementById(otherId);
                if (otherEl) otherEl.value = val;
                appState.search.query = val;
                appState.search.page = 1;
                performSearch(val, 1);
                el.blur();
            }
        }
    });
}




/**          * SKELETON LOADERS (NEW)          */
function getGridSkeleton(count = 12, isLandscape = false) {
    let html = '';
    const aspectClass = isLandscape ? 'aspect-video' : 'aspect-[2/3]';
    for (let i = 0; i < count; i++) { html += '<div class=\"movie-card animate-pulse rounded-xl relative group ' + (isLandscape ? 'landscape-card' : '') + '\">' + '<div class=\"' + aspectClass + ' bg-white/5 overflow-hidden relative border border-white/5 rounded\"></div>' + '<div class=\"absolute bottom-0 left-0 w-full p-3 card-info flex flex-col gap-2\">' + '<div class=\"h-3 bg-white/10 rounded w-3/4\"></div>' + '<div class=\"flex justify-between\">' + '<div class=\"h-2 bg-white/10 rounded w-1/4\"></div>' + '<div class=\"h-2 bg-white/10 rounded w-1/4\"></div>' + '</div>' + '</div>' + '</div>'; } return html;
}
function getRowSkeleton(count = 6) {
    let html = '';
    for (let i = 0; i < count; i++) { html += '<div class=\"flex-shrink-0 w-32 sm:w-40 md:w-48 movie-card animate-pulse rounded-xl relative group\">' + '<div class=\"aspect-[2/3] bg-white/5 overflow-hidden relative border border-white/5 rounded-xl\"></div>' + '<div class=\"absolute bottom-0 left-0 w-full p-3 card-info flex flex-col gap-2\">' + '<div class=\"h-3 bg-white/10 rounded w-3/4\"></div>' + '<div class=\"flex justify-between\">' + '<div class=\"h-2 bg-white/10 rounded w-1/4\"></div>' + '<div class=\"h-2 bg-white/10 rounded w-1/4\"></div>' + '</div>' + '</div>' + '</div>'; } return html;
}
function getListSkeleton(count = 10) {
    let html = '';
    for (let i = 0; i < count; i++) { html += '<div class=\"flex items-center gap-3 animate-pulse p-2 rounded\">' + '<div class=\"w-12 h-16 bg-white/5 rounded flex-shrink-0\"></div>' + '<div class=\"flex-1 flex flex-col gap-2\">' + '<div class=\"h-3 bg-white/10 rounded w-3/4\"></div>' + '<div class=\"h-2 bg-white/10 rounded w-1/2\"></div>' + '</div>' + '</div>'; } return html;
} function getDetailsSkeleton() { return '<div class=\"w-full h-[300px] md:h-[600px] bg-white/5 animate-pulse relative\">' + '<div class=\"absolute inset-0 md:p-12 bg-gradient-to-t from-dark-bg to-transparent z-10\"></div>' + '</div>' + '<div class=\"container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pb-12 -mt-32 md:-mt-48\">' + '<div class=\"flex flex-col md:flex-row gap-8\">' + '<div class=\"w-full md:w-[220px] lg:w-[260px] flex-shrink-0 space-y-4 animate-pulse\">' + '<div id=\"tmdb-details-img\" class=\"w-[180px] h-[270px] md:w-full md:h-[390px] mx-auto md:mx-0 hidden md:block rounded shadow-2xl bg-white/5\"></div>' + '<div class=\"h-12 bg-white/10 rounded overflow-hidden w-full\"></div>' + '<div class=\"flex gap-3 w-full\">' + '<div class=\"h-12 bg-white/10 rounded overflow-hidden flex-1\"></div>' + '<div class=\"h-12 bg-white/10 rounded overflow-hidden flex-1\"></div>' + '</div>' + '</div>' + '<div class=\"flex-1 pt-4 md:pt-16 min-w-0 animate-pulse\">' + '<div class=\"flex gap-4 mb-4\">' + '<div class=\"h-4 bg-white/10 rounded w-12\"></div>' + '<div class=\"h-4 bg-white/10 rounded w-12\"></div>' + '<div class=\"h-4 bg-white/10 rounded w-12\"></div>' + '</div>' + '<div class=\"h-10 bg-white/10 rounded w-2/3 mb-4\"></div>' + '<div class=\"h-4 bg-white/10 rounded w-1/3 mb-8\"></div>' + '<div class=\"space-y-2 mb-6\">' + '<div class=\"h-4 bg-white/10 rounded w-full\"></div>' + '<div class=\"h-4 bg-white/10 rounded w-full\"></div>' + '<div class=\"h-4 bg-white/10 rounded w-3/4\"></div>' + '</div>' + '<div class=\"h-48 bg-white/5 rounded-md border border-white/5\"></div>' + '</div>' + '</div>' + '</div>'; } function getPlayerSkeleton(type) { let html = '<div class=\"container mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-12 animate-pulse\">' + '<div class=\"h-8 bg-white/10 rounded w-1/3 mb-4\"></div>' + '<div class=\"flex flex-col lg:flex-row gap-6\">' + '<div class=\"' + (type === 'tv' ? 'w-full lg:w-3/4' : 'w-full') + ' rounded overflow-hidden border border-border-color bg-[#020617] shadow-xl mb-8 lg:mb-0\">' + '<div class=\"bg-card-bg px-4 py-3 flex justify-between border-b border-white/5\">' + '<div class=\"h-5 bg-white/10 rounded w-24\"></div>' + '<div class=\"flex gap-2\"><div class=\"h-6 w-16 bg-white/10 rounded\"></div><div class=\"h-6 w-16 bg-white/10 rounded\"></div></div>' + '</div>' + '<div class=\"aspect-video bg-white/5 w-full\"></div>' + '</div>'; if (type === 'tv') { html += '<div class=\"w-full lg:w-1/4 bg-card-bg border border-border-color rounded overflow-hidden relative min-h-[400px] flex flex-col\">' + '<div class=\"p-3 border-b border-white/5 bg-[#111] flex justify-between\">' + '<div class=\"h-5 bg-white/10 rounded w-24\"></div>' + '</div>' + '<div class=\"p-3 space-y-2\">' + '<div class=\"h-10 bg-white/5 rounded w-full\"></div>' + '<div class=\"h-10 bg-white/5 rounded w-full\"></div>' + '<div class=\"h-10 bg-white/5 rounded w-full\"></div>' + '<div class=\"h-10 bg-white/5 rounded w-full\"></div>' + '</div>' + '</div>'; } html += '</div>' + '<div class=\"mt-8 text-sm space-y-3\">' + '<div class=\"h-6 bg-white/10 rounded w-48 mb-3\"></div>' + '<div class=\"flex gap-4 overflow-hidden\">' + getRowSkeleton(5) + '</div>' + '</div>' + '</div>'; return html; } async function performSearch(query, page = 1) {
    router('search');
    const grid = document.getElementById('grid-search');
    grid.innerHTML = '<p class="text-gray-400">Searching...</p>';
    document.getElementById('pag-search').innerHTML = ''; // Clear pagination

    const anilistQuery = `query ($search: String, $page: Int) { Page(page: $page, perPage: 20) { pageInfo { lastPage } media(search: $search, type: ANIME, isAdult: false) { id title { romaji english } coverImage { extraLarge } format averageScore episodes status startDate { year } seasonYear description genres } } }`;
    const anilistPromise = fetchAnilist(anilistQuery, { search: query, page: page });
    const tmdbPromise = fetchTMDB('/search/multi', { query, page: page });

    const [anilistRes, tmdbRes] = await Promise.all([anilistPromise, tmdbPromise]);

    // Update Header
    document.getElementById('search-header').innerText = `Search Results for '${query}'`;

    grid.innerHTML = '';

    let hasResults = false;
    let maxPages = 1;

    const animeItems = (anilistRes && anilistRes.Page.media)
        ? anilistRes.Page.media.map(mapAnilistToShared)
        : [];

    const filteredTmdb = (tmdbRes && tmdbRes.results)
        ? tmdbRes.results.filter(i => {
            const isMedia = i.media_type === 'movie' || i.media_type === 'tv' || i.media_type === 'person';
            const isAnime = i.genre_ids && i.genre_ids.includes(16) && i.origin_country && i.origin_country.includes('JP');
            if (i.media_type === 'person') return true;
            return isMedia && !isAnime;
        })
        : [];

    // Determine whether the query is anime-dominant:
    // Anime comes first when AniList returned results AND either:
    //   - the top AniList result's title closely matches the query (direct anime search), OR
    //   - AniList returned more results than TMDB filtered results (query is anime-heavy)
    const queryLower = query.toLowerCase().trim();
    const topAnimeTitle = animeItems.length > 0
        ? ((animeItems[0].title || animeItems[0].name || '').toLowerCase())
        : '';
    const isDirectAnimeMatch = topAnimeTitle && (
        topAnimeTitle.includes(queryLower) || queryLower.includes(topAnimeTitle.split(' ')[0])
    );
    const animeIsDominant = animeItems.length > 0 && (isDirectAnimeMatch || animeItems.length >= filteredTmdb.length);

    if (animeIsDominant) {
        // Anime-first order
        renderAnilistGrid('grid-search', animeItems, false, true);
        if (animeItems.length > 0) hasResults = true;
        if (anilistRes && anilistRes.Page.pageInfo.lastPage > maxPages) maxPages = anilistRes.Page.pageInfo.lastPage;

        await renderTMDBGrid('grid-search', filteredTmdb, null, false, true);
        if (filteredTmdb.length > 0) hasResults = true;
        if (tmdbRes && tmdbRes.total_pages > maxPages) maxPages = tmdbRes.total_pages;
    } else {
        // TMDB-first order (movies/TV dominant)
        await renderTMDBGrid('grid-search', filteredTmdb, null, false, true);
        if (filteredTmdb.length > 0) hasResults = true;
        if (tmdbRes && tmdbRes.total_pages > maxPages) maxPages = tmdbRes.total_pages;

        renderAnilistGrid('grid-search', animeItems, false, true);
        if (animeItems.length > 0) hasResults = true;
        if (anilistRes && anilistRes.Page.pageInfo.lastPage > maxPages) maxPages = anilistRes.Page.pageInfo.lastPage;
    }

    if (!hasResults) {
        grid.innerHTML = '<p class="text-gray-400">No results found.</p>';
    } else {
        renderPagination('pag-search', page, maxPages, (newPage) => {
            appState.search.page = newPage;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            performSearch(appState.search.query, newPage);
        });
    }
}

/**
 * RENDERERS
 */
// Updated wrapper to route to new functions
// ============================================================
// DETAILS MODAL — open / close helpers
// ============================================================

// Track whether the details modal itself holds a scroll lock.
// This avoids relying on the shared scrollLockCount for details-modal state,
// which can get out of sync when recommendation cards are opened multiple times
// within an already-open modal (each navigation would re-enter openDetailsModal
// and potentially mis-count locks, leaving the body scroll-locked after close).
let detailsModalOwnsLock = false;

function openDetailsModal(title) {
    const modal = document.getElementById('details-modal');
    const titleEl = document.getElementById('details-modal-title');
    if (titleEl) titleEl.textContent = title || '';
    if (isDiscoverResultsModalOpen()) {
        appState.discover.restoreResultsOnPlayerReturn = true;
    }

    // Reset modal content scroll to top when navigating to a new item
    // (recommendation tap while the modal is already open)
    const content = document.getElementById('details-modal-content');
    if (content) content.scrollTop = 0;

    const isAlreadyOpen = modal.classList.contains('open');
    modal.classList.add('open');

    // Only acquire a scroll lock once — no matter how many recommendations
    // the user opens in a row while the modal stays open.
    if (!isAlreadyOpen && !detailsModalOwnsLock) {
        detailsModalOwnsLock = true;
        lockBodyScroll();
    }
}

function closeDetailsModal(options = {}) {
    const preserveDetails = options.preserveDetails === true;
    const modal = document.getElementById('details-modal');
    modal.classList.remove('open');

    // Release the scroll lock only if this modal actually acquired one.
    // This prevents over-decrementing scrollLockCount when the modal was
    // closed and re-opened (e.g. via player return) without going through
    // the full open flow.
    if (detailsModalOwnsLock) {
        detailsModalOwnsLock = false;
        unlockBodyScroll();
    }

    const bgPlayer = modal.querySelector('iframe[id$="-bg-player"]');
    if (bgPlayer) bgPlayer.src = '';

    if (!preserveDetails) {
        appState.details = { id: null, type: null, activeTab: 'information', tvSeason: 1 };
    }

    clearDetailsTransitionName();
    activeCardElement = null;

    modal.addEventListener('transitionend', () => {
        if (!modal.classList.contains('open')) {
            const contentEl = document.getElementById('details-modal-content');
            if (contentEl) {
                contentEl.scrollTop = 0;
                contentEl.innerHTML = '';
            }
            if (!preserveDetails) {
                const titleEl = document.getElementById('details-modal-title');
                if (titleEl) titleEl.textContent = '';
            }
        }
    }, { once: true });
}

function handleDetailsModalBackdropClick(e) {
    if (e.target === document.getElementById('details-modal')) {
        closeDetailsModal();
    }
}

// ============================================================
// DETAILS MODAL — skeleton
// ============================================================
function getModalDetailsSkeleton() {
    return `
        <div class="animate-pulse p-6">
            <div class="w-full h-48 md:h-64 skeleton-line rounded-xl mb-6"></div>
            <div class="flex gap-6">
                <div class="w-32 md:w-44 flex-shrink-0">
                    <div class="w-full aspect-[2/3] skeleton-line rounded-lg"></div>
                </div>
                <div class="flex-1 space-y-3 pt-2">
                    <div class="h-3 skeleton-line rounded w-1/3"></div>
                    <div class="h-7 skeleton-line rounded w-3/4"></div>
                    <div class="h-3 skeleton-line rounded w-1/2"></div>
                    <div class="h-10 skeleton-line rounded w-full mt-4"></div>
                    <div class="h-10 skeleton-line rounded w-full"></div>
                    <div class="space-y-2 mt-4">
                        <div class="h-3 skeleton-line rounded w-full"></div>
                        <div class="h-3 skeleton-line rounded w-full"></div>
                        <div class="h-3 skeleton-line rounded w-4/5"></div>
                    </div>
                </div>
            </div>
        </div>`;
}

// If season or ep is provided, it implies a "Resume" or specific play action, so go to Player.
function openDetailsWrapper(id, type, season, ep, cardElement) {
    const doOpen = () => {
        if (season !== undefined || ep !== undefined) {
            if (type === 'anime') openAnilistPlayer(id, ep || 1);
            else openTMDBPlayer(id, type, season || 1, ep || 1);
        } else {
            if (type === 'anime') openAnilistDetails(id);
            else openTMDBDetails(id, type);
        }
    };

    if (cardElement && season === undefined && ep === undefined) {
        transitionToDetails(cardElement, doOpen);
    } else {
        doOpen();
    }
}

async function fetchAndDetermineStatus(type, id) {
    try {
        const details = await fetchTMDB(`/${type}/${id}`, {}, false);
        return details.status;
    } catch (error) {
        console.error(`Error fetching status for ${type} ID ${id}:`, error);
        return null;
    }
}

function renderTop10List(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    let html = '';
    items.forEach((item, index) => {
        const imgPath = item.poster_path || item.profile_path;
        if (!imgPath) return;
        const posterUrl = getPosterUrl(imgPath);
        const num = index + 1;
        const type = item.media_type || 'movie';

        html += `
                <div class="relative flex items-end shrink-0 cursor-pointer group w-[220px] sm:w-[260px] md:w-[300px]" onclick="openDetailsWrapper(${item.id}, '${type}', undefined, undefined, this)">
                    <img src="${posterUrl}" class="w-40 sm:w-48 md:w-56 rounded md:rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.8)] z-10 transition-transform duration-300 md:group-hover:-translate-y-2 md:group-hover:scale-105 ml-8" />
                    <span class="absolute -left-6 md:-left-10 -bottom-4 md:-bottom-6 text-[100px] sm:text-[140px] md:text-[160px] font-black leading-none z-10 select-none md:group-hover:scale-105 transition-transform" style="color: transparent; -webkit-text-stroke: 2px #cae962;">${num}</span>
                </div>
                `;
    });
    container.innerHTML = html;
}

async function renderTMDBGrid(containerId, items, typeOverride, isHorizontal = false, append = false) {
    const container = document.getElementById(containerId);
    const renderToken = Math.random().toString(36);
    if (!append) {
        container.innerHTML = '';
        container.dataset.renderToken = renderToken;
    }

    const seenIds = new Set();
    if (append) {
        Array.from(container.children).forEach(child => {
            if (child.dataset && child.dataset.id) {
                seenIds.add(child.dataset.id + '-' + child.dataset.type);
            }
        });
    }

    for (const item of items) {
        if (!append && container.dataset.renderToken !== renderToken) return;

        const type = typeOverride || (item.media_type || 'movie');
        const uniqueKey = item.id + '-' + type;
        if (seenIds.has(uniqueKey)) continue;
        seenIds.add(uniqueKey);

        // If person, use profile_path, else poster_path
        const imgPath = item.poster_path || item.profile_path;
        if (!imgPath) continue;

        // --- NEW ANIME FILTER: Do not render items that are likely anime ---
        // Only check for non-person items. People don't have genre_ids.
        if (item.media_type !== 'person') {
            if (item.genre_ids && item.genre_ids.includes(16) && item.origin_country && item.origin_country.includes('JP')) {
                continue;
            }
        }

        const title = item.title || item.name;
        if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u3131-\uD79D\uAC00-\uD7A3]/.test(title)) continue;
        const date = item.release_date || item.first_air_date || 'N/A';
        const year = date !== 'N/A' ? date.split('-')[0] : '';

        // --- MODIFIED: Use Backdrop if Horizontal (Landscape) ---
        let posterUrl;
        if (isHorizontal && item.backdrop_path) {
            posterUrl = item.backdrop_path.startsWith('http') ? item.backdrop_path : IMG_URL + item.backdrop_path;
        } else {
            posterUrl = getPosterUrl(imgPath);
        }

        // Handling for Person Type
        if (type === 'person') {
            const card = createCardHTML(item.id, 'actor', title, posterUrl, item.popularity, '', '', false, 'Actor');
            // Override click for actors
            card.onclick = () => openActorDetails(item.id);
            const isDuplicate = Array.from(container.children).some(c => c.dataset.id == item.id && c.dataset.type == 'actor');
            if (!isDuplicate) container.appendChild(card);
            continue;
        }

        const tmdbStatus = await fetchAndDetermineStatus(type, item.id);
        if (!append && container.dataset.renderToken !== renderToken) return;

        let displayStatus = tmdbStatus || item.status;

        if (!displayStatus && (item.release_date || item.first_air_date)) {
            const releaseDate = new Date(item.release_date || item.first_air_date);
            const now = new Date();
            displayStatus = releaseDate > now ? 'Upcoming' : 'Released';
        }

        // Custom Status Overrides
        if (type === 'movie' && displayStatus === 'Released') displayStatus = 'Released';
        if (type === 'tv' && displayStatus === 'Returning Series') displayStatus = 'Releasing';

        // Status badge removed — only rating/popularity badges are shown on cards
        const statusBadge = '';

        // Genre Mapping
        const genreList = type === 'tv' ? TV_GENRES : MOVIE_GENRES;
        const genres = item.genre_ids ? item.genre_ids.map(id => genreList.find(g => g.id === id)?.name).filter(Boolean).slice(0, 3).join(', ') : '';

        // Rank badge for Popular and Top Rated tabs (top 100 only)
        let tmdbRank = null;
        const tmdbSort = containerId === 'grid-movies' ? appState.tmdb.movies.filters.sort
                       : containerId === 'grid-tv'     ? appState.tmdb.tv.filters.sort
                       : null;
        if (tmdbSort && ['popularity.desc', 'top_rated'].includes(tmdbSort)) {
            const sectionKey = containerId === 'grid-movies' ? 'movies' : 'tv';
            const currentPage = appState.tmdb[sectionKey].page;
            const itemsPerPage = 40; // double-fetch gives ~40 items per UI page
            const itemIndex = Array.from(container.children).length; // position in current grid
            const rankNum = (currentPage - 1) * itemsPerPage + itemIndex + 1;
            if (rankNum <= 100) tmdbRank = rankNum;
        }

        // Show popularity percentage badge on the Popular tab
        const popularityScore = (tmdbSort === 'popularity.desc' && item.vote_average)
            ? Math.round(item.vote_average * 10)
            : null;

        // Show star rating badge only on the Top Rated tab
        const showRatingBadge = tmdbSort === 'top_rated';

        const card = createCardHTML(item.id, type, title, posterUrl, item.vote_average, year, statusBadge, isHorizontal, item.overview, genres, displayStatus, tmdbRank, popularityScore, showRatingBadge);
        const isDuplicate = Array.from(container.children).some(c => c.dataset.id == item.id && c.dataset.type == type);
        if (!isDuplicate) container.appendChild(card);
    }
}

function renderAnilistGrid(containerId, items, isHorizontal = false, append = false) {
    const container = document.getElementById(containerId);
    if (!append) container.innerHTML = '';

    const seenIds = new Set();
    if (append) {
        Array.from(container.children).forEach(child => {
            if (child.dataset && child.dataset.id) {
                seenIds.add(child.dataset.id + '-' + child.dataset.type);
            }
        });
    }

    items.forEach((item, index) => {
        const type = 'anime';
        const uniqueKey = item.id + '-' + type;
        if (seenIds.has(uniqueKey)) return;
        seenIds.add(uniqueKey);

        if (!item.poster_path) return;
        const title = item.title || item.name;
        const date = item.release_date || 'N/A';
        const year = date !== 'N/A' ? date.split('-')[0] : '';

        // --- MODIFIED: Use Banner/Backdrop if Horizontal (Landscape) ---
        let posterUrl;
        if (isHorizontal && item.backdrop_path) {
            posterUrl = item.backdrop_path.startsWith('http') ? item.backdrop_path : IMG_URL + item.backdrop_path;
        } else {
            posterUrl = getPosterUrl(item.poster_path);
        }

        let aniStatus = '';
        if (item.format === 'MOVIE') aniStatus = 'Movie';
        else if (item.status) {
            aniStatus = item.status.replace(/_/g, ' ');
            if (item.status === 'RELEASING') aniStatus = 'Releasing';
        }

        // Only show a badge for "Episode N added" (Recently Updated tab).
        // All other status badges (Releasing, Movie, etc.) are hidden.
        const recentEpBadge = item.recentEpisode != null
            ? `<div class="absolute -top-2.5 -left-2.5 z-30 flex items-left justify-left w-auto h-9 anime-rank-badge">
                    <span class="absolute w-fit whitespace-nowrap px-2.5 py-2.5 flex bg-text-main rounded text-dark-bg font-extrabold text-[10px] leading-none mt-[-1px]">
                    EP ${item.recentEpisode} Added</span>
               </div>`
            : '';
        const statusBadge = '';

        const genres = item.genres ? item.genres.slice(0, 3).join(', ') : '';

        // Compute rank if on the Popular, Top Rated, or Top Anime Movies tab and it is within top 100
        let rank = null;
        if (containerId === 'grid-anilist' &&
            ['POPULARITY_DESC', 'SCORE_DESC', 'TOP_ANIME_MOVIES'].includes(appState.anilist.filters.sort)) {
            rank = (appState.anilist.page - 1) * 24 + index + 1;
            if (rank > 100) {
                rank = null;
            }
        }

        // Show popularity percentage badge on the Popular tab
        const popularityScore = (containerId === 'grid-anilist' && appState.anilist.filters.sort === 'POPULARITY_DESC' && item.vote_average)
            ? Math.round(item.vote_average * 10)
            : null;

        // Show star rating badge only on the Top Rated tab
        const showRatingBadge = containerId === 'grid-anilist' && appState.anilist.filters.sort === 'SCORE_DESC';

        const card = createCardHTML(item.id, type, title, posterUrl, item.vote_average, year, statusBadge, isHorizontal, item.overview, genres, aniStatus, rank, popularityScore, showRatingBadge, recentEpBadge);
        container.appendChild(card);
    });
}

function createCardHTML(id, type, title, posterUrl, vote, year, statusBadge, isHorizontal, overview, genres, statusText, rank = null, popularityScore = null, showRatingBadge = false, recentEpBadge = '') {
    const card = document.createElement('div');
    const widthClass = isHorizontal ? 'landscape-card' : '';
    const hasRankClass = (rank || recentEpBadge) ? 'has-rank' : '';
    card.className = `movie-card rounded-md cursor-pointer relative group ${widthClass} ${hasRankClass}`;
    card.dataset.id = id;
    card.dataset.type = type;

    const aspectClass = isHorizontal ? 'aspect-video' : 'aspect-[2/3]';

    // Normalize vote
    const numericVote = vote !== null && vote !== undefined && !isNaN(vote) ? Number(vote) : null;
    const voteDisplay = numericVote !== null && numericVote > 0 ? numericVote.toFixed(1) : '0';

    // Safe strings
    const safeTitle = (title || '').replace(/'/g, "");
    const safeYear = year || '';
    const safeOverview = overview ? overview.replace(/"/g, '&quot;') : 'No description available.';
    const isWatchlisted = appState.watchlist.some(i => i.id == id);

    // Generate a unique ID for the watchlist button in this specific card instance
    const btnId = `wl-${id}-${Math.random().toString(36).substr(2, 6)}`;

    card.innerHTML = `
                <!-- RANKING / EPISODE BADGE -->
                ${rank ? `
                <div class="absolute -top-2.5 -left-2.5 z-30 flex items-center justify-center w-9 h-9 anime-rank-badge">
                    <i class="ph-fill ph-bookmark-simple text-main text-[45px] drop-shadow-md"></i>
                    <span class="absolute text-dark-bg font-extrabold ${rank >= 100 ? 'text-[9px]' : 'text-[11px]'} leading-none mt-[-1px]">#${rank}</span>
                </div>
                ` : (recentEpBadge || '')}

                <div class="${aspectClass} overflow-hidden relative">
                    <img src="${posterUrl}" class="w-full h-full rounded object-cover">
                    
                    ${type !== 'actor' || ''}

                    <!-- STATUS / EPISODE BADGE -->
                    ${statusBadge || ''}

                    <!-- HOVER PLAY ICON OVERLAY -->
                    ${type !== 'actor' ? `
                    <div class="absolute inset-0 bg-[#020617]/40 opacity-0 md:group-hover:opacity-100 flex items-center justify-center transition-opacity z-20 pointer-events-none">
                         <i class="mdi mdi-play-circle text-primary text-5xl drop-shadow-lg transform scale-90 md:group-hover:scale-100 transition-transform duration-300"></i>
                    </div>` : ''}

                     ${type !== 'actor' ? `
                    ${(popularityScore !== null || showRatingBadge) ? `
                    <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-yellow-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-30">
                    ${popularityScore !== null
                        ? `<i class="ph-fill ph-fire text-orange-400"></i> ${popularityScore}%`
                        : `<i class="ph-fill ph-star"></i> ${voteDisplay}`
                    }
                    </div>` : ''}` : `
                    <div class="absolute top-1.5 left-1.5 bg-[#020617]/60 text-white text-[10px] px-2 py-1 border border-primary rounded font-bold z-10">
                        <i class="ph ph-user"></i>
                    </div> ` }

                    <div class="absolute bottom-0 left-0 w-full p-3 card-info">
                        <h3 class="text-text-main text-sm font-semibold truncate transition-colors" title="${title}">
                            ${title} 
                        </h3>
                    </div>
                </div> `;

    // Main card click
    card.onclick = () => openDetailsWrapper(id, type, undefined, undefined, card);

    return card;
}

function renderPagination(containerId, current, total, callback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const max = Math.min(total, 500);
    if (max <= 1) return;

    const prev = document.createElement('button');
    prev.className = "px-3 py-1 bg-card-bg border border-border-color rounded md:hover:bg-primary md:hover:text-black disabled:opacity-50 text-text-main";
    prev.innerHTML = '<i class="ph ph-caret-left"></i>';
    prev.disabled = current === 1;
    prev.onclick = () => callback(current - 1);

    const next = document.createElement('button');
    next.className = "px-3 py-1 bg-card-bg border border-border-color rounded md:hover:bg-primary md:hover:text-black disabled:opacity-50 text-text-main";
    next.innerHTML = '<i class="ph ph-caret-right"></i>';
    next.disabled = current === max;
    next.onclick = () => callback(current + 1);

    const pageSpan = document.createElement('span');
    pageSpan.className = "px-3 py-1 text-primary font-bold";
    pageSpan.innerText = `${current} / ${max}`;

    container.append(prev, pageSpan, next);
}

async function populateTMDBDetailsEpisodesTab(mediaId, details, startSeason, startEp) {
    const panel = document.getElementById('details-panel-episodes');
    if (!panel || !details.seasons) return;

    const tvSeasons = details.seasons.filter(s => s.season_number > 0);
    if (tvSeasons.length === 0) {
        panel.innerHTML = '<p class="text-sm text-text-muted">No seasons available.</p>';
        return;
    }

    appState.details.tvSeason = startSeason;
    window.detailsTMDBContext = {
        id: mediaId,
        type: 'tv',
        details,
        season: startSeason,
        currentEp: startEp,
        episodes: []
    };

    const seasonOptions = tvSeasons.map(s =>
        `<option value="${s.season_number}"${s.season_number === startSeason ? ' selected' : ''}>${s.name || 'Season ' + s.season_number}</option>`
    ).join('');

    panel.innerHTML = `
        <div class="details-episodes-toolbar">
            <h3 class="text-base font-bold text-text-main">Episodes</h3>
            <div class="flex flex-wrap items-center gap-2">
                ${tvSeasons.length > 1 ? `<select id="details-season-select" class="details-season-select" onchange="onDetailsSeasonChange(this.value)">${seasonOptions}</select>` : ''}
                <button type="button" id="ep-sort-btn" onclick="toggleEpisodeSort()" class="px-3 py-1.5 text-xs rounded-lg border border-border-color bg-input-bg text-text-main md:hover:border-primary transition-colors">
                    <i class="ph ph-sort-ascending mr-1"></i> ${appState.episodeSort === 'asc' ? 'Oldest' : 'Newest'}
                </button>
            </div>
        </div>
        <div id="details-episodes-list" class="flex flex-col gap-3 mt-2"></div>`;

    await loadDetailsTVSeasonEpisodes(mediaId, startSeason, startEp);
}

window.onDetailsSeasonChange = async function (seasonVal) {
    const seasonNum = parseInt(seasonVal, 10);
    if (!window.detailsTMDBContext) return;
    appState.details.tvSeason = seasonNum;
    window.detailsTMDBContext.season = seasonNum;
    window.detailsTMDBContext.currentEp = 1;
    await loadDetailsTVSeasonEpisodes(window.detailsTMDBContext.id, seasonNum, 1);
};

async function loadDetailsTVSeasonEpisodes(mediaId, seasonNum, currentEp) {
    const list = document.getElementById('details-episodes-list');
    if (!list) return;
    list.innerHTML = '<p class="text-sm text-text-muted">Loading episodes...</p>';

    try {
        const seasonData = await fetchTMDB(`/tv/${mediaId}/season/${seasonNum}`);
        if (!seasonData || !seasonData.episodes) {
            list.innerHTML = '<p class="text-sm text-text-muted">No episodes found.</p>';
            return;
        }
        const now = new Date();
        const released = seasonData.episodes.filter(e => e.air_date && new Date(e.air_date) <= now);
        if (released.length === 0) {
            list.innerHTML = '<p class="text-sm text-text-muted">No released episodes yet.</p>';
            return;
        }
        if (window.detailsTMDBContext) {
            window.detailsTMDBContext.episodes = released;
            window.detailsTMDBContext.currentEp = currentEp;
        }
        window.renderDetailsTMDBEpisodes = () => {
            renderEpisodeList('details-episodes-list', released, 'tmdb', currentEp, (newEp) => {
                openPlayerWithReturn(() => openTMDBPlayer(mediaId, 'tv', seasonNum, newEp));
            }, { layout: 'details' });
        };
        window.renderDetailsTMDBEpisodes();
    } catch (e) {
        console.error(e);
        list.innerHTML = '<p class="text-sm text-text-muted">Error loading episodes.</p>';
    }
}

function populateTMDBDetailsCollectionTab(collectionData) {
    const panel = document.getElementById('details-panel-collection');
    if (!panel) return;
    panel.innerHTML = '';
    if (!collectionData || !collectionData.parts || collectionData.parts.length === 0) {
        panel.innerHTML = '<p class="text-sm text-text-muted">No collection found.</p>';
        return;
    }
    const grid = document.createElement('div');
    grid.className = 'results-grid';
    const sortedParts = collectionData.parts.sort((a, b) =>
        new Date(a.release_date || '9999-12-31') - new Date(b.release_date || '9999-12-31'));
    sortedParts.forEach(part => {
        const imgUrl = part.poster_path ? IMG_URL + part.poster_path : 'https://placehold.co/160x240?text=No+Img';
        const partGenres = part.genre_ids
            ? part.genre_ids.map(gid => MOVIE_GENRES.find(g => g.id === gid)?.name).filter(Boolean).slice(0, 3).join(', ')
            : '';
        grid.appendChild(createCardHTML(
            part.id, 'movie', part.title, imgUrl, part.vote_average,
            part.release_date ? part.release_date.split('-')[0] : '', '', false, part.overview, partGenres
        ));
    });
    panel.appendChild(grid);
}

async function populateTMDBDetailsRecommendationsTab(mediaId, type, recommendations, details) {
    const panel = document.getElementById('details-panel-recommendations');
    if (!panel) return;
    panel.innerHTML = '';

    const grid = document.createElement('div');
    grid.id = 'details-tmdb-recommendations';
    grid.className = 'results-grid';
    panel.appendChild(grid);

    if (recommendations && recommendations.results && recommendations.results.length > 0) {
        renderTMDBGrid('details-tmdb-recommendations', recommendations.results, type, false);
        return;
    }
    if (details.genres && details.genres.length > 0) {
        const genreIds = details.genres.slice(0, 2).map(g => g.id).join(',');
        const fbData = await fetchTMDB(`/discover/${type}`, { with_genres: genreIds });
        if (fbData && fbData.results && fbData.results.length > 0) {
            renderTMDBGrid('details-tmdb-recommendations', fbData.results, type, false);
            return;
        }
    }
    panel.innerHTML = '<p class="text-sm text-text-muted">No recommendations found.</p>';
}

// NEW: Open TMDB Details (modal with tabs)
async function openTMDBDetails(id, type) {
    const content = document.getElementById('details-modal-content');
    if (!content) return;

    if (appState.details.id !== id || appState.details.type !== type) {
        appState.details = { id, type, activeTab: 'information', tvSeason: 1 };
        appState.playerReturnView = null;
    }
    content.innerHTML = getModalDetailsSkeleton();
    openDetailsModal('Loading...');

    try {
        const ratingEndpoint = type === 'movie' ? `/movie/${id}/release_dates` : `/tv/${id}/content_ratings`;
        const [details, credits, videos, images, recommendations, ratingData] = await Promise.all([
            fetchTMDB(`/${type}/${id}`, {}, false),
            fetchTMDB(`/${type}/${id}/credits`, {}, false),
            fetchTMDB(`/${type}/${id}/videos`, {}, false),
            fetchTMDB(`/${type}/${id}/images`, { include_image_language: 'en,null' }, false).catch(() => null),
            fetchTMDB(`/${type}/${id}/recommendations`, {}, false).catch(() => null),
            fetchTMDB(ratingEndpoint, {}, false).catch(() => null)
        ]);

        if (!details) { content.innerHTML = '<p class="text-center text-red-500 p-10">Error loading details.</p>'; return; }

        let collectionData = null;
        if (type === 'movie' && details.belongs_to_collection) {
            collectionData = await fetchTMDB(`/collection/${details.belongs_to_collection.id}`, {}, false).catch(() => null);
        }

        let trailerKey = null;
        if (videos && videos.results) {
            const trailer = videos.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
            if (trailer) trailerKey = trailer.key;
        }

        const historyItem = appState.continueWatching.find(i => i.id === id && i.type === type);
        let resumeSeason = 1, resumeEp = 1, btnText = 'Play', hasPlayed = false;
        if (historyItem && historyItem.season) {
            resumeSeason = historyItem.season; resumeEp = historyItem.episode;
            btnText = type === 'tv' ? `Resume S${resumeSeason} E${resumeEp}` : 'Resume';
            hasPlayed = true;
        } else if (historyItem) { btnText = 'Resume'; hasPlayed = true; }

        const title = details.title || details.name;
        const backdrop = getBackdropUrl(details.backdrop_path);
        const poster = getPosterUrl(details.poster_path);
        const runtime = type === 'movie' && details.runtime ? `${details.runtime}m` : null;
        const releaseDate = details.release_date || details.first_air_date || 'N/A';
        const rawDateString = details.release_date || details.first_air_date || null;
        let relDate = 'N/A';
        if (rawDateString) relDate = new Date(rawDateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        let status = details.status || 'N/A';
        if (type === 'tv' && status === 'Returning Series') status = 'Releasing';
        const genresHtml = details.genres ? details.genres.map(g => g.name).join(', ') : 'N/A';
        const tagline = details.tagline ? `"${details.tagline.replace(/"/g, '&quot;')}"` : '';
        const overview = details.overview ? details.overview.replace(/</g, '&lt;') : 'No overview available.';
        const safeTitle = title.replace(/['"]/g, '');
        const isUnreleased = rawDateString ? new Date(rawDateString) > new Date() : false;
        const certification = parseTMDBCertification(ratingData, type);
        const certificationBadge = certification
            ? `<span class="px-1.5 py-0.5 border border-border-color rounded text-text-main">${certification}</span>`
            : '';
        const networksHtml = type === 'tv' ? buildTMDBNetworksHtml(details.networks) : '';

        let titleOrLogoHtml = `<h1 class="text-xl md:text-3xl font-extrabold text-white mb-2 leading-tight break-words">${title}</h1>`;
        if (images && images.logos && images.logos.length > 0) {
            titleOrLogoHtml = `<img src="${IMG_URL}${images.logos[0].file_path}" alt="${safeTitle}" class="max-h-16 md:max-h-24 max-w-[80%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] mb-3 origin-left">`;
        }

        const cast = credits && credits.cast ? credits.cast.slice(0, 15) : [];
        let castHtml = '<div class="flex overflow-x-auto gap-4 pb-2 scrollbar-thin">';
        if (cast.length > 0) {
            castHtml += cast.map(c => {
                const profile = c.profile_path ? `${IMG_URL}${c.profile_path}` : 'https://placehold.co/100x100/333/555?text=No+Img';
                const safeName = c.name.replace(/['"]/g, '');
                const safeChar = c.character ? c.character.replace(/['"]/g, '') : '';
                return `<div class="flex-shrink-0 w-20 text-center cursor-pointer group" onclick="closeDetailsModal(); openActorDetails(${c.id})">
                    <img src="${profile}" alt="${safeName}" class="w-16 h-16 rounded-full object-cover mx-auto mb-1 border-2 border-border-color md:group-hover:border-primary transition-colors">
                    <p class="text-xs font-semibold text-text-main truncate md:group-hover:text-primary transition-colors" title="${safeName}">${safeName}</p>
                    <p class="text-[10px] text-text-muted truncate" title="${safeChar}">${safeChar}</p>
                </div>`;
            }).join('');
        } else { castHtml += '<p class="text-text-muted text-sm">No cast info.</p>'; }
        castHtml += '</div>';

        let trailers = videos && videos.results ? videos.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube') : [];

        const playBtnHtml = isUnreleased
            ? `<button type="button" disabled class="w-full bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded flex items-center justify-center gap-2 cursor-not-allowed"><i class="fas fa-clock"></i> Not yet released</button>`
            : `<button type="button" id="tmdb-details-play-btn" class="w-full bg-white text-black font-bold md:text-xl py-3 px-6 rounded border-2 border-transparent md:hover:border-main transition-colors flex items-center justify-center gap-2"><i class="ph-fill ph-play text-2xl"></i> ${btnText}</button>`;

        const detailsSecondaryBtnClass = 'flex-1 bg-white/10 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md md:hover:bg-white/20 md:hover:border-primary transition-colors';
        const trailerBtnHtml = trailers.length > 0
            ? `<button type="button" id="tmdb-details-trailer-btn" class="${detailsSecondaryBtnClass}" title="Trailer"><i class="ph ph-youtube-logo text-2xl"></i></button>`
            : `<button type="button" disabled class="flex-1 bg-white/10 border border-white/15 text-gray-500 font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md opacity-50 cursor-not-allowed" title="No trailer"><i class="ph ph-youtube-logo text-2xl"></i></button>`;

        const hasCollection = collectionData && collectionData.parts && collectionData.parts.length > 0;
        const hasRecs = (recommendations && recommendations.results && recommendations.results.length > 0)
            || (details.genres && details.genres.length > 0);
        const visibleTabs = ['information'];
        if (type === 'tv') visibleTabs.push('episodes');
        if (hasCollection) visibleTabs.push('collection');
        if (hasRecs) visibleTabs.push('recommendations');

        const titleEl = document.getElementById('details-modal-title');
        if (titleEl) titleEl.textContent = title;

        // Embed the trailer optimistically — the postMessage error listener will
        // fall back to the backdrop image if YouTube rejects the video at runtime.
        const showTmdbTrailer = !!trailerKey;

        let bgHtml = `<div class="w-full h-40 md:h-52 bg-cover bg-center relative overflow-hidden flex-shrink-0" style="${showTmdbTrailer ? 'background-color:#000' : `background-image:url('${backdrop}')`}">
            <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent z-10 pointer-events-none"></div>`;
        if (showTmdbTrailer) {
            bgHtml += `<iframe id="tmdb-bg-player" class="absolute w-[200%] md:w-full aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        src="https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&autohide=1&controls=0&showinfo=0&loop=1&playlist=${trailerKey}&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(location.origin)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" data-muted="true" data-fallback-bg="${backdrop}" allowfullscreen></iframe>
            <button type="button" id="tmdb-unmute-btn" onclick="toggleVolume('tmdb-bg-player','tmdb-unmute-btn')" class="absolute top-3 right-3 z-50 p-2 text-white transition-colors">
                <i class="material-icons text-sm flex items-center justify-center w-4 h-4">volume_off</i>
            </button>`;
        }
        bgHtml += `</div>`;

        content.innerHTML = bgHtml + `
        <div class="px-4 md:px-6 pb-6 -mt-12 relative z-10">
            <div class="flex gap-4 md:gap-5">
                <div class="flex-shrink-0 w-24 md:w-32">
                    <img src="${poster}" alt="${safeTitle}" class="w-full rounded shadow-2xl border border-white/10">
                </div>
                <div class="flex-1 min-w-0 pt-12 md:pt-14">
                    <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted mb-2">
                        <span class="text-yellow-500 font-bold"><i class="ph-fill ph-star mr-0.5"></i>${details.vote_average.toFixed(1)}</span>
                        <span class="px-1.5 py-0.5 border border-border-color rounded">${releaseDate.split('-')[0]}</span>
                        <span class="uppercase">${type}</span>
                        ${certificationBadge}
                    </div>
                    ${titleOrLogoHtml}
                    ${tagline ? `<p class="text-gray-400 italic text-xs mb-3">${tagline}</p>` : ''}
                </div>
            </div>
            <div class="mt-4 space-y-2">
                ${playBtnHtml}
                <div class="flex gap-2">
                    <button type="button" id="tmdb-details-watchlist-btn"
                        onclick="toggleWatchlist(${id},'${type}','${safeTitle}','${details.poster_path}','tmdb-details-watchlist-btn',${details.vote_average},'${releaseDate.split('-')[0]}','${overview.replace(/'/g, "\\'").replace(/"/g, '&quot;')}','${status}','${genresHtml.replace(/'/g, "\\'")}')"
                        class="wl-btn flex-1 bg-white/10 border border-white/15 text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-md md:hover:bg-white/20 md:hover:border-primary transition-colors">
                        <i class="ph ph-plus text-2xl"></i>
                    </button>
                    ${trailerBtnHtml}
                </div>
            </div>
            <div class="mt-8">${buildDetailsTabsHtml(visibleTabs)}</div>
        </div>`;

        const infoPanel = document.getElementById('details-panel-information');
        if (infoPanel) {
            infoPanel.innerHTML = `
                <p class="text-text-muted text-sm leading-relaxed mb-6">${overview}</p>
                <div class="bg-card-bg p-4 rounded border border-border-color text-sm space-y-3">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                        <div><span class="text-text-muted">Status</span><p class="text-primary font-medium mt-0.5">${status}</p></div>
                        <div><span class="text-text-muted">Released</span><p class="text-text-main font-medium mt-0.5">${relDate}</p></div>
                        ${runtime ? `<div><span class="text-text-muted">Runtime</span><p class="text-text-main font-medium mt-0.5">${runtime}</p></div>` : ''}
                        <div><span class="text-text-muted">Genres</span><p class="text-text-main font-medium mt-0.5">${genresHtml}</p></div>
                        ${networksHtml}
                    </div>
                    ${cast.length > 0 ? `<div class="mt-5 border-t border-border-color pt-2"><h3 class="text-base font-bold text-text-main mb-3">Cast</h3>${castHtml}</div>` : ''}
                </div>`;
        }

        if (type === 'tv') await populateTMDBDetailsEpisodesTab(id, details, resumeSeason, resumeEp);
        if (hasCollection) populateTMDBDetailsCollectionTab(collectionData);
        if (hasRecs) await populateTMDBDetailsRecommendationsTab(id, type, recommendations, details);

        updateWatchlistButtonState(id, 'tmdb-details-watchlist-btn');
        if (!isUnreleased) {
            document.getElementById('tmdb-details-play-btn').onclick = () => {
                openPlayerWithReturn(() => openTMDBPlayer(id, type, resumeSeason, resumeEp));
            };
        }
        if (trailers.length > 0) {
            document.getElementById('tmdb-details-trailer-btn').onclick = () => openTrailerModal(trailers);
        }

    } catch (error) {
        console.error('Error in openTMDBDetails:', error);
        content.innerHTML = '<p class="text-center text-red-500 p-10">An error occurred while loading details.</p>';
    } finally {
        loader.hide();
    }
}

// TRAILER MODAL FUNCTIONS
let currentTrailerList = [];

function openTrailerModal(videos) {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    const tabsContainer = document.getElementById('trailer-tabs');

    // Normalize input to array
    if (!Array.isArray(videos)) {
        // Legacy fallback if single key string passed (shouldn't happen with updated code)
        videos = [{ key: videos, name: 'Trailer', site: 'YouTube' }];
    }

    currentTrailerList = videos;
    const firstVideo = videos[0];

    if (videos.length > 1) {
        tabsContainer.classList.remove('hidden');
        tabsContainer.innerHTML = '';

        videos.forEach((video, index) => {
            const btn = document.createElement('button');
            // Style for active/inactive
            const baseClass = "px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap transition-colors border border-transparent";
            const inactiveClass = "text-gray-400 md:hover:text-white md:hover:bg-white/10";
            const activeClass = "bg-primary text-black border-primary";

            btn.className = `${baseClass} ${index === 0 ? activeClass : inactiveClass}`;
            btn.innerText = video.name;

            btn.onclick = () => {
                // Switch video
                iframe.src = `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1&origin=${encodeURIComponent(location.origin)}`;
                // Update active state
                Array.from(tabsContainer.children).forEach(c => {
                    c.className = `${baseClass} ${inactiveClass}`;
                });
                btn.className = `${baseClass} ${activeClass}`;
            };

            tabsContainer.appendChild(btn);
        });
    } else {
        tabsContainer.classList.add('hidden');
    }

    // Play first video
    if (firstVideo) {
        iframe.src = `https://www.youtube.com/embed/${firstVideo.key}?autoplay=1&rel=0&modestbranding=1&origin=${encodeURIComponent(location.origin)}`;
        modal.classList.add('open');

    }
}

function closeTrailerModal() {
    const modal = document.getElementById('trailer-modal');
    const iframe = document.getElementById('trailer-iframe');
    iframe.src = '';
    modal.classList.remove('open');

}


// NEW: Open TMDB Player View (video + server + season only)
async function openTMDBPlayer(id, type, startSeason = 1, startEpisode = 1) {
    try {
        router('tmdb-player');
        setPlayerViewActive(true);
        window.scrollTo(0, 0);
        const container = document.getElementById('tmdb-player-content');
        container.innerHTML = '<div class="container mx-auto px-6 py-24"><p class="text-text-muted">Loading player...</p></div>';
        loader.show();

        const details = await fetchTMDB(`/${type}/${id}`, {}, false);
        if (!details) { container.innerHTML = '<p class="text-center text-red-500 mt-10">Error loading player.</p>'; loader.hide(); return; }

        const title = details.title || details.name;
        const overview = details.overview || '';
        const vote = details.vote_average ? Number(details.vote_average).toFixed(1) : 0;
        const year = (details.release_date || details.first_air_date || '').split('-')[0];
        const tvSeasons = type === 'tv' && details.seasons
            ? details.seasons.filter(s => s.season_number > 0)
            : [];
        const showSeasonSelect = tvSeasons.length > 1;

        container.innerHTML = `
            <div class="container mx-auto px-6 sm:px-8 lg:px-12 pt-4 md:pt-24 pb-12">
                <div class="flex items-center gap-3 mb-4">
                    <button type="button" onclick="closePlayerAndReturn()"
                        class="inline-flex items-center gap-2 text-text-main md:hover:border-primary md:hover:text-primary transition-colors text-sm font-semibold shrink-0 min-w-0 w-full">
                        <i class="ph-bold ph-caret-left md:text-2xl text-xl shrink-0"></i> <h2 class="text-xl md:text-2xl font-extrabold text-white md:hover:border-primary md:hover:text-primary leading-none truncate flex-1 text-left">${title}</h2>
                    </button>
                    
                </div>
                <div class="w-full rounded overflow-hidden border border-border-color bg-[#020617] shadow-xl">
                    <div class="bg-card-bg px-4 py-3 flex flex-wrap gap-3 items-center border-b border-border-color justify-between">
                        <div class="flex items-center gap-2 flex-wrap"><img src="../images/G-icon.png" alt="Go Stream" class="w-4 h-4 object-cover mr-1">
                            ${showSeasonSelect ? `<select id="player-season-select" class="player-season-select" title="Season"></select>` : ''}
                            ${type === 'tv' ? `<span id="tv-player-info" class="text-primary font-bold text-sm whitespace-nowrap">${formatTmdbTvEpisodeLabel(startSeason, startEpisode, '')}</span>` : ''}
                        </div>
                        <div id="server-buttons" class="flex flex-wrap gap-2"></div>
                    </div>
                    <div class="aspect-video relative bg-[#020617]">
                        <iframe id="tmdb-player" src="" class="w-full h-full" frameborder="0" allowfullscreen></iframe>
                    </div>
                    ${type === 'tv' ? `
                    <div class="bg-card-bg px-4 py-3 flex justify-between items-center border-t border-border-color">
                        <button type="button" id="btn-tv-prev" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded md:hover:bg-gray-700 text-sm transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"><i class="ph-fill ph-skip-back"></i> Prev ep.</button>
                        <button type="button" id="btn-tv-next" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded md:hover:bg-gray-700 text-sm transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">Next ep. <i class="ph-fill ph-skip-forward"></i></button>
                    </div>` : ''}
                </div>
            </div>`;

        const iframe = document.getElementById('tmdb-player');
        const serverContainer = document.getElementById('server-buttons');
        const SOURCES = type === 'movie' ? MOVIE_SOURCES : TV_SOURCES;
        let season = startSeason;
        let ep = startEpisode;
        let activeSourceIndex = 0;

        const updateTvNavButtons = () => {
            const prevBtn = document.getElementById('btn-tv-prev');
            const nextBtn = document.getElementById('btn-tv-next');
            if (!prevBtn || !nextBtn || !window.currentTMDBEpisodes) return;
            prevBtn.disabled = !window.currentTMDBEpisodes.find(e => e.episode_number === (ep - 1));
            nextBtn.disabled = !window.currentTMDBEpisodes.find(e => e.episode_number === (ep + 1));
        };

        const updatePlayerSource = (sourceObj) => {
            if (type === 'movie') {
                iframe.src = sourceObj.url(id);
                addToHistory(id, type, title, details.poster_path, details.backdrop_path, null, null, overview, vote, year);
            } else {
                iframe.src = sourceObj.url(id, season, ep);
                addToHistory(id, type, title, details.poster_path, details.backdrop_path, season, ep, overview, vote, year);
                const info = document.getElementById('tv-player-info');
                if (info) {
                    const epObj = window.currentTMDBEpisodes
                        ? window.currentTMDBEpisodes.find(e => e.episode_number === ep)
                        : null;
                    info.textContent = formatTmdbTvEpisodeLabel(season, ep, epObj?.name || '');
                }
                updateTvNavButtons();
            }
        };

        // ── Server selector (TMDB player) ──────────────────────────────
        // The panel is rendered inline as a child of a relative-positioned
        // wrapper div so it doesn't need body-appending or getBoundingClientRect
        // gymnastics.  renderServerButtons() rebuilds everything each call and
        // removes the previous outside-click listener first.
        let _serverOutsideClick = null;

        const renderServerButtons = () => {
            // Clean up the previous outside-click listener before wiping the DOM
            if (_serverOutsideClick) {
                document.removeEventListener('click', _serverOutsideClick);
                _serverOutsideClick = null;
            }
            serverContainer.innerHTML = '';

            const activeSrc = SOURCES[activeSourceIndex];
            const activeLabel = activeSrc ? `Server ${activeSrc.name}` : 'Server';

            // Wrapper gives the panel a position:relative anchor
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';

            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'server-toggle-btn';
            toggleBtn.innerHTML = `<i class="ph ph-hard-drives"></i> ${activeLabel} <i class="ph ph-caret-down" style="font-size:0.65rem;opacity:0.7"></i>`;

            const panel = document.createElement('div');
            panel.className = 'server-panel';

            const closePanel = () => {
                panel.classList.remove('open');
                toggleBtn.classList.remove('open');
            };

            toggleBtn.onclick = (e) => {
                e.stopPropagation();
                const isOpen = panel.classList.contains('open');
                document.querySelectorAll('.server-panel.open').forEach(p => p.classList.remove('open'));
                document.querySelectorAll('.server-toggle-btn.open').forEach(b => b.classList.remove('open'));
                if (!isOpen) {
                    panel.classList.add('open');
                    toggleBtn.classList.add('open');
                }
            };

            _serverOutsideClick = (e) => {
                if (!wrapper.contains(e.target)) closePanel();
            };
            document.addEventListener('click', _serverOutsideClick);

            SOURCES.forEach((src, idx) => {
                const item = document.createElement('div');
                item.className = `server-panel-item${idx === activeSourceIndex ? ' active' : ''}`;
                const dot = document.createElement('span');
                dot.className = 'server-dot';
                const label = document.createElement('span');
                label.textContent = `Server ${src.name}`;
                item.append(dot, label);
                item.onclick = (e) => {
                    e.stopPropagation();
                    activeSourceIndex = idx;
                    panel.querySelectorAll('.server-panel-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    toggleBtn.innerHTML = `<i class="ph ph-hard-drives"></i> Server ${src.name} <i class="ph ph-caret-down" style="font-size:0.65rem;opacity:0.7"></i>`;
                    closePanel();
                    updatePlayerSource(src);
                };
                panel.appendChild(item);
            });

            wrapper.appendChild(toggleBtn);
            wrapper.appendChild(panel);
            serverContainer.appendChild(wrapper);
        };

        const loadPlayerSeasonEpisodes = async (seasonNum, keepEp) => {
            season = seasonNum;
            try {
                const seasonData = await fetchTMDB(`/tv/${id}/season/${seasonNum}`);
                const now = new Date();
                window.currentTMDBEpisodes = seasonData && seasonData.episodes
                    ? seasonData.episodes.filter(e => e.air_date && new Date(e.air_date) <= now)
                    : [];
                if (window.currentTMDBEpisodes.length > 0) {
                    const epExists = window.currentTMDBEpisodes.find(e => e.episode_number === keepEp);
                    ep = epExists ? keepEp : window.currentTMDBEpisodes[0].episode_number;
                }
            } catch (err) {
                console.error(err);
                window.currentTMDBEpisodes = [];
            }
            updatePlayerSource(SOURCES[activeSourceIndex]);
            renderServerButtons();
        };

        renderServerButtons();

        if (type === 'tv') {
            const seasonSelect = document.getElementById('player-season-select');
            if (seasonSelect) {
                tvSeasons.forEach(s => {
                    const opt = document.createElement('option');
                    opt.value = s.season_number;
                    opt.textContent = s.name || `Season ${s.season_number}`;
                    if (s.season_number === startSeason) opt.selected = true;
                    seasonSelect.appendChild(opt);
                });
                seasonSelect.onchange = () => {
                    const newSeason = parseInt(seasonSelect.value, 10);
                    loadPlayerSeasonEpisodes(newSeason, 1);
                };
            }

            const changeTvEpisode = (dir) => {
                const nextEp = ep + dir;
                if (window.currentTMDBEpisodes && window.currentTMDBEpisodes.find(e => e.episode_number === nextEp)) {
                    ep = nextEp;
                    updatePlayerSource(SOURCES[activeSourceIndex]);
                    renderServerButtons();
                }
            };
            document.getElementById('btn-tv-prev').onclick = () => changeTvEpisode(-1);
            document.getElementById('btn-tv-next').onclick = () => changeTvEpisode(1);

            await loadPlayerSeasonEpisodes(startSeason, startEpisode);
        } else {
            updatePlayerSource(SOURCES[activeSourceIndex]);
        }
    } catch (error) {
        console.error("Error in openTMDBPlayer:", error);
        document.getElementById('tmdb-player-content').innerHTML = '<p class="text-center text-red-500 mt-10">An error occurred while loading player.</p>';
    } finally {
        loader.hide();
    }
}

async function openActorDetails(id) {
    router('actor');
    const container = document.getElementById('actor-content');
    container.innerHTML = getDetailsSkeleton();
    loader.show();

    const [person, credits, externalIds] = await Promise.all([
        fetchTMDB(`/person/${id}`),
        fetchTMDB(`/person/${id}/combined_credits`),
        fetchTMDB(`/person/${id}/external_ids`)
    ]);

    if (!person) {
        container.innerHTML = '<div class="text-center text-text-muted mt-20">Error loading actor details.</div>';
        loader.hide();
        return;
    }

    const profile = person.profile_path ? IMG_URL + person.profile_path : 'https://placehold.co/300x450/333/FFF?text=No+Image';
    const name = person.name;
    const knownf = person.known_for_department;
    const knownFor = person.known_for_department == "Acting";
    const knownas = person.also_known_as.join(', ') || person.name;
    const birthday = person.birthday;
    const displayBirthday = birthday
        ? new Date(birthday).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        : 'N/A';
    const place = person.place_of_birth || 'N/A';
    const bio = person.biography || 'No biography available.';

    // Sort credits by popularity
    const sortedCredits = credits ? credits.cast.sort((a, b) => b.vote_count - a.vote_count) : [];
    // Remove duplicates
    const uniqueCredits = [];
    const seenIds = new Set();
    sortedCredits.forEach(c => {
        if (!seenIds.has(c.id)) {
            seenIds.add(c.id);
            uniqueCredits.push(c);
        }
    });

    // Social Media Links - UPDATED DESIGN
    let socialLinksHtml = '';

    // Changed 'h-50 w-50' to 'h-10 w-10' for a standard size, adjust as needed.
    // Changed 'rounded' to 'rounded-full' for a circular shape.
    const socialBtnClass = 'text-white border-2 border-border-color md:hover:border-primary text-center mt-2 inline-flex items-center justify-center m-0.5 px-3 py-2 h-10 w-10 rounded-full bg-card-bg text-xs font-bold transition-colors';

    if (externalIds) {
        if (externalIds.imdb_id) {
            // Removed redundant classes within the specific link definitions
            socialLinksHtml += `<a href="https://www.imdb.com/name/${externalIds.imdb_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-imdb text-lg"></i></a>`;
        }
        if (externalIds.facebook_id) {
            socialLinksHtml += `<a href="https://facebook.com/${externalIds.facebook_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-facebook text-lg"></i></a>`;
        }
        if (externalIds.instagram_id) {
            socialLinksHtml += `<a href="https://instagram.com/${externalIds.instagram_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-instagram text-lg"></i></a>`;
        }
        if (externalIds.twitter_id) {
            socialLinksHtml += `<a href="https://twitter.com/${externalIds.twitter_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-twitter text-lg"></i></a>`;
        }
        if (externalIds.tiktok_id) {
            socialLinksHtml += `<a href="https://tiktok.com/@${externalIds.tiktok_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-tiktok text-lg"></i></a>`;
        }
        if (externalIds.youtube_id) {
            // You didn't finish the last URL, but the class application is correct.
            socialLinksHtml += `<a href="https://youtube.com/${externalIds.youtube_id}" target="_blank" class="${socialBtnClass}"><i class="fab fa-youtube text-lg"></i></a>`;
        }
    }

    container.innerHTML = `
                <div class="w-full">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-[300px] flex-shrink-0">
                            <img src="${profile}" class="w-[200px] md:w-full mx-auto md:mx-0 rounded-lg shadow-2xl border border-border-color mb-6">
                            <h1 class="text-3xl md:text-5xl text-center block md:hidden font-extrabold text-white">${name}</h1>
                                <div class="gap-2 mb-3 text-center text-primary">${socialLinksHtml || '<span class="text-xs text-text-muted">None social accounts available</span>'}</div>
                            <div class="bg-card-bg p-5 rounded-lg border border-border-color space-y-4">
                                <h3 class="font-bold text-lg text-white border-b border-border-color pb-2">Personal Info</h3>
                                
                                <div><span class="text-text-muted text-xs block">Known For</span><span class="text-sm font-medium">${knownf}</span></div>
                                <div><span class="text-text-muted text-xs block">Gender</span><span class="text-sm font-medium">${person.gender === 1 ? 'Female' : 'Male'}</span></div>
                                <div><span class="text-text-muted text-xs block">Birthday</span><span class="text-sm font-medium">${displayBirthday}</span></div>
                                <div><span class="text-text-muted text-xs block">Place of Birth</span><span class="text-sm font-medium">${place}</span></div>
                                <div><span class="text-text-muted text-xs block">Also known as</span><span class="text-sm font-medium">${knownas}</span></div>
                            </div>
                        </div>
                        
                        <div class="flex-1">
                            <h1 class="text-3xl md:text-5xl hidden md:block font-extrabold text-white border-b border-border-color mb-6">${name}</h1>
                            
                            <div class="mb-8">
                                <h3 class="text-xl font-bold text-white mb-3">Biography</h3>
                                <p class="text-gray-300 text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2 custom-scroll">${bio}</p>
                            </div>
                            
                            <div>
                                <h3 class="text-xl font-bold text-white mb-4">Known For</h3>
                                <div id="actor-credits-grid" class="results-grid"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    if (uniqueCredits.length > 0) {
        renderTMDBGrid('actor-credits-grid', uniqueCredits, null, false, true);
    } else {
        document.getElementById('actor-credits-grid').innerHTML = '<p class="text-gray-500">No known credits.</p>';
    }

    loader.hide();
}

async function openVoiceActorDetails(id) {
    router('actor');
    const container = document.getElementById('actor-content');
    container.innerHTML = getDetailsSkeleton();
    loader.show();

    const query = `query ($id: Int) {
                Staff(id: $id) {
                    id
                    name { full native }
                    image { large }
                    description
                    gender
                    dateOfBirth { year month day }
                    homeTown
                    age
                    primaryOccupations
                    characterMedia(page: 1, perPage: 50, sort: POPULARITY_DESC) {
                        nodes {
                            id
                            title { romaji english }
                            description
                            coverImage { extraLarge }
                            format
                            averageScore
                            status
                            seasonYear
                            startDate { year }
                            genres
                        }
                    }
                }
            }`;

    const data = await fetchAnilist(query, { id });
    if (!data || !data.Staff) {
        container.innerHTML = '<div class="text-center text-text-muted mt-20">Error loading voice actor details.</div>';
        loader.hide();
        return;
    }

    const staff = data.Staff;
    const profile = staff.image ? staff.image.large : 'https://placehold.co/300x450/333/FFF?text=No+Image';
    const name = staff.name.full;
    const nativeName = staff.name.native || '';

    // --- PARSE BIO LINKS ---
    let bio = staff.description || 'No biography available.';

    // Replace markdown links [Label](URL) with Icon + Label
    bio = bio.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
        let iconClass = 'fas fa-link';
        const lowerUrl = url.toLowerCase();

        if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) iconClass = 'fab fa-twitter';
        else if (lowerUrl.includes('instagram.com')) iconClass = 'fab fa-instagram';
        else if (lowerUrl.includes('facebook.com')) iconClass = 'fab fa-facebook';
        else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) iconClass = 'ph-fill ph-youtube-logo';
        else if (lowerUrl.includes('wikipedia')) iconClass = 'fab fa-wikipedia-w';
        else if (lowerUrl.includes('tiktok.com')) iconClass = 'fab fa-tiktok';
        else if (lowerUrl.includes('ameblo.jp') || lowerUrl.includes('blog')) iconClass = 'fas fa-blog';
        else if (lowerUrl.includes('website')) iconClass = 'fas fa-globe';

        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary md:hover:text-white inline-flex items-center gap-1 mx-1 font-semibold transition-colors"><i class="${iconClass}"></i> ${label}</a>`;
    });

    // Basic Markdown formatting
    bio = bio.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/__([^_]+)__/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    let birthday = 'N/A';
    if (staff.dateOfBirth && staff.dateOfBirth.year) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const m = staff.dateOfBirth.month ? months[staff.dateOfBirth.month - 1] : '';
        const d = staff.dateOfBirth.day || '';
        const y = staff.dateOfBirth.year || '';
        birthday = `${m} ${d}, ${y}`.replace(/^ ,/, '').trim();
    }

    const place = staff.homeTown || 'N/A';
    const occupations = staff.primaryOccupations && staff.primaryOccupations.length > 0
        ? staff.primaryOccupations.join(', ')
        : 'Voice Actor';

    container.innerHTML = `
                <div class="w-full">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-[300px] flex-shrink-0">
                            <img src="${profile}" class="w-[200px] md:w-full mx-auto md:mx-0 rounded-lg shadow-2xl border border-border-color mb-6">
                            <h1 class="text-3xl md:text-5xl block md:hidden text-center font-extrabold text-white mb-6">${name}</h1>
                            
                            <div class="bg-card-bg p-5 rounded-lg border border-border-color space-y-4">
                                <h3 class="font-bold text-lg text-white border-b border-border-color pb-2">Personal Info</h3>
                                <div><span class="text-text-muted text-xs block">Occupations</span><span class="text-sm font-medium">${occupations}</span></div>
                                <div><span class="text-text-muted text-xs block">Gender</span><span class="text-sm font-medium">${staff.gender || 'Unknown'}</span></div>
                                <div><span class="text-text-muted text-xs block">Birthday</span><span class="text-sm font-medium">${birthday}</span></div>
                                <div><span class="text-text-muted text-xs block">Hometown</span><span class="text-sm font-medium">${place}</span></div>
                                ${nativeName ? `<div><span class="text-text-muted text-xs block">Native Name</span><span class="text-sm font-medium">${nativeName}</span></div>` : ''}
                            </div>
                        </div>
                        
                        <div class="flex-1">
                            <h1 class="text-3xl md:text-5xl hidden md:block font-extrabold text-white mb-6">${name}</h1>
                            
                            <div class="mb-8">
                                <h3 class="text-xl font-bold text-white mb-3">Biography</h3>
                                <div class="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto pr-2 custom-scroll">${bio}</div>
                            </div>
                            
                            <div>
                                <h3 class="text-xl font-bold text-white mb-4">Known For (Voice Roles)</h3>
                                <div id="actor-credits-grid" class="results-grid"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    if (staff.characterMedia && staff.characterMedia.nodes && staff.characterMedia.nodes.length > 0) {
        const mappedMedia = staff.characterMedia.nodes.map(mapAnilistToShared);
        renderAnilistGrid('actor-credits-grid', mappedMedia, false, false);
    } else {
        document.getElementById('actor-credits-grid').innerHTML = '<p class="text-gray-500">No known credits.</p>';
    }

    loader.hide();
}

function updatePlayerSource(sourceObj, id, type, s = 1, e = 1, poster = null, title = "", backdrop = null) {
    const iframe = document.getElementById('tmdb-player');
    if (type === 'movie') {
        iframe.src = sourceObj.url(id);
        addToHistory(id, type, title, poster, backdrop); // Save History
    } else {
        iframe.src = sourceObj.url(id, s, e);
        addToHistory(id, type, title, poster, backdrop, s, e); // Save History with S/E
    }
}

function toggleWatchlist(id, type, title, poster, btnId, vote = null, year = null, overview = null, status = null, genres = null) {
    const exists = appState.watchlist.find(i => i.id === id);
    if (exists) {
        appState.watchlist = appState.watchlist.filter(i => i.id !== id);
        showToast('Removed from Library');
    } else {
        // Store vote, year, status, genres to match default card design
        appState.watchlist.push({ id, type, title, poster_path: poster, vote_average: vote, release_date: year, overview: overview, status: status, genres: genres });
        showToast('Added to Library');
    }
    localStorage.setItem('goStreamWatchlist', JSON.stringify(appState.watchlist));
    updateWatchlistButtonState(id, btnId);
}

function updateWatchlistButtonState(id, btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const exists = appState.watchlist.find(i => i.id === id);
    // One consistent style everywhere: icon changes, class stays the same
    if (exists) {
        btn.innerHTML = `<i class="ph ph-check text-lg"></i>`;
        btn.title = 'Remove from Library';
    } else {
        btn.innerHTML = `<i class="ph ph-plus text-lg"></i>`;
        btn.title = 'Add to Library';
    }
}

function renderWatchlist() {
    const grid = document.getElementById('grid-watchlist');
    grid.innerHTML = '';
    if (appState.watchlist.length === 0) { grid.innerHTML = '<p class="text-text-muted">Your Library is empty.</p>'; return; }
    appState.watchlist.forEach(item => {
        const posterUrl = getPosterUrl(item.poster_path);

        // Use standard vertical card format
        // Pass stored vote, year, status, genres. If missing, pass defaults.
        let statusBadge = '';
        if (item.status) {
            const s = item.status.replace(/_/g, ' ');
            statusBadge = `<div class="absolute top-1.5 right-1.5 bg-[#020617]/60 text-white text-[10px] px-2 py-1 font-bold rounded border border-primary uppercase shadow-md z-10">${s}</div>`;
        }

        const card = createCardHTML(
            item.id,
            item.type,
            item.title,
            posterUrl,
            item.vote_average, // vote
            item.release_date,   // year/date
            statusBadge,   // Status badge
            false, // Vertical (grid) layout
            item.overview, // Pass overview
            item.genres, // Pass genres
            item.status // Pass raw status text
        );

        // Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.className = "absolute top-1.5 right-1.5 z-30 w-11 p-2 text-red flex bg-black/60 rounded-full items-center justify-center md:hover:text-red-600 transition-colors";
        removeBtn.innerHTML = '<i class="ph-bold ph-x-circle text-xl"></i>';
        removeBtn.title = "Remove from Library";
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeFromWatchlist(item.id);
        };

        card.querySelector('.relative').appendChild(removeBtn); // Append to the main wrapper
        grid.appendChild(card);
    });
}

function removeFromWatchlist(id) {
    appState.watchlist = appState.watchlist.filter(i => i.id !== id);
    localStorage.setItem('goStreamWatchlist', JSON.stringify(appState.watchlist));
    showToast('Removed from Library');
    renderWatchlist();
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-white text-black px-6 py-3 rounded-md shadow-xl transform transition-all duration-300 translate-y-10 opacity-0 flex items-center min-w-[200px] border-l-4 border-primary';
    toast.innerHTML = `
                <i class="fas fa-info-circle text-black mr-3 text-lg"></i>
                <span class="font-semibold text-sm">${msg}</span>
            `;
    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

function onDeviceReady() {
    console.log("Cordova Device Ready");
    var originalOpen = window.open;
    window.open = function (url, target, options) {
        return cordova.InAppBrowser ? cordova.InAppBrowser.open(url, '_self', options) : originalOpen(url, '_self', options);
    };
}
document.addEventListener('deviceready', onDeviceReady, false);

// Close Modals on Outside Click
window.onclick = function (event) {
    const moreMenuModal = document.getElementById('more-menu-modal'); // Mobile More Menu
    if (event.target === moreMenuModal) toggleMoreMenu();
}

function toggleMoreMenu() {
    const modal = document.getElementById('more-menu-modal');
    const content = document.getElementById('more-menu-content');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('translate-y-full');
        });
    } else {
        modal.classList.add('opacity-0');
        content.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

/**
 * Boot — app.js is loaded only after all HTML partials are in the DOM,
 * so we can call router directly without waiting for DOMContentLoaded.
 */
router('home');
setupSearchListener('mobile-search-input');
attachVASearchListener();



/**
 * HISTORY SECTION
 */
function switchHistoryTab(tab) {
    appState.historyTab = tab;
    renderHistory();
}

function getRelativeDate(ts) {
    if (!ts) return 'Unknown Date';
    const date = new Date(ts);
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';

    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function removeFromHistory(id, event) {
    if (event) event.stopPropagation();
    appState.continueWatching = appState.continueWatching.filter(i => i.id !== id);
    localStorage.setItem('goStreamContinueWatching', JSON.stringify(appState.continueWatching));
    renderHistory();
    showToast('Item removed from history');
}

let pendingConfirmCallback = null;

function showConfirmation(title, msg, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const titleEl = document.getElementById('confirm-title');
    const msgEl = document.getElementById('confirm-msg');
    const yesBtn = document.getElementById('confirm-yes');

    titleEl.innerText = title;
    msgEl.innerText = msg;
    pendingConfirmCallback = onConfirm;

    yesBtn.onclick = () => {
        if (pendingConfirmCallback) pendingConfirmCallback();
        hideConfirmation();
    };

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
    modal.querySelector('div').classList.add('scale-100');
}

function hideConfirmation() {
    const modal = document.getElementById('confirmation-modal');
    pendingConfirmCallback = null;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.add('scale-95');
    modal.querySelector('div').classList.remove('scale-100');
}

function clearHistory() {
    if (appState.continueWatching.length === 0) return;
    showConfirmation('Clear History', 'Are you sure you want to clear your entire history? This action cannot be undone.', () => {
        appState.continueWatching = [];
        localStorage.removeItem('goStreamContinueWatching');
        renderHistory();
        renderContinueWatching();
        showToast('History cleared');
    });
}

function renderHistory() {
    const container = document.getElementById('history-content');
    if (!container) return;
    container.innerHTML = '';

    // Update Tab Styles
    ['all', 'movie', 'tv', 'anime'].forEach(t => {
        const btn = document.getElementById(`hist-tab-${t}`);
        if (btn) {
            if (t === appState.historyTab) {
                btn.className = 'text-sm md:text-lg font-bold text-primary border-b-2 border-primary pb-2 transition-colors whitespace-nowrap';
            } else {
                btn.className = 'text-sm md:text-lg font-bold text-text-muted md:hover:text-white pb-2 transition-colors whitespace-nowrap';
            }
        }
    });

    // Add Header Controls (Clear History) if not present
    // We need to inject this into the header area, but currently renderHistory only clears 'history-content'.
    // The header is static in HTML. Let's add the button there dynamically or check if we should modify HTML.
    // Modification: modifying HTML to include a container for the button or injecting it here.
    // Let's inject a "Clear History" button at the top of the content if history !empty, or rely on static HTML modification?
    // User asked for "Clear History button in History Header". The static HTML has a header. 
    // Better to update the static HTML for the header to include the button spot, OR just prepend it here.
    // Let's prepend a controls div here.

    const filter = appState.historyTab;
    // Filter and Sort (descending timestamp)
    const history = appState.continueWatching.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    }).sort((a, b) => b.timestamp - a.timestamp);

    const controlsConfig = document.createElement('div');
    controlsConfig.className = 'flex justify-end mb-4';
    if (history.length > 0) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'flex items-center text-xs font-bold text-red-500 md:hover:text-red-400 border border-red-500 md:hover:border-red-400 rounded px-3 py-1.5 transition-colors';
        clearBtn.innerHTML = '<i class="fas fa-trash-alt mr-2"></i> Clear History';
        clearBtn.onclick = clearHistory;
        controlsConfig.appendChild(clearBtn);
        container.appendChild(controlsConfig);
    }


    if (history.length === 0) {
        container.innerHTML += '<p class="text-gray-400">No history found.</p>';
        return;
    }

    // Group by Date
    const groups = {};
    const dateKeys = [];

    history.forEach(item => {
        const dateKey = getRelativeDate(item.timestamp);
        if (!groups[dateKey]) {
            groups[dateKey] = [];
            dateKeys.push(dateKey);
        }
        groups[dateKey].push(item);
    });

    // Render Groups
    dateKeys.forEach(dateLabel => {
        // Header
        const header = document.createElement('h3');
        header.className = 'text-lg font-bold text-text-main mb-4 mt-6 first:mt-0';
        header.innerText = dateLabel;
        container.appendChild(header);

        // Grid
        const grid = document.createElement('div');
        grid.className = 'results-grid';

        groups[dateLabel].forEach(item => {
            const isAnime = item.type === 'anime';
            const badgeText = isAnime ? `EP ${item.episode || '?'}` : (item.type === 'movie' ? '' : `S${item.season} E${item.episode}`);
            const badge = badgeText ? `<div class="absolute top-1.5 left-1.5 bg-[#020617]/60 text-white text-[10px] px-2 py-1 border border-primary rounded font-bold z-10">${badgeText}</div>` : '';

            const imgUrl = item.poster ? getPosterUrl(item.poster) : 'https://placehold.co/500x750?text=No+Img';

            const card = document.createElement('div');
            card.className = 'movie-card rounded-xl cursor-pointer relative group aspect-[2/3] overflow-hidden'; // Match default card classes

            card.onclick = () => {
                if (item.type === 'movie') openTMDBPlayer(item.id, 'movie');
                else if (item.type === 'anime') openAnilistPlayer(item.id, item.episode, item.description, item.averageScore, item.year); // Updated to pass more data
                else openDetailsWrapper(item.id, item.type, item.season, item.episode);
            };

            card.innerHTML = `
                            <img src="${imgUrl}" class="w-full h-full object-cover">
                            
                            <!-- Episode/Season Badge (Left Top) -->
                            ${badge}


                            <!-- Remove Button -->
                            <button onclick="removeFromHistory(${item.id}, event)" class="absolute top-1.5 right-1.5 z-30 w-11 p-2 text-red flex bg-black/60 rounded-full items-center justify-center md:hover:text-red-600 transition-colors" title="Remove from History">
                                <i class="ph-bold ph-x-circle text-xl"></i>
                            </button>


                            <!-- Info Overlay (Bottom) -->
                            <div class="absolute bottom-0 left-0 w-full p-3 card-info">
                                <h3 class="text-text-main text-sm font-semibold truncate md:hover:text-primary transition-colors">${item.title}</h3>
                                <div class="flex justify-between items-center text-xs uppercase text-text-muted mt-1">
                                    <span class="text-[10px]">Resume</span>
                                    <span class="border border-border-color px-1 rounded text-[10px]">${item.type === 'anime' ? 'Anime' : (item.type === 'movie' ? 'Movie' : 'TV Show')}</span>
                                </div>
                            </div>
                            
                            <!-- Hover Play Overlay -->
                            <div class="absolute inset-0 bg-[#020617]/40 opacity-0 md:group-hover:opacity-100 flex items-center justify-center transition-opacity z-10 pointer-events-none">
                                <i class="mdi mdi-play-circle text-primary text-5xl drop-shadow-lg"></i>
                            </div>
                     `;
            grid.appendChild(card);
        });
        container.appendChild(grid);
    });
}



/* ============================================================
   CINEMATIC UI INTEGRATION PATCH
   Hooks enhancements.js features into existing app.js flows.
   ============================================================ */

/**
 * Override/extend updateSharedBanner to:
 * 1. Use cinematic HTML layout with new button styles
 * 2. Trigger dynamic background color extraction via Color Thief
 */
(function patchUpdateSharedBanner() {
    // Store a reference to the original function
    const _originalUpdateBanner = window.updateSharedBanner || updateSharedBanner;

    // We override via a MutationObserver on banner-content to inject color thief
    // rather than replacing the function (to preserve all existing logic cleanly).
    const observer = new MutationObserver(() => {
        const item = appState.bannerItems[appState.bannerIndex];
        if (!item) return;

        // Trigger dynamic bg color extraction from the backdrop image
        if (typeof updateDynamicBgColor === 'function') {
            const backdropUrl = getBackdropUrl(item.backdrop_path);
            updateDynamicBgColor(backdropUrl);
        }

        // Upgrade the existing Play Now / More Info buttons to cinematic style
        const contentDiv = document.getElementById('banner-content');
        if (!contentDiv) return;

        // Replace old-style white play button with cinematic button (only if not already upgraded)
        if (contentDiv.querySelector('.banner-btn-play')) return; // already upgraded
        const oldPlayBtn = contentDiv.querySelector('button');
        if (oldPlayBtn) {
            oldPlayBtn.className = 'banner-btn-play';
            // Ensure icon is present
            if (!oldPlayBtn.querySelector('i')) {
                oldPlayBtn.insertAdjacentHTML('afterbegin', '<i class="ph-fill ph-play"></i> ');
            }
        }

        // Upgrade watchlist button to info style
        const wlBtn = contentDiv.querySelector('.wl-btn');
        if (wlBtn) {
            wlBtn.className = 'banner-btn-info wl-btn';
        }

        // Upgrade title element
        const titleEl = contentDiv.querySelector('h1');
        if (titleEl && !titleEl.classList.contains('banner-title-logo')) {
            titleEl.className = 'banner-title-logo';
        }

        // Upgrade synopsis paragraph
        const synopsisEl = contentDiv.querySelector('p');
        if (synopsisEl && !synopsisEl.classList.contains('banner-synopsis')) {
            synopsisEl.className = 'banner-synopsis';
        }

        // Upgrade the meta row
        const metaDiv = contentDiv.querySelector('.flex.items-center.gap-3');
        if (metaDiv) {
            metaDiv.className = 'banner-meta-row';
        }
    });

    const contentDiv = document.getElementById('banner-content');
    if (contentDiv) {
        observer.observe(contentDiv, { childList: true, subtree: false });
    } else {
        // Wait for DOM if banner not yet available
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('banner-content');
            if (el) observer.observe(el, { childList: true, subtree: false });
        });
    }
})();


/**
 * Patch toggleWatchlist to add micro-animation on the button that was clicked.
 */
(function patchToggleWatchlist() {
    if (typeof toggleWatchlist !== 'function') return;
    const _orig = toggleWatchlist;
    window.toggleWatchlist = function (id, type, title, poster, btnId, vote, year, desc, status, genres) {
        _orig(id, type, title, poster, btnId, vote, year, desc, status, genres);
        // Animate
        if (typeof animateWatchlistBtn === 'function') {
            const btn = document.getElementById(btnId);
            const isNowInList = appState.watchlist.some(i => i.id === id);
            animateWatchlistBtn(btn, isNowInList);
        }
    };
})();


/**
 * Patch openTMDBDetails / openAnilistDetails to start idle play-pulse timer.
 */
(function patchDetailsOpen() {
    let _cleanupPulse = null;

    // Run when details modal opens
    const startPulseOnDetailsOpen = () => {
        if (typeof stopIdlePlayPulse === 'function') stopIdlePlayPulse();
        if (_cleanupPulse) { _cleanupPulse(); _cleanupPulse = null; }

        // Give the modal content time to render
        setTimeout(() => {
            const detailsContent = document.getElementById('details-modal-content');
            if (!detailsContent) return;
            // Find the primary play/watch button
            const playBtn = detailsContent.querySelector('.banner-btn-play, button[class*="bg-primary"], button[class*="bg-white"]');
            if (playBtn && typeof startIdlePlayPulse === 'function') {
                _cleanupPulse = startIdlePlayPulse(playBtn);
            }
        }, 800);
    };

    // Observe the details modal for when it opens
    const detailsModal = document.getElementById('details-modal');
    if (detailsModal) {
        const modalObserver = new MutationObserver(() => {
            if (detailsModal.classList.contains('open')) {
                startPulseOnDetailsOpen();
            } else {
                if (typeof stopIdlePlayPulse === 'function') stopIdlePlayPulse();
                if (_cleanupPulse) { _cleanupPulse(); _cleanupPulse = null; }
            }
        });
        modalObserver.observe(detailsModal, { attributes: true, attributeFilter: ['class'] });
    }
})();


/**
 * Trigger row entrance animations after home data loads.
 * Patches renderHomeRows-style containers.
 */
(function patchCarouselRows() {
    // Watch for any new horizontal-scroll-container rows added to discovery-rows
    const scanNewRows = () => {
        if (typeof observeCarouselRow !== 'function') return;
        document.querySelectorAll('.discovery-row').forEach(row => {
            if (!row.dataset.observerRegistered) {
                row.dataset.observerRegistered = '1';
                observeCarouselRow(row);
            }
        });
    };

    // Poll periodically during initial load, then back off
    let scanCount = 0;
    const interval = setInterval(() => {
        scanNewRows();
        if (++scanCount > 20) clearInterval(interval);
    }, 500);
})();
