import SectionHeader from "../SectionHeader";
import ThemeToggle from "../ThemeToggle";
import RandomImageHover from "../RandomImageHover";
import GradientLink from "../GradientLink";

const UCLA_IMAGES = [
  "/static/ucla/overhead-ucla.jpg",
  "/static/ucla/bruin-bear.jpg",
  "/static/ucla/powell.jpg",
  "/static/ucla/e6.jpg",
];

const ELDEN_RING_IMAGES = [
  "/static/elden/sote.jpg",
  "/static/elden/miquella.jpg",
  "/static/elden/erdtree.jpg",
  "/static/elden/mountaintop.jpg",
];

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
            University of California, Los Angeles
          </GradientLink>
        </RandomImageHover>
        . I currently serve as an officer for{" "}
        <GradientLink
          href="https://hack.uclaacm.com"
          gradient="linear-gradient(to right, hsla(196,67%,45%,1), hsla(280,100%,69%,1))"
        >
          ACM Hack
        </GradientLink>{" "}
        and contribute to{" "}
        <GradientLink
          href="https://exploretech.la"
          gradient="linear-gradient(to right, #eab308, #1e3a8a)"
        >
          exploretech.la
        </GradientLink>
        , where I help build responsive, accessible interfaces that bring ideas
        to life. In winter, I'll be joining Professor Xiang "Anthony" Chen's{" "}
        <GradientLink
          href="https://hci.ucla.edu"
          gradient="linear-gradient(to right, hsla(36,52%,60%,1), hsla(210,64%,61%,1))"
        >
          Human-Computer Interaction Research Lab
        </GradientLink>
        .
      </p>

      <p className="mt-2 text-gray-600 dark:text-slate-400 lg:text-lg leading-snug">
        Outside of coding, I enjoy weightlifting, spending time with my gf, and
        exploring the{" "}
        <RandomImageHover images={ELDEN_RING_IMAGES}>
          <GradientLink
            href="https://en.bandainamcoent.eu/elden-ring/elden-ring"
            gradient="linear-gradient(to right, #092322, #996A48)"
          >
            Lands Between
          </GradientLink>
        </RandomImageHover>
        .
      </p>
    </section>
  );
}
