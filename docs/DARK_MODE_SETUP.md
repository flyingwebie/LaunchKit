# Dark Mode Implementation Guide

This project now includes a complete dark mode implementation using `next-themes` and shadcn/ui components.

## 🚀 Features

- **Seamless Theme Switching**: Toggle between light, dark, and system themes
- **System Theme Detection**: Automatically respects user's system preference
- **No Flash on Load**: Proper hydration handling prevents theme flash
- **Persistent Theme**: User's theme preference is saved in localStorage
- **Accessible**: Full keyboard navigation and screen reader support

## 📦 Dependencies

Make sure to install the required dependency:

```bash
npm install next-themes
# or
yarn add next-themes
# or
pnpm add next-themes
```

## 🏗️ Implementation Details

### 1. Theme Provider Setup

The `ThemeProvider` component wraps the entire application and provides theme context:

```tsx
// components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 2. Root Layout Configuration

The root layout includes the ThemeProvider with proper configuration:

```tsx
// app/layout.tsx
<html suppressHydrationWarning>
  <body>
    <ThemeProvider
      attribute="class"
      defaultTheme={config.theme.defaultTheme}
      enableSystem={config.theme.enableSystem}
      disableTransitionOnChange={config.theme.disableTransitionOnChange}
    >
      {children}
    </ThemeProvider>
  </body>
</html>
```

### 3. Theme Toggle Components

Two theme toggle components are available:

#### Simple Toggle Button
```tsx
// components/ui/theme-toggle.tsx
// Cycles through: light → dark → system → light
```

#### Dropdown Menu Toggle
```tsx
// components/ui/theme-toggle-dropdown.tsx
// Shows all options in a dropdown menu
```

### 4. Configuration

Theme settings are centralized in `config.ts`:

```typescript
theme: {
  defaultTheme: "system", // "light" | "dark" | "system"
  enableSystem: true,
  disableTransitionOnChange: true,
  themes: ["light", "dark", "system"],
}
```

## 🎨 CSS Variables

The project uses CSS custom properties for theming, defined in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more variables */
}
```

## 🔧 Usage

### Using the Theme Toggle

Import and use the theme toggle component anywhere in your app:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle"
// or
import { ThemeToggleDropdown } from "@/components/ui/theme-toggle-dropdown"

function MyComponent() {
  return (
    <div>
      <ThemeToggle />
      {/* or */}
      <ThemeToggleDropdown />
    </div>
  )
}
```

### Accessing Theme in Components

Use the `useTheme` hook to access theme state:

```tsx
import { useTheme } from "next-themes"

function MyComponent() {
  const { theme, setTheme, systemTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>
        Switch to Dark
      </button>
    </div>
  )
}
```

### Conditional Styling

Use Tailwind's dark mode classes for conditional styling:

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  This adapts to the current theme
</div>
```

## 🎯 Best Practices

1. **Use CSS Variables**: Leverage the predefined CSS variables for consistent theming
2. **Test Both Themes**: Always test your components in both light and dark modes
3. **Respect System Preference**: Default to "system" theme for better UX
4. **Avoid Theme Flash**: Use `suppressHydrationWarning` on the html element
5. **Accessible Icons**: Ensure theme toggle icons are accessible with proper ARIA labels

## 🔍 Troubleshooting

### Theme Flash on Load
If you see a flash of the wrong theme on page load:
- Ensure `suppressHydrationWarning` is set on the `<html>` element
- Check that `disableTransitionOnChange` is enabled

### Theme Not Persisting
If the theme doesn't persist across page reloads:
- Verify localStorage is available in your environment
- Check that the ThemeProvider is properly wrapping your app

### Styles Not Updating
If styles don't update when switching themes:
- Ensure your CSS uses the proper CSS variables
- Check that `darkMode: ["class"]` is set in your Tailwind config

## 📱 Mobile Considerations

The theme toggle is included in both desktop and mobile navigation:
- Desktop: Shows in the header next to other navigation items
- Mobile: Appears in the mobile menu with proper spacing

## 🎨 Customization

### Adding New Themes
To add custom themes beyond light/dark:

1. Update the `themes` array in `config.ts`
2. Add corresponding CSS variables in `globals.css`
3. Update the theme toggle components to include new options

### Styling the Toggle Button
The theme toggle uses shadcn/ui Button component and can be customized:

```tsx
<Button
  variant="outline"  // Change variant
  size="icon"       // Change size
  className="custom-classes" // Add custom classes
>
```

## 🚀 Next Steps

- Consider adding theme-specific images or logos
- Implement theme-aware charts and graphs
- Add animation transitions between themes
- Create theme-specific color palettes for your brand

---

For more information about next-themes, visit: https://github.com/pacocoursey/next-themes
For shadcn/ui documentation, visit: https://ui.shadcn.com/docs/dark-mode/next 