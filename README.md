# Vault Frontend

A modern React-based frontend application for managing and organizing items in a secure vault system.

## Features

- 📱 Modern, responsive user interface
- 🗂️ Item management with categories
- 🔄 Real-time updates using React Query
- ⚡ Fast and intuitive swipe actions
- 📅 Timestamp tracking for items
- 🎨 Category color coding system
- 🔐 Secure item handling

## Tech Stack

- React
- TypeScript
- TanStack Query (React Query)
- React Router
- Luxon for date handling
- Tailwind CSS for styling
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd vaultfrontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application should now be running on `http://localhost:3000` (or your configured port).

## Project Structure

```
src/
├── components/          # React components
│   ├── Main/           # Main dashboard component
│   ├── commons/        # Shared components (buttons, inputs, etc.)
│   ├── Profile/        # User profile related components
│   ├── Item/           # Item management components
│   ├── Categories/     # Category management components
│   └── Fallback/       # Fallback/error components
├── services/          # API and other services
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
│   └── queries/       # React Query hooks
├── constants/         # Constants and configuration
└── assets/           # Static assets (images, fonts)
```
