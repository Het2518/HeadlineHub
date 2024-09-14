import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Sun, Moon, Heart, MessageCircle, Bookmark, ExternalLink } from 'lucide-react';

const SeeNewsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newsData = location.state;

  if (!newsData) {
    return navigate("/", { replace: true });
  }

  const {
    newsId,
    newsTitle,
    newsDate,
    newsContent,
    newsImageURL,
    author,
    time,
    readMoreUrl
  } = newsData;

  const [darkMode, setDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000));
  const [comments, setComments] = useState(Math.floor(Math.random() * 100));
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(savedBookmarks.includes(newsId));
  }, [newsId]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments(comments + 1);
      setCommentText('');
      // Here you would typically send the comment to your backend
      console.log('Submitting comment:', commentText);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <span className='text-blue-500'>Headline</span>
              <span>Hub</span>
            </span>
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'dark' : ''}`}>
          {newsImageURL && <img src={newsImageURL} alt={newsTitle} className="w-full h-64 object-custom-scrollbar" />}
          <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h3 className="font-semibold">{author || 'Unknown Author'}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={14} className="mr-1" />
                  <span>{newsDate} • {time}</span>
                </div>
              </div>
            </div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>{newsTitle}</h2>
            <p className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line ${darkMode ? 'bg-gray-800' : ''} mb-6`}>
              {newsContent}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button onClick={handleLike} className={`${isLiked ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <MessageCircle size={24} />
                </button>
                <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <Share2 size={24} />
                </button>
              </div>
              <button onClick={handleBookmark} className={isBookmarked ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <Bookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              {likes} likes • {comments} comments
            </div>
            {readMoreUrl && (
              <a
                href={readMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} mb-6`}
              >
                <span className="mr-2">Read full article</span>
                <ExternalLink size={16} />
              </a>
            )}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
              />
            </form>
          </div>
        </article>
      </main>
    </div>
  );
};

export default SeeNewsPage;
