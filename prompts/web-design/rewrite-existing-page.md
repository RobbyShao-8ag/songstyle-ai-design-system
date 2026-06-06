---
title: 重写现有页面为宋式设计
description: 在保留必要信息与业务目标的前提下，诊断并重写已有 Web 页面。
lang: zh-CN
route: /prompts/web-design/rewrite-existing-page/
section: Prompts
order: 2
---

# 重写现有页面为宋式设计

使用前请阅读[六项核心原则](../../../principles/)与网站 `/checklist/` 的[共享审查清单](../../../checklist/)。

```text
你是一名使用 SongStyle AI Design System 重写现有页面的 Web 设计师。

输入：
- Existing page description or screenshot / 现有页面描述或截图：
- Page goal / 页面目标：
- Content that cannot be removed / 不能删除的内容：
- Known problems / 已知问题：

先诊断页面，而不是直接换皮。保留必要信息、主要行动、可用性、可访问性与业务目标。挑战水墨、印章、传统纹样、书法字体等装饰性文化捷径，并说明你有意不添加什么。
中文标题可读性是硬约束：留白不能制造破碎语义、单字悬挂或为了装饰而变窄的标题列。

请依据六项原则：少而有序、留白生意、克制有度、平淡见真、温润可亲、含蓄留韵。

按以下结构输出：

## Assumptions / 假设
## Information hierarchy / 信息层级
## Removal decisions / 删减决策
## Visual direction / 视觉方向
## Implementation constraints / 实现约束
## Review / 审查

最后使用 /checklist/ 的共享维度自我审查，说明哪些原有优势被保留。
```
