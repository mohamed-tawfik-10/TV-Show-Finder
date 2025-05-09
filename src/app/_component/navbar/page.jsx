'use client';
import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Film } from 'lucide-react';

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);





  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                TV Show Finder
              </a>
            </div>

            {/* Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">Home 🏠</a>
              <a href="/TrailerGalleryy" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">TrailerGallery 🗓️</a>
              <a href="/SeasonalAnime" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">Seasonal Anime<Film className="w-5 h-5" /></a>
            </div>

            <div className="flex items-center space-x-4">

              {/* Dark Mode */}
              <button id="toggle-dark" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m8.66-9h1M3.34 12h1m15.07-6.93l.7.7M5.93 18.07l.7.7m12.02 0l-.7.7M5.93 5.93l-.7.7M12 5a7 7 0 000 14 7 7 0 000-14z" />
                </svg>
              </button>

              {/* Profile */}
              <button className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-4 space-y-2 transition-all duration-300">
            <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">Home 🏠</a>
            <a href="/TrailerGalleryy" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">TrailerGallery 🗓️</a>
            <a href="/SeasonalAnime" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition">Seasonal Anime<Film className="w-5 h-5" /></a>
            </div>
        )}
      </nav>
    </>
  );
}
