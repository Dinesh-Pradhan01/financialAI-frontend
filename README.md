# Spotlite Frontend Client

This is the frontend single-page application (SPA) client for Spotlite. It provides the dashboard, onboarding flow, statement upload management, audit summaries, and detailed financial reports.

---

## Technical Stack & Libraries

- **Build Tool / Bundler**: [Vite](https://vitejs.dev/)
- **Core Library**: React (v19)
- **Language**: TypeScript
- **Package Manager**: [Bun](https://bun.sh/)
- **Routing & Framework**: [TanStack Start / TanStack Router](https://tanstack.com/router/latest)
- **Styling**: Tailwind CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: TanStack Query (React Query)
- **Authentication**: Firebase Authentication SDK (client token retrieval and handler)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Directory Layout

```text
financialAI-frontend/
├── src/
│   ├── components/       # Reusable UI components (buttons, nav, layouts, charts)
│   ├── contexts/         # Authentication and Context providers (AuthContext)
│   ├── firebase/         # Firebase app configuration initialization
│   ├── hooks/            # Custom reusable react hooks
│   ├── routes/           # Routing page definitions (using TanStack file-based routing)
│   │   ├── _app.tsx      # Core protected layout wrapper
│   │   ├── login.tsx     # Sign In and Sign Up page
│   │   ├── onboarding.tsx# Onboarding user profile form
│   │   └── ...           # Dashboard and Statement routing pages
│   └── main.tsx          # Client entry point
├── public/               # Static assets
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite plugins and bundle setup
├── package.json          # Node scripts and dependencies declaration
└── bun.lock              # Bun package manager lockfile
```

---

## Setup & Running Guide

### 1. Prerequisites

- [Bun](https://bun.sh/) installed locally on your system.

### 2. Installation

1. Navigate to the frontend directory:
   ```bash
   cd financialAI-frontend
   ```
2. Install project dependencies using Bun:
   ```bash
   bun install
   ```

### 3. Environment Configuration

Create a `.env.local` file in the `financialAI-frontend` root directory and populate it with the Firebase details corresponding to your Firebase Project:

```ini
# Firebase Authentication Web App Configuration
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_APP_ID="1:xxxxxx:web:xxxxxx"

# Backend API Endpoint URL
VITE_API_BASE_URL="http://localhost:8000"
```

---

## Scripts & Operations

Inside the `financialAI-frontend` directory, you can run the following CLI commands:

- **Run Dev Server**:
  ```bash
  bun run dev
  ```
  Starts a hot-reloading development server on `http://localhost:8080` (or another port outputted in terminal).

- **Typecheck code**:
  ```bash
  bun run tsc --noEmit
  ```
  Compiles the codebase for TypeScript errors without writing output files.

- **Production Build**:
  ```bash
  bun run build
  ```
  Optimizes, treeshakes, and builds the app bundle in the `.output/` or `dist/` directory for deployment.

- **Preview Production Build**:
  ```bash
  bun run preview
  ```
  Runs a local static web server serving the built assets for local validation.

- **Lint / Format**:
  ```bash
  bun run lint
  ```
  Validates codebase formatting against Prettier and rules in `eslint.config.js`.
