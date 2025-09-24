# Runtime Error Fix - Event Handlers in Client Components

## Problem
The error occurred because we were trying to pass a function (`onNavigationReady`) from a Server Component to a Client Component, which is not allowed in Next.js 13+ App Router.

```
Error: Event handlers cannot be passed to Client Component props.
```

## Solution
Replaced the callback prop pattern with a React Context approach that works properly with the client/server component architecture.

## Changes Made

### 1. Created ScrollContext (`contexts/ScrollContext.tsx`)
```typescript
'use client';
// Context to manage 3D navigation between components
// Provides registerNavigation and navigateToSection functions
```

### 2. Updated ThreeScrollBackground Component
- Removed `onNavigationReady` prop
- Added `useScrollNavigation()` hook
- Uses `registerNavigation()` to register the navigation function

### 3. Updated Header Component
- Added `useScrollNavigation()` hook
- Uses `navigateToSection()` directly from context
- Removed dependency on window object for navigation

### 4. Updated Main Page (`app/page.tsx`)
- Added `'use client';` directive
- Wrapped entire page in `<ScrollProvider>`
- Removed callback function approach
- Simplified component structure

## Architecture Benefits
- **Proper separation**: Client/Server components properly separated
- **Type safety**: Full TypeScript support with proper context typing  
- **Clean API**: No prop drilling or callback passing required
- **Maintainable**: Clear separation of concerns between navigation and rendering

## Files Modified
1. `contexts/ScrollContext.tsx` - New context for navigation
2. `components/ThreeScrollBackground.tsx` - Uses context instead of props
3. `components/Header.tsx` - Uses context for 3D navigation
4. `app/page.tsx` - Added client directive and ScrollProvider wrapper

The 3D scroll navigation now works properly within Next.js 13+ App Router constraints!