import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
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
    // Embed link
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'embed');
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
  } catch (e) {
    return '';
  }
  return '';
}

export default function Darshan() {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=ysz5S6PUM-U');
  const videoId = extractYouTubeId(url) || 'ysz5S6PUM-U';

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
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">Tune into temple streams or add your favorite live kirtan and darshan videos.</p>
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
            <div className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Tip: Add your temple's live stream URL and keep it pinned for darshan on the go.</p>
              <p className="text-zinc-500">Default sample video is shown if the link is empty or invalid.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
