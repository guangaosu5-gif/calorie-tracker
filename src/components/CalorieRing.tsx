import React from 'react';

interface CalorieRingProps {
  current: number;
  goal: number;
  size?: number;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({ 
  current, 
  goal, 
  size = 200 
}) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const radius = (size - 20) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const isOver = current > goal;
  const color = isOver ? '#F59E0B' : '#10B981';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="16"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="16"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-gray-800">{current}</span>
        <span className="text-sm text-gray-500">/ {goal} 卡路里</span>
        {isOver && (
          <span className="text-xs text-orange-500 mt-1 font-medium">已超标！</span>
        )}
      </div>
    </div>
  );
};
