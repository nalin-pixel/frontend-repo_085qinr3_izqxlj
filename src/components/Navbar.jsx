import React, { useEffect, useState } from 'react';
import { Flower2, Star, Youtube, Calendar, Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ring-1 ring-black/5 bg-white/70 dark:bg-zinc-900/60 hover:bg-white/90 dark:hover:bg-zinc-900"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/70 dark:bg-zinc-900/70 border-b border-white/20 dark:border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute -inset-2 bg-gradient-to-tr from-fuchsia-400/50 via-rose-400/40 to-amber-300/40 blur-xl rounded-full" />
              <Flower2 className="relative h-7 w-7 text-fuchsia-500" />
            </div>
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">BhaktiFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <a href="#darshan" className="hover:text-fuchsia-500 transition-colors inline-flex items-center gap-2"><Youtube className="h-4 w-4"/>Darshan</a>
            <a href="#tracker" className="hover:text-fuchsia-500 transition-colors inline-flex items-center gap-2"><Calendar className="h-4 w-4"/>Daily Tracker</a>
            <a href="#about" className="hover:text-fuchsia-500 transition-colors inline-flex items-center gap-2"><Star className="h-4 w-4"/>About</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
