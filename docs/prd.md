# PRD: 个人网站重构 — 基于 sac-ai.com 设计语言

## 一、背景

用户是人文型写作者，用文字和 AI 解构世界。需要一个能体现"年轻思考者"气质的个人网站。

参考 sac-ai.com 的编辑感设计语言，结合用户的人文气质，构建一个**深夜书房**风格的网站。

## 二、设计决策

### 保留 sac-ai.com 的
- 蓝图档案（标注、准星、坐标）
- 流程图（写·思·创 三圆连线）
- Marquee 关键词滚动
- 大字标题 + 衬线体
- 左侧脊柱线 + 角落准星
- 入场动画节奏（stagger 0.14s）
- 导航高亮（IntersectionObserver）
- 文章行 hover 滑入效果
- 联系栏网格布局

### 改为用户的
- 纸张色 → 深色背景（深夜书房）
- 橙色 → 琥珀色（温暖感）
- Playfair Display → Noto Serif SC（中文优先）
- 拍·创 → 思·创（人文气质）
- 亮色模式 → 暗色模式

## 三、页面结构

### 3.1 Hero
- 左栏(42%): 大字「解构世界」+ kicker + slogan + 两个 CTA
- 右栏(58%): 蓝图档案卡片（网格背景、准星、标注、人物、坐标）

### 3.2 能力区域
- 流程图: 写·思·创 三圆连线
- 三张卡片: 写作、AI协作、阅读与观察

### 3.3 文章区域
- 标题 + 全部链接
- 文章列表（序号、标签、日期、标题、摘要）

### 3.4 Marquee
- 关键词滚动: 写作·思考·AI·阅读·解构·人文·技术·表达·观察·构建

### 3.5 引言
- 居中引言 + CTA

### 3.6 导航
- 固定顶部，品牌 + 链接 + GitHub
- 滚动时背景变深
- 当前区块高亮

### 3.7 Footer
- 品牌 + 导航 + 引言

## 四、技术要求

1. React + TypeScript + Vite
2. Tailwind CSS + 自定义 CSS 变量
3. Framer Motion 入场动画
4. GSAP ScrollTrigger 滚动动画
5. Markdown 内容管理
6. GitHub Pages 部署

## 五、设计 Token

```css
--paper:     #1a1a2e      /* 深色背景 */
--ink:       #e8e4e0      /* 主文字 */
--ink-soft:  #a8a29e      /* 柔和文字 */
--ink-muted: #6b7280      /* 次要文字 */
--accent:    #d4a574      /* 琥珀色强调 */
--line:      rgba(212,165,116,0.12)  /* 线条 */
--serif:     'Noto Serif SC', Georgia, serif
--sans:      'Inter', system-ui, sans-serif
--mono:      'SF Mono', monospace
--ease:      cubic-bezier(.22,.61,.36,1)
```

## 六、验收标准

1. [ ] Hero 双栏布局，大字标题 + 蓝图档案
2. [ ] 蓝图档案有准星、标注、坐标
3. [ ] 流程图三圆连线
4. [ ] Marquee 关键词滚动
5. [ ] 文章列表 hover 滑入
6. [ ] 导航当前区块高亮
7. [ ] 入场动画 stagger 0.14s
8. [ ] 移动端响应式
9. [ ] Markdown 内容加载
10. [ ] GitHub Pages 部署成功
