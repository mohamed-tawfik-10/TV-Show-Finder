'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search, ExternalLink } from 'lucide-react'; // استيراد أيقونات من lucide-react

export default function Homee() {
  const [scheduleList, setscheduleList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // حالة لتخزين النص المدخل في البحث
  const [loading, setLoading] = useState(true); // حالة التحميل

  async function getschedules() {
    setLoading(true); // بدء التحميل
    let response = await axios.get('https://api.jikan.moe/v4/top/anime?type=ova');
    setscheduleList(response?.data.data);
    setLoading(false); // انتهاء التحميل
    console.log(response?.data.data);
    return response.data;
  }

  useEffect(() => {
    getschedules();
  }, []);

  // تصفية الأنمي بناءً على النص المدخل في البحث
  const filteredShows = scheduleList.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <Search className="inline-block mr-2" />
          Explore OVA Anime 🎬
        </h2>
        {/* Search Bar */}
        <div className="mb-8 relative max-w-md mx-auto">
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for shows..."
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
          // Grid of Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredShows.length > 0 ? (
              filteredShows.map((show, index) => (
                <div
                  key={`${show.mal_id}-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 p-4"
                >
                  <img
                    src={show.images.jpg.image_url}
                    alt={show.title}
                    className="w-full h-60 object-conten rounded-md transition-all duration-300 hover:opacity-80"
                  />
                  <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                    <ExternalLink className="text-blue-500" />
                    <span>{show.title}</span>
                  </h2>
                  <a
                    href={`/Show/${show.mal_id}`}
                    className="text-blue-600 hover:text-blue-800 mt-2 block transition-all duration-200"
                  >
                    View Details →
                  </a>
                  <a
                    href={`/CharacterSpotlightt/${show.mal_id}`}
                    className="text-blue-600 hover:text-blue-800 mt-2 block transition-all duration-200"
                  >
                    View Character →
                  </a>

                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-white">No shows found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
