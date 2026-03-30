# Carbon Footprint Comparison Feature

## Overview

This feature adds comprehensive carbon footprint comparison functionality to the Carbon Tracker app, allowing users to see how their digital carbon footprint compares to global averages and target goals.

## 🌟 Features

### Visual Comparison Chart
- **Three-bar comparison**: User's footprint vs Global average vs Target goal
- **Color-coded performance**: Green for below target, blue for average, yellow for target
- **Interactive tooltips**: Detailed information on hover
- **Responsive design**: Works on all screen sizes

### Period Selection
- **Daily comparison**: Compare today's footprint
- **Weekly comparison**: Compare this week's total
- **Monthly comparison**: Compare this month's total
- **Smooth transitions**: Animated switching between periods

### Smart Feedback System
- **Performance status**: Visual indicators of how well you're doing
- **Percentage comparisons**: Exact numbers vs average and target
- **Contextual messaging**: Encouraging or motivational messages based on performance

### Personalized Tips
- **Dynamic recommendations**: Tips change based on your performance level
- **Actionable advice**: Specific steps to reduce carbon footprint
- **Educational content**: Learn why small changes matter

## 📁 File Structure

```
src/
├── constants/
│   └── globalAverages.ts          # Global average data and targets
├── components/
│   ├── charts/
│   │   └── ComparisonChart.tsx    # Main comparison bar chart
│   ├── dashboard/
│   │   └── ComparisonSection.tsx  # Complete comparison section
│   ├── ui/
│   │   └── PeriodSelector.tsx     # Period toggle component
│   └── demo/
│       └── ComparisonDemo.tsx     # Demo component for testing
└── app/
    └── demo/
        └── page.tsx               # Demo page
```

## 🚀 Usage

### In Dashboard Component

```tsx
import ComparisonSection from "@/components/dashboard/ComparisonSection";

// Add to your dashboard
<ComparisonSection dashboardData={dashboardData} />
```

### Standalone Chart

```tsx
import ComparisonChart from "@/components/charts/ComparisonChart";

<ComparisonChart
  userFootprint={280}
  period="daily"
/>
```

### Period Selector

```tsx
import PeriodSelector from "@/components/ui/PeriodSelector";

<PeriodSelector
  selectedPeriod={selectedPeriod}
  onPeriodChange={setSelectedPeriod}
/>
```

## 📊 Data Structure

### Global Averages
Based on research from environmental studies:
- **Daily**: 350g CO₂ (average digital activities)
- **Weekly**: 2,450g CO₂ 
- **Monthly**: 10,500g CO₂

### Target Goals
20% reduction from global averages:
- **Daily**: 280g CO₂
- **Weekly**: 1,960g CO₂
- **Monthly**: 8,400g CO₂

### Activity Breakdown
Includes averages for:
- Email usage
- Video streaming
- Coding/development
- Video calls
- Cloud storage
- Gaming
- Social media

## 🎨 Design Principles

### Color Coding
- **Green**: Below target (excellent performance)
- **Blue**: Global average (reference point)
- **Yellow**: Target goal (science-based target)
- **Red**: Above average (needs improvement)

### User Experience
- **Progressive disclosure**: Show summary first, details on interaction
- **Positive reinforcement**: Celebrate achievements
- **Constructive guidance**: Helpful tips for improvement
- **Educational context**: Explain why comparisons matter

## 🧪 Testing

### Demo Page
Visit `/demo` to see the feature in action with different performance scenarios:
- **Excellent performance**: Well below targets
- **Good performance**: Below average but room for improvement
- **Needs improvement**: Above average with specific recommendations

### Test Scenarios
1. **Below target**: Should show green bars and congratulatory messages
2. **Above average**: Should show red bars and improvement tips
3. **Between average and target**: Should show mixed colors and moderate guidance

## 🔧 Customization

### Updating Global Averages
Edit `src/constants/globalAverages.ts` to update baseline data:

```typescript
export const GLOBAL_AVERAGES = {
  daily: { total: 350 }, // Update this value
  // ... rest of the configuration
};
```

### Adding New Tips
Modify the `getContextualTips()` function in `ComparisonSection.tsx`:

```typescript
const tips = [
  {
    icon: "💡",
    title: "Your tip title",
    description: "Your tip description",
  },
];
```

### Styling
All components use Tailwind CSS classes and can be customized by modifying the className props.

## 🌍 Environmental Impact

This feature helps users:
- **Understand context**: Know if their usage is high or low
- **Set realistic goals**: Based on scientific recommendations
- **Track progress**: See improvement over time
- **Learn best practices**: Get personalized tips
- **Stay motivated**: Celebrate achievements and see potential

## 🚀 Future Enhancements

Potential improvements:
- **Peer comparisons**: Compare with friends or colleagues
- **Industry benchmarks**: Compare with others in your field
- **Historical trends**: Show improvement over months/years
- **Carbon offset suggestions**: Recommend offset programs
- **Gamification**: Badges and achievements for reaching targets
- **Social sharing**: Share achievements on social media

i