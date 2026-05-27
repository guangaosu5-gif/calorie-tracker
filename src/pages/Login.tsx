import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);

  const handleLogin = (method: 'qq' | 'wechat' | 'phone') => {
    login(method);
    navigate('/');
  };

  const handleClearData = () => {
    if (confirm('确定要清除所有数据吗？')) {
      localStorage.removeItem('calorie-tracker-storage');
      logout();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
          <span className="text-6xl">🍎</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">热量记录</h1>
        <p className="text-gray-500 text-center mb-12 max-w-xs">
          轻松记录每一餐，健康生活从现在开始
        </p>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => handleLogin('wechat')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-2xl font-medium transition-all hover:shadow-lg active:scale-98"
          >
            <span className="text-2xl">💬</span>
            <span>微信登录</span>
          </button>

          <button
            onClick={() => handleLogin('qq')}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-2xl font-medium transition-all hover:shadow-lg active:scale-98"
          >
            <span className="text-2xl">🐧</span>
            <span>QQ登录</span>
          </button>

          <button
            onClick={() => handleLogin('phone')}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-medium transition-all hover:shadow-md active:scale-98"
          >
            <span className="text-2xl">📱</span>
            <span>手机号登录</span>
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-12 text-center px-6">
          登录即表示同意我们的用户协议和隐私政策
        </p>
        
        <button
          onClick={handleClearData}
          className="text-gray-400 text-sm mt-4 hover:text-gray-600 underline"
        >
          清除所有数据
        </button>
      </div>
    </div>
  );
};
