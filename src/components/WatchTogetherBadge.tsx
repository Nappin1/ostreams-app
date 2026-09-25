import React from 'react';
import { Sparkles, Users } from 'lucide-react';
import { useWatchTogether } from '../context/WatchTogetherContext';

export const WatchTogetherBadge: React.FC = () => {
  const { roomId, members, setIsRoomModalOpen } = useWatchTogether();

  if (roomId) {
    return (
      <button
        onClick={() => setIsRoomModalOpen(true)}
        className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25 transition-all flex items-center space-x-2 text-xs font-bold shadow-sm shadow-amber-500/10 shrink-0 cursor-pointer"
        title="Active Watch Party - Click to view room"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="font-mono tracking-wider">{roomId}</span>
        <div className="flex items-center space-x-1 pl-1 border-l border-amber-500/30 text-[11px]">
          <Users className="w-3 h-3 text-amber-400" />
          <span>{members.length}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => setIsRoomModalOpen(true)}
      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-amber-500/30 transition-all flex items-center space-x-1.5 text-xs font-semibold shrink-0 cursor-pointer"
      title="Watch Together with Friends"
    >
      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      <span className="hidden sm:inline">Watch Party</span>
    </button>
  );
};
