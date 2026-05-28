import { Food } from '../types';

const baseFoods: Food[] = [
  // ==================== 主食类 ====================
  { id: 'staple_001', name: '油条', caloriesPer100g: 386, category: '主食', image: '🥖' },
  { id: 'staple_002', name: '燕麦片', caloriesPer100g: 377, category: '主食', image: '🥣' },
  { id: 'staple_003', name: '燕麦', caloriesPer100g: 377, category: '主食', image: '🥣' },
  { id: 'staple_004', name: '面条干', caloriesPer100g: 355, category: '主食', image: '🍜' },
  { id: 'staple_005', name: '烧饼', caloriesPer100g: 326, category: '主食', image: '🥧' },
  { id: 'staple_006', name: '白面包', caloriesPer100g: 266, category: '主食', image: '🍞' },
  { id: 'staple_007', name: '面包', caloriesPer100g: 266, category: '主食', image: '🍞' },
  { id: 'staple_008', name: '烙饼', caloriesPer100g: 255, category: '主食', image: '🥞' },
  { id: 'staple_009', name: '全麦面包', caloriesPer100g: 246, category: '主食', image: '🥖' },
  { id: 'staple_010', name: '包子', caloriesPer100g: 227, category: '主食', image: '🥟' },
  { id: 'staple_011', name: '馒头', caloriesPer100g: 223, category: '主食', image: '🥟' },
  { id: 'staple_012', name: '饺子', caloriesPer100g: 218, category: '主食', image: '🥟' },
  { id: 'staple_013', name: '花卷', caloriesPer100g: 211, category: '主食', image: '🥟' },
  { id: 'staple_014', name: '粽子', caloriesPer100g: 195, category: '主食', image: '🍙' },
  { id: 'staple_015', name: '年糕', caloriesPer100g: 154, category: '主食', image: '🍢' },
  { id: 'staple_016', name: '意面', caloriesPer100g: 131, category: '主食', image: '🍝' },
  { id: 'staple_017', name: '糙米饭', caloriesPer100g: 123, category: '主食', image: '🍚' },
  { id: 'staple_018', name: '白米饭', caloriesPer100g: 116, category: '主食', image: '🍚' },
  { id: 'staple_019', name: '米饭', caloriesPer100g: 116, category: '主食', image: '🍚' },
  { id: 'staple_020', name: '玉米', caloriesPer100g: 112, category: '主食', image: '🌽' },
  { id: 'staple_021', name: '面条', caloriesPer100g: 110, category: '主食', image: '🍜' },
  { id: 'staple_022', name: '紫薯', caloriesPer100g: 106, category: '主食', image: '🍠' },
  { id: 'staple_023', name: '红薯', caloriesPer100g: 86, category: '主食', image: '🍠' },
  { id: 'staple_024', name: '土豆', caloriesPer100g: 81, category: '主食', image: '🥔' },
  { id: 'staple_025', name: '芋头', caloriesPer100g: 58, category: '主食', image: '🥔' },
  { id: 'staple_026', name: '山药', caloriesPer100g: 57, category: '主食', image: '🥔' },
  { id: 'staple_027', name: '小米粥', caloriesPer100g: 46, category: '主食', image: '🥣' },
  { id: 'staple_028', name: '粥', caloriesPer100g: 46, category: '主食', image: '🥣' },
  { id: 'staple_029', name: '馄饨', caloriesPer100g: 210, category: '主食', image: '🥟' },
  { id: 'staple_030', name: '汤圆', caloriesPer100g: 180, category: '主食', image: '🥟' },
  { id: 'staple_031', name: '春卷', caloriesPer100g: 450, category: '主食', image: '🍥' },
  { id: 'staple_032', name: '麻花', caloriesPer100g: 520, category: '主食', image: '🥨' },
  { id: 'staple_033', name: '披萨', caloriesPer100g: 266, category: '主食', image: '🍕' },
  { id: 'staple_034', name: '汉堡', caloriesPer100g: 250, category: '主食', image: '🍔' },
  { id: 'staple_035', name: '三明治', caloriesPer100g: 300, category: '主食', image: '🥪' },
  { id: 'staple_036', name: '手抓饼', caloriesPer100g: 300, category: '主食', image: '🥞' },
  { id: 'staple_037', name: '方便面', caloriesPer100g: 473, category: '主食', image: '🍜' },
  { id: 'staple_038', name: '粉丝', caloriesPer100g: 335, category: '主食', image: '🍜' },
  { id: 'staple_039', name: '粉条', caloriesPer100g: 335, category: '主食', image: '🍜' },
  { id: 'staple_040', name: '米线', caloriesPer100g: 116, category: '主食', image: '🍜' },
  { id: 'staple_041', name: '螺蛳粉', caloriesPer100g: 130, category: '主食', image: '🍜' },
  { id: 'staple_042', name: '炒米粉', caloriesPer100g: 120, category: '主食', image: '🍜' },
  { id: 'staple_043', name: '炒面', caloriesPer100g: 150, category: '主食', image: '🍜' },
  { id: 'staple_044', name: '蛋炒饭', caloriesPer100g: 180, category: '主食', image: '🍚' },
  { id: 'staple_045', name: '炒饭', caloriesPer100g: 180, category: '主食', image: '🍚' },
  { id: 'staple_046', name: '葱油饼', caloriesPer100g: 250, category: '主食', image: '🥞' },
  { id: 'staple_047', name: '千层饼', caloriesPer100g: 280, category: '主食', image: '🥞' },
  { id: 'staple_048', name: '小笼包', caloriesPer100g: 200, category: '主食', image: '🥟' },
  { id: 'staple_049', name: '叉烧包', caloriesPer100g: 220, category: '主食', image: '🥟' },
  { id: 'staple_050', name: '豆沙包', caloriesPer100g: 210, category: '主食', image: '🥟' },

  // ==================== 肉类 ====================
  { id: 'meat_001', name: '培根', caloriesPer100g: 541, category: '肉类', image: '🥓' },
  { id: 'meat_002', name: '腊肉', caloriesPer100g: 498, category: '肉类', image: '🥓' },
  { id: 'meat_003', name: '五花肉', caloriesPer100g: 395, category: '肉类', image: '🥓' },
  { id: 'meat_004', name: '牛腩', caloriesPer100g: 332, category: '肉类', image: '🥩' },
  { id: 'meat_005', name: '羊排', caloriesPer100g: 292, category: '肉类', image: '🍖' },
  { id: 'meat_006', name: '猪排骨', caloriesPer100g: 264, category: '肉类', image: '🍖' },
  { id: 'meat_007', name: '猪蹄', caloriesPer100g: 260, category: '肉类', image: '🍖' },
  { id: 'meat_008', name: '鹅肉', caloriesPer100g: 251, category: '肉类', image: '🍗' },
  { id: 'meat_009', name: '鸭肉', caloriesPer100g: 240, category: '肉类', image: '🦆' },
  { id: 'meat_010', name: '午餐肉', caloriesPer100g: 229, category: '肉类', image: '🥓' },
  { id: 'meat_011', name: '牛舌', caloriesPer100g: 224, category: '肉类', image: '🥩' },
  { id: 'meat_012', name: '火腿肠', caloriesPer100g: 212, category: '肉类', image: '🌭' },
  { id: 'meat_013', name: '鸡翅', caloriesPer100g: 194, category: '肉类', image: '🍗' },
  { id: 'meat_014', name: '鸡腿', caloriesPer100g: 181, category: '肉类', image: '🍗' },
  { id: 'meat_015', name: '猪耳', caloriesPer100g: 176, category: '肉类', image: '🐷' },
  { id: 'meat_016', name: '鸡心', caloriesPer100g: 159, category: '肉类', image: '🐔' },
  { id: 'meat_017', name: '猪肉', caloriesPer100g: 143, category: '肉类', image: '🥓' },
  { id: 'meat_018', name: '鸡胸肉', caloriesPer100g: 133, category: '肉类', image: '🍗' },
  { id: 'meat_019', name: '猪肝', caloriesPer100g: 129, category: '肉类', image: '🥩' },
  { id: 'meat_020', name: '牛腱子', caloriesPer100g: 123, category: '肉类', image: '🥩' },
  { id: 'meat_021', name: '羊肉', caloriesPer100g: 118, category: '肉类', image: '🍖' },
  { id: 'meat_022', name: '鸡胗', caloriesPer100g: 118, category: '肉类', image: '🐔' },
  { id: 'meat_023', name: '火鸡肉', caloriesPer100g: 108, category: '肉类', image: '🦃' },
  { id: 'meat_024', name: '牛肉', caloriesPer100g: 106, category: '肉类', image: '🥩' },
  { id: 'meat_025', name: '兔肉', caloriesPer100g: 102, category: '肉类', image: '🐰' },
  { id: 'meat_026', name: '鸡肉', caloriesPer100g: 133, category: '肉类', image: '🍗' },
  { id: 'meat_027', name: '鱼肉', caloriesPer100g: 120, category: '肉类', image: '🐟' },
  { id: 'meat_028', name: '虾', caloriesPer100g: 80, category: '肉类', image: '🦐' },
  { id: 'meat_029', name: '鸡蛋', caloriesPer100g: 143, category: '肉类', image: '🥚' },
  { id: 'meat_030', name: '鸭蛋', caloriesPer100g: 180, category: '肉类', image: '🥚' },
  { id: 'meat_031', name: '三文鱼', caloriesPer100g: 208, category: '肉类', image: '🐟' },
  { id: 'meat_032', name: '鳕鱼', caloriesPer100g: 88, category: '肉类', image: '🐟' },
  { id: 'meat_033', name: '鲈鱼', caloriesPer100g: 105, category: '肉类', image: '🐟' },
  { id: 'meat_034', name: '鲫鱼', caloriesPer100g: 108, category: '肉类', image: '🐟' },
  { id: 'meat_035', name: '鲤鱼', caloriesPer100g: 109, category: '肉类', image: '🐟' },
  { id: 'meat_036', name: '带鱼', caloriesPer100g: 127, category: '肉类', image: '🐟' },
  { id: 'meat_037', name: '虾仁', caloriesPer100g: 80, category: '肉类', image: '🦐' },
  { id: 'meat_038', name: '蟹肉', caloriesPer100g: 118, category: '肉类', image: '🦀' },
  { id: 'meat_039', name: '扇贝', caloriesPer100g: 60, category: '肉类', image: '🐚' },
  { id: 'meat_040', name: '生蚝', caloriesPer100g: 57, category: '肉类', image: '🦪' },
  { id: 'meat_041', name: '鱿鱼', caloriesPer100g: 87, category: '肉类', image: '🦑' },
  { id: 'meat_042', name: '牛排', caloriesPer100g: 250, category: '肉类', image: '🥩' },
  { id: 'meat_043', name: '鸡排', caloriesPer100g: 150, category: '肉类', image: '🍗' },
  { id: 'meat_044', name: '鸭腿', caloriesPer100g: 180, category: '肉类', image: '🦆' },
  { id: 'meat_045', name: '鹅腿', caloriesPer100g: 200, category: '肉类', image: '🦢' },
  { id: 'meat_046', name: '牛腩肉', caloriesPer100g: 250, category: '肉类', image: '🥩' },
  { id: 'meat_047', name: '牛肋排', caloriesPer100g: 280, category: '肉类', image: '🥩' },
  { id: 'meat_048', name: '羊腿', caloriesPer100g: 150, category: '肉类', image: '🍖' },
  { id: 'meat_049', name: '鹅肝', caloriesPer100g: 180, category: '肉类', image: '🫀' },
  { id: 'meat_050', name: '牛肝', caloriesPer100g: 140, category: '肉类', image: '🫀' },

  // ==================== 蔬菜类 ====================
  { id: 'vegetable_001', name: '毛豆', caloriesPer100g: 131, category: '蔬菜', image: '🫛' },
  { id: 'vegetable_002', name: '大蒜', caloriesPer100g: 126, category: '蔬菜', image: '🧄' },
  { id: 'vegetable_003', name: '豌豆', caloriesPer100g: 105, category: '蔬菜', image: '🫛' },
  { id: 'vegetable_004', name: '莲藕', caloriesPer100g: 73, category: '蔬菜', image: '🥔' },
  { id: 'vegetable_005', name: '蒜苔', caloriesPer100g: 61, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_006', name: '荸荠', caloriesPer100g: 59, category: '蔬菜', image: '🍐' },
  { id: 'vegetable_007', name: '洋葱', caloriesPer100g: 39, category: '蔬菜', image: '🧅' },
  { id: 'vegetable_008', name: '胡萝卜', caloriesPer100g: 37, category: '蔬菜', image: '🥕' },
  { id: 'vegetable_009', name: '西兰花', caloriesPer100g: 34, category: '蔬菜', image: '🥦' },
  { id: 'vegetable_010', name: '金针菇', caloriesPer100g: 26, category: '蔬菜', image: '🍄' },
  { id: 'vegetable_011', name: '韭菜', caloriesPer100g: 26, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_012', name: '花菜', caloriesPer100g: 24, category: '蔬菜', image: '🥦' },
  { id: 'vegetable_013', name: '菠菜', caloriesPer100g: 23, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_014', name: '茄子', caloriesPer100g: 23, category: '蔬菜', image: '🍆' },
  { id: 'vegetable_015', name: '空心菜', caloriesPer100g: 23, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_016', name: '南瓜', caloriesPer100g: 23, category: '蔬菜', image: '🎃' },
  { id: 'vegetable_017', name: '青椒', caloriesPer100g: 22, category: '蔬菜', image: '🫑' },
  { id: 'vegetable_018', name: '蘑菇', caloriesPer100g: 22, category: '蔬菜', image: '🍄' },
  { id: 'vegetable_019', name: '木耳', caloriesPer100g: 21, category: '蔬菜', image: '🍄' },
  { id: 'vegetable_020', name: '芦笋', caloriesPer100g: 20, category: '蔬菜', image: '🥦' },
  { id: 'vegetable_021', name: '西红柿', caloriesPer100g: 19, category: '蔬菜', image: '🍅' },
  { id: 'vegetable_022', name: '番茄', caloriesPer100g: 19, category: '蔬菜', image: '🍅' },
  { id: 'vegetable_023', name: '苦瓜', caloriesPer100g: 19, category: '蔬菜', image: '🥒' },
  { id: 'vegetable_024', name: '豆芽', caloriesPer100g: 18, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_025', name: '冬瓜', caloriesPer100g: 11, category: '蔬菜', image: '🥒' },
  { id: 'vegetable_026', name: '青菜', caloriesPer100g: 23, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_027', name: '白菜', caloriesPer100g: 17, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_028', name: '生菜', caloriesPer100g: 16, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_029', name: '黄瓜', caloriesPer100g: 15, category: '蔬菜', image: '🥒' },
  { id: 'vegetable_030', name: '芹菜', caloriesPer100g: 14, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_031', name: '香菜', caloriesPer100g: 25, category: '蔬菜', image: '🌿' },
  { id: 'vegetable_032', name: '茼蒿', caloriesPer100g: 24, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_033', name: '油麦菜', caloriesPer100g: 20, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_034', name: '小白菜', caloriesPer100g: 18, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_035', name: '油菜', caloriesPer100g: 25, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_036', name: '芥蓝', caloriesPer100g: 26, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_037', name: '莴笋', caloriesPer100g: 14, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_038', name: '上海青', caloriesPer100g: 20, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_039', name: '卷心菜', caloriesPer100g: 25, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_040', name: '紫甘蓝', caloriesPer100g: 25, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_041', name: '西葫芦', caloriesPer100g: 18, category: '蔬菜', image: '🥒' },
  { id: 'vegetable_042', name: '丝瓜', caloriesPer100g: 20, category: '蔬菜', image: '🥒' },
  { id: 'vegetable_043', name: '青椒', caloriesPer100g: 22, category: '蔬菜', image: '🫑' },
  { id: 'vegetable_044', name: '红椒', caloriesPer100g: 25, category: '蔬菜', image: '🫑' },
  { id: 'vegetable_045', name: '黄椒', caloriesPer100g: 25, category: '蔬菜', image: '🫑' },
  { id: 'vegetable_046', name: '芹菜', caloriesPer100g: 14, category: '蔬菜', image: '🥬' },
  { id: 'vegetable_047', name: '大葱', caloriesPer100g: 30, category: '蔬菜', image: '🧅' },
  { id: 'vegetable_048', name: '小葱', caloriesPer100g: 25, category: '蔬菜', image: '🧅' },
  { id: 'vegetable_049', name: '生姜', caloriesPer100g: 40, category: '蔬菜', image: '🧄' },
  { id: 'vegetable_050', name: '莲藕', caloriesPer100g: 73, category: '蔬菜', image: '🥔' },

  // ==================== 水果类 ====================
  { id: 'fruit_001', name: '椰子肉', caloriesPer100g: 354, category: '水果', image: '🥥' },
  { id: 'fruit_002', name: '红枣', caloriesPer100g: 264, category: '水果', image: '🫒' },
  { id: 'fruit_003', name: '牛油果', caloriesPer100g: 160, category: '水果', image: '🥑' },
  { id: 'fruit_004', name: '榴莲', caloriesPer100g: 147, category: '水果', image: '🥭' },
  { id: 'fruit_005', name: '鲜枣', caloriesPer100g: 125, category: '水果', image: '🍒' },
  { id: 'fruit_006', name: '山楂', caloriesPer100g: 95, category: '水果', image: '🍒' },
  { id: 'fruit_007', name: '香蕉', caloriesPer100g: 93, category: '水果', image: '🍌' },
  { id: 'fruit_008', name: '柿子', caloriesPer100g: 74, category: '水果', image: '🍅' },
  { id: 'fruit_009', name: '山竹', caloriesPer100g: 73, category: '水果', image: '🍒' },
  { id: 'fruit_010', name: '葡萄', caloriesPer100g: 67, category: '水果', image: '🍇' },
  { id: 'fruit_011', name: '荔枝', caloriesPer100g: 66, category: '水果', image: '🍒' },
  { id: 'fruit_012', name: '石榴', caloriesPer100g: 63, category: '水果', image: '🍈' },
  { id: 'fruit_013', name: '猕猴桃', caloriesPer100g: 61, category: '水果', image: '🥝' },
  { id: 'fruit_014', name: '芒果', caloriesPer100g: 60, category: '水果', image: '🥭' },
  { id: 'fruit_015', name: '龙眼', caloriesPer100g: 60, category: '水果', image: '🍒' },
  { id: 'fruit_016', name: '蓝莓', caloriesPer100g: 57, category: '水果', image: '🫐' },
  { id: 'fruit_017', name: '火龙果', caloriesPer100g: 55, category: '水果', image: '🍈' },
  { id: 'fruit_018', name: '苹果', caloriesPer100g: 52, category: '水果', image: '🍎' },
  { id: 'fruit_019', name: '梨', caloriesPer100g: 51, category: '水果', image: '🍐' },
  { id: 'fruit_020', name: '橙子', caloriesPer100g: 47, category: '水果', image: '🍊' },
  { id: 'fruit_021', name: '桃子', caloriesPer100g: 42, category: '水果', image: '🍑' },
  { id: 'fruit_022', name: '柚子', caloriesPer100g: 38, category: '水果', image: '🍊' },
  { id: 'fruit_023', name: '哈密瓜', caloriesPer100g: 34, category: '水果', image: '🍈' },
  { id: 'fruit_024', name: '草莓', caloriesPer100g: 32, category: '水果', image: '🍓' },
  { id: 'fruit_025', name: '西瓜', caloriesPer100g: 31, category: '水果', image: '🍉' },
  { id: 'fruit_026', name: '菠萝', caloriesPer100g: 48, category: '水果', image: '🍍' },
  { id: 'fruit_027', name: '西瓜', caloriesPer100g: 31, category: '水果', image: '🍉' },
  { id: 'fruit_028', name: '木瓜', caloriesPer100g: 43, category: '水果', image: '🥭' },
  { id: 'fruit_029', name: '百香果', caloriesPer100g: 71, category: '水果', image: '🥝' },
  { id: 'fruit_030', name: '柠檬', caloriesPer100g: 29, category: '水果', image: '🍋' },
  { id: 'fruit_031', name: '葡萄柚', caloriesPer100g: 42, category: '水果', image: '🍊' },
  { id: 'fruit_032', name: '菠萝蜜', caloriesPer100g: 105, category: '水果', image: '🍈' },
  { id: 'fruit_033', name: '龙眼', caloriesPer100g: 60, category: '水果', image: '🍒' },
  { id: 'fruit_034', name: '桑葚', caloriesPer100g: 49, category: '水果', image: '🍇' },
  { id: 'fruit_035', name: '樱桃', caloriesPer100g: 46, category: '水果', image: '🍒' },
  { id: 'fruit_036', name: '李子', caloriesPer100g: 38, category: '水果', image: '🍒' },
  { id: 'fruit_037', name: '杏子', caloriesPer100g: 36, category: '水果', image: '🍑' },
  { id: 'fruit_038', name: '枇杷', caloriesPer100g: 39, category: '水果', image: '🍑' },
  { id: 'fruit_039', name: '杨梅', caloriesPer100g: 34, category: '水果', image: '🍒' },
  { id: 'fruit_040', name: '甘蔗', caloriesPer100g: 64, category: '水果', image: '🌿' },
  { id: 'fruit_041', name: '椰子水', caloriesPer100g: 19, category: '水果', image: '🥥' },
  { id: 'fruit_042', name: '黑加仑', caloriesPer100g: 63, category: '水果', image: '🍇' },
  { id: 'fruit_043', name: '蔓越莓', caloriesPer100g: 46, category: '水果', image: '🍒' },
  { id: 'fruit_044', name: '石榴', caloriesPer100g: 63, category: '水果', image: '🍈' },
  { id: 'fruit_045', name: '青提', caloriesPer100g: 45, category: '水果', image: '🍇' },
  { id: 'fruit_046', name: '红提', caloriesPer100g: 45, category: '水果', image: '🍇' },
  { id: 'fruit_047', name: '奇异果', caloriesPer100g: 61, category: '水果', image: '🥝' },
  { id: 'fruit_048', name: '牛油果', caloriesPer100g: 160, category: '水果', image: '🥑' },
  { id: 'fruit_049', name: '无花果', caloriesPer100g: 74, category: '水果', image: '🍈' },
  { id: 'fruit_050', name: '蓝莓', caloriesPer100g: 57, category: '水果', image: '🫐' },

  // ==================== 饮品类 ====================
  { id: 'drink_001', name: '速溶咖啡', caloriesPer100g: 420, category: '饮品', image: '☕' },
  { id: 'drink_002', name: '椰奶', caloriesPer100g: 186, category: '饮品', image: '🥥' },
  { id: 'drink_003', name: '奶昔', caloriesPer100g: 112, category: '饮品', image: '🥛' },
  { id: 'drink_004', name: '奶茶', caloriesPer100g: 78, category: '饮品', image: '🧋' },
  { id: 'drink_005', name: '热巧克力', caloriesPer100g: 77, category: '饮品', image: '☕' },
  { id: 'drink_006', name: '酸奶', caloriesPer100g: 72, category: '饮品', image: '🥛' },
  { id: 'drink_007', name: '养乐多', caloriesPer100g: 68, category: '饮品', image: '🥤' },
  { id: 'drink_008', name: '牛奶', caloriesPer100g: 61, category: '饮品', image: '🥛' },
  { id: 'drink_009', name: '蜂蜜柚子茶', caloriesPer100g: 60, category: '饮品', image: '🍯' },
  { id: 'drink_010', name: '拿铁', caloriesPer100g: 56, category: '饮品', image: '☕' },
  { id: 'drink_011', name: '杏仁露', caloriesPer100g: 51, category: '饮品', image: '🥛' },
  { id: 'drink_012', name: '雪碧', caloriesPer100g: 49, category: '饮品', image: '🥤' },
  { id: 'drink_013', name: '苹果汁', caloriesPer100g: 46, category: '饮品', image: '🍎' },
  { id: 'drink_014', name: '橙汁', caloriesPer100g: 45, category: '饮品', image: '🧃' },
  { id: 'drink_015', name: '豆奶', caloriesPer100g: 44, category: '饮品', image: '🥛' },
  { id: 'drink_016', name: '可乐', caloriesPer100g: 42, category: '饮品', image: '🥤' },
  { id: 'drink_017', name: '酸梅汤', caloriesPer100g: 40, category: '饮品', image: '🥤' },
  { id: 'drink_018', name: '冰红茶', caloriesPer100g: 37, category: '饮品', image: '🍵' },
  { id: 'drink_019', name: '脱脂牛奶', caloriesPer100g: 33, category: '饮品', image: '🥛' },
  { id: 'drink_020', name: '凉茶', caloriesPer100g: 32, category: '饮品', image: '🍵' },
  { id: 'drink_021', name: '豆浆', caloriesPer100g: 31, category: '饮品', image: '🥛' },
  { id: 'drink_022', name: '运动饮料', caloriesPer100g: 26, category: '饮品', image: '🥤' },
  { id: 'drink_023', name: '椰子水', caloriesPer100g: 19, category: '饮品', image: '🥥' },
  { id: 'drink_024', name: '美式咖啡', caloriesPer100g: 2, category: '饮品', image: '☕' },
  { id: 'drink_025', name: '白开水', caloriesPer100g: 0, category: '饮品', image: '💧' },
  { id: 'drink_026', name: '黑咖啡', caloriesPer100g: 2, category: '饮品', image: '☕' },
  { id: 'drink_027', name: '茶', caloriesPer100g: 2, category: '饮品', image: '🍵' },
  { id: 'drink_028', name: '绿茶', caloriesPer100g: 2, category: '饮品', image: '🍵' },
  { id: 'drink_029', name: '红茶', caloriesPer100g: 2, category: '饮品', image: '🍵' },
  { id: 'drink_030', name: '茉莉花茶', caloriesPer100g: 2, category: '饮品', image: '🍵' },
  { id: 'drink_031', name: '菊花茶', caloriesPer100g: 2, category: '饮品', image: '🍵' },
  { id: 'drink_032', name: '玫瑰花茶', caloriesPer100g: 2, category: '饮品', image: '🌹' },
  { id: 'drink_033', name: '柠檬茶', caloriesPer100g: 30, category: '饮品', image: '🍋' },
  { id: 'drink_034', name: '西瓜汁', caloriesPer100g: 35, category: '饮品', image: '🍉' },
  { id: 'drink_035', name: '葡萄汁', caloriesPer100g: 50, category: '饮品', image: '🍇' },
  { id: 'drink_036', name: '芒果汁', caloriesPer100g: 60, category: '饮品', image: '🥭' },
  { id: 'drink_037', name: '菠萝汁', caloriesPer100g: 50, category: '饮品', image: '🍍' },
  { id: 'drink_038', name: '山楂汁', caloriesPer100g: 45, category: '饮品', image: '🍒' },
  { id: 'drink_039', name: '柚子茶', caloriesPer100g: 50, category: '饮品', image: '🍊' },
  { id: 'drink_040', name: '珍珠奶茶', caloriesPer100g: 78, category: '饮品', image: '🧋' },
  { id: 'drink_041', name: '抹茶拿铁', caloriesPer100g: 55, category: '饮品', image: '🍵' },
  { id: 'drink_042', name: '焦糖玛奇朵', caloriesPer100g: 60, category: '饮品', image: '☕' },
  { id: 'drink_043', name: '摩卡咖啡', caloriesPer100g: 65, category: '饮品', image: '☕' },
  { id: 'drink_044', name: '卡布奇诺', caloriesPer100g: 50, category: '饮品', image: '☕' },
  { id: 'drink_045', name: '香草拿铁', caloriesPer100g: 55, category: '饮品', image: '☕' },
  { id: 'drink_046', name: '榛果拿铁', caloriesPer100g: 55, category: '饮品', image: '☕' },
  { id: 'drink_047', name: '燕麦奶', caloriesPer100g: 120, category: '饮品', image: '🥛' },
  { id: 'drink_048', name: '杏仁奶', caloriesPer100g: 150, category: '饮品', image: '🥛' },
  { id: 'drink_049', name: '椰奶', caloriesPer100g: 186, category: '饮品', image: '🥥' },
  { id: 'drink_050', name: '豆奶', caloriesPer100g: 44, category: '饮品', image: '🥛' },

  // ==================== 豆制品类 ====================
  { id: 'tofu_001', name: '腐竹', caloriesPer100g: 459, category: '豆制品', image: '🧈' },
  { id: 'tofu_002', name: '豆腐皮', caloriesPer100g: 409, category: '豆制品', image: '🧈' },
  { id: 'tofu_003', name: '黄豆', caloriesPer100g: 390, category: '豆制品', image: '🫘' },
  { id: 'tofu_004', name: '黑豆', caloriesPer100g: 381, category: '豆制品', image: '🫘' },
  { id: 'tofu_005', name: '蚕豆', caloriesPer100g: 335, category: '豆制品', image: '🫘' },
  { id: 'tofu_006', name: '绿豆', caloriesPer100g: 316, category: '豆制品', image: '🫘' },
  { id: 'tofu_007', name: '红豆', caloriesPer100g: 309, category: '豆制品', image: '🫘' },
  { id: 'tofu_008', name: '千张', caloriesPer100g: 260, category: '豆制品', image: '🧈' },
  { id: 'tofu_009', name: '豆筋', caloriesPer100g: 259, category: '豆制品', image: '🧈' },
  { id: 'tofu_010', name: '油豆腐', caloriesPer100g: 244, category: '豆制品', image: '🧈' },
  { id: 'tofu_011', name: '豆皮卷', caloriesPer100g: 215, category: '豆制品', image: '🌮' },
  { id: 'tofu_012', name: '纳豆', caloriesPer100g: 212, category: '豆制品', image: '🫘' },
  { id: 'tofu_013', name: '素鸡', caloriesPer100g: 192, category: '豆制品', image: '🐔' },
  { id: 'tofu_014', name: '豆瓣酱', caloriesPer100g: 156, category: '豆制品', image: '🧈' },
  { id: 'tofu_015', name: '熏干', caloriesPer100g: 153, category: '豆制品', image: '🧈' },
  { id: 'tofu_016', name: '豆腐干', caloriesPer100g: 140, category: '豆制品', image: '🧈' },
  { id: 'tofu_017', name: '豆干', caloriesPer100g: 140, category: '豆制品', image: '🧈' },
  { id: 'tofu_018', name: '毛豆', caloriesPer100g: 131, category: '豆制品', image: '🫛' },
  { id: 'tofu_019', name: '豌豆', caloriesPer100g: 105, category: '豆制品', image: '🫛' },
  { id: 'tofu_020', name: '豆渣', caloriesPer100g: 84, category: '豆制品', image: '🫘' },
  { id: 'tofu_021', name: '冻豆腐', caloriesPer100g: 79, category: '豆制品', image: '🧈' },
  { id: 'tofu_022', name: '老豆腐', caloriesPer100g: 76, category: '豆制品', image: '🧈' },
  { id: 'tofu_023', name: '嫩豆腐', caloriesPer100g: 55, category: '豆制品', image: '🧈' },
  { id: 'tofu_024', name: '内酯豆腐', caloriesPer100g: 49, category: '豆制品', image: '🧈' },
  { id: 'tofu_025', name: '豆浆', caloriesPer100g: 31, category: '豆制品', image: '🥛' },
  { id: 'tofu_026', name: '豆腐', caloriesPer100g: 70, category: '豆制品', image: '🧈' },
  { id: 'tofu_027', name: '豆腐干', caloriesPer100g: 140, category: '豆制品', image: '🧈' },
  { id: 'tofu_028', name: '豆腐丝', caloriesPer100g: 150, category: '豆制品', image: '🧈' },
  { id: 'tofu_029', name: '豆腐皮', caloriesPer100g: 409, category: '豆制品', image: '🧈' },
  { id: 'tofu_030', name: '腐竹', caloriesPer100g: 459, category: '豆制品', image: '🧈' },
  { id: 'tofu_031', name: '素丸子', caloriesPer100g: 200, category: '豆制品', image: '🧆' },
  { id: 'tofu_032', name: '素火腿', caloriesPer100g: 180, category: '豆制品', image: '🌭' },
  { id: 'tofu_033', name: '豆腐脑', caloriesPer100g: 50, category: '豆制品', image: '🥣' },
  { id: 'tofu_034', name: '红豆沙', caloriesPer100g: 250, category: '豆制品', image: '🫘' },
  { id: 'tofu_035', name: '绿豆沙', caloriesPer100g: 200, category: '豆制品', image: '🫘' },
  { id: 'tofu_036', name: '鹰嘴豆', caloriesPer100g: 300, category: '豆制品', image: '🫘' },
  { id: 'tofu_037', name: '扁豆', caloriesPer100g: 300, category: '豆制品', image: '🫘' },
  { id: 'tofu_038', name: '四季豆', caloriesPer100g: 280, category: '豆制品', image: '🫛' },
  { id: 'tofu_039', name: '荷兰豆', caloriesPer100g: 250, category: '豆制品', image: '🫛' },
  { id: 'tofu_040', name: '豇豆', caloriesPer100g: 280, category: '豆制品', image: '🫘' },
  { id: 'tofu_041', name: '芸豆', caloriesPer100g: 290, category: '豆制品', image: '🫘' },
  { id: 'tofu_042', name: '豌豆黄', caloriesPer100g: 150, category: '豆制品', image: '🫛' },
  { id: 'tofu_043', name: '豆腐卷', caloriesPer100g: 100, category: '豆制品', image: '🧈' },
  { id: 'tofu_044', name: '豆泡', caloriesPer100g: 200, category: '豆制品', image: '🧈' },
  { id: 'tofu_045', name: '素肠', caloriesPer100g: 180, category: '豆制品', image: '🌭' },
  { id: 'tofu_046', name: '素肚', caloriesPer100g: 150, category: '豆制品', image: '🧈' },
  { id: 'tofu_047', name: '素虾', caloriesPer100g: 120, category: '豆制品', image: '🦐' },
  { id: 'tofu_048', name: '素蟹', caloriesPer100g: 130, category: '豆制品', image: '🦀' },
  { id: 'tofu_049', name: '素鱼', caloriesPer100g: 140, category: '豆制品', image: '🐟' },
  { id: 'tofu_050', name: '豆腐花', caloriesPer100g: 50, category: '豆制品', image: '🥣' },
];

let customFoods: Food[] = [];

const loadCustomFoods = () => {
  try {
    const stored = localStorage.getItem('customFoods');
    if (stored) {
      customFoods = JSON.parse(stored);
    }
  } catch (e) {
    console.error('加载自定义食物失败:', e);
  }
};

const saveCustomFoods = () => {
  try {
    localStorage.setItem('customFoods', JSON.stringify(customFoods));
  } catch (e) {
    console.error('保存自定义食物失败:', e);
  }
};

loadCustomFoods();

export const getAllFoods = (): Food[] => {
  return [...baseFoods, ...customFoods];
};

export const addCustomFood = (food: Food) => {
  customFoods = [...customFoods, food];
  saveCustomFoods();
  refreshFoods();
};

export let foods: Food[] = getAllFoods();

export const refreshFoods = () => {
  foods = getAllFoods();
};

export const getFoodById = (id: string): Food | undefined => foods.find(f => f.id === id);

export const searchFoods = (query: string): Food[] => {
  const lowerQuery = query.toLowerCase();
  return foods.filter(f => 
    f.name.toLowerCase().includes(lowerQuery) || 
    f.category.toLowerCase().includes(lowerQuery)
  );
};

export const getFoodsByCategory = (category: string): Food[] => {
  return foods.filter(f => f.category === category);
};

export const categories = ['全部', '主食', '肉类', '蔬菜', '水果', '饮品', '豆制品'];

export const matchFoodFromDatabase = (apiFoodName: string): Food | null => {
  const lowerName = apiFoodName.toLowerCase();
  
  let match = foods.find(f => f.name === apiFoodName);
  if (match) return match;
  
  match = foods.find(f => f.name.toLowerCase() === lowerName);
  if (match) return match;
  
  match = foods.find(f => f.name.includes(apiFoodName) || apiFoodName.includes(f.name));
  if (match) return match;
  
  match = foods.find(f => f.name.toLowerCase().includes(lowerName) || lowerName.includes(f.name.toLowerCase()));
  if (match) return match;

  return null;
};
