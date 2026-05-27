import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, UtensilsCrossed } from 'lucide-react';
import { CalorieRing } from '../components/CalorieRing';
import { MealCard } from '../components/MealCard';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const getDailyStats = useAppStore((state) => state.getDailyStats);
  const deleteRecord = useAppStore((state) => state.deleteRecord);
  const { getThemeStyle, getThemeColor } = useTheme();

  const today = getTodayDate();
  const stats = getDailyStats(today);

  const mealTypeGroups = {
    breakfast: stats.records.filter(r => r.mealType === 'breakfast'),
    lunch: stats.records.filter(r => r.mealType === 'lunch'),
    dinner: stats.records.filter(r => r.mealType === 'dinner'),
    snack: stats.records.filter(r => r.mealType === 'snack'),
  };

  const mealTypeLabels: Record<string, { label: string; icon: string }> = {
    breakfast: { label: '早餐', icon: '🌅' },
    lunch: { label: '午餐', icon: '☀️' },
    dinner: { label: '晚餐', icon: '🌙' },
    snack: { label: '加餐', icon: '🍪' },
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="text-white px-6 pt-12 pb-8 rounded-b-3xl" style={getThemeStyle()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-green-100 text-sm">你好，{user.name}</p>
            <h1 className="text-2xl font-bold">今天吃得怎么样？</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👋
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CalorieRing 
            current={stats.totalCalories} 
            goal={user.dailyCalorieGoal} 
            size={180}
          />
          
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThemeColor() }}></div>
              <span className="text-sm text-gray-600">已摄入</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm text-gray-600">剩余目标</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate('/manual')}
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${getThemeColor()}20` }}
            >
              <UtensilsCrossed size={24} style={{ color: getThemeColor() }} />
            </div>
            <span className="font-medium text-gray-700">手动记录</span>
          </button>
          
          <button
            onClick={() => navigate('/camera')}
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera size={24} className="text-blue-500" />
            </div>
            <span className="font-medium text-gray-700">拍照识别</span>
          </button>
        </div>

        <div className="mt-8 mb-4">
          <h2 className="text-lg font-bold text-gray-800">今日餐食</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(mealTypeGroups).map(([type, records]) => {
            if (records.length === 0) return null;
            
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{mealTypeLabels[type].icon}</span>
                  <span className="font-medium text-gray-700">{mealTypeLabels[type].label}</span>
                </div>
                <div className="space-y-3">
                  {records.map((record) => (
                    <MealCard 
                      key={record.id} 
                      record={record} 
                      onDelete={deleteRecord}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {stats.records.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-500">还没有记录，开始添加第一餐吧！</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
