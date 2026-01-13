# Tech

## Technologies Used

### Frontend Framework
- **React 18**: Modern React with concurrent features and hooks
- **Vite**: Fast build tool and development server
- **React Router v7**: Client-side routing for SPA navigation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Tailwind Animate**: Animation utilities
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Conditional class merging

### UI Components
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Icon library
- **Framer Motion**: Animation and motion library

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **TypeScript Types**: Type definitions for React and other libraries

### Utilities
- **UUID**: Unique identifier generation
- **React Helmet**: Document head management for SEO

## Development Setup

### Package Manager
- **pnpm**: Fast, disk-efficient package manager

### Scripts
- `pnpm dev`: Start development server on port 3000
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build

### Environment
- **Node.js**: JavaScript runtime
- **Vite**: Development and build tool
- **ES Modules**: Modern module system

## Technical Constraints

### Data Storage
- **localStorage Only**: No backend database, all data stored client-side
- **Browser Limitations**: Data persists only in user's browser
- **Size Limits**: Subject to browser storage quotas

### Authentication
- **Client-side Only**: No server-side session management
- **Hardcoded Credentials**: Simple demo authentication (admin/admin)

### Deployment
- **Static Hosting**: Can be deployed to any static host (Netlify, Vercel, etc.)
- **No Server**: No backend requirements

## Dependencies

### Core Dependencies
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^7.1.1
- `framer-motion`: ^11.15.0
- `lucide-react`: ^0.469.0
- `uuid`: ^11.0.3
- `react-helmet`: ^6.1.0

### UI Dependencies
- `@radix-ui/*`: Various Radix UI components (^1.1.x)
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^2.6.0
- `tailwindcss-animate`: ^1.0.7

### Dev Dependencies
- `@vitejs/plugin-react`: ^4.3.4
- `vite`: ^4.4.5
- `tailwindcss`: ^3.4.17
- `postcss`: ^8.4.49
- `autoprefixer`: ^10.4.20
- `eslint`: ^8.57.1

## Tool Usage Patterns

### Component Development
- Use functional components with hooks
- Implement responsive design with Tailwind classes
- Follow component composition patterns
- Use Radix UI for accessible primitives

### State Management
- Use `useData` hook for all data operations
- Implement event-driven updates for cross-component sync
- Store data in localStorage with JSON serialization

### Routing
- Define routes in App.jsx with React Router
- Use protected routes for admin areas
- Implement client-side navigation

### Styling
- Use Tailwind utility classes
- Implement dark mode with class strategy
- Use CSS custom properties for theming
- Apply animations with Framer Motion

### Development Workflow
- Use Vite for fast development
- Run ESLint for code quality
- Use pnpm for dependency management
- Test builds with preview command