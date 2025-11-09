import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Darshan from './components/Darshan';
import Tracker from './components/Tracker';
import About from './components/About';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Darshan />
        <Tracker />
        <About />
      </main>
      <footer className="py-10 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-zinc-600 dark:text-zinc-400">
          Made with devotion • Hare Krishna
        </div>
      </footer>
    </div>
  );
}
