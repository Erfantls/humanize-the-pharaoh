
import { useState, useEffect } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-preference') as ThemePreference;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored;
      }
    }
    return 'system';
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      if (themePreference === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return themePreference === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const updateTheme = () => {
      const root = window.document.documentElement;
      
      let shouldBeDark = false;
      
      if (themePreference === 'system') {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        shouldBeDark = themePreference === 'dark';
      }
      
      setIsDark(shouldBeDark);
      
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('theme-preference', themePreference);
    };

    updateTheme();

    // Listen for system theme changes when preference is 'system'
    if (themePreference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [themePreference]);

  const setTheme = (preference: ThemePreference) => {
    setThemePreference(preference);
  };

  const toggleTheme = () => {
    if (themePreference === 'light') {
      setTheme('dark');
    } else if (themePreference === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    switch (themePreference) {
      case 'light': return 'sun';
      case 'dark': return 'moon';
      case 'system': return 'monitor';
      default: return 'monitor';
    }
  };

  return { 
    isDark, 
    themePreference, 
    toggleTheme, 
    setTheme, 
    getThemeIcon 
  };
};
