import React, { useState, useEffect, useCallback } from 'react';
import { Menu, RefreshCcw, Search, Bell, User, ChevronDown, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import Sidebar from './Sidebar';
import StoriesCarousel from './StoriesCarousel';

const newsCategories = [
  "All", "Entertainment", "Sports", "Technology", "Startup", "Business",
  "Science", "Automobile", "Politics", "National", "World", "Hatke", "Miscellaneous"
];

const HeadlineHub = () => {
  const [newsCategory, setNewsCategory] = useState("all");
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchNews();
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, [newsCategory]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://inshortsapi.vercel.app/news?category=${newsCategory}`);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNews = useCallback((newsData) => 
    newsData?.data.filter(news => 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      news.content.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className={`min-h-screen transition-all duration-300 ease-in-out ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10 transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold ml-2 transition-colors duration-300">
              <span className='text-blue-500'>Headline</span>
              <span className={darkMode ? 'text-white' : 'text-gray-800'}>Hub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {showSearch ? (
              <input
                type="text"
                placeholder="Search news..."
                className="py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none transition-colors duration-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
              >
                <Search size={24} />
              </button>
            )}
            <button
              onClick={fetchNews}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            >
              <RefreshCcw size={24} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row transition-all duration-300 ease-in-out">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          categories={newsCategories}
          onSelectCategory={(category) => {
            setNewsCategory(category.toLowerCase());
            setIsSidebarOpen(false);
          }}
          darkMode={darkMode}
        />

        <main className="flex-grow lg:ml-4 flex flex-col transition-all duration-300 ease-in-out">
          <StoriesCarousel darkMode={darkMode} newsData={newsData?.data.slice(0, 5)} />

          <div className="mb-6 mt-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
              Top Stories
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-in-out">
                {filteredNews(newsData)?.slice(0, 6).map((news, index) => (
                  <NewsCard
                    key={index}
                    newsId={index}
                    newsTitle={news.title}
                    newsDate={news.date}
                    newsContent={news.content}
                    newsImageURL={news.imageUrl}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>
              All News
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-6 transition-all duration-300 ease-in-out">
                {filteredNews(newsData)?.slice(6).map((news, index) => (
                  <NewsCard
                    key={index + 6}
                    newsId={index + 6}
                    newsTitle={news.title}
                    newsDate={news.date}
                    newsContent={news.content}
                    newsImageURL={news.imageUrl}
                    darkMode={darkMode}
                    layout="horizontal"
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HeadlineHub;
