import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Phone, Camera, Edit2, Check, X, ChevronRight, Image as ImageIcon, Palette, Droplets, Image as ImageBgIcon } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../store/useAppStore';
import { presetColors, presetGradients, type Theme } from '../types';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const bindPhone = useAppStore((state) => state.bindPhone);
  const updateAvatar = useAppStore((state) => state.updateAvatar);
  const updateUserName = useAppStore((state) => state.updateUserName);
  const updateTheme = useAppStore((state) => state.updateTheme);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const themeImageInputRef = useRef<HTMLInputElement>(null);

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newName, setNewName] = useState(user?.name || '');
  const [themeTab, setThemeTab] = useState<'color' | 'gradient' | 'image'>('color');
  const [customColor, setCustomColor] = useState('#10b981');
  const [customGradient, setCustomGradient] = useState({ color1: '#10b981', color2: '#059669', angle: 135 });

  const avatarOptions = [
    '👤', '👨', '👩', '🧑', '👴', '👵', '👨‍💼', '👩‍💼', 
    '👨‍🍳', '👩‍🍳', '👨‍🎨', '👩‍🎨', '🧙', '🧚', '🦸', '🦹'
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  const getLoginMethodDisplay = () => {
    const methods = {
      qq: 'QQ登录',
      wechat: '微信登录',
      phone: '手机号登录'
    };
    return methods[user.loginMethod] || user.loginMethod;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBindPhone = () => {
    if (phoneNumber.trim() && verificationCode.trim()) {
      bindPhone(phoneNumber.trim());
      setShowPhoneModal(false);
      setPhoneNumber('');
      setVerificationCode('');
    }
  };

  const handleSaveAvatar = (avatar: string) => {
    updateAvatar(avatar);
    setShowAvatarModal(false);
  };

  const handleSaveName = () => {
    if (newName.trim()) {
      updateUserName(newName.trim());
    }
    setShowNameModal(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateAvatar(result);
        setShowAvatarModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const isImageAvatar = (avatar: string) => {
    return avatar.startsWith('data:image');
  };

  const getThemeBackgroundStyle = (): React.CSSProperties => {
    if (!user?.theme) {
      return {
        background: 'linear-gradient(135deg, #10b981, #059669)'
      };
    }

    const theme = user.theme;
    switch (theme.type) {
      case 'color':
        return { backgroundColor: theme.value };
      case 'gradient':
        if (theme.gradient) {
          return {
            background: `linear-gradient(${theme.gradient.angle}deg, ${theme.gradient.color1}, ${theme.gradient.color2})`
          };
        }
        return { background: theme.value };
      case 'image':
        return {
          backgroundImage: `url(${theme.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #10b981, #059669)'
        };
    }
  };

  const handleColorSelect = (color: string) => {
    const newTheme: Theme = {
      type: 'color',
      value: color
    };
    updateTheme(newTheme);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const handleCustomColorSelect = () => {
    const newTheme: Theme = {
      type: 'color',
      value: customColor
    };
    updateTheme(newTheme);
  };

  const handleGradientSelect = (color1: string, color2: string, angle: number) => {
    const newTheme: Theme = {
      type: 'gradient',
      value: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
      gradient: { color1, color2, angle }
    };
    updateTheme(newTheme);
  };

  const handleCustomGradientChange = (field: 'color1' | 'color2' | 'angle', value: string | number) => {
    setCustomGradient(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomGradientSelect = () => {
    const newTheme: Theme = {
      type: 'gradient',
      value: `linear-gradient(${customGradient.angle}deg, ${customGradient.color1}, ${customGradient.color2})`,
      gradient: customGradient
    };
    updateTheme(newTheme);
  };

  const handleThemeImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const newTheme: Theme = {
          type: 'image',
          value: result
        };
        updateTheme(newTheme);
        setShowThemeModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-4 px-6 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">个人中心</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* User Info Card */}
        <div 
          className="rounded-2xl p-6 text-white"
          style={getThemeBackgroundStyle()}
        >
          <button 
            onClick={() => setShowAvatarModal(true)}
            className="flex items-center gap-4 mb-4 w-full text-left"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl relative overflow-hidden">
              {user.avatar ? (
                isImageAvatar(user.avatar) ? (
                  <img 
                    src={user.avatar} 
                    alt="头像" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-4xl">{user.avatar}</span>
                )
              ) : (
                <span className="text-4xl">👤</span>
              )}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera size={14} className="text-gray-600" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <ChevronRight size={18} className="text-white/70" />
              </div>
              <p className="text-white/80 text-sm">ID: {user.id}</p>
              <p className="text-white/80 text-sm">{getLoginMethodDisplay()}</p>
            </div>
          </button>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-white/80 text-sm">记录次数</div>
            </div>
            <div>
              <div className="text-2xl font-bold">0</div>
              <div className="text-white/80 text-sm">总卡路里</div>
            </div>
          </div>
        </div>

        {/* Theme Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">主题设置</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <button 
              onClick={() => setShowThemeModal(true)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Palette size={20} className="text-purple-500" />
                </div>
                <span className="font-medium text-gray-800">个性化主题</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">账号设置</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <button 
              onClick={() => setShowNameModal(true)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Edit2 size={20} className="text-blue-500" />
                </div>
                <span className="font-medium text-gray-800">修改昵称</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{user.name}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </button>

            <div className="px-6 py-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">手机号</div>
                  {user.phoneNumber ? (
                    <div className="text-gray-500 text-sm">{user.phoneNumber}</div>
                  ) : (
                    <div className="text-gray-400 text-sm">未绑定</div>
                  )}
                </div>
                {user.phoneNumber ? (
                  <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                    解绑
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowPhoneModal(true)}
                    className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
                  >
                    绑定
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          退出登录
        </button>
      </div>

      <BottomNav />

      {/* Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">绑定手机号</h3>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 mb-5">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">手机号</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="请输入手机号"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">验证码</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm text-gray-800 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="请输入验证码"
                  />
                  <button className="px-3 py-2.5 bg-gray-200 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-300 transition-colors whitespace-nowrap">
                    获取验证码
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPhoneModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                取消
              </button>
              <button
                onClick={handleBindPhone}
                disabled={!phoneNumber.trim() || !verificationCode.trim()}
                className={`flex-1 font-medium py-2.5 rounded-xl transition-colors text-sm ${
                  phoneNumber.trim() && verificationCode.trim()
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                绑定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">选择头像</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Upload button */}
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-emerald-50 text-emerald-600 font-bold py-4 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} />
                从相册选择
              </button>
            </div>
            
            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">或选择系统头像</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            
            {/* Emoji avatars */}
            <div className="grid grid-cols-4 gap-4">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => handleSaveAvatar(avatar)}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center text-4xl transition-all ${
                    user.avatar === avatar 
                      ? 'bg-emerald-500 text-white scale-110 shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">修改昵称</h3>
              <button
                onClick={() => setShowNameModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">新昵称</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 text-gray-800 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="请输入新昵称"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveName}
                disabled={!newName.trim()}
                className={`flex-1 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  newName.trim()
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Check size={20} />
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">主题设置</h3>
              <button
                onClick={() => setShowThemeModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setThemeTab('color')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  themeTab === 'color'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Palette size={18} />
                纯色
              </button>
              <button
                onClick={() => setThemeTab('gradient')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  themeTab === 'gradient'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Droplets size={18} />
                渐变
              </button>
              <button
                onClick={() => setThemeTab('image')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  themeTab === 'image'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ImageBgIcon size={18} />
                图片
              </button>
            </div>

            {/* Color Tab */}
            {themeTab === 'color' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">预设颜色</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {presetColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`w-full aspect-square rounded-2xl transition-all ${
                          user?.theme?.type === 'color' && user.theme.value === color
                            ? 'ring-4 ring-emerald-500 scale-110 shadow-lg'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">自定义颜色</h4>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      className="w-16 h-12 rounded-xl cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2">{customColor}</div>
                      <button
                        onClick={handleCustomColorSelect}
                        className="w-full bg-emerald-500 text-white py-2 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                      >
                        应用此颜色
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gradient Tab */}
            {themeTab === 'gradient' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">预设渐变</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {presetGradients.map((gradient, index) => (
                      <button
                        key={index}
                        onClick={() => handleGradientSelect(gradient.color1, gradient.color2, gradient.angle)}
                        className={`w-full aspect-[2/1] rounded-2xl transition-all ${
                          user?.theme?.type === 'gradient' && 
                          user.theme.gradient?.color1 === gradient.color1 &&
                          user.theme.gradient?.color2 === gradient.color2
                            ? 'ring-4 ring-emerald-500 scale-105 shadow-lg'
                            : 'hover:scale-105'
                        }`}
                        style={{
                          background: `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">自定义渐变</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">颜色1</label>
                        <input
                          type="color"
                          value={customGradient.color1}
                          onChange={(e) => handleCustomGradientChange('color1', e.target.value)}
                          className="w-12 h-10 rounded-xl cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">颜色2</label>
                        <input
                          type="color"
                          value={customGradient.color2}
                          onChange={(e) => handleCustomGradientChange('color2', e.target.value)}
                          className="w-12 h-10 rounded-xl cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">角度: {customGradient.angle}°</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={customGradient.angle}
                        onChange={(e) => handleCustomGradientChange('angle', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div 
                      className="w-full aspect-[2/1] rounded-2xl mb-2"
                      style={{
                        background: `linear-gradient(${customGradient.angle}deg, ${customGradient.color1}, ${customGradient.color2})`
                      }}
                    />
                    <button
                      onClick={handleCustomGradientSelect}
                      className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                    >
                      应用此渐变
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Image Tab */}
            {themeTab === 'image' && (
              <div className="space-y-4">
                <input
                  ref={themeImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThemeImageSelect}
                />
                <button
                  onClick={() => themeImageInputRef.current?.click()}
                  className="w-full bg-emerald-50 text-emerald-600 font-bold py-4 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ImageBgIcon size={20} />
                  从相册选择图片
                </button>
                <p className="text-sm text-gray-500 text-center">
                  选择一张图片作为主题背景
                </p>
                
                {user?.theme?.type === 'image' && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">当前背景</p>
                    <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden">
                      <img
                        src={user.theme.value}
                        alt="主题背景"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
