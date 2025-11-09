import React, { useMemo, useState } from 'react';
import { Youtube, Images } from 'lucide-react';
import { motion } from 'framer-motion';

function extractYouTubeId(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1);
    }
    if (u.searchParams.get('v')) {
      return u.searchParams.get('v');
    }
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'embed');
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
  } catch (e) {
    return '';
  }
  return '';
}

const presets = [
  { name: 'Mayapur TV', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { name: 'Vrindavan', url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
  { name: 'Mumbai Temple', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
  { name: 'Jagannath Puri', url: 'https://www.youtube.com/watch?v=DWcJFNfaw9c' },
];

export default function Darshan() {
  const [url, setUrl] = useState(() => localStorage.getItem('darshan-url') || presets[0].url);
  const videoId = useMemo(() => extractYouTubeId(url) || 'ysz5S6PUM-U', [url]);

  function setPreset(u) {
    setUrl(u);
    localStorage.setItem('darshan-url', u);
  }

  return (
    <section id="darshan" className="py-20 sm:py-28 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="mx-auto h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
            <Youtube className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Live Darshan</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Quickly switch between popular temple streams or paste any link.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Live Darshan"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur rounded-2xl p-6 ring-1 ring-black/5"
          >
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Paste YouTube link</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/60"
            />
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Works with full links, short youtu.be links, or embed codes.</p>

            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                <Images className="h-4 w-4" /> Temple streams
              </div>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPreset(p.url)}
                    className={`rounded-xl px-3 py-2 text-sm ring-1 ring-black/5 hover:bg-zinc-50 dark:hover:bg-zinc-800 ${url === p.url ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white/60 dark:bg-zinc-900/50'}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
