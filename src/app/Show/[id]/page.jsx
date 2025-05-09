'use client';

import Recommendations from '@/app/Recommendations/[id]/page';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaFilm, FaCalendarAlt, FaStar, FaCheckCircle, FaPercentage } from 'react-icons/fa'; // استيراد الأيقونات


export default function Show({ params }) {
  const { id } = params;
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getschedulesitem(id) {
    try {
      let response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      setAnime(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load anime details. Please try again later.');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    getschedulesitem(id);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen p-6 flex justify-center items-center">
        <p className="text-xl text-gray-800 dark:text-white animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen p-6 flex justify-center items-center">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (<>
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white hover:text-blue-600 transition-colors duration-300">
            {anime?.title}
          </h1>

          <img
            src={anime?.images.jpg.large_image_url}
            alt={anime?.title}
            className="w-[50%] h-96 m-auto object-conten rounded-md mt-4 transition-transform transform hover:scale-105"
          />

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{anime?.synopsis}</p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Details</h3>

            <div className="flex items-center mt-2">
              <FaFilm className="text-gray-600 dark:text-gray-300 mr-2" />
              <p className="text-gray-600 dark:text-gray-300"><strong>Type:</strong> {anime?.type}</p>
            </div>

            <div className="flex items-center mt-2">
              <FaCalendarAlt className="text-gray-600 dark:text-gray-300 mr-2" />
              <p className="text-gray-600 dark:text-gray-300"><strong>Episodes:</strong> {anime?.episodes}</p>
            </div>

            <div className="flex items-center mt-2">
              <FaStar className="text-gray-600 dark:text-gray-300 mr-2" />
              <p className="text-gray-600 dark:text-gray-300"><strong>Rating:</strong> {anime?.rating}</p>
            </div>

            <div className="flex items-center mt-2">
              <FaCheckCircle className="text-gray-600 dark:text-gray-300 mr-2" />
              <p className="text-gray-600 dark:text-gray-300"><strong>Status:</strong> {anime?.status}</p>
            </div>

            <div className="flex items-center mt-2">
              <FaPercentage className="text-gray-600 dark:text-gray-300 mr-2" />
              <p className="text-gray-600 dark:text-gray-300"><strong>Score:</strong> {anime?.score}</p>
            </div>
          </div>

          {/* روابط الموقع الرسمي والتريلر */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href={anime?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
            >
              Watch on Official Website
            </a>

            {anime?.trailer?.url && (
              <a
                href={anime.trailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 text-center"
              >
                Watch Trailer
              </a>
            )}
          </div>

        </div>
      </div>
    </div>

    <Recommendations animeId={id} />
    </>

  );
}
