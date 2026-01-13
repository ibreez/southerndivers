# Architecture

## System Architecture

The application follows a client-side Single Page Application (SPA) architecture built with React 18 and Vite. It consists of two main areas:

1. **Public Website**: Marketing-focused pages showcasing diving services and information
2. **Admin Panel**: Content management interface for non-technical staff

Data persistence is handled using a MySQL database backend, with a Node.js/Express server providing REST API endpoints. The frontend communicates via HTTP requests proxied through Vite's development server.

## Source Code Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives (buttons, forms, etc.)
│   └── [Feature].jsx   # Feature-specific components
├── pages/              # Route-level page components
├── hooks/              # Custom React hooks
│   └── useData.js      # Data management hook
├── lib/                # Utility libraries
│   ├── data.js         # Initial data and initialization
│   └── utils.js        # Helper functions
├── App.jsx             # Main app component with routing
└── main.jsx            # Application entry point
```

## Key Technical Decisions

### State Management
- **Database-based**: Uses MySQL database for persistent storage
- **Custom Hook Pattern**: `useData` hook provides CRUD operations with event-driven updates
- **Event Bus**: Simple pub/sub system for cross-component data synchronization

### Routing
- **React Router v7**: Client-side routing for SPA navigation
- **Protected Routes**: Simple authentication-based route protection for admin areas

### UI Architecture
- **Component Composition**: Modular components assembled into pages
- **Design System**: Tailwind CSS with custom color scheme and component variants
- **Accessibility**: Radix UI primitives for accessible form controls and interactions

## Design Patterns

### Custom Hook for Data Management
The `useData` hook encapsulates all data operations (CRUD) and provides reactive updates across components using an event listener pattern.

### Configuration-Driven Admin Interface
Admin forms and tables are generated dynamically from configuration objects, allowing easy addition of new content types without code changes.

### Component Variants
UI components use class-variance-authority for consistent styling variants (e.g., button sizes, colors).

## Component Relationships

### Public Site Flow
```
Home (Page)
├── Header (Navigation)
├── Hero (Landing section)
├── Highlights (Key features)
├── About (Company info)
├── Courses (Service offerings)
├── Excursions (Activities)
├── MarineLife (Educational content)
├── Packages (Pricing)
├── Gallery (Visual showcase)
├── Safety (Trust signals)
├── Reviews (Social proof)
├── Booking (Lead capture)
├── Contact (Communication)
└── Footer (Site-wide links)
```

### Admin Panel Flow
```
Admin (Dashboard)
├── Login (Authentication)
└── AdminResource (Generic CRUD)
    ├── Table View (Data listing)
    └── Form Modal (Create/Edit)
```

## Critical Implementation Paths

### Data Flow
1. **Initialization**: `initializeData()` populates localStorage with sample data
2. **Reading**: Components use `useData` hook to fetch and subscribe to data changes
3. **Writing**: Admin forms trigger CRUD operations through the hook
4. **Synchronization**: Event bus notifies all subscribers of data changes

### Authentication Flow
1. **Login**: Simple username/password check (hardcoded for demo)
2. **Session**: localStorage flag for authentication state
3. **Protection**: Route guards redirect unauthenticated users
4. **Logout**: Clear authentication flag and redirect

### Responsive Design
- Mobile-first approach with Tailwind's responsive utilities
- Grid layouts adapt from single column (mobile) to multi-column (desktop)
- Touch-friendly interactions for mobile users