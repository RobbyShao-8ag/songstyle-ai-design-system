---
name: songstyle-design-reviewer
description: Review websites, Web UI, screenshots, and written design proposals against SongStyle principles. Use when diagnosing overdesign, ineffective negative space, decorative cultural shortcuts, unclear hierarchy, or when prioritizing practical design improvements.
license: MIT
metadata:
  author: RobbyShao-8ag
  version: "0.1.0"
---

# SongStyle Design Reviewer

Review whether a design establishes order with sufficient expression and stops at the appropriate moment. Necessary density is allowed when the task requires it.

## Install With Your AI Agent

If your AI Agent supports installing skills from GitHub, copy this sentence into it. 复制这句话：

```text
请从 GitHub 仓库 RobbyShao-8ag/songstyle-ai-design-system 安装 SongStyle Design Reviewer Skill：skills/songstyle-design-reviewer，并保留 references/ 目录。
```

After installation, ask the agent to use `songstyle-design-reviewer` with the page goal, audience, required content, screenshots or page URL, and any business or technical constraints.

Read [SongStyle principles](references/songstyle-principles.md) and the [review model](references/review-model.md) before reviewing.

## Required Inputs

- Page, screenshot, or written proposal
- Page goal, audience, and user task
- Required content, actions, and business constraints

State assumptions when context is missing.

## Workflow

1. Clarify the page goal, audience, user task, required content, and business constraints.
2. Run a Hard-constraint checkpoint before scoring: required content, accessibility, truthfulness, task completion, and Chinese heading readability.
3. Identify near, middle, and far information layers.
4. Review information necessity, hierarchy, functional negative space, stopping discipline, cultural expression, and usability goals.
5. Identify critical failures before assigning scores.
6. Score each shared dimension from 0 to 4 using the generated review model.
7. Cite evidence for every score, including the decision record when one is available.
8. Produce prioritized, executable improvements.

## Output Format

1. Summary and assumptions
2. Hard-constraint checkpoint
3. Near, middle, and far information diagnosis
4. Scorecard for every review dimension with evidence
5. Critical failures and prioritized issues
6. Preserved strengths
7. Executable changes
8. Risks and unresolved questions
