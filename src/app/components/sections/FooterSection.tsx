"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import YouTubeModal from "../YouTubeModal";
import { useTactilePress } from "../useTactilePress";

function FooterVideoButton({
  alt,
  ariaLabel,
  onClick,
  src,
}: {
  alt: string;
  ariaLabel: string;
  onClick: () => void;
  src: string;
}) {
  const press = useTactilePress({ includeSpaceKey: true });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerDown={press.onPressPointerDown}
      onPointerUp={press.onPressPointerUp}
      onPointerLeave={press.onPressPointerLeave}
      onPointerCancel={press.onPressPointerCancel}
      onKeyDown={press.onPressKeyDown}
      onKeyUp={press.onPressKeyUp}
      onBlur={press.onPressBlur}
      initial={false}
      animate={
        press.shouldReduceMotion
          ? undefined
          : { scale: press.pressScale, y: press.pressY }
      }
      transition={press.pressTransition}
      style={{ transformOrigin: "center center", minWidth: 0 }}
      className="relative cursor-pointer p-1 md:p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-md"
      aria-label={ariaLabel}
    >
      <Image
        src={src}
        width={0}
        height={0}
        sizes="(min-width: 768px) 48px, 36px"
        alt={alt}
        className="inline-block w-9 h-9 md:w-12 md:h-12"
      />
    </motion.button>
  );
}

export default function FooterSection() {
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <>
      <section id="closing-note">
        <div className="w-full justify-between flex flex-col sm:flex-row items-center text-center pt-16 gap-3">
          <div className="flex flex-row gap-3">
            <FooterVideoButton
              src="/static/hom.webp"
              alt="Watch me defeat Malenia!"
              ariaLabel="Watch Malenia video"
              onClick={() => setVideoId("YWdbfy231n0")}
            />
            <FooterVideoButton
              src="/static/rg.webp"
              alt="Watch me defeat Promised Consort Radahn!"
              ariaLabel="Watch Radahn video"
              onClick={() => setVideoId("NaVNh79V4F4")}
            />
          </div>

          <div className="md:text-right max-w-full sm:max-w-[365px] md:ml-auto text-gray-600 dark:text-slate-400 text-sm">
            <p>
              Loosely inspired by{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://www.framer.com/marketplace/templates/monocv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MonoCV
              </a>{" "}
              and coded in{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://code.visualstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visual Studio Code
              </a>
              . Built with{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tailwind
              </a>
              , deployed with{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel
              </a>
              . <span className="sm:hidden">All text is in</span>{" "}
              <span className="sm:hidden">
                <a
                  className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                  href="https://rsms.me/inter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inter
                </a>{" "}
                typeface.
              </span>
            </p>
            <p className="hidden sm:block">
              All text is in{" "}
              <a
                className="font-medium hover:cursor-pointer ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm"
                href="https://rsms.me/inter/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Inter
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
