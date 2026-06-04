---
title: Design Tokens / 设计变量
description: SongStyle 可复用视觉变量的来源、生成方式与使用边界。
lang: zh-CN
route: /design-tokens/
section: 基础
order: 2
---

# Design Tokens / 设计变量

这里的 Design Tokens 指可复用的设计变量，不是 AI 模型计算文本时使用的 token。

源文件位于 [`design-tokens/source/`](https://github.com/RobbyShao-8ag/songstyle-ai-design-system/tree/main/design-tokens/source)，使用 DTCG 格式描述色彩、空间、字体、形状与动效。生成的 CSS Variables 位于 [`design-tokens/dist/songstyle.css`](https://github.com/RobbyShao-8ag/songstyle-ai-design-system/blob/main/design-tokens/dist/songstyle.css)。

设计变量是表达层的参考实现。它们帮助网站、参考 UI 与案例共享同一视觉语言，但不替代核心原则。

```css
color: var(--song-color-text-primary);
background: var(--song-color-background-canvas);
padding: var(--song-space-section-default);
```
