import React, { useEffect, useMemo, useState } from 'react';
import { Book, Sparkles, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const VERSES = [
  '“Always think of Me, become My devotee.” — Bhagavad-gita 18.65',
  '“Chant and be happy.” — Srila Prabhupada',
  '“From wherever the mind wanders, bring it back under the control of the self.” — Bg 6.26',
  '“The holy name cleanses the heart of all dust.” — Siksastakam',
  '“Where there is Krsna and Arjuna, there will be victory.” — Bg 18.78',
];

export default function Affirmations() {
  const [custom, setCustom] = useState(() => JSON.parse(localStorage.getItem('bhaktiflow-affirmations') || '[]'));
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('bhaktiflow-affirmations', JSON.stringify(custom));
  }, [custom]);

  const list = useMemo(() => {
    return [...VERSES, ...custom];
  }, [custom]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 7000);
    return () => clearInterval(id);
  }, [list.length]);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="mx-auto h-12 w-12 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mb-4">
            <Quote className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Affirmations & Verses</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Let a gentle line appear every few seconds. Add your own favorites.</p>
        </motion.div>

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-8 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-sky-500/10 ring-1 ring-black/5 text-center text-lg sm:text-xl"
        >
          {list[index]}
        </motion.div>

        <div className="mt-8 rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Add a personal affirmation or verse</label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Hare Krishna Hare Krishna Krishna Krishna Hare Hare..."
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60"
            />
            <button
              onClick={() => {
                if (!input.trim()) return;
                setCustom((arr) => [...arr, input.trim()]);
                setInput('');
              }}
              className="px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
