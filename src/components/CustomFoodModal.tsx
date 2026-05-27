import React, { useState, useEffect } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { Food } from '../types';
import { categories, foods } from '../data/foods';

interface CustomFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (food: Food, weight: number) => void;
}

const foodTypeIcons: Record<string, string> = {
  '主食': '🍚',
  '肉类': '🥩',
  '蔬菜': '🥬',
  '水果': '🍎',
  '饮品': '🥤',
  '豆制品': '🧈',
};

export const CustomFoodModal: React.FC<CustomFoodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState('主食');
  const [weight, setWeight] = useState<string>('100');
  const [customCalories, setCustomCalories] = useState<string>('');
  const [foundFood, setFoundFood] = useState<Food | null>(null);

  useEffect(() => {
    if (!foodName.trim()) {
      setFoundFood(null);
      setCustomCalories('');
      return;
    }

    const searchResult = foods.find(f => 
      f.name.toLowerCase() === foodName.trim().toLowerCase()
    );

    if (searchResult) {
      setFoundFood(searchResult);
      setCategory(searchResult.category);
      setCustomCalories('');
    } else {
      setFoundFood(null);
    }
  }, [foodName]);

  const calculateEstimatedCalories = () => {
    if (foundFood) {
      return Math.round(foundFood.caloriesPer100g * (parseInt(weight) || 0) / 100);
    }
    if (customCalories) {
      return Math.round(parseInt(customCalories) * (parseInt(weight) || 0) / 100);
    }
    return 0;
  };

  const handleConfirm = () => {
    if (!foodName.trim()) {
      alert('请输入食物名称');
      return;
    }

    let caloriesPer100g: number;
    
    if (foundFood) {
      caloriesPer100g = foundFood.caloriesPer100g;
    } else {
      if (!customCalories) {
        alert('该食物不在数据库中，请输入热量值');
        return;
      }
      caloriesPer100g = parseInt(customCalories);
      if (isNaN(caloriesPer100g) || caloriesPer100g < 0) {
        alert('请输入有效的热量值');
        return;
      }
    }

    const customFood: Food = {
      id: 'custom_' + Date.now(),
      name: foodName.trim(),
      category,
      caloriesPer100g,
      image: foundFood?.image || foodTypeIcons[category] || '🍽️',
    };

    onConfirm(customFood, parseInt(weight) || 0);
    
    setFoodName('');
    setCategory('主食');
    setWeight('100');
    setCustomCalories('');
    setFoundFood(null);
    onClose();
  };

  const handleClose = () => {
    setFoodName('');
    setCategory('主食');
    setWeight('100');
    setCustomCalories('');
    setFoundFood(null);
    onClose();
  };

  const decreaseWeight = () => {
    const newWeight = Math.max(0, (parseInt(weight) || 0) - 50);
    setWeight(String(newWeight));
  };

  const increaseWeight = () => {
    const newWeight = (parseInt(weight) || 0) + 50;
    setWeight(String(newWeight));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-t-3xl w-full max-w-[320px] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">添加自定义食物</h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">选择食物类型</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.filter(c => c !== '全部').map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${
                    category === cat
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span>{foodTypeIcons[cat]}</span>
                  <span className="text-sm font-medium">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">食物名称</label>
            <input
              type="text"
              placeholder="请输入食物名称"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                foundFood 
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200' 
                  : foodName.trim() && !foundFood
                    ? 'border-orange-500 focus:border-orange-500 focus:ring-orange-200'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
            {foundFood && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                已在数据库中找到：{foundFood.name} ({foundFood.caloriesPer100g}卡/100g)
              </div>
            )}
            {foodName.trim() && !foundFood && (
              <div className="flex items-center gap-2 text-orange-500 text-sm">
                <AlertCircle size={14} />
                数据库中未找到，请手动输入热量值
              </div>
            )}
          </div>

          {!foundFood && foodName.trim() && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">每100克热量（卡路里）</label>
              <input
                type="number"
                placeholder="请输入热量值"
                value={customCalories}
                onChange={(e) => setCustomCalories(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">食用重量（克）</label>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseWeight}
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
                onClick={increaseWeight}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700 flex-shrink-0"
              >
                +
              </button>
              <span className="text-gray-500 font-medium w-6 flex-shrink-0">g</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-4">
            <div className="text-sm text-gray-600 mb-1">预估总热量</div>
            <div className="text-3xl font-bold text-emerald-600">
              {(foundFood || customCalories) ? calculateEstimatedCalories() : '-'} 卡路里
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!foodName.trim() || (!foundFood && !customCalories)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                foodName.trim() && (foundFood || customCalories)
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus size={20} />
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
