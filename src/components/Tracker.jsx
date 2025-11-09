import React, { useMemo, useState } from 'react';
import { CheckCircle2, Beads, BookOpen, HeartHandshake, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
  { key: 'japa', label: 'Japa Rounds', icon: Beads },
  { key: 'reading', label: 'Scripture Reading', icon: BookOpen },
  { key: 'seva', label: 'Seva / Service', icon: HeartHandshake },
  { key: 'satsang', label: 'Satsang / Kirtan', icon: Users },
];

export default function Tracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('bhaktiflow-entries');
    return saved ? JSON.parse(saved) : {};
  });

  const total = useMemo(() => {
    return activities.reduce((acc, a) => acc + (Number(entries[a.key]) || 0), 0);
  }, [entries]);

  function updateValue(key, value) {
    const v = value === '' ? '' : Math.max(0, Number(value));
    const next = { ...entries, [key]: v };
    setEntries(next);
    localStorage.setItem('bhaktiflow-entries', JSON.stringify(next));
  }

  return (
    <section id="tracker" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="mx-auto h-12 w-12 rounded-xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Daily Sadhana Tracker</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Log your practices with ease. Your progress saves in your browser.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map(({ key, label, icon: Icon }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-fuchsia-500/20 via-violet-500/20 to-sky-500/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-fuchsia-500" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{label}</h3>
              </div>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={entries[key] ?? ''}
                onChange={(e) => updateValue(key, e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60"
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-2xl p-6 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-sky-500/10 ring-1 ring-black/5"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Total activities logged today</p>
            <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">{total}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
