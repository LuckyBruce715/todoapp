# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Always start the dev server on port 3000. Use `npx kill-port 3000` if the port is already in use.

```bash
npm run dev          # Start development server with Turbopack on port 3000
npm run build        # Build for production (includes database migrations)
npm run lint         # Run ESLint - ALWAYS run after making changes
npm run typecheck    # Run TypeScript type checking - ALWAYS run after making changes
```

### Database Commands
```bash
npm run db:generate  # Generate database migrations from schema changes
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes directly to database (development)
npm run db:studio    # Open Drizzle Studio database GUI
npm run db:dev       # Alias for db:push (development workflow)
npm run db:reset     # Reset database (drops all tables)
```

## Architecture Overview

This is a TaskAgent (formerly TaskFlow) application - a task management system with AI-powered categorization and prioritization.

### Core Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Authentication**: Better Auth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Vercel AI SDK with OpenAI integration for task categorization
- **UI**: shadcn/ui components with Tailwind CSS (cold blue theme)
- **Styling**: Uses custom CSS variables in `src/app/globals.css` with cold blue background

### Database Schema (src/lib/schema.ts)
- `user` - User accounts with Google OAuth integration
- `session` - User sessions managed by Better Auth
- `account` - OAuth account linking
- `verification` - Email verification tokens
- `todo` - Core todo items with AI-generated categories and priorities

### Authentication Flow
- Better Auth configuration in `src/lib/auth.ts`
- Google OAuth integration
- Client-side utilities in `src/lib/auth-client.ts`
- Session management handles user state across the application

### AI Integration
- Task categorization in `src/lib/ai-categorizer.ts` (if exists)
- OpenAI integration through Vercel AI SDK
- Automatic category and priority assignment for new todos
- Chat functionality available at `/chat` endpoint

### API Structure
- `/api/auth/[...all]` - Better Auth handler for all authentication routes
- `/api/todos` - CRUD operations for todo items with AI categorization
- `/api/todos/[id]` - Individual todo operations
- `/api/chat` - AI chat endpoint using OpenAI

### Key Pages
- `/` - Landing page showcasing TaskAgent features
- `/sign-in` - Google OAuth sign-in page
- `/dashboard` - Main user dashboard with todos (protected route)
- `/chat` - AI chat interface (protected route)

### Component Architecture
- `src/components/auth/` - Authentication-related components
- `src/components/ui/` - shadcn/ui base components
- `src/components/site-header.tsx` - Main navigation with TaskAgent branding
- `src/components/site-footer.tsx` - Site footer

### Environment Variables Required
```
POSTGRES_URL              # PostgreSQL connection string
BETTER_AUTH_SECRET        # Random 32+ character secret
GOOGLE_CLIENT_ID          # Google OAuth client ID
GOOGLE_CLIENT_SECRET      # Google OAuth client secret
OPENAI_API_KEY           # OpenAI API key for AI features
OPENAI_MODEL             # OpenAI model (defaults to gpt-5-mini)
NEXT_PUBLIC_APP_URL      # Application URL (http://localhost:3000 for dev)
```

## Development Rules

- Always run `npm run lint` and `npm run typecheck` after completing changes
- NEVER start the dev server yourself - ask the user to provide terminal output if needed
- Avoid using custom colors unless specifically instructed - stick to standard Tailwind and shadcn colors
- The application uses a cold blue background theme defined in `src/app/globals.css`
- Follow the existing authentication patterns using Better Auth
- All database operations should use Drizzle ORM with proper error handling
- New todos automatically get AI-generated categories and priorities

## Testing Approach

Check the codebase for existing test files and patterns before implementing new tests. No specific test framework is configured in package.json, so investigate the project structure first.