# BrainServe Connect — Enterprise Visitor & Workforce Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_BrainServe-0F9F8F?style=for-the-badge&logo=vercel&logoColor=white)](https://brain-serve-connect-vercel-demo.vercel.app/)

BrainServe Connect grew out of a simple problem: visitor handling, employee operations, approvals, and internal communication were all happening as separate workflows. The backend had to keep those flows connected without letting one role bypass another.

The system uses **seven-role RBAC** for System Admin, CEO, HR Admin, Team Lead, Employee, Receptionist, and Security.

## Core workflow

`Security intake → Reception verification → HR review → Team Lead / Employee / CEO approval → QR visitor pass → check-in / completion`

That flow touches authentication, authorization, visitor state, approvals, notifications, and permanent history. Most of the interesting work is in keeping those transitions valid.

## Backend responsibilities

- role-specific access with Spring Security and RBAC
- validated state transitions between approval stages
- department-based employee onboarding
- Team Lead assignment and task worksheets
- employee progress tracking and HR insights
- account approval and password recovery
- profile management and termination approval
- audit trails and permanent operational logs
- Kafka-based internal calls and workflow notifications
- PostgreSQL persistence
- Redis support for fast operational state
- Flyway-controlled schema migrations

## Backend stack

| Area | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3 |
| Security | Spring Security, BCrypt, RBAC |
| Persistence | Spring Data JPA, PostgreSQL |
| Messaging | Apache Kafka |
| Fast state | Redis |
| Migrations | Flyway |
| Build | Maven |
| Containers | Docker |
| APIs | REST |

## Backend flow

```text
Client
  ↓
REST API
  ↓
Spring Security
  ↓
RBAC / validated state transition
  ↓
Controller
  ↓
Service
  ├── PostgreSQL
  ├── Redis
  └── Kafka
       ↓
       Internal call / notification consumer
```

PostgreSQL is the operational source of truth. Redis supports fast state access. Kafka handles internal calls and workflow notifications that should not block the request path.

## Public client demo

[Open the deployed demo](https://brain-serve-connect-vercel-demo.vercel.app/)

This repository contains the **public browser demo**, not the production backend.

The demo exists so a client can move through the role workspaces and understand the product without production credentials, infrastructure, or live business data.

### What you can show

| Workspace | Demo focus |
|---|---|
| CEO | visitor occupancy, reports, historical records |
| System Admin | governance, reports, workforce / visitor register |
| Manager / CEO | sample approval flow |
| Reception / Security | appointments, arrivals, visitor controls |
| HR Admin / Team Lead / Employee | people, tasks, role-specific work |
| Recovery flow | retry, restore, redirect behavior |

Use **Explore roles** to switch between the demo workspaces without passwords.

## Why the demo is isolated

The demo build:
- does not load production environment files
- does not expose production authentication or authorization
- uses browser fixtures for sample state
- keeps the supplied backend and CI files unchanged
- can run without PostgreSQL, Kafka, Redis, email, or OTP infrastructure

## Verification

The demo package has its own verification evidence.

- clean dependency installation completed without lockfile changes
- `npm run demo:build` passed
- production `npm test` passed with **263 existing Node tests**
- demo browser suite exited successfully
- **23 browser cases executed**, with 3 intentionally skipped
- all role workspaces were traversed in desktop and mobile Chromium layouts
- backend files matched the supplied corrected source byte-for-byte
- CI files and package lock remained unchanged

Full evidence: [DEMO_VERIFICATION.md](DEMO_VERIFICATION.md)

## Current demo limits

- this deployment is not the live production backend
- the build still reports a large JavaScript chunk warning
- the latest browser verification is Chromium-based
- backend-only operations still require the secure production services
- the API meter is sample data, not live telemetry

## Run the ready demo locally

Node.js 22.13+ is required.

Windows:

```text
START_DEMO.cmd
```

macOS / Linux:

```bash
node demo/serve.mjs
```

Open:

```text
http://127.0.0.1:4180
```

No database, Java runtime, or Docker stack is required for the ready browser demo.

## Rebuild the demo

```bash
npm ci --include=dev --include=optional
npm run demo:build
npm run demo:start
```

For local editing:

```bash
npm run demo:dev
```

Browser checks:

```bash
npx playwright install chromium
npm run demo:test
```

For the guided presentation flow, read [CLIENT_DEMO.md](CLIENT_DEMO.md).
