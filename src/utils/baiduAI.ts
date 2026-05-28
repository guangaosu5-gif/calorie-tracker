const BAIDU_API_KEY = '9Itu1fsnxoHX77eNMmHPM5Fp';
const BAIDU_SECRET_KEY = 'PCsIBg8xXnkeh40DI0KlMOhCLKvGXg4W';

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface BaiduDishResult {
  name: string;
  calorie: number;
  probability: number;
}

interface BaiduDishResponse {
  result: BaiduDishResult[];
  error_msg?: string;
  error_code?: number;
}

let tokenCache: {
  accessToken: string;
  expiresAt: number;
} | null = null;

const getAccessToken = async (): Promise<string> => {
  const now = Date.now();
  
  if (tokenCache && now < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  try {
    const response = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: BAIDU_API_KEY,
          client_secret: BAIDU_SECRET_KEY,
        }),
      }
    );

    const data: AccessTokenResponse = await response.json();

    if (!data.access_token) {
      throw new Error('获取AccessToken失败');
    }

    tokenCache = {
      accessToken: data.access_token,
      expiresAt: now + data.expires_in * 1000 - 60000,
    };

    return tokenCache.accessToken;
  } catch (error) {
    console.error('获取百度AI AccessToken失败:', error);
    throw new Error('获取AccessToken失败');
  }
};

export const compressImage = (base64String: string, maxWidth: number = 600, maxHeight: number = 600): string => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  
  img.src = base64String;
  
  let width = img.width;
  let height = img.height;
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', 0.8);
  }
  
  return base64String;
};

export const recognizeDish = async (imageBase64: string): Promise<BaiduDishResult[]> => {
  try {
    const accessToken = await getAccessToken();
    
    const compressedImage = compressImage('data:image/jpeg;base64,' + imageBase64);
    const compressedBase64 = compressedImage.replace('data:image/jpeg;base64,', '');
    
    const formData = new FormData();
    formData.append('image', compressedBase64);
    formData.append('top_num', '5');
    formData.append('access_token', accessToken);
    
    const response = await fetch(
      `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data: BaiduDishResponse = await response.json();

    if (data.error_code) {
      console.error('百度API错误:', data.error_code, data.error_msg);
      throw new Error(data.error_msg || '识别失败');
    }

    return data.result;
  } catch (error) {
    console.error('菜品识别失败:', error);
    throw error;
  }
};