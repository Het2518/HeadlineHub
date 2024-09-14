import React from 'react';
import { Link } from 'react-router-dom';

const StoriesCarousel = ({ darkMode, newsData }) => {
  if (!newsData || newsData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
        Top Stories
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {newsData.map((story, index) => (
          <Link to={`/news/${index}`} key={index} className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <p className={`text-xs text-center mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-[80px] truncate`}>
              {story.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoriesCarousel;