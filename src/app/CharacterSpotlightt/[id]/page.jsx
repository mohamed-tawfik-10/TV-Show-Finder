'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { FaSearch } from 'react-icons/fa';

export default function CharacterSpotlight({ params }) {
  const { id } = params;

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
      setCharacters(response?.data.data);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getCharacters();
  }, [id]);

  const filteredCharacters = characters.filter((char) =>
    char.character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <User className="inline-block mr-2" />
          Character Spotlight
        </h2>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md mx-auto">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((char) => (
                <div
                  key={char.character.mal_id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <img
                    src={char.character.images.jpg.image_url}
                    alt={char.character.name}
                    className="w-full h-60 object-contain rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
                    <User className="text-blue-500" />
                    <span>{char.character.name}</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{char.role}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">No characters found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
