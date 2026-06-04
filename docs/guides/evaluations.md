---
title: SongStyle 评估方法
description: 固定 brief 如何为 Prompt、Agent Skill 与网站提供可审阅证据。
lang: zh-CN
route: /evaluations/
section: 工具
order: 4
---

# SongStyle 评估方法

固定 brief 用于检查 Prompt 与 Agent Skill 是否在不同任务中保留必要信息、识别风险并给出可执行建议。它们不是为了证明一种审美具有普遍真理。

## 测量什么

- 必须保留的信息是否被保留。
- 已知风险是否被识别或避免。
- 六项共享审查维度是否得到可解释评分。
- 建议是否可以执行。

## 不测量什么

保存结果不声称能够自动判断所有审美价值，也不代替真实用户研究、业务验证或文化研究。

## 如何理解结果

每份结果记录 brief、被测资产、保留项、风险检测、共享清单和 verdict。结果是可审阅证据，不是对未来所有输出的保证。

## 添加新评估

贡献者应在 `evals/briefs.json` 中增加明确 brief、必须保留项与风险，再保存对应结果，并在失败时先改进 Prompt 或 Skill。
