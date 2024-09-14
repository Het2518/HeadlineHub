import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ newsId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(newsId));
  }, [newsId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(id => id !== newsId);
    } else {
      newBookmarks = [...bookmarks, newsId];
    }
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out
        ${isBookmarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-500 hover:text-gray-600'}`}
    >
      <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
    </button>
  );
};

export default BookmarkButton;