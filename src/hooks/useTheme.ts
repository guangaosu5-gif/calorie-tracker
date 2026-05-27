import { useAppStore } from '../store/useAppStore';
import type { CSSProperties } from 'react';

export const useTheme = () => {
  const theme = useAppStore((state) => state.user?.theme);

  const getThemeStyle = (): CSSProperties => {
    if (!theme) {
      return {
        background: 'linear-gradient(135deg, #10b981, #059669)'
      };
    }

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

  const getThemeColor = (): string => {
    if (!theme) return '#10b981';
    
    switch (theme.type) {
      case 'color':
        return theme.value;
      case 'gradient':
        return theme.gradient?.color1 || '#10b981';
      case 'image':
        return '#10b981';
      default:
        return '#10b981';
    }
  };

  const getThemeOpacityStyle = (opacity: number = 0.1): CSSProperties => {
    const color = getThemeColor();
    return {
      backgroundColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
    };
  };

  return {
    theme,
    getThemeStyle,
    getThemeColor,
    getThemeOpacityStyle
  };
};