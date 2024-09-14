import React from 'react';
import { X, Home, Zap, Cpu, Briefcase, Microscope, Film, Activity, Heart, Camera, Compass, Bookmark, Globe, TrendingUp, Coffee, Music, Book, Users } from 'lucide-react';
import wallpaper from '../assets/wallpaper.jpg';

const categoryIcons = {
  All: Globe,
  Trending: TrendingUp,
  Tech: Cpu,
  Business: Briefcase,
  Science: Microscope,
  Entertainment: Film,
  Sports: Activity,
  Health: Heart,
  Lifestyle: Coffee,
  Music: Music,
  Education: Book,
  Social: Users
};

const Sidebar = ({ isOpen, onClose, categories, onSelectCategory, darkMode }) => {
  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    onClose();
  };

  const scrollbarStyles = {
    '--scrollbar-bg': darkMode ? '#1a1d23' : '#f9fafb',
    '--thumb-bg': darkMode ? '#333' : '#6b7280',
    '--thumb-hover-bg': darkMode ? '#555' : '#8f969e',
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} custom-scrollbar`}
      style={scrollbarStyles}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
          <X size={24} />
        </button>
      </header>

      {/* Profile Section */}
      <div className="p-4 flex items-center space-x-4">
        <img src={wallpaper} alt="Profile Picture" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
        <div>
          <h3 className="font-bold text-lg">Het Monpara</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">@Het2518</p>
        </div>
      </div>

      {/* Categories List */}
      <nav className="p-4 flex-grow">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category] || Home;
          return (
            <button
              key={category}
              onClick={() => handleSelectCategory(category)}
              className={`flex items-center w-full px-4 py-3 ${
                darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              } rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out group`}
            >
              <IconComponent size={20} className="mr-3 group-hover:text-blue-500 transition-colors duration-150" />
              <span className="group-hover:text-blue-500 transition-colors duration-150">{category}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 flex items-center justify-around border-t border-gray-200 dark:border-gray-700">
        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 focus:outline-none transition-colors duration-150">
          <Home size={24} />
        </button>
        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 focus:outline-none transition-colors duration-150">
          <Compass size={24} />
        </button>
        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 focus:outline-none transition-colors duration-150">
          <Camera size={24} />
        </button>
        <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 focus:outline-none transition-colors duration-150">
          <Bookmark size={24} />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;