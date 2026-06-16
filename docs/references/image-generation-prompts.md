---
title: 案例图片生成提示词
description: 白汀、清序与电商图片对比案例使用的生成提示词与公平复用规则。
lang: zh-CN
route: /references/image-generation-prompts/
section: 参考
order: 2
---

# Case Study Image Generation Prompts

The Baiting, Qingxu, and ecommerce image comparison cases use generated
editorial or product imagery as product and scenario evidence. These images are
not historical references and do not attempt to imitate Song-dynasty art.

Both the ordinary AI and SongStyle treatments reuse the same image file. This
keeps the comparison focused on layout, hierarchy, typography, spacing,
background treatment, crop, and stopping decisions.

For generated ecommerce introduction images, use a controlled prompt pair:
the ordinary version uses the Base Prompt, and the SongStyle version repeats
that exact prompt with only one extra sentence asking the generator to use the
SongStyle Skill or Prompt. The Base Prompt only states the task and required
content; it must not include layout, typography, style, color, spacing, or
SongStyle direction. This keeps the comparison from becoming two unrelated
styles or a pre-optimized default prompt.

When using an external generator that does not know SongStyle, such as Jimeng,
use the external-model prompt pair below: Default keeps the same content-only
Base Prompt, while SongStyle repeats it and appends the full SongStyle method
instructions.

## 白汀 Baiting

Asset: `website/public/assets/cases/baiting-carafe.webp`

```text
Use case: product-mockup
Asset type: shared case-study editorial photograph for a website comparison
Primary request: a contemporary transparent glass water carafe on a quiet home dining table
Scene/backdrop: modern neutral interior, soft plaster wall, pale natural wood table, uncluttered
Subject: one elegant 1.2 liter borosilicate glass carafe with believable proportions and a wide opening
Style/medium: realistic editorial product photography
Composition/framing: landscape composition with the carafe clearly visible and generous crop flexibility around it
Lighting/mood: soft natural side light, calm, credible, warm but restrained
Color palette: porcelain white, mist gray, pale wood, subtle celadon hint
Constraints: no text, no logo, no traditional motifs, no decorative props that compete with the product, no watermark
Avoid: luxury advertising gloss, dramatic shadows, historical styling, flowers, calligraphy, ink wash
```

## 清序 Qingxu

Asset: `website/public/assets/cases/qingxu-research.webp`

```text
Use case: photorealistic-natural
Asset type: shared case-study editorial photograph for a website comparison
Primary request: a modern researcher organizing trustworthy sources at a desk for an AI research workflow
Scene/backdrop: contemporary quiet studio workspace with a laptop or monitor, printed sources, and notes
Subject: one researcher focused on reviewing and arranging information, shown naturally without posing
Style/medium: realistic editorial workplace photography
Composition/framing: landscape composition with clear workspace context and flexible crop space
Lighting/mood: soft natural daylight, calm, credible, thoughtful
Color palette: ink tones, mist gray, warm paper, restrained celadon hint
Constraints: no readable screen text, no logos, no watermark, no traditional motifs
Avoid: neon, holograms, futuristic AI imagery, exaggerated dashboards, cyberpunk styling
```

## 电商介绍图片生成对比

Assets:

- `website/public/assets/cases/ecommerce-intro-default.png`
- `website/public/assets/cases/ecommerce-intro-songstyle.png`

### Base Prompt

```text
请生成一张 4:5 竖版电商介绍图片，用于当代陶瓷桌面香薰扩香器的商品详情页首图。
商品：一款小型陶瓷桌面香薰扩香器，白色陶瓷机身，可替换香片，适合客厅、书桌和床头柜。
介绍目标：让用户快速理解商品是什么、材质是什么、怎样使用、适合哪些家居桌面场景。
需要包含的信息：陶瓷材质、可替换香片、客厅、书桌、床头柜。
需要出现的文字：陶瓷桌面香薰。
```

### SongStyle Prompt

