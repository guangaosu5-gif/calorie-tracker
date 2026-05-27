import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, Plus, History, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getThemeColor } = useTheme();
  const themeColor = getThemeColor();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/history', icon: History, label: '记录' },
    { 
      path: null, 
      icon: Plus, 
      label: '添加', 
      isAction: true,
      onClick: () => {
        navigate('/manual');
      }
    },
    { path: '/camera', icon: Camera, label: '拍照' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item, index) => {
          if (item.isAction) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="relative -top-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
              >
                <item.icon size={28} />
              </button>
            );
          }
          
          const activeColor = isActive(item.path!) ? themeColor : '#9ca3af';
          
          return (
            <button
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-colors`}
              style={{ color: activeColor }}
            >
              <item.icon size={22} className={isActive(item.path!) ? 'fill-current' : ''} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
