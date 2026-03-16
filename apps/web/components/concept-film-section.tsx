"use client";

import dynamic from "next/dynamic";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { CSSProperties } from "react";

const Player = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

type FilmBeatLayout = "hero" | "split-left" | "split-right" | "window";

type FilmBeat = {
  kicker: string;
  title: string;
  description: string;
  notes: string[];
  metrics: { label: string; value: string; progress?: number }[];
  color: string;
  accent: string;
  imageUrl: string;
  layout: FilmBeatLayout;
};

const filmBeats: FilmBeat[] = [
  {
    kicker: "The Protocol",
    title: "A senior school built for the AI age.",
    description:
      "Learners stay inside the official CBE senior school structure, but the experience becomes more practical, future-facing, and rooted in real Kenyan systems.",
    notes: ["Grades 10-12 launch host", "CBE-aligned pathways", "Systemic context first"],
    metrics: [
      { label: "Deployment", value: "Senior school", progress: 0.9 },
      { label: "Framework", value: "CBE aligned", progress: 1 },
      { label: "Objective", value: "Systems build", progress: 0.75 },
    ],
    color: "#3cf0c5",
    accent: "rgba(60, 240, 197, 0.4)",
    imageUrl: "/concept/campus.png",
    layout: "hero",
  },
  {
    kicker: "The Support Loop",
    title: "Human guides, autonomous tools.",
    description:
      "Every student receives a workstation, a mentor teacher, and a personalized AI assistant that grows with them from grade 10 to graduation.",
    notes: ["Device per student", "Personal mentoring", "Context-aware AI"],
    metrics: [
      { label: "Hardware", value: "1:1 Laptops", progress: 1 },
      { label: "Human", value: "Mentor lead", progress: 0.85 },
      { label: "AI layer", value: "Personalized", progress: 0.95 },
    ],
    color: "#27d3ff",
    accent: "rgba(39, 211, 255, 0.4)",
    imageUrl: "/concept/support.png",
    layout: "split-right",
  },
  {
    kicker: "The Momentum",
    title: "Projects as the primary engine.",
    description:
      "Instead of abstract theory, KFSS uses industry-style briefs, studios, and build cycles to ensure every lesson results in a tangible output.",
    notes: ["Studios > Classrooms", "Build cycle rhythm", "Portfolio evidence"],
    metrics: [
      { label: "Mode", value: "Studio based", progress: 1 },
      { label: "Method", value: "Brief led", progress: 0.8 },
      { label: "Evidence", value: "Portfolio", progress: 1 },
    ],
    color: "#f0b869",
    accent: "rgba(240, 184, 105, 0.4)",
    imageUrl: "/concept/momentum.png",
    layout: "window",
  },
  {
    kicker: "The Synthesis",
    title: "Launch solutions, solve public problems.",
    description:
      "Final-year work moves beyond school exercises. Students either launch startup solutions or contribute to live Kenyan infrastructure layers.",
    notes: ["Startup hatchery", "Public contribution", "Live deployment"],
    metrics: [
      { label: "Capstones", value: "Real world", progress: 1 },
      { label: "Output", value: "System health", progress: 0.65 },
      { label: "Pathway", value: "Scale ready", progress: 0.9 },
    ],
    color: "#3cf0c5",
    accent: "rgba(60, 240, 197, 0.4)",
    imageUrl: "/concept/synthesis.png",
    layout: "split-left",
  },
  {
    kicker: "The Horizon",
    title: "Continuum to advanced system design.",
    description:
      "The KFSS journey doesn't end at graduation. It expands into university-scale research and advanced engineering for national-scale impact.",
    notes: ["University bridge", "Research fellowships", "National scale-up"],
    metrics: [
      { label: "Future path", value: "University+", progress: 1 },
      { label: "R&D scale", value: "National", progress: 0.8 },
      { label: "End state", value: "Legacy build", progress: 0.85 },
    ],
    color: "#27d3ff",
    accent: "rgba(39, 211, 255, 0.4)",
    imageUrl: "/concept/horizon.png",
    layout: "hero",
  },
];

