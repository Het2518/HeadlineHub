import React from 'react';
import { X } from 'lucide-react';

const NotificationCenter = ({ onClose, darkMode }) => {
  const notifications = [
    { id: 1, text: "John Doe liked your post", time: "2 hours ago" },
    { id: 2, text: "New trending story: 'Global Climate Summit'", time: "5 hours ago" },
    { id: 3, text: "Your daily news digest is ready", time: "1 day ago" },
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-50 overflow-y-auto`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X size={24} />
        </button>
      </div>
      <div className="p-4">
        {notifications.map((notification) => (
          <div key={notification.id} className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{notification.text}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;