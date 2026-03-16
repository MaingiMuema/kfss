
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type Chapter = {
  id: string;
  label: string;
  kicker: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
};

const chapters: Chapter[] = [
  {
    id: "factory",
    label: "Factory",
    kicker: "Chapter 01 - The Education Factory",
    accent: "148 163 184",
    accentStrong: "245 158 11",
    accentSoft: "94 234 212",
  },
  {
    id: "disruption",
    label: "Disruption",
    kicker: "Chapter 02 - AI Disruption",
    accent: "59 214 255",
    accentStrong: "14 116 144",
    accentSoft: "124 58 237",
  },
  {
    id: "collapse",
    label: "Collapse",
    kicker: "Chapter 03 - System Collapse",
    accent: "71 85 105",
    accentStrong: "15 23 42",
    accentSoft: "99 102 241",
  },
  {
    id: "future",
    label: "Future",
    kicker: "Chapter 04 - The Future of Learning",
    accent: "96 165 250",
    accentStrong: "124 58 237",
    accentSoft: "246 196 83",
  },
  {
    id: "mentors",
    label: "Mentors",
    kicker: "Chapter 05 - AI Mentors",
    accent: "45 212 191",
    accentStrong: "14 116 144",
    accentSoft: "94 234 212",
  },
  {
    id: "skill-tree",
    label: "Skills",
    kicker: "Chapter 06 - Skill Tree",
    accent: "129 140 248",
    accentStrong: "79 70 229",
    accentSoft: "59 214 255",
  },
  {
    id: "projects",
    label: "Projects",
    kicker: "Chapter 07 - Build Real Projects",
    accent: "34 197 94",
    accentStrong: "16 185 129",
    accentSoft: "59 214 255",
  },
  {
    id: "proof",
    label: "Proof",
    kicker: "Chapter 08 - Proof of Skill",
    accent: "56 189 248",
    accentStrong: "14 116 144",
    accentSoft: "124 58 237",
  },
  {
    id: "network",
    label: "Network",
    kicker: "Chapter 09 - Global Learning Network",
    accent: "248 250 252",
    accentStrong: "59 214 255",
    accentSoft: "59 130 246",
  },
  {
    id: "cta",
    label: "Join",
    kicker: "Chapter 10 - Call to Action",
    accent: "250 204 21",
    accentStrong: "59 214 255",
    accentSoft: "251 191 36",
  },
];

const skillNodes = [
  {
    title: "AI & Automation",
    detail:
      "Design multi-agent systems, automate workflows, and orchestrate intelligent operations.",
    projects: ["Build a tool-calling agent", "Automate a supply chain", "Ship a co-pilot"],
  },
  {
    title: "Entrepreneurship",
    detail:
      "Turn real problems into bold ventures with rapid prototyping, distribution, and growth loops.",
    projects: ["Launch a micro-SaaS", "Validate a market", "Prototype in 14 days"],
  },
  {
    title: "Systems Thinking",
    detail:
      "Model complex systems, run simulations, and make decisions with second-order clarity.",
    projects: ["Urban resilience model", "Policy impact simulator", "Complexity mapping"],
  },
  {
    title: "Creative Technology",
    detail:
      "Blend code, story, and design to build immersive experiences people remember.",
    projects: ["Immersive education demo", "3D storytelling site", "Generative art show"],
  },
  {
    title: "Climate Innovation",
    detail:
      "Invent climate solutions through data, hardware, policy, and community-led systems.",
    projects: ["Heat-risk dashboard", "Carbon-aware supply chain", "Regenerative pilot"],
  },
  {
    title: "Finance & Markets",
    detail:
      "Navigate modern markets, token economics, and capital strategy for frontier builders.",
    projects: ["Founder runway model", "Token design lab", "Adaptive pricing engine"],
  },
];

const projectWorlds = [
  {
    title: "Startup Studio",
    tag: "Build an AI app",
    description: "Ship a live prototype with human-in-the-loop agents.",
  },
  {
    title: "Research Lab",
    tag: "Design a climate solution",
    description: "Prototype, test, and deploy a measurable impact system.",
  },
  {
    title: "Creative Design Space",
    tag: "Create AI-generated media",
    description: "Blend narrative, design, and generative pipelines.",
  },
  {
    title: "Systems Sandbox",
    tag: "Simulate complex systems",
    description: "Model policy, infrastructure, and emergent outcomes.",
  },
];
const networkNodes = [
  {
    name: "Nairobi",
    skills: "AI systems + climate ops",
    projects: "Agri-agent platform",
    collab: "12 builders",
    x: 18,
    y: 62,
  },
  {
    name: "Berlin",
    skills: "Creative technology",
    projects: "Immersive archive",
    collab: "9 builders",
    x: 46,
    y: 30,
  },
  {
    name: "Sao Paulo",
    skills: "Entrepreneurship",
    projects: "Fintech rapid lab",
    collab: "15 builders",
    x: 35,
    y: 70,
  },
  {
    name: "Seoul",
    skills: "Automation + hardware",
    projects: "Factory AI retrofit",
    collab: "11 builders",
    x: 72,
    y: 38,
  },
  {
    name: "Toronto",
    skills: "Systems thinking",
    projects: "Policy simulation",
    collab: "7 builders",
    x: 30,
    y: 32,
  },
  {
    name: "Bangalore",
    skills: "AI operations",
    projects: "Agentic service mesh",
    collab: "10 builders",
    x: 62,
    y: 60,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: "easeOut" },
};

