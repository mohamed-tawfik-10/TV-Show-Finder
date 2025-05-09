'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function Recommendations({ animeId }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecommendations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
            setRecommendations(response?.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getRecommendations(animeId);
    }, [animeId]);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recommended Shows</h2>

                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendations.map((item,index) => (
                            <div
                            key={`${item.entry.mal_id}-${index}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                <img
                                    src={item.entry.images.jpg.image_url}
                                    alt={item.entry.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center space-x-2">
                                    <ExternalLink className="text-blue-500" />
                                    <span>{item.entry.title}</span>
                                </h3>
                                <a
                                    href={`/Show/${item.entry.mal_id}`}
                                    className="text-blue-600 hover:text-blue-800 mt-2 block transition-all duration-200"
                                >
                                    View Details →
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
