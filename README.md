<div align="center">

<br/>

# 解构世界

**一个年轻人的数字花园**

<br/>

用文字记录思考，用技术辅助表达，在这个空间里种下对世界的观察。

<br/>

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" height="20" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" height="20" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" height="20" alt="Vite"/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white" height="20" alt="Tailwind"/>
<img src="https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white" height="20" alt="GSAP"/>

<br/>
<br/>

<a href="https://xn-289.github.io/kealin-Personal-website">🌐 在线访问</a> &nbsp;·&nbsp; <a href="#-如何添加内容">✍️ 写文章</a>

<br/>
<br/>

---

</div>

## 这是什么

这不是一个技术展示站，而是一个**个人表达的空间**。

我是一个对世界充满好奇的人，喜欢写作、阅读、思考。技术是我的工具，文字是我的语言。

这个网站记录了我的所思所想，也记录了我用 AI 协作创作的探索。

<br/>

## 🏗️ 技术栈

| | 技术 | 用途 |
|:---:|:---|:---|
| ⚛️ | React 18 + TypeScript | 前端框架 |
| ⚡ | Vite 8 | 构建工具 |
| 🎨 | Tailwind CSS v4 | 样式系统 |
| 🎬 | GSAP + Framer Motion | 动画效果 |
| 🌌 | Canvas 粒子系统 | 背景交互 |
| 📝 | Markdown 内容管理 | 文章/项目 |
| 🚀 | GitHub Pages | 自动部署 |

<br/>

## ✨ 特性

- **鼠标交互** — 背景粒子会跟随鼠标散开/聚拢
- **Markdown 内容** — 在 GitHub 上直接编辑文章，无需写代码
- **自动部署** — 推送代码后自动更新网站
- **响应式设计** — 手机和电脑都能完美显示
- **柔和的动画** — GSAP 驱动的滚动动画，不刺眼

<br/>

## 🚀 快速开始

```bash
# 克隆
git clone https://github.com/XN-289/kealin-Personal-website.git
cd kealin-Personal-website

# 安装
npm install

# 开发
npm run dev

# 构建
npm run build
```

<br/>

## ✍️ 如何添加内容

这是最重要的部分——你不需要写代码就能更新网站。

### 添加文章

1. 打开 GitHub 仓库
2. 进入 `content/blog/` 文件夹
3. 点击 **Add file** → **Create new file**
4. 文件名：`文章标题.md`
5. 内容格式：

```markdown
---
title: 文章标题
date: 2024-03-15
category: 随笔
tags: [思考, 生活]
excerpt: 一句话简介
---

正文内容...

支持 Markdown 格式：
- 列表
- **加粗**
- *斜体*
- 引用
- 代码块
```

6. 点 **Commit changes** → 网站自动更新 ✅

### 添加项目

同理，在 `content/projects/` 文件夹中创建 `.md` 文件：

```markdown
---
title: 项目名称
date: 2024-03-01
category: 全栈
tech: [React, Node.js]
github: https://github.com/...
live: https://...
stars: 10
desc: 一句话介绍
---

项目详细介绍...
```

<br/>

## 📁 项目结构

```
kealin-Personal-website/
│
├── content/                ← 📝 内容（你主要编辑这里）
│   ├── blog/               ← 博客文章
│   │   ├── hello-world.md
│   │   └── ai-writing.md
│   └── projects/           ← 项目展示
│       └── personal-blog.md
│
├── src/                    ← 💻 源代码（一般不需要改）
│   ├── components/
│   │   ├── DigitalWorld.tsx ← 粒子背景
│   │   ├── Navbar.tsx       ← 导航
│   │   ├── Footer.tsx       ← 页脚
│   │   └── Layout.tsx       ← 布局
│   ├── pages/
│   │   ├── Home.tsx         ← 首页
│   │   ├── About.tsx        ← 关于
│   │   ├── Blog.tsx         ← 文章
│   │   ├── Projects.tsx     ← 项目
│   │   └── Contact.tsx      ← 联系
│   ├── utils/
│   │   └── content.ts       ← 内容加载器
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            ← 全局样式
│
├── public/
│   └── favicon.svg
│
├── .github/workflows/
│   └── deploy.yml           ← 自动部署
│
└── package.json
```

<br/>

## 🎨 自定义

### 修改个人信息

编辑以下文件中的占位内容：

- `src/pages/Home.tsx` — 首页标题和描述
- `src/pages/About.tsx` — 个人介绍、阅读清单、兴趣标签
- `src/pages/Contact.tsx` — 联系方式
- `src/components/Footer.tsx` — 页脚信息

### 修改颜色

编辑 `src/index.css` 中的 CSS 变量：

```css
:root {
  --sky-400: #38bdf8;  /* 主色调 */
  --sky-500: #0ea5e9;  /* 深一点的蓝 */
  --bg-primary: #0c1222; /* 背景色 */
}
```

<br/>

---

<div align="center">

<br/>

**世界是一个巨大的文本，而我试图读懂它。**

<br/>

<img src="https://img.shields.io/badge/用_❤️_和_React_构建-0ea5e9?style=flat&logo=react&logoColor=white" height="20" alt="Made with love"/>

<br/>

</div>