const sectionCards = [
  {
    title: "Mentor-led, AI-assisted",
    text: "Teachers stay at the center of judgment, support, and accountability while personal AI adds speed, continuity, and personalization.",
    icon: "👤",
  },
  {
    title: "Projects as evidence",
    text: "Students are judged more by what they can design, ship, explain, and improve than by abstract certificate accumulation alone.",
    icon: "📂",
  },
  {
    title: "Built to serve Kenya",
    text: "Final-year work is designed to return value to communities by improving real systems and expanding access to useful AI tools.",
    icon: "🇰🇪",
  },
];

const FPS = 30;
const FRAMES_PER_BEAT = 300;
const COMPOSITION_WIDTH = 1200;
const COMPOSITION_HEIGHT = 675;
const TOTAL_FRAMES = filmBeats.length * FRAMES_PER_BEAT;

function ConceptFilmComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beatIndex = Math.min(
    filmBeats.length - 1,
    Math.floor(frame / FRAMES_PER_BEAT)
  );
  const localFrame = frame - beatIndex * FRAMES_PER_BEAT;
  const beat = filmBeats[beatIndex]!;

  const enter = spring({
    fps,
    frame: localFrame,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });

  const exit = interpolate(
    localFrame,
    [FRAMES_PER_BEAT - 30, FRAMES_PER_BEAT - 5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = enter * exit;
  const translateY = interpolate(enter, [0, 1], [40, 0]);
  const scale = interpolate(enter, [0, 1], [0.97, 1]);

  const scanPos = (frame * 4) % 1000;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#030812",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Universal Depth BG */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${beat.accent} 0%, transparent 60%)`,
            opacity: 0.15 * opacity,
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.35,
          }}
        />
      </AbsoluteFill>

      {/* Layout Engine */}
      <AbsoluteFill style={{ opacity }}>
        {beat.layout === "hero" && (
          <AbsoluteFill>
            <div style={{ position: "absolute", inset: 0, opacity: 0.45 }}>
              <img
                src={beat.imageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.6) saturate(1.2)",
                  transform: `scale(${1.1 - (1 - scale) * 0.1})`,
                }}
                alt=""
              />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 80px",
                transform: `translateY(${translateY}px) scale(${scale})`,
              }}
            >
              <ContentBox beat={beat} localFrame={localFrame} fps={fps} />
            </div>
          </AbsoluteFill>
        )}

        {beat.layout === "split-right" && (
          <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: 100,
                transform: `translateX(${translateY * -0.5}px)`,
              }}
            >
              <ContentBox 
                beat={beat} 
                localFrame={localFrame} 
                fps={fps} 
                align="left" 
                maxWidth={500} 
              />
            </div>
            <div
              style={{
                flex: 1,
                padding: 40,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 32,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8)",
                }}
              >
                <img
                  src={beat.imageUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
          </AbsoluteFill>
        )}

        {beat.layout === "split-left" && (
          <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                padding: 40,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 32,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8)",
                }}
              >
                <img
                  src={beat.imageUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingRight: 100,
                transform: `translateX(${translateY * 0.5}px)`,
              }}
            >
              <ContentBox 
                beat={beat} 
                localFrame={localFrame} 
                fps={fps} 
                align="left" 
                maxWidth={500} 
              />
            </div>
          </AbsoluteFill>
        )}

        {beat.layout === "window" && (
          <AbsoluteFill style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center" 
          }}>
            <div style={{ 
              marginBottom: 40,
              transform: `translateY(${translateY * -0.5}px)`
            }}>
              <ContentBox beat={beat} localFrame={localFrame} fps={fps} />
            </div>
            <div style={{
              width: 800,
              aspectRatio: "16/9",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 40px 100px -30px rgba(0,0,0,0.9)",
              transform: `scale(${scale}) translateY(${translateY}px)`,
            }}>
              <div style={{
                height: 32,
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 12,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.2)" }} />
              </div>
              <img
                src={beat.imageUrl}
                style={{ width: "100%", height: "calc(100% - 32px)", objectFit: "cover" }}
                alt=""
              />
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>

      {/* Universals (Scanline/HUD) */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: scanPos,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${beat.color}, transparent)`,
            opacity: 0.15,
            filter: "blur(2px)",
          }}
        />
        
        <div
          style={{
            position: "absolute",
            inset: 40 * scale,
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 24,
          }}
        >
          {/* Corners */}
          {[
            { top: -2, left: -2, borderTop: `2px solid ${beat.color}`, borderLeft: `2px solid ${beat.color}` },
            { top: -2, right: -2, borderTop: `2px solid ${beat.color}`, borderRight: `2px solid ${beat.color}` },
            { bottom: -2, left: -2, borderBottom: `2px solid ${beat.color}`, borderLeft: `2px solid ${beat.color}` },
            { bottom: -2, right: -2, borderBottom: `2px solid ${beat.color}`, borderRight: `2px solid ${beat.color}` },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                opacity: 0.6,
                ...pos,
              }}
            />
          ))}

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// Sub-component for repeated content blocks
interface ContentBoxProps {
  beat: FilmBeat;
  localFrame: number;
  fps: number;
  align?: "left" | "center";
  maxWidth?: number;
}

function ContentBox({ beat, localFrame, fps, align = "center", maxWidth = 800 }: ContentBoxProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        maxWidth,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: 99,
          border: `1px solid ${beat.color}44`,
          backgroundColor: `${beat.color}11`,
          color: beat.color,
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        {beat.kicker}
      </div>

      <h1
        style={{
          fontSize: align === "center" ? 64 : 48,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
          textWrap: "balance",
        }}
      >
        {beat.title}
      </h1>

      <p
        style={{
          fontSize: align === "center" ? 22 : 18,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.6)",
          margin: "24px 0 48px",
          textWrap: "balance",
        }}
      >
        {beat.description}
      </p>

      {/* Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: align === "center" ? "repeat(3, 1fr)" : "1fr",
          gap: 16,
          width: "100%",
        }}
      >
        {beat.metrics.map((metric, i) => {
          const progressEnter = spring({
            fps,
            frame: localFrame - 20 - i * 5,
            config: { damping: 20 },
          });
          return (
            <div
              key={metric.label}
              style={{
                padding: align === "center" ? 24 : "12px 20px",
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: align === "center" ? "column" : "row",
                alignItems: align === "center" ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {metric.label}
                </div>
                <div style={{ fontSize: align === "center" ? 22 : 18, fontWeight: 700, color: "white" }}>
                  {metric.value}
                </div>
              </div>
              <div
                style={{
                  height: 4,
                  width: align === "center" ? "100%" : 100,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(metric.progress || 0) * progressEnter * 100}%`,
                    backgroundColor: beat.color,
                    boxShadow: `0 0 10px ${beat.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConceptFilmSection() {
  return (
    <section className="landing-section landing-section-compact relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-radial-gradient from-[var(--accent)] to-transparent blur-[120px]" />
      </div>

      <div className="landing-container landing-stack relative z-10">
        <div className="landing-copy landing-max mb-12">
          <p className="landing-eyebrow animate-in fade-in slide-in-from-bottom-4 duration-700">
            KFSS Operative Flow
          </p>
          <h2 className="landing-title animate-in fade-in slide-in-from-bottom-6 duration-1000">
            A unified system for <span className="text-gradient">modern learning.</span>
          </h2>
          <p className="landing-text landing-text-wide animate-in fade-in slide-in-from-bottom-8 duration-1000">
            We've modularized the senior school journey into a high-octane flow of 
            structured briefs, AI-supported building, and community deployment.
          </p>
        </div>

        <div className="concept-film-shell landing-max group transition-all duration-700 hover:shadow-[0_0_80px_rgba(39,211,255,0.15)]">
          <div className="concept-film-player-wrap relative">
            <Player
              component={ConceptFilmComposition}
              durationInFrames={TOTAL_FRAMES}
              compositionWidth={COMPOSITION_WIDTH}
              compositionHeight={COMPOSITION_HEIGHT}
              fps={FPS}
              controls={false}
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            {/* Visual HUD Overlay for the web player specifically */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10 rounded-[1.5rem]" />
          </div>
        </div>

        <div className="landing-card-grid landing-card-grid-3 landing-max mt-16">
          {sectionCards.map((card, idx) => (
            <div 
              key={card.title} 
              className="concept-film-summary-card group transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.04]"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="group-hover:text-[var(--accent)] transition-colors duration-300">
                {card.title}
              </h3>
              <p>{card.text}</p>
              
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #3cf0c5 0%, #27d3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </section>
  );
}
