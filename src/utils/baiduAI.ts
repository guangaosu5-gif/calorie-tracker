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
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${BAIDU_API_KEY}&client_secret=${BAIDU_SECRET_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const data: AccessTokenResponse = await response.json();

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

export const recognizeDish = async (imageBase64: string): Promise<BaiduDishResult[]> => {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(
      `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?image=${encodeURIComponent(imageBase64)}&top_num=5&access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const data: BaiduDishResponse = await response.json();

    if (data.error_code) {
      throw new Error(data.error_msg || '识别失败');
    }

    return data.result;
  } catch (error) {
    console.error('菜品识别失败:', error);
    throw error;
  }
};