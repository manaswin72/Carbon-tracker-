# 🌱 Carbon Footprint Tracker

A comprehensive web application that helps users track and reduce their digital carbon footprint through daily activity monitoring, personalized recommendations, and gamification.

## 🌍 Project Overview

The Carbon Footprint Tracker estimates CO₂ emissions from digital activities like emails, video streaming, coding, video calls, cloud usage, gaming, and social media. Users can log activities, visualize their impact, receive actionable tips, set reduction goals, and earn badges for sustainable behavior.

## ✨ Key Features

### 📊 Activity Tracking
- **Manual Entry**: Log daily digital activities with intuitive sliders and inputs
- **API Integrations**: Automatic tracking via Gmail and GitHub APIs
- **Quick Entry**: Fast logging for common activities
- **Real-time Calculations**: Instant CO₂ footprint calculations

### 📈 Data Visualization
- **Interactive Dashboard**: Charts showing daily, weekly, and monthly trends
- **Activity Breakdown**: Pie charts displaying emissions by category
- **Progress Tracking**: Visual progress indicators and comparisons
- **Real-world Equivalents**: Contextualize emissions (e.g., "like driving X km")

### 💡 Eco-Friendly Tips
- **Personalized Recommendations**: Tips based on your highest impact activities
- **Categorized Advice**: Organized by activity type (emails, streaming, etc.)
- **Impact Calculations**: Potential savings for each tip
- **Interactive Application**: Track which tips you've applied

### 🎯 Goal Setting & Gamification
- **Weekly Goals**: Set percentage reduction targets
- **Progress Tracking**: Visual goal progress with motivational messaging
- **Achievement Badges**: Earn badges for consistent tracking and reductions
- **Point System**: Accumulate points for various achievements
- **Difficulty Levels**: Easy, medium, and hard goals to choose from

### 🔐 Authentication & Security
- **Google Login**: Secure authentication with Google OAuth
- **GitHub Integration**: Connect GitHub for automatic coding activity tracking
- **User Profiles**: Personalized experience with preferences
- **Data Security**: Secure storage with Firebase

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Chart.js** - Interactive data visualizations
- **React Charts 2** - Chart components for React

### Backend & Database
- **Firebase** - Authentication and Firestore database
- **Next.js API Routes** - Server-side functionality
- **Cloud Functions** - Serverless computing (if needed)

### APIs & Integrations
- **Gmail API** - Email activity tracking
- **GitHub API** - Coding activity monitoring
- **Google OAuth** - Secure authentication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── auth/              # Authentication components
│   ├── charts/            # Data visualization
│   ├── dashboard/         # Dashboard components
│   ├── forms/             # Activity input forms
│   ├── gamification/      # Badges and goals
│   ├── layout/            # Navigation and layout
│   └── tips/              # Recommendation system
├── hooks/                 # Custom React hooks
├── lib/
│   ├── api/               # External API integrations
│   ├── calculations/      # Carbon footprint logic
│   ├── firebase/          # Firebase configuration
│   └── gamification/      # Badge evaluation system
├── types/                 # TypeScript type definitions
└── constants/             # App constants and data
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project
- Google Cloud Console project (for APIs)

### Firebase Setup
1. Create collections in Firestore:
   - `users` - User profiles and preferences
   - `activities` - Individual activity logs
   - `carbon_footprints` - Daily footprint calculations
   - `weekly_goals` - User reduction goals
   - `user_badges` - Earned achievements

### API Permissions
- **Gmail API**: `gmail.readonly` scope for email counting
- **GitHub API**: `read:user` and `repo` scopes for activity tracking

## 📊 Carbon Footprint Calculations

The app uses research-based CO₂ emission factors:

| Activity | Emission Factor |
|----------|----------------|
| Email | 4g CO₂ per email |
| Video Streaming | 36g CO₂ per hour |
| Coding/Development | 15g CO₂ per hour |
| Video Calls | 150g CO₂ per hour |
| Cloud Storage | 0.5g CO₂ per GB/day |
| Gaming | 60g CO₂ per hour |
| Social Media | 12g CO₂ per hour |

## 🏆 Gamification System

### Badge Categories
- **Environmental**: Reduction achievements
- **Consistency**: Daily tracking streaks
- **Social**: Tip application and sharing
- **Milestones**: Time-based achievements

### Goal System
- Set weekly reduction targets (10-90%)
- Track progress with visual indicators
- Motivational messaging based on progress
- Achievement rewards for meeting goals

## 🎨 Design Philosophy

### Eco-Friendly Aesthetics
- Green color palette representing nature and sustainability
- Earth tones and natural gradients
- Floating leaf animations for visual interest
- Clean, minimal design reducing cognitive load

### User Experience
- Mobile-first responsive design
- Intuitive navigation with clear icons
- Progressive disclosure of complex features
- Immediate feedback for user actions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Traditional hosting with Node.js


### Planned Features
- **Social Features**: Share achievements, compete with friends
- **Advanced Analytics**: Detailed emission breakdowns and trends
- **Offset Marketplace**: Purchase carbon offsets directly
- **IoT Integration**: Smart home device monitoring
- **Corporate Dashboard**: Team and organization tracking
- **Mobile App**: Native iOS and Android applications

## 🙏 Acknowledgments

- CO₂ emission factors based on research from various environmental organizations
- Icons and emojis used throughout the application
- Open source libraries and frameworks that made this project possible
- Environmental awareness campaigns that inspired this project


