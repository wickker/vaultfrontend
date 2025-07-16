# Vault Frontend

A modern React-based frontend application for managing and organizing items in a secure key value system.

## Features

- 📱 Modern, responsive user interface
- 🗂️ Item management with categories
- 🔄 Real-time updates using React Query
- ⚡ Fast and intuitive swipe actions
- 📅 Timestamp tracking for items
- 🎨 Category color coding system
- 🔐 Secure item handling

## PWA Capabilities

- 📱 Installable as a native-like app on mobile and desktop devices
- 📱 Responsive design that works on all screen sizes
- 🔄 Automatic updates through service workers
- 🔐 Secure HTTPS connection
- 📱 App-like experience with custom icons and splash screens

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

The application should now be running on `http://localhost:5173` (or your configured port).

## Project Structure

```
src/
├── components/          # React components
│   ├── commons/        # Shared components (buttons, inputs, etc.)
│   ├── Categories/     # Category management components
│   ├── Fallback/       # Fallback/error components
│   ├── Item/           # Item management components
│   ├── Main/           # Main dashboard component
│   └── Profile/        # User profile related components
├── configs/           # Application configurations
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
│   └── queries/       # React Query hooks
├── services/          # API and other services
└── utils/             # Utilities
    ├── constants/     # Constants and configuration
    └── functions/     # Utility functions
```