"use client";

import { useEffect, useMemo, useState, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  async function fetchNow() {
    const res = await fetch("/api/now-playing", { cache: "no-store" });
    const json = (await res.json()) as NowPlaying;
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    fetchNow();
    const id = setInterval(fetchNow, 2000);
    return () => clearInterval(id);
  }, [isVisible]);

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
      ref={cardRef}
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
        <div className="relative h-14 w-14 overflow-hidden rounded-md bg-gray-200 dark:bg-slate-800">
          {albumArt && (
            <Image
              src={albumArt}
              alt=""
              fill
              sizes="56px"
              className={`object-cover transition duration-500 ${
                isPlaying
                  ? "saturate-100 blur-0 opacity-100"
                  : "saturate-0 blur-[1.0px] opacity-80"
              }`}
            />
          )}
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