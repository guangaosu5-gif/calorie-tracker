import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, MealRecord, DailyStats, Food, Theme } from '../types';
import { foods } from '../data/foods';

interface AppState {
  user: User | null;
  records: MealRecord[];
  foods: Food[];
  
  login: (method: 'qq' | 'wechat' | 'phone', userData?: Partial<User>) => void;
  logout: () => void;
  addRecord: (record: Omit<MealRecord, 'id' | 'userId' | 'timestamp'>) => void;
  deleteRecord: (recordId: string) => void;
  getDailyStats: (date: string) => DailyStats;
  getRecordsByDate: (date: string) => MealRecord[];
  setDailyGoal: (calories: number) => void;
  updateUser: (userData: Partial<User>) => void;
  updateAvatar: (avatar: string) => void;
  updateUserName: (name: string) => void;
  bindPhone: (phoneNumber: string) => void;
  unbindPhone: () => void;
  bindAccount: (type: 'qq' | 'wechat') => void;
  unbindAccount: (type: 'qq' | 'wechat' | 'phone') => void;
  updateTheme: (theme: Theme) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const generateUserId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};



export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      records: [],
      foods: foods,

      login: (method, userData = {}) => {
        const defaultNames: Record<string, string> = {
          qq: 'QQ用户',
          wechat: '微信用户',
          phone: '手机用户',
        };
        
        const newUser: User = {
          id: generateUserId(),
          name: userData.name || defaultNames[method],
          avatar: userData.avatar,
          loginMethod: method,
          dailyCalorieGoal: userData.dailyCalorieGoal || 2000,
          phoneNumber: method === 'phone' ? userData.phoneNumber : undefined,
          boundAccounts: {
            [method]: true,
          },
          createdAt: new Date().toISOString(),
        };
        
        set({ user: newUser });
      },

      logout: () => {
        set({ user: null });
      },

      addRecord: (record) => {
        const { user } = get();
        if (!user) return;
        
        const newRecord: MealRecord = {
          ...record,
          id: generateId(),
          userId: user.id,
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          records: [...state.records, newRecord],
        }));
      },

      deleteRecord: (recordId) => {
        set((state) => ({
          records: state.records.filter((r) => r.id !== recordId),
        }));
      },

      getRecordsByDate: (date) => {
        const { records } = get();
        return records.filter((record) => {
          const recordDate = new Date(record.timestamp).toISOString().split('T')[0];
          return recordDate === date;
        }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },

      getDailyStats: (date) => {
        const records = get().getRecordsByDate(date);
        const totalCalories = records.reduce((sum, record) => sum + record.calories, 0);
        
        return {
          date,
          totalCalories,
          records,
        };
      },

      setDailyGoal: (calories) => {
        set((state) => ({
          user: state.user ? { ...state.user, dailyCalorieGoal: calories } : null,
        }));
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      updateAvatar: (avatar) => {
        set((state) => ({
          user: state.user ? { ...state.user, avatar } : null,
        }));
      },

      updateUserName: (name) => {
        set((state) => ({
          user: state.user ? { ...state.user, name } : null,
        }));
      },

      bindPhone: (phoneNumber) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            phoneNumber,
            boundAccounts: {
              ...state.user.boundAccounts,
              phone: true,
            },
          } : null,
        }));
      },

      unbindPhone: () => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            phoneNumber: undefined,
            boundAccounts: {
              ...state.user.boundAccounts,
              phone: false,
            },
          } : null,
        }));
      },

      bindAccount: (type) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            boundAccounts: {
              ...state.user.boundAccounts,
              [type]: true,
            },
          } : null,
        }));
      },

      unbindAccount: (type) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            boundAccounts: {
              ...state.user.boundAccounts,
              [type]: false,
            },
          } : null,
        }));
      },

      updateTheme: (theme) => {
        set((state) => ({
          user: state.user ? { ...state.user, theme } : null,
        }));
      },
    }),
    {
      name: 'calorie-tracker-storage',
    }
  )
);
