# Dark Mode

The boilerplate includes dark mode support with system preference detection.

## How It Works

Dark mode is implemented using [next-themes](https://github.com/pacocoursey/next-themes):

1. **System Detection**: Automatically matches user's OS preference
2. **Manual Toggle**: Users can override with the theme toggle button
3. **Persistence**: Selection is saved to localStorage
4. **No Flash**: Server-side rendering prevents flash of unstyled content

## Theme Toggle

The theme toggle component cycles through: Light → Dark → System

**Location:** `src/components/ThemeToggle.tsx`

```typescript
import { ThemeToggle } from '@/components/ThemeToggle';

// In your navbar or header
<ThemeToggle />
```

## CSS Variables

Theme colors are defined using CSS custom properties in `src/app/globals.css`:

### Light Theme (default)

```css
:root {
  --background: 60 20% 95%;
  --foreground: 60 10% 20%;
  --card: 60 14% 92%;
  --card-foreground: 60 10% 20%;
  --primary: 60 5% 20%;
  --primary-foreground: 60 20% 95%;
  --secondary: 60 10% 40%;
  --muted: 60 14% 88%;
  --muted-foreground: 60 10% 40%;
  --accent: 60 8% 30%;
  --border: 60 10% 80%;
  --input: 60 10% 75%;
  --ring: 60 10% 20%;
}
```

### Dark Theme

```css
.dark {
  --background: 60 5% 10%;
  --foreground: 60 10% 90%;
  --card: 60 5% 15%;
  --card-foreground: 60 10% 90%;
  --primary: 60 20% 90%;
  --primary-foreground: 60 5% 10%;
  --secondary: 60 10% 70%;
  --muted: 60 5% 20%;
  --muted-foreground: 60 10% 60%;
  --accent: 60 8% 50%;
  --border: 60 10% 25%;
  --input: 60 10% 30%;
  --ring: 60 10% 70%;
}
```

## Customizing Colors

To customize the color palette:

1. Edit the CSS variables in `src/app/globals.css`
2. Values use HSL format: `hue saturation% lightness%`
3. Update both `:root` (light) and `.dark` sections

### Example: Blue Theme

```css
:root {
  --background: 210 30% 98%;
  --foreground: 210 20% 15%;
  --primary: 210 90% 50%;
  /* ... other variables */
}

.dark {
  --background: 210 30% 10%;
  --foreground: 210 20% 90%;
  --primary: 210 90% 60%;
  /* ... other variables */
}
```

## Using Theme Colors

### In Tailwind Classes

Use the semantic color names:

```html
<div class="bg-background text-foreground">
  <div class="bg-card p-4 border border-border">
    <h2 class="text-primary">Title</h2>
    <p class="text-muted-foreground">Description</p>
  </div>
</div>
```

### In Custom CSS

Reference variables directly:

```css
.custom-element {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
}
```

## Theme Provider

The theme provider is configured in `src/components/ThemeProvider.tsx`:

```typescript
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

Options:
- `attribute="class"`: Adds `.dark` class to `<html>`
- `defaultTheme="system"`: Defaults to OS preference
- `enableSystem`: Enables system preference detection
- `disableTransitionOnChange`: Prevents animation flash on theme change

## Accessing Theme in Code

```typescript
'use client';

import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (actual theme being used)

  return (
    <button onClick={() => setTheme('dark')}>
      Dark Mode
    </button>
  );
}
```

## Components Support

All shadcn/ui components automatically support dark mode through CSS variables. No additional configuration needed.

## Images in Dark Mode

For images that need different versions for dark mode:

```tsx
import { useTheme } from 'next-themes';

function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={resolvedTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
      alt="Logo"
    />
  );
}
```

Or use CSS:

```css
.logo-dark {
  display: none;
}

.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}
```
