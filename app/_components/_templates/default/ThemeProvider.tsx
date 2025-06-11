// app/username/ThemeProvider.js
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeProvider({ children } : {children : ReactNode}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('username-theme');
    html.style.visibility = 'hidden';
    
    // Force repaint before showing
    requestAnimationFrame(() => {
      html.style.visibility = 'visible';
      setMounted(true);
    });
    
    return () => {
      html.classList.remove('username-theme');
    };
  }, [theme]);

  if (!mounted) {
    return null; // Or loading skeleton
  }

  return <>{children}</>;
}