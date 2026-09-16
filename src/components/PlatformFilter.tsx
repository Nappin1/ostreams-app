import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export interface DiscoverTarget {
  id: string;
  name: string;
  kind: 'provider' | 'network';
  targetId: number;
  color: string;
  badge: string;
  logoUrl?: string;
}

export const STREAMING_PROVIDERS: DiscoverTarget[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    kind: 'provider',
    targetId: 8,
    color: 'from-red-900/60 via-slate-900 to-slate-950 hover:border-red-500/50',
    badge: 'N',
    logoUrl: 'https://image.tmdb.org/t/p/w500/9A1JSVm2AAY2yR4qvMWhIOAFiMF.png',
  },
  {
    id: 'disney',
    name: 'Disney+',
    kind: 'provider',
    targetId: 337,
    color: 'from-blue-900/60 via-slate-900 to-slate-950 hover:border-blue-500/50',
    badge: 'D+',
    logoUrl: 'https://image.tmdb.org/t/p/w500/97yvRBwRJZdLflmYVquKQz3489P.png',
  },
  {
    id: 'appletv',
    name: 'Apple TV+',
    kind: 'provider',
    targetId: 350,
    color: 'from-slate-800/80 via-slate-900 to-slate-950 hover:border-slate-400/50',
    badge: 'tv+',
    logoUrl: 'https://image.tmdb.org/t/p/w500/2E03pXt812xWXZwPJkYwwke8MCG.png',
  },
  {
    id: 'prime',
    name: 'Prime Video',
    kind: 'provider',
    targetId: 9,
    color: 'from-sky-900/60 via-slate-900 to-slate-950 hover:border-sky-400/50',
    badge: 'PRIME',
    logoUrl: 'https://image.tmdb.org/t/p/w500/dQeAar5H9P23wqLH4jR0f7A667.png',
  },
  {
    id: 'hbo',
    name: 'Max',
    kind: 'provider',
    targetId: 1899,
    color: 'from-purple-900/60 via-slate-900 to-slate-950 hover:border-purple-500/50',
    badge: 'MAX',
    logoUrl: 'https://image.tmdb.org/t/p/w500/nm8nQO3bT1U9W7m6562gG13885.png',
  },
  {
    id: 'hulu',
    name: 'Hulu',
    kind: 'provider',
    targetId: 15,
    color: 'from-emerald-900/60 via-slate-900 to-slate-950 hover:border-emerald-500/50',
    badge: 'hulu',
    logoUrl: 'https://image.tmdb.org/t/p/w500/pqUTCleNUiTL2LE5bYFjFw1B32f.png',
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    kind: 'provider',
    targetId: 531,
    color: 'from-blue-900/60 via-slate-900 to-slate-950 hover:border-sky-500/50',
    badge: 'P+',
    logoUrl: 'https://image.tmdb.org/t/p/w500/fzvo2J0yG4a1V1l.png',
  },
];

export const TV_NETWORKS: DiscoverTarget[] = [
  {
    id: 'hbo-net',
    name: 'HBO',
    kind: 'network',
    targetId: 49,
    color: 'from-purple-900/60 via-slate-900 to-slate-950 hover:border-purple-500/50',
    badge: 'HBO',
    logoUrl: 'https://image.tmdb.org/t/p/w500/TuWyHzGie6fG9T4V9m1d.png',
  },
  {
    id: 'netflix-net',
    name: 'Netflix Original',
    kind: 'network',
    targetId: 213,
    color: 'from-red-900/60 via-slate-900 to-slate-950 hover:border-red-500/50',
    badge: 'NETFLIX',
    logoUrl: 'https://image.tmdb.org/t/p/w500/wwemzKW82xHorFiVUhF8R2vFmy.png',
  },
  {
    id: 'amc-net',
    name: 'AMC',
    kind: 'network',
    targetId: 43,
    color: 'from-amber-900/60 via-slate-900 to-slate-950 hover:border-amber-500/50',
    badge: 'AMC',
    logoUrl: 'https://image.tmdb.org/t/p/w500/1DSpJ22oV6bTZ535.png',
  },
  {
    id: 'cw-net',
    name: 'The CW',
    kind: 'network',
    targetId: 71,
    color: 'from-emerald-900/60 via-slate-900 to-slate-950 hover:border-emerald-500/50',
    badge: 'CW',
    logoUrl: 'https://image.tmdb.org/t/p/w500/26s64a0v2008.png',
  },
  {
    id: 'bbc-net',
    name: 'BBC One',
    kind: 'network',
    targetId: 4,
    color: 'from-rose-900/60 via-slate-900 to-slate-950 hover:border-rose-500/50',
    badge: 'BBC',
    logoUrl: 'https://image.tmdb.org/t/p/w500/5mG3a085.png',
  },
  {
    id: 'fx-net',
    name: 'FX',
    kind: 'network',
    targetId: 88,
    color: 'from-slate-800/80 via-slate-900 to-slate-950 hover:border-amber-500/50',
    badge: 'FX',
    logoUrl: 'https://image.tmdb.org/t/p/w500/a3i088.png',
  },
  {
    id: 'showtime-net',
    name: 'Showtime',
    kind: 'network',
    targetId: 67,
    color: 'from-red-950/80 via-slate-900 to-slate-950 hover:border-rose-500/50',
    badge: 'SHOWTIME',
    logoUrl: 'https://image.tmdb.org/t/p/w500/pE1K.png',
  },
];

export const PlatformFilter: React.FC = () => {
  const { setActivePage, setSearchQuery, setSelectedProvider } = useApp();
  const [activeTab, setActiveTab] = useState<'providers' | 'networks'>('providers');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleSelectTarget = (target: DiscoverTarget) => {
    setSearchQuery('');
    setSelectedProvider({
      kind: target.kind,
      id: target.targetId,
      name: target.name,
    });
    setActivePage('explore');
  };

  const list = activeTab === 'providers' ? STREAMING_PROVIDERS : TV_NETWORKS;

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Discover by Streaming Service & Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Explore full catalog by provider or television network</p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'providers'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Streaming Services
          </button>
          <button
            onClick={() => setActiveTab('networks')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'networks'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TV Networks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {list.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectTarget(p)}
            className={`group relative h-24 sm:h-28 rounded-2xl bg-gradient-to-br ${p.color} border border-slate-800 shadow-xl p-3 flex flex-col justify-between items-start overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-2xl`}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Badge pill */}
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 bg-black/50 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                {p.badge}
              </span>
            </div>

            {/* Logo Image or Text Fallback */}
            <div className="relative z-10 my-auto flex items-center justify-center w-full h-10">
              {p.logoUrl && !imgErrors[p.id] ? (
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  onError={() => handleImageError(p.id)}
                  className="max-h-10 max-w-[85%] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 filter brightness-110"
                />
              ) : (
                <span className="text-lg font-black tracking-widest text-white/90 uppercase drop-shadow">
                  {p.badge}
                </span>
              )}
            </div>

            {/* Name label */}
            <span className="relative z-10 text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors truncate max-w-full">
              {p.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
