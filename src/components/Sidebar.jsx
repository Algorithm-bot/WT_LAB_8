import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { id: 1, label: 'Dashboard', icon: '📊' },
    { id: 2, label: 'Students', icon: '👥' },
    { id: 3, label: 'Reports', icon: '📈' },
    { id: 4, label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen p-6 shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">EduMonitor</h1>
        <p className="text-blue-200 text-sm mt-1">Performance Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      
      <div className="mt-8 pt-8 border-t border-blue-700">
        <div className="px-4 py-3 bg-blue-700 rounded-lg">
          <p className="text-sm text-blue-200">Need Help?</p>
          <p className="text-xs text-blue-300 mt-1">Contact Support</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

