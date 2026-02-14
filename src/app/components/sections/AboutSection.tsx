import SectionHeader from "../SectionHeader";
import ThemeToggle from "../ThemeToggle";
import RandomImageHover from "../RandomImageHover";
import GradientLink from "../GradientLink";

const UCLA_IMAGES = [
  "/static/ucla/overhead-ucla.webp",
  "/static/ucla/bruin-bear.webp",
  "/static/ucla/powell.webp",
  "/static/ucla/e6.webp",
];

const ELDEN_RING_IMAGES = [
  "/static/elden/sote.webp",
  "/static/elden/miquella.webp",
  "/static/elden/erdtree.webp",
  "/static/elden/mountaintop.webp",
];

const KING = "/static/king.webp";

export default function AboutSection() {
  return (
    <section id="about" className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <SectionHeader className="lg:mt-0">about</SectionHeader>
        <ThemeToggle />
      </div>

      <p className="text-gray-600 dark:text-slate-400 lg:text-lg leading-snug mt-4">
        I'm a junior studying Computer Science at the{" "}
        <RandomImageHover images={UCLA_IMAGES}>
          <GradientLink
            href="https://ucla.edu/"
            gradient="linear-gradient(to right, #1e3a8a, #b45309)"
          >
            University of California, Los Angeles.
          </GradientLink>
        </RandomImageHover> 
        {" "}I currently serve as an officer for{" "}
        <a
          href="https://hack.uclaacm.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm hover:text-gray-700"
        >
          ACM Hack
        </a>{" "}
        and contribute to{" "}
        <a
          href="https://exploretech.la"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm hover:text-gray-700"
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
          className="font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:rounded-sm hover:text-gray-700"
        >
          Human-Computer Interaction Research Lab
        </a>
        ,
        {" "}advised by PhD researcher Youngseung Jeon, focusing on interactive systems for human–AI collaboration.
      </p>

      <p className="mt-2 text-gray-600 dark:text-slate-400 lg:text-lg leading-snug">
        Outside of coding, I enjoy weightlifting, spending time with my {" "}
        <RandomImageHover images={[KING]}>
          <span className="font-medium">dog</span>
        </RandomImageHover>
        , and exploring the{" "}
        <RandomImageHover images={ELDEN_RING_IMAGES}>
          <GradientLink
            href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
            gradient="linear-gradient(to right, #092322, #996A48)"
          >
            Lands Between.
          </GradientLink>
        </RandomImageHover>
      </p>
    </section>
  );
}
