import React from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DMCAModal: React.FC = () => {
  const { isDMCAModalOpen, setIsDMCAModalOpen } = useApp();

  if (!isDMCAModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        <button
          onClick={() => setIsDMCAModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-amber-400">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">DMCA & Legal Notice</h2>
            <p className="text-xs text-slate-400">Copyright & Content Indexing Policy</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>GoStream</strong> does not host, upload, or store any media files or videos on its servers. All content provided is hosted by independent third-party services.
            </p>
          </div>

          <p>
            This application utilizes the official <strong>The Movie Database (TMDB) API</strong> for metadata, images, and poster artwork, and embeds video players provided by public third-party hosts.
          </p>

          <p>
            If you are a copyright owner or an agent thereof and believe that any content infringes upon your copyrights, please contact the respective media hosting provider directly to request removal.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsDMCAModalOpen(false)}
            className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
