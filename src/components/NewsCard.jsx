import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const NewsCard = ({ newsId, newsTitle, newsDate, newsContent, newsImageURL, darkMode, layout = 'grid', author, time, readMoreUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000));
  const [comments, setComments] = useState(Math.floor(Math.random() * 100));
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(savedBookmarks.includes(newsId));
  }, [newsId]);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = savedBookmarks.filter(id => id !== newsId);
    } else {
      newBookmarks = [...savedBookmarks, newsId];
    }
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    navigate(`/news/${newsId}`, {
      state: { newsId, newsTitle, newsDate, newsContent, newsImageURL, author, time, readMoreUrl }
    });
  };

  const cardClass = layout === 'grid'
    ? `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex flex-col cursor-pointer`
    : `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex flex-col md:flex-row cursor-pointer`;

  return (
    <div className={cardClass} onClick={handleCardClick}>
      <div className={`relative ${layout === 'grid' ? 'w-full' : 'md:w-1/3'}`}>
        <img src={newsImageURL} alt={newsTitle} className={`${layout === 'grid' ? 'w-full h-48' : 'w-full h-full'} object-cover`} />
      </div>
      <div className={`p-4 flex flex-col ${layout === 'grid' ? 'flex-grow' : 'md:w-2/3'}`}>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{author}</span>
        </div>
        <h2 className={`${layout === 'grid' ? 'text-xl' : 'text-lg'} font-semibold mb-2 line-clamp-2`}>{newsTitle}</h2>
        <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          <Calendar size={16} className="mr-1" />
          <span>{newsDate} • {time}</span>
        </div>
        {layout === 'grid' && (
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-3 mb-4 flex-grow`}>{newsContent}</p>
        )}
        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="flex items-center space-x-4">
            <button onClick={handleLike} className={`${isLiked ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              <MessageCircle size={20} />
            </button>
            <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              <Share2 size={20} />
            </button>
          </div>
          <button onClick={handleBookmark} className={isBookmarked ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}>
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          {likes} likes • {comments} comments
        </div>
      </div>
    </div>
  );
};

export default NewsCard;