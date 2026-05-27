
# GitHub 自动打包 Android APK 指南

## 步骤 1：初始化 Git 仓库

```bash
cd c:\calorie-tracker
git init
git add .
git commit -m "Initial commit: Calorie Tracker app with Capacitor"
```

## 步骤 2：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库名称（例如：`calorie-tracker`）
3. 选择 **Public** 或 **Private**（都可以，Public 免费）
4. **不要**勾选 "Initialize this repository"（因为我们已经有代码了）
5. 点击 **Create repository**

## 步骤 3：推送代码到 GitHub

创建仓库后，GitHub 会给你推送命令，类似这样：

```bash
git remote add origin https://github.com/你的用户名/calorie-tracker.git
git branch -M main
git push -u origin main
```

**注意：** 把上面的 `你的用户名` 换成你实际的 GitHub 用户名。

## 步骤 4：查看构建状态

1. 回到 GitHub 仓库页面
2. 点击顶部的 **Actions** 标签
3. 你会看到 "Build Android APK" 工作流正在运行（通常需要 3-5 分钟）
4. 点击正在运行的工作流查看进度

## 步骤 5：下载 APK 文件

构建成功后：

1. 点击完成的工作流（显示绿色 ✓）
2. 滚动到页面底部的 **Artifacts** 部分
3. 你会看到两个文件：
   - `android-apk-debug` - 调试版本（直接安装到手机）
   - `android-apk-release` - 发布版本（未签名）
4. 点击下载你需要的版本

## 步骤 6：安装到手机

下载 `android-apk-debug` 后：

1. 将 APK 文件传输到手机
2. 在手机上点击 APK 文件
3. 如果提示"禁止安装未知来源应用"，去手机设置中开启权限
4. 安装完成后就可以使用了！

## 触发新的构建

当你修改了代码后：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub 会自动重新构建 APK！

## 常见问题

**Q: 构建失败怎么办？**
A: 在 Actions 页面点击失败的工作流，查看详细的错误信息。

**Q: 可以手动触发构建吗？**
A: 可以！在 Actions 页面 → 点击 "Build Android APK" → 右侧 "Run workflow" → 选择分支 → 点击 "Run workflow"。

**Q: 如何修改应用图标和名称？**
A: 图标在 `android/app/src/main/res/mipmap-*/`，名称在 `android/app/src/main/res/values/strings.xml`。

