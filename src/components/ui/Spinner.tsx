import React from 'react'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'white' | 'gray'
type Speed = 'fast' | 'normal' | 'slow' | number

interface SpinnerProps {
  size?: Size
  variant?: Variant
  className?: string
  'aria-label'?: string
  /**
   * Speed can be 'fast' (0.5s), 'normal' (1s), 'slow' (1.5s) or a numeric value (seconds)
   */
  speed?: Speed
}

const sizeMap: Record<Size, string> = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-4',
  lg: 'w-16 h-16 border-4',
}

const variantMap: Record<Variant, string> = {
  primary: 'border-green-200 border-t-green-600',
  white: 'border-white border-t-white/90',
  gray: 'border-gray-200 border-t-gray-500',
}

export default function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel = 'Loading',
  speed = 'normal',
}: SpinnerProps) {
  const sizeClass = sizeMap[size]
  const variantClass = variantMap[variant]

  // Resolve speed to a numeric seconds value
  const resolveSpeed = (s: Speed) => {
    if (typeof s === 'number') return s;
    switch (s) {
      case 'fast':
        return 0.5;
      case 'slow':
        return 1.5;
      case 'normal':
      default:
        return 1;
    }
  }

  const animationDurationSeconds = resolveSpeed(speed);
  const animationStyle: React.CSSProperties = {
    animationDuration: `${animationDurationSeconds}s`,
  };

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`inline-block rounded-full ${sizeClass} ${variantClass} animate-spin ${className}`}
      style={animationStyle}
    />
  )
}
