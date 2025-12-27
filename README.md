# Front Crypto - Next.js 15 App

This is a cryptocurrency trading platform built with Next.js 15 using the App Router.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching
- **Socket.io Client** - Real-time communication
- **Brain.js** - Neural network library

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
# or
npm install
```

2. Create environment file:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:9000
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Route group for organized pages
│   │   │   ├── home/          → /home
│   │   │   ├── about/         → /about
│   │   │   ├── contact/       → /contact
│   │   │   └── layout.tsx     # Shared pages layout
│   │   ├── offline/           → /offline
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Root (/) - redirects to /home
│   │   └── providers.tsx      # Client-side providers
│   ├── components/             # React components
│   │   └── PageTemplate/      # Reusable page template
│   ├── constants/              # Configuration constants
│   └── services/               # API services
├── public/                     # Static files
└── antd.theme.ts              # Ant Design theme configuration
```

### 🚀 Quick: Create a New Page

See [CREATE_NEW_PAGE.md](./CREATE_NEW_PAGE.md) for a quick guide on creating new pages.

### Page Template Structure

All pages use a consistent `PageTemplate` component for unified layout and styling.

## Features

- ✅ Next.js 15 with App Router
- ✅ React 19
- ✅ TypeScript support
- ✅ Ant Design UI components
- ✅ Tailwind CSS styling
- ✅ RTL (Right-to-Left) support for Persian/Arabic
- ✅ Service Worker for offline support
- ✅ React Query for data fetching
- ✅ Socket.io for real-time updates

## Environment Variables

- `NEXT_PUBLIC_SERVER_URL` - Backend server URL

## License

Private
