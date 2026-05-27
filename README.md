# 热量记录 App

一个用于记录日常饮食热量的移动端 Web 应用，支持拍照识别和手动记录。

## 功能特性

- 🔐 **多方式登录**：支持 QQ、微信、手机号登录
- 📸 **拍照识别**：拍照后 AI 自动识别食物和热量
- 🍽️ **手动记录**：从预设食物库中选择，输入重量自动计算热量
- 📊 **热量统计**：圆环进度条展示每日摄入情况
- 📅 **历史记录**：按日期查看历史记录
- 🎯 **目标设置**：自定义每日热量目标
- 💾 **本地存储**：所有数据本地存储，保护隐私

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (状态管理)
- React Router (路由)
- Lucide React (图标)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/        # 通用组件
│   ├── CalorieRing.tsx    # 热量圆环组件
│   ├── MealCard.tsx       # 餐食卡片组件
│   └── BottomNav.tsx      # 底部导航
├── pages/            # 页面组件
│   ├── Login.tsx          # 登录页
│   ├── Home.tsx           # 首页
│   ├── Camera.tsx         # 拍照识别
│   ├── ManualEntry.tsx    # 手动记录
│   ├── History.tsx        # 历史记录
│   └── Profile.tsx        # 个人中心
├── store/            # 状态管理
│   └── useAppStore.ts     # Zustand store
├── data/             # 数据
│   └── foods.ts           # 食物数据库
├── types/            # TypeScript 类型
├── App.tsx           # 主应用组件
├── main.tsx          # 应用入口
└── index.css         # 全局样式
```

## 使用说明

1. 启动应用后，选择登录方式（QQ/微信/手机号）
2. 进入首页，查看今日热量摄入情况
3. 点击「手动记录」或「拍照识别」添加新记录
4. 在「历史记录」页面查看过去的记录
5. 在「个人中心」设置每日目标或退出登录

## 注意事项

- 拍照功能需要浏览器支持相机权限
- 当前 AI 识别为模拟功能，实际使用时可接入真实的 AI 识别服务
- 所有数据存储在浏览器本地存储中，清除浏览器数据会导致记录丢失
