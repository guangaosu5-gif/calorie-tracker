import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { MealCard } from '../components/MealCard';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../hooks/useTheme';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (dateStr === today.toISOString().split('T')[0]) {
    return '今天';
  } else if (dateStr === yesterday.toISOString().split('T')[0]) {
    return '昨天';
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
  }
};

const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // 上个月的天数
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  // 添加上个月的日期
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    days.push({
      date: date.toISOString().split('T')[0],
      day: day,
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  // 添加当月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const today = new Date();
    const isToday = 
      date.getFullYear() === today.getFullYear() && 
      date.getMonth() === today.getMonth() && 
      date.getDate() === today.getDate();
    
    days.push({
      date: date.toISOString().split('T')[0],
      day: day,
      isCurrentMonth: true,
      isToday: isToday,
    });
  }
  
  // 添加下个月的日期
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date: date.toISOString().split('T')[0],
      day: day,
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  return days;
};

export const History: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const records = useAppStore((state) => state.records);
  const deleteRecord = useAppStore((state) => state.deleteRecord);
  const getDailyStats = useAppStore((state) => state.getDailyStats);
  const { getThemeStyle, getThemeColor } = useTheme();

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const calendarDays = useMemo(() => {
    return generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const datesWithRecords = useMemo(() => {
    const dateSet = new Set<string>();
    records.forEach(record => {
      const date = new Date(record.timestamp).toISOString().split('T')[0];
      dateSet.add(date);
    });
    return dateSet;
  }, [records]);

  const stats = getDailyStats(selectedDate);
  const monthName = currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-4 px-6 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">历史记录</h1>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* 日历选择按钮 */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-all mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${getThemeColor()}20` }}>
              <CalendarIcon size={20} style={{ color: getThemeColor() }} />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500">{formatDate(selectedDate)}</div>
              <div className="font-medium text-gray-800">{selectedDate}</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>

        {/* 日历组件 */}
        {showCalendar && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-bold text-gray-800">{monthName}</h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* 日期格子 */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => {
                const hasRecords = datesWithRecords.has(day.date);
                const isSelected = selectedDate === day.date;
                
                return (
                  <button
                    key={day.date}
                    onClick={() => selectDate(day.date)}
                    disabled={!day.isCurrentMonth}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all
                      ${!day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${day.isCurrentMonth && !isSelected ? 'text-gray-700 hover:bg-gray-100' : ''}
                      ${day.isToday && !isSelected ? 'ring-offset-1' : ''}
                      ${isSelected ? 'text-white' : ''}
                    `}
                    style={
                      isSelected 
                        ? { backgroundColor: getThemeColor() } 
                        : day.isToday && !isSelected 
                          ? { boxShadow: `0 0 0 2px ${getThemeColor()}` }
                          : {}
                    }
                  >
                    <span 
                      className={day.isToday && !isSelected ? 'font-bold' : ''}
                      style={day.isToday && !isSelected ? { color: getThemeColor() } : {}}
                    >
                      {day.day}
                    </span>
                    {hasRecords && (
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-1"
                        style={{ backgroundColor: isSelected ? 'white' : getThemeColor() }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 日期统计卡片 */}
        <div className="rounded-2xl p-6 text-white mb-6" style={getThemeStyle()}>
          <div className="text-sm text-white/80 mb-1">{formatDate(selectedDate)}摄入热量</div>
          <div className="text-4xl font-bold">{stats.totalCalories}</div>
          <div className="text-sm text-white/80">/ {user.dailyCalorieGoal} 卡路里</div>
        </div>

        {/* 餐食记录 */}
        <div className="space-y-3">
          <h2 className="font-bold text-gray-800 mb-3">餐食记录</h2>
          {stats.records.length > 0 ? (
            stats.records.map((record) => (
              <MealCard 
                key={record.id} 
                record={record} 
                onDelete={deleteRecord}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-gray-500">这一天还没有记录</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
