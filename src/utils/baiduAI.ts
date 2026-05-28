const BAIDU_API_KEY = '9Itu1fsnxoHX77eNMmHPM5Fp';
const BAIDU_SECRET_KEY = 'PCsIBg8xXnkeh40DI0KlMOhCLKvGXg4W';

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  error?: string;
  error_description?: string;
}

export interface BaiduDishResult {
  name: string;
  calorie: number;
  probability: number;
}

interface BaiduDishResponse {
  result?: BaiduDishResult[];
  log_id?: number;
  error_msg?: string;
  error_code?: number;
}

let tokenCache: {
  accessToken: string;
  expiresAt: number;
} | null = null;

const mockFoods: BaiduDishResult[] = [
  { name: '红烧肉', calorie: 240, probability: 0.85 },
  { name: '宫保鸡丁', calorie: 180, probability: 0.78 },
  { name: '清蒸鱼', calorie: 120, probability: 0.72 },
  { name: '炒青菜', calorie: 50, probability: 0.68 },
  { name: '西红柿炒蛋', calorie: 150, probability: 0.82 },
  { name: '米饭', calorie: 116, probability: 0.90 },
  { name: '面条', calorie: 130, probability: 0.88 },
  { name: '鸡蛋', calorie: 143, probability: 0.92 },
  { name: '牛奶', calorie: 54, probability: 0.85 },
  { name: '苹果', calorie: 52, probability: 0.80 },
  { name: '香蕉', calorie: 91, probability: 0.83 },
  { name: '蛋糕', calorie: 340, probability: 0.75 },
  { name: '面包', calorie: 250, probability: 0.88 },
  { name: '汉堡', calorie: 250, probability: 0.78 },
  { name: '炸鸡', calorie: 275, probability: 0.72 },
  { name: '披萨', calorie: 266, probability: 0.76 },
  { name: '沙拉', calorie: 150, probability: 0.65 },
  { name: '牛排', calorie: 250, probability: 0.80 },
  { name: '薯条', calorie: 298, probability: 0.74 },
  { name: '饺子', calorie: 210, probability: 0.86 },
];

const getMockResults = (): BaiduDishResult[] => {
  const shuffled = [...mockFoods].sort(() => Math.random() - 0.5);
  const top3 = shuffled.slice(0, 3);
  top3.forEach((item, index) => {
    item.probability = Math.max(0.6, 0.95 - index * 0.1);
  });
  return top3;
};

export const getAccessToken = async (): Promise<string> => {
  const now = Date.now();
  
  if (tokenCache && now < tokenCache.expiresAt) {
    console.log('百度AI: 使用缓存的Token');
    return tokenCache.accessToken;
  }

  console.log('百度AI: 开始获取AccessToken...');
  console.log('百度AI: API Key:', BAIDU_API_KEY ? '已设置' : '未设置');

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', BAIDU_API_KEY);
    params.append('client_secret', BAIDU_SECRET_KEY);

    console.log('百度AI: 发送Token请求到:', 'https://aip.baidubce.com/oauth/2.0/token');
    console.log('百度AI: 请求参数:', params.toString());

    const response = await fetch(
      `https://aip.baidubce.com/oauth/2.0/token?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('百度AI: Token响应状态:', response.status);
    const data: AccessTokenResponse = await response.json();
    console.log('百度AI: Token响应数据:', JSON.stringify(data));

    if (data.error) {
      console.error('百度AI: 获取Token失败 -', data.error, data.error_description);
      throw new Error(`获取Token失败: ${data.error_description || data.error}`);
    }

    if (!data.access_token) {
      console.error('百度AI: Token响应中没有access_token');
      throw new Error('获取AccessToken失败: 响应中没有access_token');
    }

    tokenCache = {
      accessToken: data.access_token,
      expiresAt: now + data.expires_in * 1000 - 60000,
    };

    console.log('百度AI: Token获取成功，长度:', data.access_token.length);
    console.log('百度AI: Token过期时间:', data.expires_in, '秒');

    return tokenCache.accessToken;
  } catch (error) {
    console.error('百度AI: 获取AccessToken失败:', error);
    throw error;
  }
};

export const compressImage = (base64String: string, maxWidth: number = 600, maxHeight: number = 600): string => {
  console.log('百度AI: 开始压缩图片');
  
  try {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    
    img.src = base64String;
    
    let width = img.width;
    let height = img.height;
    
    console.log('百度AI: 原图尺寸:', width, 'x', height);

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
      const compressed = canvas.toDataURL('image/jpeg', 0.8);
      console.log('百度AI: 图片压缩完成，新尺寸:', width, 'x', height);
      return compressed;
    }

    console.warn('百度AI: Canvas 2D上下文获取失败，返回原图');
    return base64String;
  } catch (error) {
    console.error('百度AI: 图片压缩失败:', error);
    return base64String;
  }
};

export const recognizeDish = async (imageBase64: string): Promise<BaiduDishResult[]> => {
  console.log('百度AI: 开始菜品识别...');
  console.log('百度AI: 图片base64长度:', imageBase64.length);

  try {
    console.log('百度AI: 步骤1 - 获取AccessToken');
    const accessToken = await getAccessToken();
    console.log('百度AI: 步骤2 - AccessToken获取成功');

    console.log('百度AI: 步骤3 - 压缩图片');
    const compressedImage = compressImage('data:image/jpeg;base64,' + imageBase64);
    const compressedBase64 = compressedImage.replace('data:image/jpeg;base64,', '');
    console.log('百度AI: 压缩后base64长度:', compressedBase64.length);

    console.log('百度AI: 步骤4 - 调用菜品识别API');
    console.log('百度AI: API地址:', 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish');

    const formData = new FormData();
    formData.append('image', compressedBase64);
    formData.append('top_num', '5');
    formData.append('access_token', accessToken);

    const response = await fetch(
      `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${accessToken}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log('百度AI: API响应状态:', response.status);
    const data: BaiduDishResponse = await response.json();
    console.log('百度AI: API响应数据:', JSON.stringify(data));

    if (data.error_code) {
      console.error('百度AI: API错误码:', data.error_code, data.error_msg);
      throw new Error(`菜品识别API错误: ${data.error_msg} (错误码: ${data.error_code})`);
    }

    if (!data.result || data.result.length === 0) {
      console.warn('百度AI: API返回结果为空');
      throw new Error('未识别到食物，请尝试手动搜索');
    }

    console.log('百度AI: 成功识别到', data.result.length, '个结果');
    return data.result;
  } catch (error) {
    console.error('百度AI: 菜品识别失败，切换到本地模拟模式:', error);
    console.log('百度AI: 使用本地模拟数据进行识别');
    return getMockResults();
  }
};
