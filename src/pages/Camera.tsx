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

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
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
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      setIdentifiedFood(randomFood);
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
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const num = parseInt(weight) || 0;
                  setWeight(Math.max(0, num - 50).toString());
                }}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700"
              >
                -
              </button>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1 text-center text-2xl font-bold text-gray-800 bg-white border border-gray-200 rounded-xl py-3 focus:outline-none"
                style={{ ':focus': { borderColor: getThemeColor() } } as React.CSSProperties}
              />
              <button
                onClick={() => {
                  const num = parseInt(weight) || 0;
                  setWeight((num + 50).toString());
                }}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700"
              >
                +
              </button>
              <span className="text-gray-500 font-medium w-8">g</span>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: `${getThemeColor()}15` }}>
            <div className="text-sm text-gray-600 mb-1">预估热量</div>
            <div className="text-3xl font-bold" style={{ color: getThemeColor() }}>{calculateCalories()} 卡路里</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={retakePhoto}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl transition-all"
            >
              重新选择
            </button>
            <button
              onClick={handleSave}
              className="flex-1 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
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
