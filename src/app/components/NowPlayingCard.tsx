"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artists?: string;
  albumArt?: string;
  url?: string;
  progressMs?: number;
  durationMs?: number;
  ts?: number;
};

export default function NowPlayingCard() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchNow() {
    const res = await fetch("/api/now-playing", { cache: "no-store" });
    const json = (await res.json()) as NowPlaying;
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchNow();
    const id = setInterval(fetchNow, 2000);
    return () => clearInterval(id);
  }, []);

  const effectiveProgress = useMemo(() => {
    if (!data?.isPlaying) return 0;
    const drift = Date.now() - (data.ts ?? Date.now());
    return Math.min((data.progressMs ?? 0) + drift, data.durationMs ?? 0);
  }, [data]);

  const pct =
    data?.durationMs && data.durationMs > 0
      ? Math.min(100, Math.max(0, (effectiveProgress / data.durationMs) * 100))
      : 0;

  const title = data?.title ?? "Not playing";
  const artists = data?.artists ?? "Spotify";
  const albumArt = data?.albumArt ?? "";
  const isPlaying = data?.isPlaying;
  const href = isPlaying && data?.url ? data.url : undefined;

  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      aria-label={
        isPlaying ? `Now playing ${title} by ${artists}` : "Playback paused"
      }
      className="hidden lg:flex bg-white dark:bg-gray-950
          rounded-xl shadow-md dark:shadow-lg p-2 
          sm:flex-row lg:flex-col lg:gap-3 relative 
          transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 flex items-center justify-center">
          {/* CD disc */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 shadow-md transition-transform duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(0,0,0,0.15) 25%, transparent 25%, transparent 40%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 41%, transparent 41%)",
            }}
          >
            {/* Center hole */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-900 shadow-inner" />
            </div>
          </div>

          {/* Album art in center */}
          <div
            className={`relative h-13 w-13 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800 z-10 shadow-lg transition-transform duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            {albumArt && (
              <Image
                src={albumArt}
                alt=""
                fill
                sizes="36px"
                className={`object-cover transition duration-500 ${
                  isPlaying
                    ? "saturate-100 blur-0 opacity-100"
                    : "saturate-0 blur-[1.0px] opacity-80"
                }`}
              />
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={`truncate text-sm font-medium transition-colors ${
              isPlaying
                ? "text-gray-900 dark:text-slate-100"
                : "text-gray-500 dark:text-slate-400"
            }`}
          >
            {loading ? "—" : title}
          </div>
          <div
            className={`truncate text-xs transition-colors ${
              isPlaying
                ? "text-gray-500 dark:text-slate-400"
                : "text-gray-400 dark:text-slate-500"
            }`}
          >
            {loading ? "—" : artists}
          </div>

          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-[width,background-color] duration-500 linear ${
                isPlaying
                  ? "bg-black dark:bg-slate-300"
                  : "bg-white dark:bg-slate-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </a>
  );
}