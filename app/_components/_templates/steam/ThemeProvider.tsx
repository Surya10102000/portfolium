// app/username/ThemeProvider.js
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeProvider({ children } : {children : ReactNode}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('steam-theme');
    html.style.visibility = 'hidden';
    html.style.scrollBehavior = "smooth";
    document.body.style.scrollBehavior = 'smooth';

    // Force repaint before showing
    requestAnimationFrame(() => {
      html.style.visibility = 'visible';
      setMounted(true);
    });
    
    return () => {
      html.classList.remove('steam-theme');
      html.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    };
  }, [theme]);

  if (!mounted) {
    return null; 
  }

  return <>{children}</>;
}