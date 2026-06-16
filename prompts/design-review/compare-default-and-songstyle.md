---
title: 比较普通 AI 默认方案与宋式方案
description: 对比过量的 AI 默认设计与经过 SongStyle 原则约束的方案。
lang: zh-CN
route: /prompts/design-review/compare-default-and-songstyle/
section: Prompts
order: 4
---

# 比较普通 AI 默认方案与宋式方案

该 Prompt 使用[UI/UX 执行模型](../../../guides/ui-ux-execution-model/)与网站 `/checklist/` 的[共享审查清单](../../../checklist/)。

```text
你是一名 SongStyle 设计审查者。根据同一份 brief，比较普通 AI 默认方案与 SongStyle 方案。

输入：
- Brief / 需求：
- Page goal / 页面目标：
- Required content / 必须保留的内容：
- Constraints / 约束：

必须评估：
- 信息必要性
- 层级清晰度
- 功能性留白
- 适度停止
- 秩序而非符号
- 可用性、可访问性与目标

使用 /checklist/ 的 0-4 评分。不要假设更空自动更好。
中文标题可读性是硬约束：留白不能制造破碎语义、单字悬挂或为了装饰而变窄的标题列。
先执行 Hard-constraint check / 硬约束检查：确认必要内容、用户任务、业务目标、真实性、可访问性、中文标题可读性和技术约束没有被审美表达覆盖。
再执行 Scenario fit / 场景匹配、Page pattern / 页面模式、Interaction states / 交互状态 与 Pre-delivery checks / 交付前检查，比较差异必须基于执行证据。

先生成以下比较内容：
1. Ordinary AI default proposal
2. Default proposal diagnosis
3. SongStyle proposal
4. Decision comparison
5. Checklist result

并按以下结构组织最终答案：

## Assumptions / 假设
## Hard-constraint check / 硬约束检查
## Scenario fit / 场景匹配
说明两个方案是否匹配同一场景、用户任务和必要密度。
## Page pattern / 页面模式
说明两个方案的页面模式差异，以及哪一个更服务任务。
## Information hierarchy / 信息层级
在信息层级中明确 Near / Middle / Far：近景是用户立即理解或行动的内容，中景是证据、规格、流程与支持，远景是品牌叙事、氛围和可延后探索。
## Removal decisions / 删减决策
## Decision record / 决策记录
对删除、延后、合并、保留或澄清的内容，记录：元素或内容项、决策类型、理由、用户或业务风险、可访问性或可读性风险、可逆性、复审证据。
## Visual direction / 视觉方向
## Interaction states / 交互状态
比较 focus、hover、active、disabled、loading、error/success 是否支持任务。
## Implementation constraints / 实现约束
## Pre-delivery checks / 交付前检查
比较 reduced-motion、mobile touch、breakpoint、可访问对比度、CTA 和链接路径。
## Review / 审查
每个评分必须包含 Evidence / 证据：引用页面目标、近景/中景/远景、必要密度、标题换行、可访问性或决策记录中的具体观察。
```
