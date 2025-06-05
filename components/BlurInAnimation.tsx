// components/BlurInAnimation.tsx
"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BlurInAnimationProps {
  children: ReactNode;
  className?: string;
  duration?: number; 
  delay?: number;
}

export const BlurInAnimation = ({
  children,
  className,
  duration = 500,
  delay = 0
}: BlurInAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--duration', `${duration}ms`);
      ref.current.style.setProperty('--delay', `${delay}ms`);
      ref.current.classList.add('animate-in');
    }
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "opacity-0 blur-sm will-change-[filter,opacity]",
        className
      )}
    >
      {children}
    </div>
  );
};
