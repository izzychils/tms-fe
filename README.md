# Onboad - Employee Onboarding Portal

A comprehensive employee onboarding management system with **stunning glassmorphism design**, built with React, TypeScript, and Framer Motion.

## 🚀 Live Demo

Visit [http://localhost:3000](http://localhost:3000) to see the landing page, then click "Get Started" to explore the dashboard!

## ✨ Features

### 🎨 **Beautiful Landing Page**
- Hero section with animated stats and dashboard preview
- Feature showcase with interactive cards
- Step-by-step "How it Works" section
- Customer testimonials
- Smooth scroll navigation
- Glassmorphism design throughout

### Employee Features
- **Personalized Dashboard** - Track onboarding progress with animated progress rings
- **Task Management** - Check off tasks across categories (Documents, Orientation, Equipment, Training)
- **Resource Library** - Access company policies, benefits guides, and IT documentation
- **Profile Page** - View onboarding timeline and personal information

### Admin/Manager Features
- **Team Overview** - Monitor completion rates for all employees
- **Department Filtering** - View progress by department
- **Automated Nudge System** - Send reminders to employees with pending tasks
- **Task Management** - Add new onboarding tasks for all employees
- **Resource Management** - Upload, view, edit, and delete resources
- **Reports & Analytics** - Weekly bottleneck analysis and department readiness metrics

### Design
- Modern glassmorphism with frosted glass cards
- Liquid glass animated backgrounds
- Smooth animations using Framer Motion (page transitions, staggered reveals, animated progress)
- Deep purple/indigo color scheme with cyan and pink accents
- Fully responsive design

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) to see the **landing page**

4. Click "Get Started" or navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the dashboard

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## User Accounts

Switch between different accounts using the dropdown in the sidebar to explore different roles:

### Employees
- **Sarah Chen** (Engineering) - 65% progress
- **Michael Torres** (Marketing) - 85% progress
- **Lisa Wang** (Sales) - 45% progress

### Admin/Managers
- **David Kim** (HR Admin)
- **Emily Johnson** (Engineering Manager)

## Project Structure

\`\`\`
src/
├── components/          # Reusable components
│   ├── Layout.tsx       # Main layout with sidebar
│   ├── Sidebar.tsx      # Navigation sidebar with glassmorphism
│   └── ProgressRing.tsx # Animated progress circle
├── pages/               # Page components
│   ├── Landing.tsx      # 🆕 Beautiful landing page with hero section
│   ├── Dashboard.tsx    # Main dashboard (employee/admin views)
│   ├── Tasks.tsx        # Task management
│   ├── Resources.tsx    # Resource library
│   ├── Profile.tsx      # User profile and timeline
│   ├── Team.tsx         # Team management (admin only)
│   └── Reports.tsx      # Reports and analytics (admin only)
├── context/             # React context for state management
│   └── AppContext.tsx   # Global app state
├── data/                # Mock data
│   └── mockData.ts      # Sample users, tasks, resources
├── types/               # TypeScript type definitions
│   └── index.ts         # All interface definitions
├── App.tsx              # Main app component with routing
├── main.tsx             # App entry point
└── index.css            # Global styles with glassmorphism
\`\`\`

## Key Features Implementation

### Glassmorphism Design
- Frosted glass effect using `backdrop-filter: blur()`
- Layered semi-transparent backgrounds
- Subtle borders and shadows
- Animated liquid blob backgrounds

### Animated Progress Tracking
- SVG-based circular progress rings
- Smooth animations with Framer Motion
- Category-specific progress breakdown
- Real-time updates when tasks are completed

### Role-Based Views
- Conditional navigation based on user role
- Admin/Manager: Team management, reports, resource upload
- Employee: Personal tasks, view-only resources, profile

### Demo Functionality
- Pre-populated with sample data
- User switcher to explore different roles
- Task completion updates progress in real-time
- Notification system for pending tasks

## Customization

### Colors
Edit color variables in `src/index.css`:
\`\`\`css
:root {
  --primary: #6366f1;
  --accent-cyan: #06b6d4;
  --accent-pink: #ec4899;
  /* ... */
}
\`\`\`

### Adding New Tasks
Tasks can be added programmatically through the admin interface or by modifying `src/data/mockData.ts`.

### Resources
Resources are managed through the Resource Library page with full CRUD operations for admins.

## License

MIT

## Author

Built with ❤️ for seamless employee onboarding experiences
