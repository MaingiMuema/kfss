# K.F.S.S.

Kenya Futurist School System is a future-facing school model and product vision designed to start at senior school level in Kenya. The goal is to work within the Competency-Based Education (CBE) framework while shifting learning toward systems thinking, project delivery, AI fluency, and visible portfolio evidence.

This repository currently houses the public-facing product concept site and supporting monorepo workspace used to shape, communicate, and evolve the KFSS model.

## Vision

KFSS is built around a simple idea: students should learn by understanding real systems and improving them.

The model starts in Grades 10-12 and is designed around:

- free laptops for learners
- mentor teachers who remain central to guidance and judgment
- personal AI assistants that help students plan, reflect, recover, and build continuity
- project-based learning tied to real briefs and public problems
- systems thinking as a core habit, not an optional extra
- portfolios, demos, reflections, and contribution trails as primary evidence of growth
- final-year pathways that lead either to venture creation or contribution to existing ecosystem projects
- long-term expansion into university-level learning focused on scale, operations, and advanced systems design

## How The Model Works

### 1. Senior school starting point

KFSS begins at senior school level and is meant to fit inside the official CBE pathway structure rather than replace it. Students still move through formal pathway learning, but the delivery model becomes more applied, technology-enabled, and future-ready.

### 2. Mentor plus AI support loop

Each learner is supported by:

- a laptop as the daily tool for research, building, and submission
- a mentor teacher for coaching, review, and human accountability
- a personal AI layer that learns the student over time and helps with planning, revision, feedback, and progress awareness

### 3. Project-centered learning

Theory remains important, but it is tied to projects, studios, and real-world briefs. Students do not only study isolated facts. They learn to map causes, constraints, incentives, feedback loops, and trade-offs across real systems.

### 4. Portfolio-first evidence

The model shifts emphasis away from certificates alone and toward visible proof of capability. Students graduate with a body of work that shows what they built, how they worked, how they reasoned, and what impact they created.

### 5. Final-year impact routes

In the final year, students are expected to take one of two directions:

- build a startup or business solution around a real problem, using AI where useful
- contribute to an existing system project inside the KFSS ecosystem, especially projects that improve Kenyan education, health, agriculture, civic systems, productivity, or public services

The intention is that student work should not end as school-only output. It should feed back into society.

## Why KFSS Exists

The system is built for a world where:

- routine knowledge work is increasingly automated
- students need stronger judgment, adaptability, and systems reasoning
- AI access should become more affordable and useful to Kenyan learners
- schools should produce builders, contributors, and problem-solvers, not only exam takers

KFSS is also designed around the belief that school infrastructure can become a force for public good. With the right guidance, tooling, and safeguards, learners can help improve real systems while growing their own capability, portfolios, and career pathways.

## Access And Sustainability

KFSS aims to keep access as affordable as possible for Kenyan students. The broad operating idea combines:

- government support
- donations and sponsorship
- small parent contributions where needed
- shared school AI infrastructure to reduce per-student cost

The long-term access goal is to make useful AI support subsidized and widely available rather than premium-only.

## Current Product Focus

At the moment, this repository is focused on the concept and communication layer for the system, especially:

- the public landing page experience
- the visual and narrative expression of the KFSS model
- immersive UI/UX concepts for explaining the school system
- reusable workspace foundations for future expansion

This repo is not yet a full student platform, learning operating system, or school management stack. It is the current foundation for that broader direction.

## Workspace Structure

```text
apps/
  docs/   Next.js docs app
  web/    Next.js public-facing landing page

packages/
  eslint-config/
  typescript-config/
  ui/
```

## Tech Stack

- Turborepo
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Remotion Player
- pnpm workspaces

## Getting Started

### Requirements

- Node.js 18 or newer
- pnpm 9

### Install

```sh
pnpm install
```

### Run the workspace

```sh
pnpm dev
```

This starts the apps through Turborepo.

### Run only the landing page

```sh
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run only the docs app

```sh
pnpm --filter docs dev
```

Open [http://localhost:3001](http://localhost:3001).

## Common Commands

```sh
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

Target a single app when needed:

```sh
pnpm --filter web build
pnpm --filter web lint
pnpm --filter web check-types
```

## Guiding Principles

- Teachers stay central. AI assists; it does not replace human mentorship.
- Students should learn systems by improving them.
- Public problem solving matters more than passive content consumption.
- Evidence of work should be visible, practical, and explainable.
- Access matters. AI should become cheaper and more useful to Kenyan learners over time.
- The model should be able to grow from senior school into university-level pathways.

## Near-Term Direction

Near-term work in this repo is likely to focus on:

- refining the public narrative of KFSS
- expanding the landing page into a stronger system showcase
- documenting the learning model more clearly
- shaping future product surfaces for learners, mentors, portfolios, and project ecosystems

## License

No license has been added yet.
