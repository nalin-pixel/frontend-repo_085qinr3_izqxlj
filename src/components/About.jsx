import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(217,70,239,0.15),rgba(0,0,0,0))]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="mx-auto h-12 w-12 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Modern devotion, timeless essence</h2>
          <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
            BhaktiFlow brings the spirit of Krishna-bhakti into your daily rhythm with a clean, inspiring interface. Track sadhana, watch darshan, and stay uplifted with subtle animations and artistic gradients.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Graceful motion',
              desc: 'Smooth scroll animations that feel light and reverent — never distracting.',
            },
            {
              title: 'Ambient aesthetics',
              desc: 'Soft gradients, glass surfaces, and gentle glow for a serene atmosphere.',
            },
            {
              title: 'Built for practice',
              desc: 'Designed to support japa, reading, seva, and satsang as daily habits.',
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-fuchsia-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              </div>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
