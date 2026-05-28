import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Check, Loader2, Image as ImageIcon, Search } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { ImageCarousel } from '../components/ImageCarousel';
import { useAppStore } from '../store/useAppStore';
import { foods, matchFoodFromDatabase } from '../data/foods';
import { MealType, Food } from '../types';
import { useTheme } from '../hooks/useTheme';
import { recognizeDish, BaiduDishResult } from '../utils/baiduAI';
import { splashImages } from '../assets/splash';

const mealTypeOptions: { type: MealType; label: string; icon: string }[] = [
  { type: 'breakfast', label: '早餐', icon: '🌅' },
  { type: 'lunch', label: '午餐', icon: '☀️' },
  { type: 'dinner', label: '晚餐', icon: '🌙' },
  { type: 'snack', label: '加餐', icon: '🍪' },
];

interface IdentifiedCandidate {
  apiResult: BaiduDishResult;
  localFood: Food | null;
}

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
  const [identifiedCandidates, setIdentifiedCandidates] = useState<IdentifiedCandidate[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [weight, setWeight] = useState<string>('100');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [showCamera]);

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
      setShowCamera(false);
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
        setShowCamera(false);
      }
    }
  };

  const cancelCamera = () => {
    stopCamera();
    setShowCamera(false);
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
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIdentifiedCandidates([]);
    setSelectedFood(null);
    setErrorMessage(null);
    setShowManualSearch(false);
    setSearchQuery('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const identifyFood = async () => {
    if (!capturedImage) return;
    
    setIsIdentifying(true);
    setErrorMessage(null);
    setIdentifiedCandidates([]);
    setSelectedFood(null);

    try {
      const imageBase64 = capturedImage.replace('data:image/jpeg;base64,', '');
      
      const results = await recognizeDish(imageBase64);
      
      if (results.length === 0) {
        setErrorMessage('未识别到食物，请尝试手动搜索');
        setIsIdentifying(false);
        return;
      }

      const candidates: IdentifiedCandidate[] = results.slice(0, 3).map(apiResult => ({
        apiResult,
        localFood: matchFoodFromDatabase(apiResult.name),
      }));

      setIdentifiedCandidates(candidates);

      const highConfidence = candidates.find(c => c.apiResult.probability >= 0.5);
      if (highConfidence) {
        setSelectedFood(highConfidence.localFood || null);
      }

    } catch (error) {
      console.error('识别失败:', error);
      setErrorMessage('识别失败，请检查网络或尝试手动搜索');
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleSelectCandidate = (candidate: IdentifiedCandidate) => {
    setSelectedFood(candidate.localFood || null);
  };

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

  const handleManualSelect = (food: Food) => {
    setSelectedFood(food);
    setShowManualSearch(false);
    setSearchQuery('');
  };

  const filteredFoods = foods.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTakePhoto = () => {
    setShowCamera(true);
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
          showCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              disablePictureInPicture
              controls={false}
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <ImageCarousel 
              images={splashImages} 
              autoPlay={true}
              interval={3000}
            />
          )
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
        showCamera ? (
          <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-4 px-6">
            <div className="flex items-center gap-6">
              <button
                onClick={cancelCamera}
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <div className="text-white text-sm">取消</div>
              </button>
              <button
                onClick={capturePhoto}
                className="w-20 h-20 bg-white rounded-full border-4 border-white/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
              >
                <div className="w-16 h-16 rounded-full" style={{ backgroundColor: getThemeColor() }} />
              </button>
              <div className="w-14 h-14" />
            </div>
            <p className="text-white/80 text-sm">点击拍照</p>
          </div>
        ) : (
          <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-4 px-6">
            <div className="flex items-center gap-6">
              <button
                onClick={selectFromGallery}
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <ImageIcon size={24} className="text-white" />
              </button>
              <button
                onClick={handleTakePhoto}
                className="w-20 h-20 bg-white rounded-full border-4 border-white/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
              >
                <div className="w-16 h-16 rounded-full" style={{ backgroundColor: getThemeColor() }} />
              </button>
              <div className="w-14 h-14" />
            </div>
            <p className="text-white/80 text-sm">对准食物拍照，或从相册选择</p>
          </div>
        )
      ) : showManualSearch ? (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索食物..."
              className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <button
            onClick={() => setShowManualSearch(false)}
            className="w-full py-2 text-gray-500 hover:text-gray-700"
          >
            ← 返回识别结果
          </button>

          <div className="flex flex-wrap gap-2">
            {filteredFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => handleManualSelect(food)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <span>{food.image}</span>
                <span className="text-sm font-medium text-gray-700">{food.name}</span>
                <span className="text-xs text-gray-400">{food.caloriesPer100g}卡</span>
              </button>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <p className="text-center text-gray-500 py-4">未找到匹配的食物</p>
          )}
        </div>
      ) : identifiedCandidates.length === 0 ? (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6">
          {isIdentifying ? (
            <div className="text-center py-8">
              <Loader2 size={48} className="mx-auto animate-spin mb-4" style={{ color: getThemeColor() }} />
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI正在识别中...</h3>
              <p className="text-gray-500">请稍等</p>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-4">
                  {errorMessage}
                </div>
              )}
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
              
              <button
                onClick={() => setShowManualSearch(true)}
                className="w-full py-3 text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                手动搜索食物
              </button>
            </>
          )}
        </div>
      ) : selectedFood ? (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: `${getThemeColor()}15` }}>
              {selectedFood.image}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{selectedFood.name}</h3>
              <p className="text-gray-500">{selectedFood.category} · {selectedFood.caloriesPer100g} 卡/100g</p>
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
              onClick={() => setSelectedFood(null)}
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
      ) : (
        <div className="bg-white rounded-t-3xl -mt-8 relative z-10 p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-800 text-center">识别结果</h3>
          
          {identifiedCandidates.some(c => c.apiResult.probability < 0.5) && (
            <p className="text-center text-orange-500 text-sm">
              ⚠️ 部分识别结果置信度较低，建议手动确认
            </p>
          )}

          <div className="space-y-3">
            {identifiedCandidates.map((candidate, index) => {
              const food = candidate.localFood;
              const apiResult = candidate.apiResult;
              const isLowConfidence = apiResult.probability < 0.5;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelectCandidate(candidate)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isLowConfidence ? 'border-orange-200 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${getThemeColor()}15` }}>
                      {food?.image || '🍽️'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{apiResult.name}</span>
                        {isLowConfidence && (
                          <span className="text-xs bg-orange-200 text-orange-600 px-2 py-0.5 rounded-full">
                            低置信度
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>置信度: {(apiResult.probability * 100).toFixed(1)}%</span>
                        <span>|</span>
                        <span>热量: {food?.caloriesPer100g || apiResult.calorie} 卡/100g</span>
                        {food && food.category && (
                          <>
                            <span>|</span>
                            <span>{food.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowManualSearch(true)}
            className="w-full py-3 text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 border border-gray-200 rounded-xl"
          >
            <Search size={18} />
            以上都不是，手动搜索
          </button>

          <div className="flex gap-3">
            <button
              onClick={retakePhoto}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all"
            >
              重拍
            </button>
            <button
              onClick={identifyFood}
              className="flex-1 font-medium py-3 rounded-xl transition-all border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              重新识别
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};