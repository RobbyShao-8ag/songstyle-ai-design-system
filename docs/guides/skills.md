---
title: SongStyle Agent Skills
description: 为 AI Agent 提供可移植的宋式 Web 设计与设计审查工作流。
lang: zh-CN
route: /skills/
section: 工具
order: 3
---

# SongStyle Agent Skills

Agent Skills 把原则、审查模型与工作流打包为可移植目录。将所需 skill 目录安装到支持 Agent Skills 的工具中，并保留其中的 `references/` 文件。

## 一句话安装

如果你的 AI Agent 支持从 GitHub 安装 Skills，复制这句话给它：

```text
请从 GitHub 仓库 RobbyShao-8ag/songstyle-ai-design-system 安装 SongStyle Skills：skills/songstyle-web-designer 和 skills/songstyle-design-reviewer，并保留 references/ 目录。
```

安装后，使用 `songstyle-web-designer` 生成或重写 Web 页面方案，使用 `songstyle-design-reviewer` 审查已有页面或比较普通 AI 默认方案与 SongStyle 方案。

- [songstyle-web-designer](songstyle-web-designer/)
- [songstyle-design-reviewer](songstyle-design-reviewer/)

两个 Skills 都会引用由规范数据生成的原则与审查模型，避免形成平行定义。
