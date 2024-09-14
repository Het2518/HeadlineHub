import React from 'react';
import * as LucideIcons from 'lucide-react';

const NewsCategoryButton = ({ newsCategory, icon, isSelected, onClick, darkMode }) => {
  const IconComponent = LucideIcons[icon];

  return (
    <button
      className={`inline-flex items-center px-4 py-2 border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out
        ${isSelected
          ? darkMode
            ? 'bg-blue-600 text-white border-transparent'
            : 'bg-blue-600 text-white border-transparent'
          : darkMode
            ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent size={16} className="mr-2" />}
      <span>{newsCategory}</span>
    </button>
  );
};

export default NewsCategoryButton;