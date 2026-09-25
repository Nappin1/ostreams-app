import React from 'react';
import type { FloatingReaction } from '../types/watchTogether';

interface FloatingReactionsProps {
  reactions: FloatingReaction[];
}

export const FloatingReactions: React.FC<FloatingReactionsProps> = ({ reactions }) => {
  if (reactions.length === 0) return null;

  return (
    <div className="aria-hidden pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {reactions.map((reaction) => (
        <div
          key={reaction.id}
          className="absolute bottom-12 flex flex-col items-center animate-wt-float"
          style={{
            left: `${reaction.x}%`,
          }}
        >
          <span className="text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transform transition-transform hover:scale-125">
            {reaction.emoji}
          </span>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[10px] font-semibold text-amber-300 shadow-md backdrop-blur-md">
            {reaction.senderName}
          </span>
        </div>
      ))}
    </div>
  );
};
