# SongStyle AI Design System Agent Guide

## Purpose

SongStyle translates Song-dynasty aesthetic principles into a modern,
executable design language. It is not an ancient-style asset library.

## Source Of Truth

- `docs/principles/` owns principle definitions.
- `checklists/` owns review dimensions and scoring.
- `design-tokens/source/` owns visual variables.
- `design-tokens/dist/` is generated and must not be edited manually.

## Commands

- `npm run dev`
- `npm run tokens:build`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`
- `npm run verify`

## Constraints

- Do not equate SongStyle with ink-wash backgrounds, seals, traditional
  patterns, calligraphic type, or low information density.
- Do not remove information required for usability, accessibility, or business
  goals.
- Keep Chinese content complete; keep the required English entry pages current.
- Keep the reference UI small and non-production.

## Done Means

Run the verification commands required by the active implementation plan,
review the diff, and commit generated Design Token output with its source.
