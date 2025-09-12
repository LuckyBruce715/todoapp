# TodoAI - AI-Powered Todo Application

## Overview

TodoAI is a modern todo application built with Next.js 15 that uses AI to automatically categorize and prioritize tasks. Users can sign in with Google OAuth, create todos, and let AI intelligently organize them.

## Key Features

### 🔐 Authentication
- **Google OAuth Integration**: Secure sign-in using Better Auth
- **Session Management**: Persistent user sessions across browser restarts
- **Protected Routes**: Dashboard and todos are only accessible to authenticated users

### ✅ Todo Management
- **Create Todos**: Add tasks with title, description, and due date
- **Complete Tasks**: Check off completed items with visual feedback
- **Delete Todos**: Remove unwanted tasks
- **Real-time Updates**: UI updates instantly when todos are modified

### 🤖 AI-Powered Categorization
- **Automatic Category Assignment**: AI analyzes todo content and assigns appropriate categories:
  - Work, Personal, Shopping, Health, Travel, Education, Finance, Home, Entertainment, Other
- **Smart Priority Detection**: AI determines priority level (High, Medium, Low) based on urgency indicators
- **Context Awareness**: Uses both title and description for better categorization

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Visual Priority Indicators**: Color-coded borders show task priority
- **Category Badges**: Visual indicators for AI-assigned categories
- **Progress Tracking**: Shows completion statistics

## Technical Architecture

### Database Schema
```typescript
// Todo table structure
{
  id: serial (Primary Key)
  title: text (Required)
  description: text (Optional)
  completed: boolean (Default: false)
  category: text (AI-assigned)
  priority: text (AI-assigned: low/medium/high)
  dueDate: timestamp (Optional)
  userId: text (Foreign Key to user)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### API Endpoints

#### `GET /api/todos`
- **Description**: Fetch all todos for the authenticated user
- **Authentication**: Required
- **Response**: Array of todo objects

#### `POST /api/todos`
- **Description**: Create a new todo with AI categorization
- **Authentication**: Required
- **Body**: `{ title: string, description?: string, dueDate?: string }`
- **Process**: 
  1. Validates input
  2. Calls AI categorization service
  3. Saves todo with AI-assigned category and priority
- **Response**: Created todo object

#### `PATCH /api/todos/[id]`
- **Description**: Update an existing todo
- **Authentication**: Required (user can only update their own todos)
- **Body**: `{ title?: string, description?: string, completed?: boolean, dueDate?: string, priority?: string }`
- **Response**: Updated todo object

#### `DELETE /api/todos/[id]`
- **Description**: Delete a todo
- **Authentication**: Required (user can only delete their own todos)
- **Response**: Success message

### AI Categorization Service

Located in `src/lib/ai-categorizer.ts`, this service:

1. **Uses OpenAI GPT Models**: Configurable via `OPENAI_MODEL` environment variable
2. **Structured Output**: Uses Vercel AI SDK's `generateObject` for reliable JSON responses
3. **Fallback Handling**: Provides default values if AI service fails
4. **Context Analysis**: Considers both title and description for accurate categorization

```typescript
// Example AI prompt structure
const prompt = `
Analyze the following todo item and categorize it:
Title: ${title}
Description: ${description}

Categorize into: work, personal, shopping, health, travel, education, finance, home, entertainment, other
Priority: high (urgent), medium (important), low (can be delayed)
`;
```

## Component Architecture

### Page Components
- **`src/app/page.tsx`**: Landing page that redirects based on auth status
- **`src/app/sign-in/page.tsx`**: Google OAuth sign-in page
- **`src/app/dashboard/page.tsx`**: Main todos dashboard with full CRUD functionality

### UI Components
- **`src/components/ui/`**: Reusable shadcn/ui components (Button, Card, Dialog, etc.)
- **`src/components/auth/`**: Authentication-related components
- **`src/components/site-header.tsx`**: Navigation header with branding and user menu

### Custom Hooks and Utilities
- **`src/lib/auth-client.ts`**: Better Auth client configuration
- **`src/lib/types/todo.ts`**: TypeScript types for todo entities
- **`src/lib/ai-categorizer.ts`**: AI categorization logic

## Environment Variables

### Required Variables
```env
# Database
POSTGRES_URL="postgresql://username:password@host:port/database"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AI Integration
OPENAI_API_KEY="your-openai-api-key"
OPENAI_MODEL="gpt-4o-mini" # Optional, defaults to gpt-4o-mini
```

## Deployment Setup

1. **Database Migration**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

2. **Build Process**:
   ```bash
   npm run build
   ```

3. **Environment Configuration**: Set all required environment variables

4. **Google OAuth Setup**:
   - Configure Google Cloud Console
   - Set authorized redirect URIs
   - Enable Google+ API

## Usage Examples

### Creating a Todo
```javascript
const response = await fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Schedule dentist appointment",
    description: "Need to book cleaning appointment for next week",
    dueDate: "2024-01-15"
  })
});
// AI will automatically categorize this as "health" with "medium" priority
```

### Completing a Todo
```javascript
const response = await fetch(`/api/todos/${todoId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
});
```

## Security Features

- **User Isolation**: Users can only access their own todos
- **Session Validation**: All API endpoints validate user sessions
- **Input Sanitization**: All user inputs are validated and sanitized
- **SQL Injection Prevention**: Uses Drizzle ORM with parameterized queries
- **HTTPS Enforcement**: Secure communication in production

## Performance Optimizations

- **Database Indexing**: Foreign keys and frequently queried fields are indexed
- **Optimistic Updates**: UI updates immediately before server confirmation
- **Lazy Loading**: Components load only when needed
- **AI Caching**: AI categorization results could be cached for similar requests

## Future Enhancement Ideas

- **Batch Operations**: Select and operate on multiple todos
- **Recurring Tasks**: Support for repeating todos
- **Team Collaboration**: Share todos with other users
- **Mobile App**: React Native version
- **Offline Support**: PWA with offline capabilities
- **Advanced Filtering**: Filter by category, priority, date ranges
- **Calendar Integration**: Sync with Google Calendar
- **Notification System**: Reminders for due dates

## Troubleshooting

### Common Issues

1. **Authentication Errors**: 
   - Verify Google OAuth credentials
   - Check NEXT_PUBLIC_APP_URL matches your domain

2. **Database Connection**: 
   - Ensure POSTGRES_URL is correctly formatted
   - Check database server is running

3. **AI Categorization Failures**: 
   - Verify OPENAI_API_KEY is valid
   - Check API quota and billing

4. **Build Errors**: 
   - Run `npm run typecheck` to identify type issues
   - Run `npm run lint` to check code quality

This TodoAI application demonstrates a modern, full-stack approach to building AI-enhanced web applications with robust authentication, database management, and intelligent automation.