import React from 'react';
import { DetailsModal } from './components/DetailsModal';
import { DMCAModal } from './components/DMCAModal';
import { Navbar } from './components/Navbar';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AppProvider, useApp } from './context/AppContext';
import { ExplorePage } from './pages/ExplorePage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { MoviesPage } from './pages/MoviesPage';
import { TVShowsPage } from './pages/TVShowsPage';

const MainContent: React.FC = () => {
  const { activePage, setIsDMCAModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 py-6">
        {activePage === 'home' && <HomePage />}
        {activePage === 'movies' && <MoviesPage />}
        {activePage === 'tv' && <TVShowsPage />}
        {activePage === 'explore' && <ExplorePage />}
        {activePage === 'library' && <LibraryPage />}
        {activePage === 'history' && <HistoryPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-xs text-slate-500">
        <div className="max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">
              O<span className="text-amber-400">STREAM</span>
            </span>
            <p className="mt-1 text-slate-400">
              High-performance free streaming platform powered by TMDB API.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              onClick={() => setIsDMCAModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              DMCA Disclaimer
            </button>
            <span>&bull;</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Powered by TMDB
            </a>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <DetailsModal />
      <VideoPlayerModal />
      <DMCAModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
