import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export interface DiscoverTarget {
  id: string;
  name: string;
  kind: 'provider' | 'network';
  targetId: number;
  color: string;
  badge: string;
}

export const STREAMING_PROVIDERS: DiscoverTarget[] = [
  { id: 'netflix', name: 'Netflix', kind: 'provider', targetId: 8, color: 'from-red-600 to-rose-700', badge: 'N' },
  { id: 'disney', name: 'Disney+', kind: 'provider', targetId: 337, color: 'from-blue-600 to-indigo-700', badge: 'D+' },
  { id: 'appletv', name: 'Apple TV+', kind: 'provider', targetId: 350, color: 'from-slate-700 to-slate-900', badge: 'tv+' },
  { id: 'prime', name: 'Prime Video', kind: 'provider', targetId: 9, color: 'from-cyan-600 to-blue-700', badge: 'PRIME' },
  { id: 'hbo', name: 'HBO Max', kind: 'provider', targetId: 1899, color: 'from-purple-600 to-indigo-800', badge: 'MAX' },
  { id: 'hulu', name: 'Hulu', kind: 'provider', targetId: 15, color: 'from-emerald-500 to-teal-700', badge: 'hulu' },
  { id: 'paramount', name: 'Paramount+', kind: 'provider', targetId: 531, color: 'from-blue-500 to-sky-700', badge: 'P+' },
];

export const TV_NETWORKS: DiscoverTarget[] = [
  { id: 'hbo-net', name: 'HBO', kind: 'network', targetId: 49, color: 'from-purple-900 to-slate-900', badge: 'HBO' },
  { id: 'netflix-net', name: 'Netflix Original', kind: 'network', targetId: 213, color: 'from-red-700 to-slate-900', badge: 'NETFLIX' },
  { id: 'amc-net', name: 'AMC', kind: 'network', targetId: 43, color: 'from-amber-600 to-slate-900', badge: 'AMC' },
  { id: 'cw-net', name: 'The CW', kind: 'network', targetId: 71, color: 'from-emerald-600 to-slate-900', badge: 'CW' },
  { id: 'bbc-net', name: 'BBC One', kind: 'network', targetId: 4, color: 'from-red-800 to-slate-900', badge: 'BBC' },
  { id: 'fx-net', name: 'FX Networks', kind: 'network', targetId: 88, color: 'from-slate-800 to-slate-950', badge: 'FX' },
  { id: 'showtime-net', name: 'Showtime', kind: 'network', targetId: 67, color: 'from-rose-800 to-slate-900', badge: 'SHOWTIME' },
];

export const PlatformFilter: React.FC = () => {
  const { setActivePage, setSearchQuery, setSelectedProvider } = useApp();
  const [activeTab, setActiveTab] = useState<'providers' | 'networks'>('providers');

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
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Streaming Services
          </button>
          <button
            onClick={() => setActiveTab('networks')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'networks'
                ? 'bg-amber-500 text-slate-950 shadow'
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
            className={`group relative h-20 rounded-2xl bg-gradient-to-br ${p.color} border border-white/10 shadow-lg p-3 flex flex-col justify-between items-start overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer`}
          >
            <div className="absolute right-2 bottom-1 opacity-20 group-hover:opacity-30 text-white font-black text-2xl sm:text-3xl select-none transition-opacity">
              {p.badge}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
              {p.badge}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white group-hover:translate-x-1 transition-transform truncate max-w-full">
              {p.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
