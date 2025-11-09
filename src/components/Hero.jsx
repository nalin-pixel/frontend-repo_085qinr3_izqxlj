import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-100 via-rose-100 to-sky-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />

      {/* Soft orbs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40 bg-fuchsia-400/40" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40 bg-sky-400/40" />

      {/* Peacock feather motifs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-10 opacity-20 dark:opacity-30">
        <Feather className="hidden sm:block h-24 w-24 text-fuchsia-500" />
        <Feather className="hidden sm:block h-24 w-24 text-sky-500" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-fuchsia-600 via-violet-600 to-sky-600 bg-clip-text text-transparent"
        >
          BhaktiFlow — Your Daily Krishna Sadhana Companion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="mt-5 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300"
        >
          Track your chanting, reading, seva, and satsang. Enjoy live darshan and a serene, modern bhakti ambience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a href="#tracker" className="px-6 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-fuchsia-500/20 hover:scale-[1.02] active:scale-[0.99] transition-transform">Start Tracking</a>
          <a href="#darshan" className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 text-white shadow-lg hover:opacity-95 transition">Live Darshan</a>
        </motion.div>
      </div>
    </section>
  );
}
