"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ConceptFilmSection } from "../components/concept-film-section";

type Stage = {
  label: string;
  title: string;
  text: string;
  items: string[];
};

const pillars: Stage[] = [
  {
    label: "Systems",
    title: "Systems thinking comes first.",
    text: "Students learn to map causes, incentives, constraints, and trade-offs before they design solutions.",
    items: ["See the whole system", "Reason in feedback loops", "Build with better judgment"],
  },
  {
    label: "Projects",
    title: "Projects become the classroom.",
    text: "Theory stays important, but it is tied to real briefs so learners understand why it matters.",
    items: ["Live problem briefs", "Cross-disciplinary work", "Visible iteration"],
  },
  {
    label: "Support",
    title: "Mentors lead while AI accelerates.",
    text: "Teachers stay central while AI handles planning, first-pass feedback, and personalized support.",
    items: ["Human judgment first", "Faster support", "Earlier recovery"],
  },
  {
    label: "Proof",
    title: "Portfolios replace abstraction.",
    text: "Learners still meet official requirements, but they graduate with visible proof of what they built and how they grew.",
    items: ["Project proof", "Reflection trail", "Visible collaboration"],
  },
];

const journey: Stage[] = [
  {
    label: "Foundation",
    title: "Build the learner operating base.",
    text: "Strengthen language, digital fluency, self-management, and systems thinking.",
    items: ["Core skill map", "Starter projects", "Growth profile", "AI readiness baseline"],
  },
  {
    label: "Pathway",
    title: "Advance through an official pathway.",
    text: "Students stay inside the senior school pathway structure while KFSS adds project depth and AI fluency.",
    items: ["Pathway evidence", "Applied briefs", "Mentor checkpoints", "Team sprint logs"],
  },
  {
    label: "Studio",
    title: "Move into longer build cycles.",
    text: "Learners solve bigger briefs in teams, test ideas, and practice shipping with feedback.",
    items: ["Working prototypes", "User feedback", "Documentation", "Case studies"],
  },
  {
    label: "Capstone",
    title: "Finish with work that matters outside school.",
    text: "Students either launch ventures or contribute to ecosystem projects with real value.",
    items: ["Capstone project", "Public showcase", "Impact evidence", "Transition pathway"],
  },
];

const pathways: Stage[] = [
  {
    label: "STEM",
    title: "STEM with AI and systems depth.",
    text: "Software, science, health, engineering ideas, agriculture, data, climate, and technical operations.",
    items: ["Energy dashboard", "Farm advisory assistant", "Clinic workflow tool"],
  },
  {
    label: "Social Sciences",
    title: "Social Sciences for public systems and enterprise.",
    text: "Markets, governance, entrepreneurship, policy, community systems, and service design.",
    items: ["County service redesign", "Small business toolkit", "Civic reporting product"],
  },
  {
    label: "Arts and Sports",
    title: "Arts and Sports Science for creative systems.",
    text: "Design, storytelling, media, performance, sport, and digital production as buildable systems.",
    items: ["Kenyan futures story world", "Sports performance tracker", "Venture brand system"],
  },
];

const routes: Stage[] = [
  {
    label: "Venture route",
    title: "Launch an AI-enabled startup or business solution.",
    text: "Students validate a real problem, build a solution, and turn it into a venture-shaped capstone.",
    items: ["Validated problem", "Working prototype", "Business model", "Public demo"],
  },
  {
    label: "Contribution route",
    title: "Join a live ecosystem project that serves society.",
    text: "Students contribute to ongoing public-interest systems across education, healthcare, civic tech, agriculture, and local productivity.",
    items: ["Contribution log", "Shipped work", "Impact evidence", "Open portfolio trail"],
  },
];

const alignmentCards = [
  "Projects make competencies easier to observe and assess.",
  "Official senior school pathways remain intact.",
  "Community-facing work aligns well with service learning.",
  "Rubrics, demos, reflections, and mentor review create stronger evidence.",
];

const competencies = [
  "Communication and collaboration",
  "Critical thinking and problem solving",
  "Creativity and imagination",
  "Citizenship",
  "Digital literacy",
  "Learning to learn",
  "Self-efficacy",
];

const values = [
  "Love",
  "Responsibility",
  "Respect",
  "Unity",
  "Peace",
  "Patriotism",
  "Social justice",
  "Integrity",
];

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="landing-copy">
      <p className="landing-eyebrow">{eyebrow}</p>
      <h2 className="landing-title">{title}</h2>
      <p className="landing-text">{text}</p>
    </div>
  );
}

