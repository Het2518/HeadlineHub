import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import BookmarkButton from './BookmarkButton';

const NewsCard = ({ newsId, newsTitle, newsDate, newsContent, newsImageURL, darkMode, layout = 'grid' }) => {
  const cardClass = layout === 'grid'
    ? `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex flex-col h-full`
    : `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex flex-row h-32`;

  return (
    <div className={cardClass}>
      <div className={`relative ${layout === 'grid' ? 'w-full' : 'w-1/3'}`}>
        <img src={newsImageURL} alt={newsTitle} className={`${layout === 'grid' ? 'w-full h-48' : 'w-full h-full'} object-cover`} />
        <div className="absolute top-2 right-2">
          <BookmarkButton newsId={newsId} darkMode={darkMode} />
        </div>
      </div>
      <div className={`p-4 flex flex-col ${layout === 'grid' ? 'flex-grow' : 'w-2/3'}`}>
        <h2 className={`${layout === 'grid' ? 'text-xl' : 'text-lg'} font-semibold mb-2 line-clamp-2`}>{newsTitle}</h2>
        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          <Calendar size={16} className="mr-1" />
          <span>{newsDate}</span>
        </div>
        {layout === 'grid' && (
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-3 mb-4 flex-grow`}>{newsContent}</p>
        )}
        <Link 
          to={`/news/${newsId}`}
          state={{ newsTitle, newsDate, newsContent, newsImageURL }}
          className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
        >
          <span className="mr-1">Read more</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