```text
请生成一张 4:5 竖版电商介绍图片，用于当代陶瓷桌面香薰扩香器的商品详情页首图。
商品：一款小型陶瓷桌面香薰扩香器，白色陶瓷机身，可替换香片，适合客厅、书桌和床头柜。
介绍目标：让用户快速理解商品是什么、材质是什么、怎样使用、适合哪些家居桌面场景。
需要包含的信息：陶瓷材质、可替换香片、客厅、书桌、床头柜。
需要出现的文字：陶瓷桌面香薰。
请使用 SongStyle Web Designer Skill 或 SongStyle Prompt 模板进行设计。
```

### External Model Default Prompt

```text
请生成一张 4:5 竖版电商介绍图片，用于当代陶瓷桌面香薰扩香器的商品详情页首图。
商品：一款小型陶瓷桌面香薰扩香器，白色陶瓷机身，可替换香片，适合客厅、书桌和床头柜。
介绍目标：让用户快速理解商品是什么、材质是什么、怎样使用、适合哪些家居桌面场景。
需要包含的信息：陶瓷材质、可替换香片、客厅、书桌、床头柜。
需要出现的文字：陶瓷桌面香薰。
```

### External Model SongStyle Full Prompt

```text
请生成一张 4:5 竖版电商介绍图片，用于当代陶瓷桌面香薰扩香器的商品详情页首图。
商品：一款小型陶瓷桌面香薰扩香器，白色陶瓷机身，可替换香片，适合客厅、书桌和床头柜。
介绍目标：让用户快速理解商品是什么、材质是什么、怎样使用、适合哪些家居桌面场景。
需要包含的信息：陶瓷材质、可替换香片、客厅、书桌、床头柜。
需要出现的文字：陶瓷桌面香薰。

请使用 SongStyle AI Design System 的宋式 UI/UX 设计方法来生成这张电商介绍图片。

SongStyle 不是古风装饰，不等于水墨、印章、传统纹样、书法字体、仿古边框或低信息密度。它要把宋代美学转译成现代电商图片里的秩序、克制、留白、可信感和清楚的信息层级。

设计原则：
1. 少而有序：不要堆叠无关卖点、装饰贴纸和过多视觉强调，但必须保留用户购买判断所需信息。
2. 留白生意：留白要帮助商品主体、材质、使用方式和场景被看清楚，不能为了空而减少关键信息。
3. 克制有度：画面安静、节制、可信，不做夸张促销感、强烈霓虹感、过度渐变或廉价电商爆款风。
4. 平淡见真：优先表现真实商品比例、陶瓷质感、可替换香片结构和桌面使用关系。
5. 温润可亲：整体应现代、干净、柔和，让商品适合真实家居日常，而不是显得冰冷或虚假高级。
6. 含蓄留韵：可以有安静的空间节奏和自然光感，但不能牺牲商品解释、文字可读性和场景清楚度。

执行要求：
- 场景匹配：这是电商商品详情页首图，不是纯氛围海报。用户必须快速理解商品是什么、材质是什么、如何使用、适合哪些家居桌面场景。
- 页面模式：采用 product intro image 的信息结构。近景是商品主体和“陶瓷桌面香薰”主文字；中景是陶瓷材质、可替换香片、使用方式；远景是客厅、书桌、床头柜等使用场景。
- 信息保留：必须保留商品主体、陶瓷材质、可替换香片、客厅、书桌、床头柜这些购买判断信息。
- 文字要求：“陶瓷桌面香薰”必须清楚可读。其他文字可以少，但不能让用户看不懂商品用途。
- 构图要求：商品主体要清楚，不要被场景、小图、装饰或文字遮挡。场景可以分区呈现，但不要杂乱。
- 色彩与质感：使用安静、现代、温润、克制的色彩关系，偏自然光、陶瓷白、雾灰、温润木色、淡青瓷感即可；不要做强烈饱和色、赛博感、玻璃拟态、夸张高光。
- 禁止：不要水墨背景、印章、传统纹样、书法字体、古风边框、宫廷装饰、廉价促销爆炸贴、过度 AI 科技感。
- 交付前自检：商品是否一眼可见？材质是否能判断？可替换香片是否被表达？三个使用场景是否清楚？文字是否可读？画面是否安静但不缺信息？
```
