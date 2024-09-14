import React from 'react';

const NewsCardSkeleton = ({ layout = 'grid' }) => {
  const cardClass = layout === 'grid'
    ? `bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out flex flex-col animate-pulse`
    : `bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out flex flex-col md:flex-row animate-pulse`;

  return (
    <div className={cardClass}>
      <div className={`relative ${layout === 'grid' ? 'w-full h-48' : 'md:w-1/3 h-full'}`}>
        <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className={`p-4 flex flex-col ${layout === 'grid' ? 'flex-grow' : 'md:w-2/3'}`}>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600 mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 mb-2"></div>
        {layout === 'grid' && (
          <div className="w-full h-16 bg-gray-300 dark:bg-gray-600 mb-4"></div>
        )}
        <div className="flex justify-between mt-2 mb-2">
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;