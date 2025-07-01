# GitHub 仓库介绍卡片生成器

一个美观的 React 应用程序，用于生成 GitHub 仓库的介绍卡片，并可以将卡片保存为图片。

## 功能特性

- 🎨 现代化的用户界面设计
- 📊 显示仓库的关键信息（Stars、Forks、编程语言、更新时间）
- 💾 将生成的卡片保存为高分辨率图片
- 📱 响应式设计，支持各种设备
- 🌐 支持中文界面
- 🔗 支持 GitHub 链接直接解析
- 🛠️ 双重保存模式（标准模式 + 简单模式）

## 技术栈

- React 18
- Tailwind CSS
- html2canvas（用于图片导出）
- GitHub API

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 构建生产版本

```bash
npm run build
```

## 使用方法

### 方法一：GitHub 链接（推荐）
1. 选择"GitHub 链接"输入模式
2. 粘贴 GitHub 仓库链接，支持以下格式：
   - 完整链接：`https://github.com/octocat/Hello-World`
   - 简短链接：`github.com/octocat/Hello-World`
   - 用户名/仓库名：`octocat/Hello-World`
3. 点击"生成卡片"按钮
4. 查看生成的卡片
5. 点击"保存为图片"或"简单模式"按钮下载卡片图片

### 方法二：手动输入
1. 选择"手动输入"模式
2. 输入 GitHub 用户名（例如：octocat）
3. 输入仓库名称（例如：Hello-World）
4. 点击"生成卡片"按钮
5. 查看生成的卡片
6. 点击"保存为图片"或"简单模式"按钮下载卡片图片

### 图片保存说明
- **保存为图片**：使用原生 Canvas API 绘制，生成高质量的纯净图片
- **简单模式**：使用简化的 Canvas 绘制，适合快速导出或当标准模式出现问题时使用

### 技术亮点
- 🎯 **纯 Canvas 渲染**：完全摆脱 html2canvas 依赖，避免样式丢失和背景问题
- 🖼️ **完美图片输出**：白色背景、清晰字体、准确布局
- 🔧 **双重保存方案**：标准模式和简单模式确保任何情况下都能成功保存

## 项目结构

```
src/
├── App.js          # 主应用组件
├── index.js        # 应用入口点
├── index.css       # 全局样式
public/
├── index.html      # HTML 模板
├── manifest.json   # PWA 配置
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
