import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { useAppStore } from '../store/useAppStore';
import { foods } from '../data/foods';
import { MealType } from '../types';
import { useTheme } from '../hooks/useTheme';

const mealTypeOptions: { type: MealType; label: string; icon: string }[] = [
  { type: 'breakfast', label: '早餐', icon: '🌅' },
  { type: 'lunch', label: '午餐', icon: '☀️' },
  { type: 'dinner', label: '晚餐', icon: '🌙' },
  { type: 'snack', label: '加餐', icon: '🍪' },
];

const foodSlides = [
  { emoji: '🍕', name: '披萨', cal: '266' },
  { emoji: '🍔', name: '汉堡', cal: '540' },
  { emoji: '🍜', name: '面条', cal: '284' },
  { emoji: '🍣', name: '寿司', cal: '93' },
  { emoji: '🥗', name: '沙拉', cal: '152' },
  { emoji: '🍗', name: '炸鸡', cal: '295' },
  { emoji: '🥟', name: '饺子', cal: '253' },
  { emoji: '🍱', name: '便当', cal: '500' },
  { emoji: '🥘', name: '火锅', cal: '450' },
  { emoji: '🍰', name: '蛋糕', cal: '350' },
];

export const Camera: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const addRecord = useAppStore((state) => state.addRecord);
  const { getThemeColor } = useTheme();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identifiedFood, setIdentifiedFood] = useState<any>(null);
  const [weight, setWeight] = useState<string>('100');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    startCamera();
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodSlides.length);
    }, 3000);
    
    return () => {
      stopCamera();
      clearInterval(slideInterval);
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const selectFromGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIdentifiedFood(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    startCamera();
  };

  const identifyFood = () => {
    setIsIdentifying(true);
    
    setTimeout(() => {
      const foodCategories = {
        主食: ['米饭', '馒头', '面条', '面包', '饺子', '包子', '粥', '煎饼', '油条', '蛋糕', '炒饭', '米粉', '米线', '年糕', '粽子'],
        肉类: ['鸡肉', '牛肉', '猪肉', '鱼肉', '鸡蛋', '鸭蛋', '鹌鹑蛋', '火腿', '香肠', '培根', '羊肉', '鸭肉', '鹅肉', '虾', '螃蟹'],
        蔬菜: ['白菜', '青菜', '黄瓜', '西红柿', '土豆', '胡萝卜', '西兰花', '菠菜', '生菜', '芹菜', '茄子', '辣椒', '豆角', '南瓜', '冬瓜'],
        水果: ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '蓝莓', '芒果', '桃子', '梨', '猕猴桃', '柚子', '柠檬', '樱桃', '菠萝'],
        饮品: ['牛奶', '豆浆', '果汁', '可乐', '茶', '咖啡', '酸奶', '矿泉水', '啤酒', '红酒', '奶茶', '雪碧', '橙汁', '椰汁', '蜂蜜水'],
        豆制品: ['豆腐', '豆浆', '豆干', '腐竹', '豆皮', '豆筋', '豆腐脑', '臭豆腐', '豆豉', '腐乳', '豆腐干', '豆腐皮', '千张', '素鸡', '素火腿']
      };

      const foodDescriptions = [
        { keywords: ['饼', '煎饼', '烙饼', '蛋饼', '手抓饼', '葱油饼', '烧饼'], foods: ['煎饼', '鸡蛋', '葱油饼'] },
        { keywords: ['饭', '米饭', '炒饭', '盖饭', '便当'], foods: ['米饭', '炒饭'] },
        { keywords: ['面', '面条', '拉面', '泡面', '牛肉面', '拉面'], foods: ['面条', '牛肉面'] },
        { keywords: ['肉', '牛肉', '鸡肉', '猪肉', '烤肉', '红烧肉'], foods: ['牛肉', '鸡肉', '猪肉', '红烧肉'] },
        { keywords: ['菜', '青菜', '白菜', '菠菜', '蔬菜', '沙拉'], foods: ['白菜', '青菜', '菠菜', '沙拉'] },
        { keywords: ['蛋', '鸡蛋', '煎蛋', '炒蛋', '荷包蛋', '茶叶蛋'], foods: ['鸡蛋'] },
        { keywords: ['水果', '苹果', '香蕉', '橙子', '西瓜', '草莓'], foods: ['苹果', '香蕉', '橙子', '西瓜', '草莓'] },
        { keywords: ['蛋糕', '面包', '甜点', '慕斯', '奶油', '芝士'], foods: ['蛋糕', '面包'] },
        { keywords: ['汤', '粥', '稀饭', '粥类'], foods: ['粥'] },
        { keywords: ['饺', '饺子', '水饺', '蒸饺'], foods: ['饺子'] },
        { keywords: ['鸡', '鸡肉', '炸鸡', '鸡腿', '鸡翅'], foods: ['鸡肉', '炸鸡'] },
        { keywords: ['鱼', '鱼', '烤鱼', '酸菜鱼', '清蒸鱼'], foods: ['鱼肉'] },
      ];

      let targetFoods: string[] = [];
      for (const desc of foodDescriptions) {
        // 简单的随机匹配，模拟AI的食物识别
        if (Math.random() > 0.7) {
          targetFoods = desc.foods;
          break;
        }
      }
      
      if (targetFoods.length === 0) {
        const randomCategory = Object.keys(foodCategories)[Math.floor(Math.random() * Object.keys(foodCategories).length)];
        targetFoods = foodCategories[randomCategory as keyof typeof foodCategories];
      }
      
      const randomFoodName = targetFoods[Math.floor(Math.random() * targetFoods.length)];
      
      const matchedFood = foods.find(f => f.name === randomFoodName) || 
                         foods[Math.floor(Math.random() * foods.length)];
      
      setIdentifiedFood(matchedFood);
      setIsIdentifying(false);
    }, 2000);
  };

  const calculateCalories = () => {
    if (!identifiedFood) return 0;
    return Math.round((identifiedFood.caloriesPer100g * parseInt(weight || '0')) / 100);
  };

  const handleSave = () => {
    if (!identifiedFood) return;
    
    addRecord({
      foodId: identifiedFood.id,
      foodName: identifiedFood.name,
      weight: parseInt(weight) || 0,
      calories: calculateCalories(),
      mealType,
      image: identifiedFood.image,
    });
    
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-24">
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4 px-6 pt-12 pb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-white">拍照识别</h1>
        </div>
      </div>

      <div className="relative aspect-[3/4]">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-64 h-64 overflow-hidden">
                  {foodSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                      style={{
                        opacity: currentSlide === index ? 1 : 0,
                        transform: currentSlide === index ? 'scale(1)' : 'scale(0.8)',
                        zIndex: currentSlide === index ? 10 : 1,
                      }}
                    >
                      <div className="text-7xl mb-3">{slide.emoji}</div>
                      <div className="text-white font-medium text-lg">{slide.name}</div>
                      <div className="text-white/80 text-sm">{slide.cal} 卡/100g</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {!capturedImage ? (
        <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-4 px-6">
          <div className="flex items-center gap-6">
            <button
              onClick={selectFromGallery}
              className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <ImageIcon size={24} className="text-white" />
            </button>
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-white/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
            >
              <div className="w-16 h-16 rounded-full" style={{ backgroundColor: getThemeColor() }} />
            </button>
            <div className="w-14 h-14" />
          </div>
          <p className="text-white/80 text-sm">对准食物拍照，或从相册选择</p>
        </div>
      ) : !identifiedFood ? (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6">
          {isIdentifying ? (
            <div className="text-center py-8">
              <Loader2 size={48} className="mx-auto animate-spin mb-4" style={{ color: getThemeColor() }} />
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI正在识别中...</h3>
              <p className="text-gray-500">请稍等</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={retakePhoto}
                  className="flex flex-col items-center gap-2 text-gray-500"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <RefreshCw size={24} />
                  </div>
                  <span className="text-sm">重拍</span>
                </button>
                <button
                  onClick={identifyFood}
                  className="flex flex-col items-center gap-2"
                  style={{ color: getThemeColor() }}
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: `${getThemeColor()}15` }}>
                    <Check size={32} style={{ color: getThemeColor() }} />
                  </div>
                  <span className="text-sm font-medium">识别食物</span>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: `${getThemeColor()}15` }}>
              {identifiedFood.image}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{identifiedFood.name}</h3>
              <p className="text-gray-500">{identifiedFood.category} · {identifiedFood.caloriesPer100g} 卡/100g</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">用餐类型</label>
            <div className="grid grid-cols-4 gap-2">
              {mealTypeOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => setMealType(option.type)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all ${
                    mealType === option.type
                      ? 'text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                  style={mealType === option.type ? { borderColor: getThemeColor(), backgroundColor: `${getThemeColor()}15`, color: getThemeColor() } : {}}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">食物重量（克）</label>
            <div className="flex items-center gap-3 mx-auto max-w-xs">
              <button
                onClick={() => {
                  const num = parseInt(weight) || 0;
                  setWeight(Math.max(0, num - 50).toString());
                }}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700"
              >
                -
              </button>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1 text-center text-xl font-bold text-gray-800 bg-white border border-gray-200 rounded-xl py-2.5 focus:outline-none"
                style={{ ':focus': { borderColor: getThemeColor() } } as React.CSSProperties}
              />
              <button
                onClick={() => {
                  const num = parseInt(weight) || 0;
                  setWeight((num + 50).toString());
                }}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700"
              >
                +
              </button>
              <span className="text-gray-500 font-medium w-6">g</span>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: `${getThemeColor()}15` }}>
            <div className="text-sm text-gray-600 mb-1">预估热量</div>
            <div className="text-3xl font-bold" style={{ color: getThemeColor() }}>{calculateCalories()} 卡路里</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={retakePhoto}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all"
            >
              重新选择
            </button>
            <button
              onClick={handleSave}
              className="flex-1 text-white font-medium py-3 rounded-xl transition-all hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
              style={{ backgroundColor: getThemeColor() }}
            >
              <Check size={20} />
              保存记录
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
