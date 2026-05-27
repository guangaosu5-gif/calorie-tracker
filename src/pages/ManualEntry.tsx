import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Check, Plus } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { CustomFoodModal } from '../components/CustomFoodModal';
import { useAppStore } from '../store/useAppStore';
import { categories, searchFoods, addCustomFood, getAllFoods } from '../data/foods';
import { Food, MealType } from '../types';
import { useTheme } from '../hooks/useTheme';

const mealTypeOptions: { type: MealType; label: string; icon: string }[] = [
  { type: 'breakfast', label: '早餐', icon: '🌅' },
  { type: 'lunch', label: '午餐', icon: '☀️' },
  { type: 'dinner', label: '晚餐', icon: '🌙' },
  { type: 'snack', label: '加餐', icon: '🍪' },
];

export const ManualEntry: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const addRecord = useAppStore((state) => state.addRecord);
  const { getThemeColor } = useTheme();

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [weight, setWeight] = useState<string>('100');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [foodList, setFoodList] = useState<Food[]>(getAllFoods());

  // 刷新食物列表
  const refreshFoodList = () => {
    setFoodList(getAllFoods());
  };

  const filteredFoods = searchQuery 
    ? searchFoods(searchQuery) 
    : selectedCategory === '全部' 
      ? foodList 
      : foodList.filter(f => f.category === selectedCategory);

  const calculateCalories = () => {
    if (!selectedFood) return 0;
    return Math.round((selectedFood.caloriesPer100g * parseInt(weight || '0')) / 100);
  };

  const handleSave = () => {
    if (!selectedFood) return;
    
    addRecord({
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      weight: parseInt(weight) || 0,
      calories: calculateCalories(),
      mealType,
      image: selectedFood.image,
    });
    
    navigate('/');
  };

  const handleCustomFoodConfirm = (customFood: Food, customWeight: number) => {
    // 添加到食物库
    addCustomFood(customFood);
    // 刷新列表
    refreshFoodList();
    // 设置为选中的食物
    setSelectedFood(customFood);
    setWeight(customWeight.toString());
    
    // 自动保存记录
    const totalCalories = Math.round((customFood.caloriesPer100g * customWeight) / 100);
    
    addRecord({
      foodId: customFood.id,
      foodName: customFood.name,
      weight: customWeight,
      calories: totalCalories,
      mealType,
      image: customFood.image,
    });
    
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

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
          <h1 className="text-lg font-bold text-gray-800">记录饮食</h1>
        </div>
      </div>

      <div className="px-6 py-4 space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">用餐类型</label>
          <div className="grid grid-cols-4 gap-2">
            {mealTypeOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => setMealType(option.type)}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                  mealType === option.type
                    ? 'text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
                style={mealType === option.type ? { borderColor: getThemeColor(), backgroundColor: `${getThemeColor()}15`, color: getThemeColor() } : {}}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">选择食物</label>
          
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索食物..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none"
              style={{ 
                ':focus': { 
                  borderColor: getThemeColor(),
                  boxShadow: `0 0 0 2px ${getThemeColor()}30`
                }
              } as React.CSSProperties}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category && !searchQuery
                    ? 'text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                style={selectedCategory === category && !searchQuery ? { backgroundColor: getThemeColor() } : {}}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {filteredFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => setSelectedFood(food)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedFood?.id === food.id
                    ? ''
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={selectedFood?.id === food.id ? { borderColor: getThemeColor(), backgroundColor: `${getThemeColor()}15` } : {}}
              >
                <span className="text-3xl">{food.image || '🍽️'}</span>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{food.name}</div>
                  <div className="text-xs text-gray-500">{food.caloriesPer100g} 卡/100g</div>
                </div>
                {selectedFood?.id === food.id && (
                  <Check size={16} style={{ color: getThemeColor() }} />
                )}
              </button>
            ))}
          </div>

          {/* 自定义食物按钮 */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            <span className="font-medium">添加自定义食物</span>
          </button>
        </div>

        {selectedFood && (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">食物重量（克）</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const num = parseInt(weight) || 0;
                    setWeight(Math.max(0, num - 50).toString());
                  }}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700 flex-shrink-0"
                >
                  -
                </button>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                />
                <button
                  onClick={() => {
                    const num = parseInt(weight) || 0;
                    setWeight((num + 50).toString());
                  }}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700 flex-shrink-0"
                >
                  +
                </button>
                <span className="text-gray-500 font-medium w-6 flex-shrink-0">g</span>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor: `${getThemeColor()}15` }}>
              <div className="text-sm text-gray-600 mb-1">预估热量</div>
              <div className="text-3xl font-bold" style={{ color: getThemeColor() }}>{calculateCalories()} 卡路里</div>
            </div>

            <button
              onClick={handleSave}
              className="w-full text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
              style={{ backgroundColor: getThemeColor() }}
            >
              <Check size={20} />
              保存记录
            </button>
          </div>
        )}
      </div>

      <BottomNav />

      {/* 自定义食物模态框 */}
      <CustomFoodModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onConfirm={handleCustomFoodConfirm}
      />
    </div>
  );
};
