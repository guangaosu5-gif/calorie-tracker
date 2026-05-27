import React, { useState } from 'react';
import { Trash2, Clock } from 'lucide-react';
import { MealRecord } from '../types';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface MealCardProps {
  record: MealRecord;
  onDelete?: (id: string) => void;
}

const mealTypeLabels: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '加餐',
};

export const MealCard: React.FC<MealCardProps> = ({ record, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(record.id);
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 transition-all hover:shadow-md">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-3xl flex-shrink-0">
          {record.image || '🍽️'}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800 truncate">{record.foodName}</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
              {mealTypeLabels[record.mealType]}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{record.weight}g</span>
            <span className="text-emerald-600 font-semibold">{record.calories} 卡路里</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatTime(record.timestamp)}
            </span>
          </div>
        </div>
        
        {onDelete && (
          <button
            onClick={handleDeleteClick}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        foodName={record.foodName}
      />
    </>
  );
};
