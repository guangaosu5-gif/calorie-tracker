export interface User {
  id: string;
  name: string;
  avatar?: string;
  loginMethod: 'qq' | 'wechat' | 'phone';
  dailyCalorieGoal: number;
  phoneNumber?: string;
  boundAccounts: {
    qq?: boolean;
    wechat?: boolean;
    phone?: boolean;
  };
  theme?: Theme;
  createdAt: string;
}

export interface Theme {
  type: 'color' | 'gradient' | 'image';
  value: string;
  gradient?: {
    color1: string;
    color2: string;
    angle: number;
  };
}

export const presetColors = [
  '#10b981', // 绿色
  '#3b82f6', // 蓝色
  '#8b5cf6', // 紫色
  '#f59e0b', // 橙色
  '#ef4444', // 红色
  '#ec4899', // 粉色
  '#06b6d4', // 青色
  '#f97316', // 橘黄
  '#6366f1', // 靛蓝
  '#14b8a6', // 青绿色
];

export const presetGradients = [
  { color1: '#10b981', color2: '#059669', angle: 135 },
  { color1: '#3b82f6', color2: '#1d4ed8', angle: 135 },
  { color1: '#8b5cf6', color2: '#6d28d9', angle: 135 },
  { color1: '#f59e0b', color2: '#d97706', angle: 135 },
  { color1: '#ef4444', color2: '#dc2626', angle: 135 },
  { color1: '#ec4899', color2: '#db2777', angle: 135 },
  { color1: '#06b6d4', color2: '#0891b2', angle: 135 },
  { color1: '#f97316', color2: '#ea580c', angle: 135 },
  { color1: '#6366f1', color2: '#4f46e5', angle: 135 },
  { color1: '#14b8a6', color2: '#0d9488', angle: 135 },
];

export interface Food {
  id: string;
  name: string;
  caloriesPer100g: number;
  image?: string;
  category: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealRecord {
  id: string;
  userId: string;
  foodId: string;
  foodName: string;
  weight: number;
  calories: number;
  mealType: MealType;
  timestamp: string;
  image?: string;
}

export interface DailyStats {
  date: string;
  totalCalories: number;
  records: MealRecord[];
}
