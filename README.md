# LaunchKit — TypeScript Next.js Boilerplate

Hey maker 👋 it's Davide from [Flying Web Solutions](https://www.flyingweb.design/docs). Let's get your startup off the ground, FAST 🦉

<sub>**Watch/Star the repo to be notified when updates are pushed**</sub>

## 🚀 What's Included

LaunchKit is a comprehensive Next.js 15 boilerplate with everything you need to build and ship your SaaS, AI tool, or web application quickly.

### 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components, Framer Motion
- **Theming**: Dark/Light mode with next-themes
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with OAuth providers
- **Payments**: Stripe integration with webhooks
- **Email**: Resend & Nodemailer for transactional emails
- **Content**: MDX-powered blog system
- **Support**: Crisp chat integration
- **SEO**: Built-in SEO optimization with next-sitemap

### ✨ Features

#### 🔐 Authentication & User Management
- OAuth authentication (Google, GitHub, etc.)
- Protected routes and middleware
- User dashboard with account management
- Secure session handling with Supabase

#### 💳 Payments & Subscriptions
- Stripe integration with multiple pricing plans
- Webhook handling for payment events
- Subscription management
- Pricing page with featured plans

#### 🎨 UI Components & Theming
- **Dark/Light Mode**: Complete theme system with system preference detection
- **Theme Toggle**: Accessible theme switcher in navigation
- **Landing Page**: Hero section, features grid, testimonials, FAQ
- **Pricing**: Multiple plan options with feature comparison
- **Blog**: MDX-powered articles with categories and authors
- **Dashboard**: Protected user area
- **Components**: 25+ pre-built components including:
  - Testimonials (multiple layouts)
  - Feature showcases
  - Call-to-action sections
  - Modals and popovers
  - Forms and inputs
  - Theme toggle components

#### 📧 Email System
- Welcome emails
- Password reset
- Transactional notifications
- Lead capture and management

#### 🎯 Marketing & SEO
- SEO-optimized pages with meta tags
- Sitemap generation
- Open Graph images
- Blog for content marketing
- Lead capture forms

#### 🛡️ Security & Performance
- Row Level Security (RLS) with Supabase
- Input validation with Zod
- Middleware for route protection
- Optimized images and fonts
- TypeScript for type safety

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes (auth, stripe, webhooks)
│   ├── blog/              # MDX blog system
│   ├── dashboard/         # Protected user dashboard
│   ├── signin/            # Authentication pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   │   ├── theme-toggle.tsx        # Theme switcher
│   │   └── theme-toggle-dropdown.tsx
│   ├── theme-provider.tsx # Theme context provider
│   ├── ButtonSignin.tsx  # Auth components
│   ├── Pricing.tsx       # Pricing table
│   ├── Hero.tsx          # Landing page hero
│   └── ...               # 25+ other components
├── libs/                  # Utility libraries
│   ├── supabase/         # Database client & server
│   ├── stripe.ts         # Payment processing
│   ├── resend.ts         # Email service
│   └── seo.tsx           # SEO utilities
├── types/                 # TypeScript definitions
├── config.ts             # App configuration
└── middleware.ts         # Route protection
```

## 🌙 Dark Mode

LaunchKit includes a complete dark mode implementation with:

- **Seamless Theme Switching**: Toggle between light, dark, and system themes
- **System Preference Detection**: Automatically respects user's OS theme setting
- **No Flash on Load**: Proper hydration handling prevents theme flash
- **Persistent Preferences**: Theme choice saved in localStorage
- **Accessible Controls**: Keyboard navigation and screen reader support

The theme toggle is available in the header navigation on both desktop and mobile. Users can choose from:
- **Light Mode**: Traditional light theme
- **Dark Mode**: Easy-on-the-eyes dark theme  
- **System**: Automatically matches OS preference

For detailed implementation information, see `DARK_MODE_SETUP.md`.

## 🚀 Get Started

1. **Follow the [Get Started Tutorial](https://www.flyingweb.design/docs)** to clone the repo and run your local server 💻

   <sub>**Looking for the /pages router version?** Use this [documentation](https://www.flyingweb.design/docs-old) instead</sub>

2. **Follow the [Ship In 5 Minutes Tutorial](https://www.flyingweb.design/docs/tutorials/ship-in-5-minutes)** to learn the foundation and ship your app quickly 🦉

3. **Install next-themes dependency** for dark mode functionality:
   ```bash
   npm install next-themes
   ```

## 🔧 Configuration

The project uses a centralized configuration system in `config.ts`:

- **App settings**: Name, description, domain
- **Theme settings**: Default theme, system detection, transitions
- **Stripe plans**: Multiple pricing tiers
- **Email settings**: From addresses and support email
- **Authentication**: Login/callback URLs
- **Integrations**: Crisp chat, AWS S3, etc.

## 📚 Key Features Breakdown

### Authentication Flow
- Supabase Auth with OAuth providers
- Protected routes using middleware
- Session management across client/server
- User profile management

### Payment System
- Multiple Stripe pricing plans
- Webhook handling for subscription events
- Customer portal integration
- Revenue tracking

### Content Management
- MDX blog with categories and authors
- SEO-optimized article pages
- Dynamic routing for blog posts
- Content organization system

### UI/UX
- **Dark/Light Mode**: Complete theme system with next-themes
- **System Theme Detection**: Automatically respects user preferences
- **Theme Persistence**: User theme choice saved across sessions
- Responsive design with Tailwind CSS
- Accessible components with Radix UI
- Smooth animations with Framer Motion
- Toast notifications and loading states

## 🔗 Links

- [📚 Documentation](https://www.flyingweb.design/docs)
- [📣 Updates](https://www.flyingweb.design/changelog)

## 💬 Support

Reach out at davide@flyingweb.ie

Let's ship it, FAST 🦉