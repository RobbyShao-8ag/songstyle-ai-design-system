# SongStyle AI Design System

**宋式 AI 设计系统**

> AI 不懂得何时停止。
>
> 同样的内容，SongStyle 让设计从“不断添加”转向“准确表达”。

SongStyle AI Design System is an open-source design language that helps
designers, developers, and AI agents decide what should exist, how information
should relate, and where expression should stop.

宋式 AI 设计系统不是古风素材库，也不是把界面变得空旷。它将宋代美学中更深层的
秩序、留白、温润与克制，转译为现代网站和 Web UI 可以执行、审查和讨论的设计判断。

[Website](https://robbyshao-8ag.github.io/songstyle-ai-design-system/) ·
[Prompts](https://robbyshao-8ag.github.io/songstyle-ai-design-system/prompts/) ·
[Agent Skills](https://robbyshao-8ag.github.io/songstyle-ai-design-system/skills/) ·
[Roadmap](ROADMAP.md) ·
[First-round user testing](docs/research/first-round-user-testing.md)

## See The Difference / 先看差异

The ordinary AI and SongStyle versions use **the same copy, the same image,
the same features, and the same goal**. The content did not become better. The
design judgment did.

普通 AI 与 SongStyle 版本使用相同文案、相同图片、相同功能和相同目标。变化只来自
版面、层级、字体、字号、色彩、背景、图片裁切、空间、卡片与停止时机。

| 白汀 Baiting | 清序 Qingxu |
| --- | --- |
| ![自然光下置于当代居家桌面的透明玻璃水壶](website/public/assets/cases/baiting-carafe.webp) | ![研究者在自然光工作空间中整理来源与研究资料](website/public/assets/cases/qingxu-research.webp) |
| [生活方式品牌公平对比](https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/lifestyle-brand/) | [现代数字产品公平对比](https://robbyshao-8ag.github.io/songstyle-ai-design-system/examples/digital-product/) |

## The Method / 方法

1. **必要信息 / Necessary information**

   先判断什么必须存在，不用更多内容掩盖不确定。
2. **建立秩序 / Establish order**

   让关系、顺序与主次先于视觉效果。
3. **功能性留白 / Functional negative space**

   让空间承担聚焦、节奏与理解任务。
4. **适度停止 / Appropriate stopping**

   表达充分后停止，不用添加证明还能添加。

## Use It / 开始使用

- [从 Brief 生成 Web 设计](prompts/web-design/from-brief.md)
- [改写现有页面](prompts/web-design/rewrite-existing-page.md)
- [审查一个页面](prompts/design-review/review-page.md)
- [比较普通 AI 与 SongStyle](prompts/design-review/compare-default-and-songstyle.md)
- [SongStyle Web Designer Skill](skills/songstyle-web-designer/SKILL.md)
- [SongStyle Design Reviewer Skill](skills/songstyle-design-reviewer/SKILL.md)
- [Design Tokens / 设计变量](docs/foundations/design-tokens.md)
- [审查清单](checklists/songstyle-review.md)

## What It Is Not / 它不是什么

- 不是对宋代历史设计的复原
- 不是水墨、印章、传统纹样或书法字体的素材库
- 不是以删减可用信息换取视觉留白的风格模板
- 不是要求所有产品共享一套视觉皮肤

## Read And Participate / 阅读与参与

- [中文宣言](docs/manifesto/zh.md)
- [English Manifesto](docs/en/manifesto.md)
- [English Core Principles](docs/en/core-principles.md)
- [English Usage Guide](docs/en/usage.md)
- [Roadmap](ROADMAP.md)
- [首轮用户测试计划](docs/research/first-round-user-testing.md)
- [参与贡献](CONTRIBUTING.md)

## Project Status / 项目状态

`v0.1.0` has been released. Current work focuses on evidence, real-world
validation, and making SongStyle more operational for people and AI.

## Development / 本地开发

```bash
npm install
npm run dev
npm run verify
```

## Licenses / 许可证

Code and executable assets are licensed under the MIT License in
`LICENSE-CODE`. Documentation, examples, and visual case-study content are
licensed under CC BY 4.0 in `LICENSE-CONTENT`.
