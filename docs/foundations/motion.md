---
title: 动效
description: 用平静进入、有限距离与 reduced-motion 支持建立节奏。
lang: zh-CN
route: /foundations/motion/
section: 基础
order: 7
---

# 动效

## 设计决策

动效用于解释变化、建立节奏与提供反馈。进入应平静，并支持 reduced-motion。

## 相关设计变量

参见 [Design Tokens / 设计变量](../../design-tokens/) 中的 `motion.*` 组。

## 适合使用

使用短距离、缓和曲线表达状态变化，并在用户偏好减少动效时停止非必要动画。

## 不鼓励的模式

避免弹跳、爆炸式缩放、循环吸引注意力和无意义的滚动表演。

## 审查问题

动效是否解释了变化，还是只在证明页面会动？
