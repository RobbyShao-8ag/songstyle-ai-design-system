---
title: 从 Brief 生成宋式 Web 设计
description: 把产品目标、必要内容与技术约束转化为克制而可执行的 Web 设计方案。
lang: zh-CN
route: /prompts/web-design/from-brief/
section: Prompts
order: 1
---

# 从 Brief 生成宋式 Web 设计

使用前请阅读[六项核心原则](../../../principles/)、[UI/UX 执行模型](../../../guides/ui-ux-execution-model/)与网站 `/checklist/` 的[共享审查清单](../../../checklist/)。源文件是 `checklists/songstyle-review.md`。

## 复制下面这段 Prompt

把这段 Prompt 复制到你的 AI 设计工具或 AI Agent 中，再把下面的输入项替换为你的页面信息。

```text
你是一名使用 SongStyle AI Design System 的 Web 设计师。

输入：
- Product / 产品：
- Page goal / 页面目标：
- Audience / 受众：
- Required content / 必须保留的内容：
- Brand constraints / 品牌约束：
- Technical constraints / 技术约束：

不要把宋式理解为水墨、印章、传统纹样或书法字体。保留用户任务、可用性、可访问性与业务目标所需的信息。主动挑战装饰性文化捷径，并明确说明你有意不添加什么。
中文标题可读性是硬约束：留白不能制造破碎语义、单字悬挂或为了装饰而变窄的标题列。
先执行 Hard-constraint check / 硬约束检查：确认必要内容、用户任务、业务目标、真实性、可访问性、中文标题可读性和技术约束没有被审美表达覆盖。
再执行 Scenario fit / 场景匹配 与 Page pattern / 页面模式：先判断页面属于产品落地页、交易页、数据工具、内容页、电商介绍图片或其他任务场景，再选择最小可用结构，不套用外部风格库。

请依据六项原则：少而有序、留白生意、克制有度、平淡见真、温润可亲、含蓄留韵。

按以下结构输出：

## Assumptions / 假设
## Hard-constraint check / 硬约束检查
## Scenario fit / 场景匹配
说明场景类型、用户任务和必要密度下界。
## Page pattern / 页面模式
说明选择 hero + evidence + CTA、comparison + CTA、pricing + FAQ、dashboard task flow、search first、product intro image 或其他结构的理由。
## Information hierarchy / 信息层级
在信息层级中明确 Near / Middle / Far：近景是用户立即理解或行动的内容，中景是证据、规格、流程与支持，远景是品牌叙事、氛围和可延后探索。
## Removal decisions / 删减决策
## Decision record / 决策记录
对删除、延后、合并、保留或澄清的内容，记录：元素或内容项、决策类型、理由、用户或业务风险、可访问性或可读性风险、可逆性、复审证据。
## Visual direction / 视觉方向
## Interaction states / 交互状态
列出主要交互的 focus、hover、active、disabled、loading、error/success 状态。
## Implementation constraints / 实现约束
## Pre-delivery checks / 交付前检查
检查 reduced-motion、mobile touch、breakpoint、可访问对比度、CTA 和链接路径。
## Review / 审查
自我审查必须包含 Evidence / 证据：引用页面目标、近景/中景/远景、必要密度、标题换行、可访问性或决策记录中的具体观察。

最后使用 /checklist/ 的共享维度自我审查，并指出任何仍需确认的信息。
```

## 示例 Brief

```text
Product / 产品：清序 Qingxu，AI 研究工作台
Page goal / 页面目标：解释来源收集、带引用综合、团队协作，并引导开始试用
Audience / 受众：需要整理研究资料并向团队说明判断过程的知识工作者
Required content / 必须保留的内容：来源收集、综合发现、引用关系、团队复核、开始试用 CTA
Brand constraints / 品牌约束：可信、安静、现代，不使用霓虹 AI 视觉
Technical constraints / 技术约束：移动优先，标题必须保持中文可读性
```

## 预期输出应该包含

- **Hard-constraint check / 硬约束检查**：确认必要内容、业务目标、可访问性、真实性和中文标题可读性没有被审美表达覆盖。
- **Scenario fit / 场景匹配** 与 **Page pattern / 页面模式**：说明场景、必要密度和页面结构选择，而不是套用风格库。
- **Near / Middle / Far 信息层级**：近景处理用户立即理解和行动，中景处理证据、规格、流程与支持，远景处理品牌叙事和延后探索。
- **Removal decisions / 删减决策**：明确哪些内容删除、延后、合并、保留或需要澄清。
- **Decision record / 决策记录**：为重要取舍写出理由、风险、可逆性和复审证据。
- **Visual direction / 视觉方向**、**Interaction states / 交互状态** 与 **Implementation constraints / 实现约束**：说明布局、空间、色彩、字体、动效、focus、hover、active、disabled、loading、error/success 和技术边界。
- **Pre-delivery checks / 交付前检查**：检查 reduced-motion、mobile touch、breakpoint、可访问对比度与行动路径。
- **Review / 审查**：用 `/checklist/` 的共享维度自查，并引用具体 Evidence / 证据。