export default function Home() {
  const [pillarView, setPillarView] = useState(0);
  const [journeyView, setJourneyView] = useState(0);
  const [pathwayView, setPathwayView] = useState(0);
  const [routeView, setRouteView] = useState(0);

  const activePillar = pillars[pillarView]!;
  const activeJourney = journey[journeyView]!;
  const activePathway = pathways[pathwayView]!;
  const activeRoute = routes[routeView]!;
  const logoSrc = "/kfss-logo.png?v=20260316-1855";

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="landing-shell">
      <div className="landing-ambient" aria-hidden="true">
        <div className="landing-grid" />
        <div className="landing-scan" />
        <div className="landing-glow landing-glow-one" />
        <div className="landing-glow landing-glow-two" />
      </div>

      <header className="landing-header">
        <div className="landing-container landing-nav">
          <a href="#top" className="landing-brand">
            <span className="landing-logo-wrap">
              <Image
                key={logoSrc}
                src={logoSrc}
                alt="K.F.S.S."
                width={200}
                height={70}
                className="h-10 w-auto object-contain"
                priority
                unoptimized
              />
            </span>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-slate-400 lg:flex">
            <a href="#model" className="transition hover:text-white">Model</a>
            <a href="#journey" className="transition hover:text-white">Journey</a>
            <a href="#pathways" className="transition hover:text-white">Pathways</a>
            <a href="#final-year" className="transition hover:text-white">Final Year</a>
          </nav>

          <a href="#cta" className="landing-button landing-button-primary hidden sm:inline-flex">Explore the vision</a>
        </div>
      </header>

      <main id="top" className="landing-main">
        <section className="landing-section landing-hero">
          <div className="landing-container landing-stack">
            <div className="landing-copy landing-copy-hero">
              <p className="landing-eyebrow">Kenya&apos;s Futurist Schools</p>
              <h1 className="landing-hero-title">
                <span>A senior school for</span>
                <span className="landing-hero-accent">systems thinkers and builders.</span>
              </h1>
              <p className="landing-text landing-text-wide">
                K.F.S.S. combines free laptops, mentor teachers, personal AI assistants, and CBE-aligned pathway learning so students grow through projects, public problem solving, and portfolio evidence.
              </p>
              <div className="landing-action-row">
                <a href="#model" className="landing-button landing-button-primary">Enter the model</a>
                <a href="#pathways" className="landing-button landing-button-secondary">View pathways</a>
              </div>
            </div>

            <div className="landing-stat-row">
              {[
                { value: "Grades 10-12", label: "Starting point" },
                { value: "1 mentor + 1 AI", label: "Support loop" },
                { value: "Portfolio-led", label: "Primary evidence" },
              ].map((item) => (
                <div key={item.label} className="landing-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ConceptFilmSection />

        <section id="model" className="landing-section">
          <div className="landing-container landing-stack">
            <SectionTitle
              eyebrow="Learning model"
              title="One clear pillar at a time."
              text="Instead of splitting the page into competing columns, each section now centers one main idea and one main interaction."
            />
            <div className="landing-tab-row landing-max">
              {pillars.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPillarView(index)}
                  className={`landing-tab ${pillarView === index ? "landing-tab-active" : ""}`}
                  aria-pressed={pillarView === index}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hud-panel landing-max">
              <div className="landing-copy">
                <h3 className="landing-subtitle">{activePillar.title}</h3>
                <p className="landing-text landing-text-wide">{activePillar.text}</p>
              </div>
              <div className="landing-card-grid landing-card-grid-3">
                {activePillar.items.map((item) => (
                  <div key={item} className="landing-mini-card">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="landing-section">
          <div className="landing-container landing-stack">
            <SectionTitle
              eyebrow="Learner journey"
              title="A centered path from foundation to final-year impact."
              text="Students build a base, move through a pathway, enter studios, and finish with a capstone that matters."
            />
            <div className="landing-tab-row landing-max">
              {journey.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setJourneyView(index)}
                  className={`landing-tab ${journeyView === index ? "landing-tab-active" : ""}`}
                  aria-pressed={journeyView === index}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hud-panel landing-max">
              <div className="landing-copy">
                <h3 className="landing-subtitle">{activeJourney.title}</h3>
                <p className="landing-text landing-text-wide">{activeJourney.text}</p>
              </div>
              <div className="landing-card-grid landing-card-grid-2">
                {activeJourney.items.map((item) => (
                  <div key={item} className="landing-mini-card">{item}</div>
                ))}
              </div>
            </div>
            <div className="landing-card-grid landing-card-grid-3 landing-max">
              {[
                "Morning alignment: the assistant organizes the day and gives the mentor a quick learner snapshot.",
                "Studio feedback: projects are reviewed while they are still being built, not only after submission.",
                "Reflection and recovery: weak spots are flagged early so students get support before they drift.",
              ].map((item) => (
                <div key={item} className="landing-mini-card">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="pathways" className="landing-section">
          <div className="landing-container landing-stack">
            <SectionTitle
              eyebrow="Senior school pathways"
              title="The pathway stays recognizable, but becomes more alive."
              text="Each pathway keeps its official identity while gaining richer project briefs, AI fluency, and stronger outputs."
            />
            <div className="landing-tab-row landing-max">
              {pathways.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPathwayView(index)}
                  className={`landing-tab ${pathwayView === index ? "landing-tab-active" : ""}`}
                  aria-pressed={pathwayView === index}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hud-panel landing-max">
              <div className="landing-copy">
                <h3 className="landing-subtitle">{activePathway.title}</h3>
                <p className="landing-text landing-text-wide">{activePathway.text}</p>
              </div>
              <div className="landing-card-grid landing-card-grid-3">
                {activePathway.items.map((item) => (
                  <div key={item} className="landing-mini-card">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="alignment" className="landing-section">
          <div className="landing-container landing-stack">
            <SectionTitle
              eyebrow="CBE alignment"
              title="Designed to work inside Kenya's current education direction."
              text="Official pathways remain, competencies stay central, values stay visible, and project evidence makes assessment easier to support."
            />
            <div className="landing-card-grid landing-card-grid-2 landing-max">
              {alignmentCards.map((item) => (
                <div key={item} className="landing-mini-card">{item}</div>
              ))}
            </div>
            <div className="hud-panel landing-max">
              <div className="landing-copy">
                <p className="landing-console-label">Core competencies</p>
                <div className="landing-chip-row">
                  {competencies.map((item) => (
                    <span key={item} className="landing-chip">{item}</span>
                  ))}
                </div>
              </div>
              <div className="landing-copy">
                <p className="landing-console-label">Values in practice</p>
                <div className="landing-chip-row">
                  {values.map((item) => (
                    <span key={item} className="landing-chip">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="final-year" className="landing-section">
          <div className="landing-container landing-stack">
            <SectionTitle
              eyebrow="Final-year system"
              title="Students graduate by shipping work that matters."
              text="In the final year, learners either launch ventures or join ecosystem projects that serve real institutions and communities."
            />
            <div className="landing-tab-row landing-max">
              {routes.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setRouteView(index)}
                  className={`landing-tab ${routeView === index ? "landing-tab-active" : ""}`}
                  aria-pressed={routeView === index}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hud-panel landing-max">
              <div className="landing-copy">
                <h3 className="landing-subtitle">{activeRoute.title}</h3>
                <p className="landing-text landing-text-wide">{activeRoute.text}</p>
              </div>
              <div className="landing-card-grid landing-card-grid-2">
                {activeRoute.items.map((item) => (
                  <div key={item} className="landing-mini-card">{item}</div>
                ))}
              </div>
            </div>
            <div className="landing-card-grid landing-card-grid-3 landing-max">
              {[
                "Government partnership can support devices, connectivity, and infrastructure.",
                "Donors can help subsidize AI access, labs, and scholarships.",
                "Shared open infrastructure keeps advanced tooling more affordable.",
              ].map((item) => (
                <div key={item} className="landing-mini-card">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="landing-section pb-20 sm:pb-24">
          <div className="landing-container">
            <div className="landing-copy landing-copy-hero landing-max">
              <p className="landing-eyebrow">Closing vision</p>
              <h2 className="landing-title">Build a school where learners understand systems by improving them.</h2>
              <p className="landing-text landing-text-wide">
                This version keeps the dark HUD atmosphere, but restructures the page into a calmer, more centered story so users take in one idea at a time.
              </p>
              <div className="landing-action-row">
                <a href="#top" className="landing-button landing-button-primary">Back to top</a>
                <a href="#model" className="landing-button landing-button-secondary">Inspect the model</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
