import type { CSSProperties } from "react";

import SectionHeader from "../SectionHeader";
import ThemeToggle from "../ThemeToggle";

const UCLA_TEXT = "University of California, Los Angeles.";
const UCLA_GRADIENT = "linear-gradient(to right, #1e3a8a, #b45309)";

const LANDS_BETWEEN_TEXT = "Lands Between.";
const LANDS_BETWEEN_GRADIENT = "linear-gradient(to right, #092322, #996A48)";

const ABOUT_TEXT_CLASS_NAME =
  "text-gray-600 dark:text-slate-400 lg:text-lg leading-snug";
const ABOUT_LINK_TONE_CLASS_NAME = "text-slate-800 dark:text-slate-100";
const ABOUT_LINK_CLASS_NAME =
  `font-medium ${ABOUT_LINK_TONE_CLASS_NAME} transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm dark:hover:text-white`;
const HOVER_DELAY_START_MS = 50;
const HOVER_DELAY_STEP_MS = 25;
const HOVER_LINK_CLASS_NAME =
  `group inline-flex flex-wrap items-baseline ${ABOUT_LINK_CLASS_NAME}`;
const HOVER_CHARACTER_CLASS_NAME =
  `inline-block whitespace-pre ${ABOUT_LINK_TONE_CLASS_NAME} transition duration-75 group-hover:-translate-y-px group-hover:[color:var(--hover-letter-color)]`;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

function normalizeHex(hex: string) {
  const value = hex.replace("#", "");

  if (value.length === 3) {
    return value
      .split("")
      .map((character) => `${character}${character}`)
      .join("");
  }

  return value.slice(0, 6);
}

function hexToRgb(hex: string): Rgb {
  const value = normalizeHex(hex);

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function toHex(value: number) {
  return Math.round(value).toString(16).padStart(2, "0");
}

function rgbToHex({ r, g, b }: Rgb) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function extractGradientStops(gradient: string) {
  return gradient.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g) ?? [];
}

function buildHoverColors(text: string, gradient: string) {
  const characters = Array.from(text);
  const stops = extractGradientStops(gradient).map(hexToRgb);

  if (characters.length === 0) return [];
  if (stops.length === 0) return Array(characters.length).fill("currentColor");
  if (stops.length === 1 || characters.length === 1) {
    return Array(characters.length).fill(rgbToHex(stops[0]));
  }

  return characters.map((_, index) => {
    const progress = index / (characters.length - 1);
    const scaledProgress = progress * (stops.length - 1);
    const segmentIndex = Math.min(Math.floor(scaledProgress), stops.length - 2);
    const segmentProgress = scaledProgress - segmentIndex;
    const start = stops[segmentIndex];
    const end = stops[segmentIndex + 1];

    return rgbToHex({
      r: start.r + (end.r - start.r) * segmentProgress,
      g: start.g + (end.g - start.g) * segmentProgress,
      b: start.b + (end.b - start.b) * segmentProgress,
    });
  });
}

const UCLA_CHARACTERS = Array.from(UCLA_TEXT);
const UCLA_HOVER_COLORS = buildHoverColors(UCLA_TEXT, UCLA_GRADIENT);

const LANDS_BETWEEN_CHARACTERS = Array.from(LANDS_BETWEEN_TEXT);
const LANDS_BETWEEN_HOVER_COLORS = buildHoverColors(
  LANDS_BETWEEN_TEXT,
  LANDS_BETWEEN_GRADIENT,
);
const TARGET_RIPPLE_END_DELAY_MS =
  HOVER_DELAY_START_MS +
  (LANDS_BETWEEN_CHARACTERS.length - 1) * HOVER_DELAY_STEP_MS;

function getRippleDelayMs(index: number, characterCount: number) {
  if (characterCount <= 1) return HOVER_DELAY_START_MS;

  const delayStep =
    (TARGET_RIPPLE_END_DELAY_MS - HOVER_DELAY_START_MS) / (characterCount - 1);

  return HOVER_DELAY_START_MS + index * delayStep;
}

export default function AboutSection() {
  return (
    <section id="about" className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <SectionHeader className="lg:mt-0">about</SectionHeader>
        <ThemeToggle />
      </div>

      <p className={`${ABOUT_TEXT_CLASS_NAME} mt-4`}>
        I'm a junior studying Computer Science at the{" "}
        <a
          className={HOVER_LINK_CLASS_NAME}
          href="https://ucla.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">{UCLA_TEXT}</span>
          {UCLA_CHARACTERS.map((character, index) => (
            <span
              key={`${character}-${index}`}
              aria-hidden="true"
              className={HOVER_CHARACTER_CLASS_NAME}
              style={
                {
                  "--hover-letter-color": UCLA_HOVER_COLORS[index] ?? "currentColor",
                  transitionDelay: `${getRippleDelayMs(index, UCLA_CHARACTERS.length)}ms`,
                } as CSSProperties
              }
            >
              {character}
            </span>
          ))}
        </a>{" "}
        I currently serve as a Software Engineer Lead for{" "}
        <a
          href="https://hack.uclaacm.com"
          target="_blank"
          rel="noopener noreferrer"
          className={ABOUT_LINK_CLASS_NAME}
        >
          ACM Hack
        </a>{" "}
        and contribute to{" "}
        <a
          href="https://exploretech.la"
          target="_blank"
          rel="noopener noreferrer"
          className={ABOUT_LINK_CLASS_NAME}
        >
          exploretech.la
        </a>
        ,
         {" "}where I help build responsive, accessible interfaces that bring ideas
        to life. I work in Professor Xiang “Anthony” Chen’s{" "}
        <a
          href="https://hci.ucla.edu"
          target="_blank"
          rel="noopener noreferrer"
          className={ABOUT_LINK_CLASS_NAME}
        >
          Human-Computer Interaction Research Lab
        </a>
        ,
        {" "}advised by PhD researcher Youngseung Jeon, focusing on interactive systems for human–AI collaboration.
      </p>

      <p className={`${ABOUT_TEXT_CLASS_NAME} mt-2`}>
        Outside of coding, I enjoy weightlifting, spending time with my dog, and exploring the{" "}
        <a
          className={HOVER_LINK_CLASS_NAME}
          href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">{LANDS_BETWEEN_TEXT}</span>
          {LANDS_BETWEEN_CHARACTERS.map((character, index) => (
            <span
              key={`${character}-${index}`}
              aria-hidden="true"
              className={HOVER_CHARACTER_CLASS_NAME}
              style={
                {
                  "--hover-letter-color":
                    LANDS_BETWEEN_HOVER_COLORS[index] ?? "currentColor",
                  transitionDelay: `${getRippleDelayMs(
                    index,
                    LANDS_BETWEEN_CHARACTERS.length,
                  )}ms`,
                } as CSSProperties
              }
            >
              {character}
            </span>
          ))}
        </a>
      </p>
    </section>
  );
}
