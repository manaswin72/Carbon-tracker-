# 🚀 Development Setup Guide

## Quick Start (Development Mode)

The app is configured to work immediately in development mode without Firebase setup!

### 1. Start Development Server

```bash
npm run dev
```

**Access at**: http://localhost:3000

### 2. Development Features

✅ **Mock Authentication**: Auto-login as demo user after 1.5 seconds  
✅ **Working UI**: All components and navigation functional  
✅ **Sample Data**: Pre-populated with realistic carbon footprint data  
✅ **No Firebase Required**: Uses development auth provider  

## 🎯 What You'll See

1. **Loading Screen**: Beautiful eco-themed loading with floating animations
2. **Auto-Login**: Automatically signs in as "Demo User" 
3. **Full Dashboard**: Complete with charts, stats, and navigation
4. **All Features**: Activities, Tips, Goals, Badges all working

## 🛠️ Development Mode vs Production

### Current (Development Mode)
- ✅ **File**: `src/hooks/useAuthDev.ts` 
- ✅ **Provider**: `AuthProviderDev`
- ✅ **Auth**: Mock authentication with demo users
- ✅ **Data**: Simulated carbon footprint data

### Production Setup (Optional)
To use real Firebase authentication:

1. **Create Firebase Project**
   ```bash
   # Go to https://console.firebase.google.com
   # Create new project
   # Enable Authentication with Google/GitHub
   ```

2. **Update Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Add your real Firebase credentials
   ```

3. **Switch to Production Auth**
   ```typescript
   // In src/app/layout.tsx
   import AuthProvider from "@/components/auth/AuthProvider";
   
   // In all components, change:
   import { useAuth } from '@/hooks/useAuth';
   ```

## 📊 Features Available in Development

### ✅ Working Features
- **Dashboard**: Real-time charts and statistics
- **Activity Logging**: Interactive forms with sliders
- **Tips System**: 40+ eco-friendly recommendations  
- **Goals**: Weekly reduction targets with progress tracking
- **Badges**: Achievement system with 20+ badges
- **Navigation**: Full responsive navigation
- **Mobile Support**: Complete mobile experience

### 🔧 Development Tools
- **Hot Reload**: Changes appear instantly
- **TypeScript**: Full type safety
- **ESLint**: Disabled for development (configurable)
- **Tailwind**: Utility-first CSS with eco theme

## 🐛 Troubleshooting

### "Site Can't Be Reached"
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Firebase Errors (Expected in Dev Mode)
These are normal and can be ignored:
- `auth/api-key-not-valid`
- Firebase connection errors

### Port 3000 In Use
```bash
# Kill any existing processes
lsof -ti:3000 | xargs kill -9
npm run dev
```

## 🎨 Customization

### Change Demo User
Edit `src/hooks/useAuthDev.ts`:
```typescript
const devUser: User = {
  id: 'your-custom-id',
  email: 'your@email.com',
  name: 'Your Name',
  // ... other properties
};
```

### Modify Carbon Data
Edit sample data in:
- `src/components/dashboard/Dashboard.tsx`
- `src/components/layout/AppLayout.tsx`

### Adjust Loading Time
Change timeout in `useAuthDev.ts`:
```typescript
setTimeout(() => {
  setUser(devUser);
  setLoading(false);
}, 1500); // Change this value
```

## 📱 Testing Features

### Dashboard
- View charts and statistics
- See real-world equivalents
- Check responsive design

### Activity Logging  
- Use interactive sliders
- Submit activities
- See calculations

### Tips System
- Browse categorized tips
- Apply tips and track progress
- View potential savings

### Goals & Badges
- Set weekly reduction goals
- View progress indicators
- Explore achievement system

## 🚀 Deployment Ready

When ready for production:

1. ✅ **Code**: Production-ready React/Next.js
2. ✅ **Styling**: Complete Tailwind CSS theme
3. ✅ **Components**: All UI components implemented
4. ✅ **Logic**: Carbon calculation engine
5. ✅ **Database**: Firebase schema defined
6. ✅ **API**: Gmail/GitHub integrations ready

Just add real Firebase credentials and deploy! 🌱