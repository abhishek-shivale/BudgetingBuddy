'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      className="rounded-full border-none bg-transparent p-[3px] hover:bg-dark-main-color focus:bg-dark-main-color"
      variant="outline"
      size="icon"
    >
      {theme === 'dark' ? (
        <Moon
          onClick={() => setTheme('light')}
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      ) : theme === 'light' ? (
        <Sun
          onClick={() => setTheme('dark')}
          color="white"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
      ) : (
        <Sun
          onClick={() => setTheme('dark')}
          color="white"
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
      )}
    </Button>
  );
}
