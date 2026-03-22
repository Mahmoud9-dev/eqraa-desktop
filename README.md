# Eqraa Desktop (إقراء)

> Desktop management system for Islamic educational centers and Quran memorization institutions.

<img width="2544" height="1331" alt="Screenshot_٢٠٢٦٠٢١٨_١٧٣٠٣٤" src="https://github.com/user-attachments/assets/a4388cd2-efbc-4162-89ec-353ac66df8a5" />

[![Tauri](https://img.shields.io/badge/Tauri-2.0-24C8D8?style=flat-square&logo=tauri)](https://v2.tauri.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Local-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
<img width="2559" height="1372" alt="image" src="https://github.com/user-attachments/assets/3a7fcf0e-0ff5-414e-9fd5-7315a73f7520" />

---

## About

Eqraa Desktop is a local-first desktop application for managing Islamic educational centers. It handles students, teachers, Quran memorization tracking, attendance, schedules, and more — all stored locally in SQLite with no server or internet connection required.

Bilingual interface: Arabic (RTL) and English (LTR).

---

## Features

**Core Management**
- Student & teacher records
- Attendance tracking
- Class schedules
- Exams
<img width="2554" height="1334" alt="image" src="https://github.com/user-attachments/assets/2344ed18-70af-49a6-b7f4-b0da1f0ed696" />

**Quran & Islamic Education**
- Quran memorization progress tracking
- Tajweed assessment
- Quran circles management
- Islamic lessons, ethics & behavior, life skills
- Family programs, guidance & counseling
<img width="2554" height="1334" alt="image" src="https://github.com/user-attachments/assets/56c43523-2db9-4a1e-8e4f-fda2275830a1" />

**Communication & Administration**
- Announcements
- Meetings
- Suggestions & feedback
- Library management

**System**
- Database backup & restore
- Dark / light theme
- Bilingual UI (Arabic / English)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Desktop shell | [Tauri 2.0](https://v2.tauri.app/) |
| Bundler | [Vite](https://vite.dev/) |
| Frontend | [React 19](https://react.dev/) + TypeScript |
| Database | SQLite via `tauri-plugin-sql` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Installation

### From Release (end users)

1. Go to [GitHub Releases](https://github.com/Mahmoud9-dev/eqraa-desktop/releases)
2. Download the installer for your OS:
   - **Windows** — `.msi`
   - **macOS** — `.dmg`
   - **Linux** — `.deb` or `.AppImage`
3. Install and run.

### From Source (developers)

**Prerequisites:**
- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)
- [Rust toolchain](https://rustup.rs/) (`rustup`)
- Platform-specific Tauri dependencies — see [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

```bash
git clone https://github.com/Mahmoud9-dev/eqraa-desktop.git
cd eqraa-desktop
pnpm install
pnpm tauri:dev
```

**Build distributable:**

```bash
pnpm tauri:build
```

Output goes to `src-tauri/target/release/bundle/`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Vite dev server (port 1420) |
| `pnpm tauri:dev` | Launch Tauri app in dev mode |
| `pnpm tauri:build` | Build distributable for current OS |
| `pnpm build` | Build frontend only |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test:unit` | Run Vitest unit tests |

---

## Project Structure

```
eqraa-desktop/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom hooks
│   ├── lib/
│   │   ├── database/       # SQLite init, repositories
│   │   └── i18n/           # Translation system
│   ├── views/              # Page components
│   ├── router.tsx          # Client-side routing
│   └── main.tsx            # Entry point
├── src-tauri/              # Tauri / Rust backend
│   ├── src/                # Rust source
│   ├── capabilities/       # Plugin permissions
│   └── tauri.conf.json     # App configuration
├── index.html              # HTML entry
├── vite.config.ts          # Vite configuration
└── package.json
```

---

## License

This project is provided as-is. See repository for license details.

---

<div align="center">

**Built for Islamic Education**

</div>
