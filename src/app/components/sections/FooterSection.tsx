"use client";

import Image from "next/image";
import { useState } from "react";
import YouTubeModal from "../YouTubeModal";

export default function FooterSection() {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <>
      <section id="closing-note">
        <div className="w-full justify-between flex flex-col sm:flex-row items-center text-center pt-16 gap-3">
          <div className="flex flex-row gap-3">
            <button
              onClick={() => setVideoId("YWdbfy231n0")}
              className="relative transition-all duration-300 hover:-translate-y-2 cursor-pointer group p-1 md:p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md"
              aria-label="Watch Malenia video"
              style={{ minWidth: 0 }}
            >
              <Image
                src="/static/hom.webp"
                width={0}
                height={0}
                sizes="(min-width: 768px) 48px, 36px"
                alt="Watch me defeat Malenia!"
                className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300 w-9 h-9 md:w-12 md:h-12"
              />
            </button>
            <button
              onClick={() => setVideoId("NaVNh79V4F4")}
              className="relative transition-all duration-300 hover:-translate-y-2 cursor-pointer group p-1 md:p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md"
              aria-label="Watch Radahn video"
              style={{ minWidth: 0 }}
            >
              <Image
                src="/static/rg.webp"
                width={0}
                height={0}
                sizes="(min-width: 768px) 48px, 36px"
                alt="Watch me defeat Promised Consort Radahn!"
                className="relative z-10 inline-block group-hover:scale-105 transition-transform duration-300 w-9 h-9 md:w-12 md:h-12"
              />
            </button>
          </div>

          <div className="md:text-right max-w-full sm:max-w-[365px] md:ml-auto text-gray-600 dark:text-slate-400 text-sm">
            <p>
              Loosely inspired by{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://www.framer.com/marketplace/templates/monocv/"
                rel="noopener noreferrer"
                target="_blank"
              >
                MonoCV
              </a>{" "}
              and coded in{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://code.visualstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visual Studio Code
              </a>
              . Built with{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://nextjs.org/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://tailwindcss.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tailwind CSS
              </a>
              , deployed with{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://vercel.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Vercel
              </a>
              . <span className="sm:hidden">All text is in</span>{" "}
              <span className="sm:hidden">
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://www.fontshare.com/fonts/cabinet-grotesk"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cabinet Grotesk
                </a>{" "}
                typeface.
              </span>
            </p>
            <p className="hidden sm:block">
              All text is in{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 hover:text-[#d87474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://www.fontshare.com/fonts/cabinet-grotesk"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cabinet Grotesk
              </a>{" "}
              typeface.
            </p>
          </div>
        </div>
      </section>

      <YouTubeModal
        isOpen={!!videoId}
        onClose={() => setVideoId(null)}
        videoId={videoId || ""}
      />
    </>
  );
}
