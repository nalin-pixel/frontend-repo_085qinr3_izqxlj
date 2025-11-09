import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Target, BookOpen, Heart, Users, Bell, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
  { key: 'japa', label: 'Japa Rounds', icon: Target },
  { key: 'reading', label: 'Scripture Reading', icon: BookOpen },
  { key: 'seva', label: 'Seva / Service', icon: Heart },
  { key: 'satsang', label: 'Satsang / Kirtan', icon: Users },
];

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getWeekDates() {
  const d = new Date();
  const day = d.getDay(); // 0-6
  const start = new Date(d);
  start.setDate(d.getDate() - day); // start Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(start);
    dt.setDate(start.getDate() + i);
    return dt;
  });
}

export default function Tracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('bhaktiflow-entries');
    return saved ? JSON.parse(saved) : {};
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('bhaktiflow-history');
    return saved ? JSON.parse(saved) : {};
  });
  const [reminderOn, setReminderOn] = useState(() => localStorage.getItem('bhaktiflow-reminder') === 'on');

  const total = useMemo(() => {
    return activities.reduce((acc, a) => acc + (Number(entries[a.key]) || 0), 0);
  }, [entries]);

  // Persist today's snapshot when entries change
  useEffect(() => {
    const key = todayKey();
    const nextHistory = { ...history, [key]: entries };
    setHistory(nextHistory);
    localStorage.setItem('bhaktiflow-history', JSON.stringify(nextHistory));
    localStorage.setItem('bhaktiflow-entries', JSON.stringify(entries));
  }, [entries]);

  // Simple reminder via Notification API
  useEffect(() => {
    if (!reminderOn) return;
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    const id = setInterval(() => {
      if (Notification && Notification.permission === 'granted') {
        new Notification('BhaktiFlow', { body: 'Short sadhana break? Offer one round or a verse.' });
      }
    }, 1000 * 60 * 60 * 4); // every 4 hours
    return () => clearInterval(id);
  }, [reminderOn]);

  function updateValue(key, value) {
    const v = value === '' ? '' : Math.max(0, Number(value));
    setEntries((prev) => ({ ...prev, [key]: v }));
  }

  const weekDates = getWeekDates();

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
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Your progress saves privately in your browser.</p>
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

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6 bg-gradient-to-r from-fuchsia-500/10 via-violet-500/10 to-sky-500/10 ring-1 ring-black/5"
            >
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Total today</p>
              <p className="mt-1 text-4xl font-bold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">{total}</p>
            </motion.div>
          </AnimatePresence>

          {/* Weekly streak calendar */}
          <div className="rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Flame className="h-4 w-4 text-orange-500" /> Streak this week
              </div>
              <div className="text-xs text-zinc-500">Sun - Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((d) => {
                const key = d.toISOString().slice(0, 10);
                const dayTotal = activities.reduce((acc, a) => acc + (Number((history[key] || {})[a.key]) || 0), 0);
                const active = dayTotal > 0;
                return (
                  <div key={key} className={`h-10 rounded-lg flex items-center justify-center text-xs font-medium ${active ? 'bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                    {d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 1)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reminders toggle */}
          <div className="rounded-2xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Gentle reminders</p>
                  <p className="text-xs text-zinc-500">Every 4 hours during the day</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const next = !reminderOn;
                  setReminderOn(next);
                  localStorage.setItem('bhaktiflow-reminder', next ? 'on' : 'off');
                }}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${reminderOn ? 'bg-emerald-500/70' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                aria-pressed={reminderOn}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white dark:bg-zinc-900 transition ${reminderOn ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
