<div align="center">

# 🏗️ Digital Architect

### 用代码解构世界，用技术构建未来

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />

<br/>

<img src="https://img.shields.io/github/stars/XN-289/kealin-Personal-website?style=for-the-badge&color=06B6D4" alt="Stars" />
<img src="https://img.shields.io/github/forks/XN-289/kealin-Personal-website?style=for-the-badge&color=06B6D4" alt="Forks" />
<img src="https://img.shields.io/github/license/XN-289/kealin-Personal-website?style=for-the-badge&color=06B6D4" alt="License" />

<br/>

<a href="https://xn-289.github.io/kealin-Personal-website">🔗 在线预览</a> · <a href="#-快速开始">快速开始</a> · <a href="#-项目结构">项目结构</a>

---

</div>

## ✨ 设计理念

> 这不是一个传统的个人网站。
> 这是一个**正在被构建的数字空间**——用户滚动时，像在探索一个正在组装的世界。

### 🎨 视觉语言

| 特性 | 描述 |
|:---:|:---|
| **HUD 界面** | 角落标记、坐标显示、状态栏、终端风格文字 |
| **电光蓝主色** | 不是沉闷的深蓝，而是有能量感的 cyan 蓝色 |
| **几何构造感** | 菱形裁切、线框装饰、旋转方块头像 |
| **粒子背景** | 六边形、三角形、菱形在空间中漂浮，鼠标可影响粒子 |
| **扫描线效果** | 页面上有一条淡淡的扫描线掠过，增加科幻感 |
| **GSAP 动画** | 内容随滚动依次出现，有电影叙事感 |
| **终端风格** | 标签、状态都用等宽字体大写展示 |

### 🖥️ 页面一览

```
┌─────────────────────────────────────────────────────┐
│  DIGITAL ARCHITECT                    ● ONLINE      │
├─────────────────────────────────────────────────────┤
│                                                     │
│                    👨‍💻                               │
│               ┌──────────┐                          │
│               │ 数字建筑师 │                          │
│               └──────────┘                          │
│          > 热爱技术的极客 · 用代码解构世界              │
│                                                     │
│      [ 进入代码库 ]    [ 查看构建物 ]                  │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  CAPABILITIES                                       │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │代码编织│  │系统解构│  │架构设计│  │数据流动│           │
│  └──────┘  └──────┘  └──────┘  └──────┘           │
│                                                     │
│  SKILL.MATRIX         TIMELINE        BLOG          │
│  PROJECTS             CONTACT         ...           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9

### 安装运行

```bash
# 克隆项目
git clone https://github.com/XN-289/kealin-Personal-website.git
cd kealin-Personal-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

启动后访问 **http://localhost:5173** 即可预览。

---

## 📁 项目结构

```
kealin-Personal-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署
├── public/
│   └── favicon.svg             # 网站图标
├── src/
│   ├── components/
│   │   ├── DigitalWorld.tsx    # 🌌 粒子+几何体 Canvas 背景
│   │   ├── Footer.tsx          # 页脚
│   │   ├── Icons.tsx           # 自定义 SVG 图标
│   │   ├── Layout.tsx          # 主布局
│   │   └── Navbar.tsx          # 导航栏 (HUD 风格)
│   ├── pages/
│   │   ├── Home.tsx            # 首页 (数字建筑师入口)
│   │   ├── About.tsx           # 关于我 (技能矩阵)
│   │   ├── Blog.tsx            # 博客 (数据流)
│   │   ├── Projects.tsx        # 作品集 (构建档案)
│   │   └── Contact.tsx         # 联系 (建立连接)
│   ├── App.tsx                 # 路由配置
│   ├── index.css               # 全局样式 (赛博主题)
│   └── main.tsx                # 入口文件
├── index.html                  # HTML 模板
├── vite.config.ts              # Vite 配置
└── package.json
```

---

## 🛠️ 技术栈

<table>
<tr>
<td><strong>框架</strong></td>
<td>React 18 + TypeScript</td>
</tr>
<tr>
<td><strong>构建</strong></td>
<td>Vite 8</td>
</tr>
<tr>
<td><strong>样式</strong></td>
<td>Tailwind CSS v4</td>
</tr>
<tr>
<td><strong>动画</strong></td>
<td>GSAP + ScrollTrigger + Framer Motion</td>
</tr>
<tr>
<td><strong>背景</strong></td>
<td>Canvas 2D (粒子系统 + 几何体)</td>
</tr>
<tr>
<td><strong>路由</strong></td>
<td>React Router (HashRouter)</td>
</tr>
<tr>
<td><strong>图标</strong></td>
<td>Lucide React + 自定义 SVG</td>
</tr>
<tr>
<td><strong>部署</strong></td>
<td>GitHub Pages (GitHub Actions)</td>
</tr>
</table>

---

## 🎯 特色功能

- [x] **交互式粒子背景** — 鼠标移动会影响粒子运动
- [x] **HUD 风格导航** — 终端美学的导航栏
- [x] **GSAP 滚动动画** — 内容随滚动依次出现
- [x] **几何体浮动** — 六边形、三角形、菱形漂浮动画
- [x] **扫描线效果** — 全局科幻扫描线
- [x] **响应式设计** — 完美适配移动端
- [x] **终端风格文字** — 等宽字体 + 大写标签
- [x] **菱形裁切卡片** — 独特的 HUD 风格卡片

---

## 📝 自定义指南

### 修改个人信息

编辑以下文件中的占位内容：

| 文件 | 内容 |
|:---|:---|
| `src/pages/Home.tsx` | 首页标题、描述、GitHub 链接 |
| `src/pages/About.tsx` | 个人介绍、技能、时间线 |
| `src/pages/Blog.tsx` | 博客文章列表 |
| `src/pages/Projects.tsx` | 项目展示 |
| `src/pages/Contact.tsx` | 联系方式、社交媒体 |
| `src/components/Footer.tsx` | 页脚信息 |
| `src/components/Navbar.tsx` | 导航栏 Logo |

### 修改主题颜色

编辑 `src/index.css` 中的 CSS 变量：

```css
:root {
  --cyan-400: #22d3ee;    /* 主色 */
  --violet-400: #a78bfa;  /* 辅助色 */
  --emerald-400: #34d399; /* 强调色 */
  --bg-primary: #050a14;  /* 背景色 */
}
```

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

<div align="center">

**用代码解构世界，用技术构建未来** 🚀

<br/>

<img src="https://img.shields.io/badge/Made_with_❤️_using_React_&_Tailwind-06B6D4?style=for-the-badge&logo=react&logoColor=white" alt="Made with React & Tailwind" />

</div>