const skillMap = [
  { title: "AI & Automation", x: 50, y: 16 },
  { title: "Systems Thinking", x: 22, y: 40 },
  { title: "Creative Technology", x: 78, y: 38 },
  { title: "Climate Innovation", x: 30, y: 72 },
  { title: "Finance & Markets", x: 70, y: 72 },
  { title: "Entrepreneurship", x: 50, y: 50 },
];

const questions = [
  "What skills matter now?",
  "What replaces degrees?",
  "How do we prove ability?",
  "Who do we build with?",
];

const futurePrinciples = [
  "AI mentors guide every learner in real time.",
  "Projects replace standardized exams.",
  "Skills evolve continuously, not annually.",
  "Collaboration is verified and visible.",
];

const mentorCapabilities = [
  "Personalized learning pathways",
  "Instant feedback and iteration loops",
  "Adaptive curriculum tuning",
  "Project guidance and team matching",
];
export default function Home() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeSection, setActiveSection] = useState(chapters[0].id);
  const [activeSkill, setActiveSkill] = useState(skillNodes[0]);
  const [activeNode, setActiveNode] = useState(networkNodes[0]);
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiActive, setAiActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((node) => {
        gsap.to(node, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--cursor-x", `${x}%`);
      document.documentElement.style.setProperty("--cursor-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!question) {
      setAiActive(false);
      setAiAnswer("");
      return;
    }

    const timer = window.setTimeout(() => {
      setAiActive(true);
      setAiAnswer(
        "Proposed solution: deploy an agent that monitors, diagnoses, and optimizes the system in real time."
      );
    }, 700);

    return () => window.clearTimeout(timer);
  }, [question]);

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeTheme = useMemo(
    () => chapters.find((chapter) => chapter.id === activeSection) ?? chapters[0],
    [activeSection]
  );

  const shellStyle = {
    "--accent": activeTheme.accent,
    "--accent-strong": activeTheme.accentStrong,
    "--accent-soft": activeTheme.accentSoft,
  } as CSSProperties;

  const handleStart = () => {
    document.getElementById("disruption")?.scrollIntoView({ behavior: "smooth" });
  };

  const aiStatus = useMemo(
    () =>
      question.length > 6
        ? "AI hologram is already solving it..."
        : "Type a problem and watch what happens.",
    [question]
  );

  return (
    <div
      className="story-shell relative min-h-screen overflow-hidden text-white"
      style={shellStyle}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="story-aurora absolute inset-0" />
        <div className="story-grid absolute inset-0 opacity-70" />
        <div className="story-vignette absolute inset-0" />
        <div className="story-orb absolute left-[8%] top-[18%] opacity-60" data-parallax />
        <div
          className="story-orb absolute right-[12%] top-[58%] h-[320px] w-[320px] opacity-40"
          data-parallax
        />
        <div className="story-beam absolute left-[12%] top-0 h-full" />
        <div className="story-beam absolute right-[18%] top-0 h-full opacity-40" />
      </div>
      <div className="noise-layer pointer-events-none fixed inset-0 z-[5] opacity-70" />

      <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/5 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
            <a href="#factory" className="flex items-center gap-1">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-[0_10px_30px_-16px_rgba(255,255,255,0.35)] ring-1 ring-white/15">
                <Image
                  src="/kfss-logo.png"
                  alt="K.F.S.S."
                  width={60}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </span>
            </a>
          <nav className="hidden items-center gap-6 text-xs text-white/60 md:flex">
            <a href="#factory">Manifesto</a>
            <a href="#future">Future</a>
            <a href="#skill-tree">Skill Tree</a>
            <a href="#network">Network</a>
          </nav>
          <button className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-white/60 hover:text-white">
            Join
          </button>
        </div>
        <motion.div
          className="h-[2px] w-full origin-left bg-gradient-to-r from-white/5 via-white/50 to-white/5"
          style={{ scaleX: progressScale }}
        />
      </header>

      <aside className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {chapters.map((chapter, index) => (
          <a
            key={`${chapter.id}-${index}`}
            href={`#${chapter.id}`}
            className={`flex items-center gap-3 text-xs uppercase tracking-[0.35em] transition ${
              activeSection === chapter.id ? "text-white" : "text-white/40"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full border transition ${
                activeSection === chapter.id
                  ? "border-white/80 bg-white/80"
                  : "border-white/40 bg-transparent"
              }`}
            />
            {chapter.label}
          </a>
        ))}
      </aside>

      <main ref={scrollContainerRef} className="relative z-10">
        <section
          id="factory"
          className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-36"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <motion.div {...fadeUp} className="space-y-8 lg:pr-6">
                <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span>Chapter 01</span>
                  <span className="text-white/40">The Education Factory</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/40">
                  Education was designed for the industrial age.
                </p>
                <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                  The education factory is breaking under the speed of AI.
                </h1>
                <p className="max-w-[520px] text-base text-white/70 sm:text-lg">
                  Traditional education optimized for memorization. The AI era demands builders
                  who can adapt, collaborate, and ship real solutions.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleStart}
                    className="h-11 rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/80"
                  >
                    Start the Journey
                  </button>
                  <button className="h-11 rounded-full border border-white/30 px-6 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 hover:text-white">
                    Watch the Shift
                  </button>
                </div>
                <div className="grid gap-3 text-[11px] uppercase tracking-[0.3em] text-white/50 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-center">
                    Three worlds
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-center">
                    Ten chapters
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-center">
                    One new system
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp} className="glass-panel rounded-3xl p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      Factory Floor
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-white/70">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span>Memorization loops</span>
                        <span className="text-white/40">Standardized</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span>Fixed curricula</span>
                        <span className="text-white/40">Static degrees</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Industrial-era testing</span>
                        <span className="text-white/40">Slow iteration</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                      Journey Map
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-white/70">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-white/40" />
                        Past: Factory education
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-white/40" />
                        Present: AI disruption
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-white/40" />
                        Future: AI-native learning
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.p
            {...fadeUp}
            data-parallax
            className="pointer-events-none absolute bottom-[14%] right-[8%] hidden max-w-xs text-[10px] uppercase tracking-[0.45em] text-white/40 md:block"
          >
            But the world has changed.
          </motion.p>
        </section>

        <section
          id="disruption"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[1].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                AI solves knowledge problems before we finish thinking.
              </h2>
              <p className="max-w-lg text-base text-white/70">
                Screens flicker. Agents answer instantly. Knowledge work is being automated in
                real time.
              </p>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Interactive moment
                </p>
                <div className="glass-panel rounded-2xl p-4">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Ask a question
                  </label>
                  <input
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="How do we optimize a city's energy grid?"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/60"
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                    <span>{aiStatus}</span>
                    <span className="text-white">{aiActive ? "Solved" : "Idle"}</span>
                  </div>
                  {aiActive && (
                    <motion.div
                      {...fadeUp}
                      className="mt-4 rounded-xl border border-white/30 bg-white/10 p-3 text-xs text-white"
                    >
                      {aiAnswer}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Live AI output</p>
              <div className="mt-6 space-y-4 text-sm text-white/70">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p>- Pattern recognition complete in 0.23s</p>
                  <p>- Strategy mapped against 8,312 variables</p>
                  <p>- Solution prototypes generated instantly</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p>AI can already perform most knowledge work.</p>
                  <p className="text-white">So what should humans learn?</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section
          id="collapse"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[2].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                The factory collapses into a digital void.
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                The old scaffolding falls away. New questions float in the dark, demanding new
                answers.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {questions.map((questionItem, index) => (
                <motion.div
                  {...fadeUp}
                  key={`${questionItem}-${index}`}
                  className="glass-panel rounded-2xl p-6 text-sm text-white/70"
                >
                  {questionItem}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="future"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[3].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                AI-native learning worlds replace factories.
              </h2>
              <p className="text-white/70">
                Learners build real systems, solve real problems, and collaborate with global
                builders while AI handles the rote work.
              </p>
              <div className="grid gap-3">
                {futurePrinciples.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="glass-panel rounded-2xl border border-white/10 p-4 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-6">
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  AI-native classroom
                </p>
                <div className="mt-6 space-y-4 text-sm text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    Real-time simulations instead of static lectures.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    Global teams building together across time zones.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                    Skills verified in public, not on paper.
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-3xl p-6 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  Learning signal
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Project velocity</span>
                    <span className="text-white/50">+46%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span>Collaboration score</span>
                    <span className="text-white/50">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skill verification</span>
                    <span className="text-white/50">Live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="mentors"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[4].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Every learner gets a personal AI mentor.
              </h2>
              <p className="max-w-xl text-white/70">
                An AI mentor shadows every project, adapting in real time, offering feedback,
                and keeping momentum alive.
              </p>
              <div className="grid gap-3">
                {mentorCapabilities.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="glass-panel rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="glass-panel relative overflow-hidden rounded-3xl p-6">
              <div className="cursor-orb absolute" />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Mentor feed</p>
                <div className="mt-6 space-y-4 text-sm text-white/70">
                  <div className="rounded-2xl border border-white/30 bg-white/10 p-4 text-white">
                    I mapped three project paths based on your last sprint. Choose your focus.
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    Your team just shipped the prototype. Want a deploy checklist?
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    New collaborator found in Seoul with complementary automation skills.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="skill-tree"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[5].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Skill verification replaces static degrees.
              </h2>
              <p className="text-white/70">
                Build capability clusters that evolve with industry, not syllabi.
              </p>
              <div className="grid gap-3">
                {skillNodes.map((skill, index) => (
                  <button
                    key={`${skill.title}-${index}`}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onFocus={() => setActiveSkill(skill)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      activeSkill.title === skill.title
                        ? "border-white/60 bg-white/10 text-white"
                        : "border-white/10 bg-black/40 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {skill.title}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-6">
              <div className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  {activeSkill.title}
                </p>
                <p className="mt-4 text-base text-white/80">{activeSkill.detail}</p>
                <div className="mt-6 space-y-3 text-sm text-white/70">
                  {activeSkill.projects.map((project, index) => (
                    <div
                      key={`${project}-${index}`}
                      className="rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                    >
                      {project}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel relative h-[320px] overflow-hidden rounded-3xl p-6">
                <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/40" />
                {skillMap.map((node, index) => (
                  <div
                    key={`${node.title}-${index}`}
                    className={`absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.2em] transition ${
                      node.title === activeSkill.title
                        ? "border-white/80 bg-white/20 text-white"
                        : "border-white/20 bg-black/40 text-white/60"
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    {node.title.split(" ")[0]}
                  </div>
                ))}
                <div className="absolute bottom-6 left-6 text-xs text-white/60">
                  Skill nodes expand into real-world projects.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="projects"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[6].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Students build in real-world studios.
              </h2>
              <p className="text-white/70">
                Every cohort launches projects that prove capability, not just completion.
              </p>
            </motion.div>
            <div className="mt-10 flex gap-6 overflow-x-auto pb-6 pr-6 scrollbar-hide">
              {projectWorlds.map((project, index) => (
                <motion.div
                  {...fadeUp}
                  key={`${project.title}-${index}`}
                  className="glass-panel min-w-[260px] rounded-3xl p-6 md:min-w-[300px]"
                >
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {project.tag}
                    </p>
                    <h3 className="font-display text-xl">{project.title}</h3>
                    <p className="text-sm text-white/70">{project.description}</p>
                    <button className="mt-3 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-white/60 hover:text-white">
                      Explore Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="proof"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[7].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Portfolios become galaxies of verified work.
              </h2>
            </motion.div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <motion.div {...fadeUp} className="glass-panel rounded-3xl p-6">
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={`badge-${index}`}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xs text-white shadow-glow"
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeUp} className="space-y-4 text-sm text-white/70">
                <div className="glass-panel rounded-2xl p-4">
                  Every badge is cryptographically verifiable, tied to real projects and teams.
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  Connections show collaboration history, proof of leadership, and impact.
                </div>
                <div className="glass-panel rounded-2xl p-4">
                  Employers hire from live evidence, not static credentials.
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="network"
          className="relative flex min-h-[100svh] items-center pb-24 pt-24"
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[8].kicker}</p>
              <h2 className="font-display text-3xl sm:text-4xl">
                A planet-sized network of builders.
              </h2>
            </motion.div>
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div {...fadeUp} className="glass-panel relative h-[420px] rounded-3xl p-6">
                <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/40" />
                {networkNodes.map((node, index) => (
                  <button
                    key={`${node.name}-${index}`}
                    onMouseEnter={() => setActiveNode(node)}
                    onFocus={() => setActiveNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/40 shadow-glow transition hover:scale-110"
                    aria-label={node.name}
                  />
                ))}
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white/60">
                  Hover a node to reveal builders
                </div>
              </motion.div>
              <motion.div {...fadeUp} className="glass-panel rounded-3xl p-6 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                  {activeNode.name}
                </p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    Skills: {activeNode.skills}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    Projects: {activeNode.projects}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    Collaborations: {activeNode.collab}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="cta" className="relative flex min-h-[100svh] items-center pb-24 pt-24">
          <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <motion.div {...fadeUp} className="space-y-6">
              <p className="story-kicker">{chapters[9].kicker}</p>
              <h2 className="font-display text-4xl sm:text-5xl">
                The future will not reward memorization.
              </h2>
              <p className="text-lg text-white/70">
                It will reward builders. We are building the education system for the AI age.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/80">
                  Join the Movement
                </button>
                <button className="rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 hover:text-white">
                  Become an Early Builder
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
