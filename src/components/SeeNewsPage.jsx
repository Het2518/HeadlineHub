import React, { useState, useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Sun, Moon } from 'lucide-react'; // Import all needed icons
import BookmarkButton from './BookmarkButton';

const SeeNewsPage = () => {
  const location = useLocation();
  const newsData = location.state;

  if (!newsData) {
    return <Navigate to="/" replace />;
  }

  const { newsId, newsTitle, newsDate, newsContent, newsImageURL } = newsData;
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold ml-2">
            <span className='text-blue-500'>Headline</span>
            <span className={darkMode ? 'text-white' : 'text-gray-800'}>Hub</span>
          </Link>
          <div className="flex items-center space-x-4">
            <BookmarkButton newsId={newsId} />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />} {/* Switch between Sun and Moon icons */}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {newsImageURL && <img src={newsImageURL} alt={newsTitle} className="w-full h-64 object-cover" />}
          <div className="p-6 bg-white dark:bg-gray-800">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{newsTitle}</h2>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              <Calendar size={16} className="mr-2" />
              <span>{newsDate}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{newsContent}</p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default SeeNewsPage;
