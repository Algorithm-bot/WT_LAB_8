import React from 'react';

const SummaryCard = ({ title, value, subtitle, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && (
            <p className="text-gray-500 text-xs mt-2">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl opacity-20">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

