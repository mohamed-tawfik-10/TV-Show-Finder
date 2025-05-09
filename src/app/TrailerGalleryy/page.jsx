'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlay, FaVideo, FaSearch } from 'react-icons/fa'; // استيراد أيقونات

export default function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // حالة البحث

  async function getSchedules() {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?type=ova');
    setScheduleList(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getSchedules();
  }, []);

  // فلترة الأنميات حسب البحث
  const filteredList = scheduleList.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const withTrailer = filteredList.filter((anime) => anime.trailer?.embed_url);
  const withoutTrailer = filteredList.filter((anime) => !anime.trailer?.embed_url);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <FaVideo className="inline-block mr-2" />
          Anime Trailers 🎥
        </h1>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md mx-auto">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
          </div>
        ) : (
          <>
            {/* الأنميات التي تحتوي على فيديو */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {withTrailer.length > 0 ? (
                withTrailer.map((anime) => (
                  <div
                    key={anime.mal_id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 p-4"
                  >
                    <div className="w-full h-48 relative rounded-md overflow-hidden">
                      <iframe
                        src={`${anime.trailer.embed_url}?autoplay=0`}
                        title={anime.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-md"
                      ></iframe>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                      {anime.title}
                    </h2>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-300">No trailers found</p>
              )}
            </div>

            {/* الأنميات التي لا تحتوي على فيديو */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {withoutTrailer.length > 0 ? (
                withoutTrailer.map((anime) => (
                  <div
                    key={anime.mal_id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 p-4"
                  >
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-300">No Trailer Available</span>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                      {anime.title}
                    </h2>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-300">All available have trailers</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
