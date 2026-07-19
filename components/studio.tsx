"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  CirclePlay,
  Instagram,
  Mail,
  Menu,
  Pause,
  Play,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";
import { SiteEffects } from "@/components/site-effects";
import { ContactForm } from "@/components/contact-form";

const projects = [
  {
    name: "The Open Road",
    type: "Commercial / 01",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Built to Last",
    type: "Real estate / 02",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    name: "Human Signal",
    type: "Podcast / 03",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=85",
  },
];
const services = [
  "Video Editing",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Podcast Editing",
  "Commercial Editing",
  "Short Form",
  "Long Form",
];
const steps = [
  "RAW FOOTAGE",
  "SELECTS",
  "THE CUT",
  "MOTION",
  "COLOR",
  "SOUND",
  "EXPORT",
];

function Loader({ done }: { done: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const x = window.setInterval(
      () =>
        setN((v) => {
          if (v >= 100) {
            clearInterval(x);
            setTimeout(done, 350);
            return 100;
          }
          return v + 4;
        }),
      45,
    );
    return () => clearInterval(x);
  }, [done]);
  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
    >
      <div>
        <span className="eyebrow">BROZZ / SYSTEM</span>
        <h2>
          BROZZ
          <br />
          EDITS
        </h2>
        <div className="load-line">
          <i style={{ width: `${n}%` }} />
        </div>
        <p>
          {n < 28
            ? "Initializing sequence"
            : n < 66
              ? "Rendering attention"
              : n < 100
                ? "Exporting final sequence"
                : "Ready"}
          <b>{n}%</b>
        </p>
      </div>
    </motion.div>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <a className="wordmark" href="#top">
        BROZZ<span>®</span>
        <br />
        EDITS
      </a>
      <nav>
        {["Work", "Services", "Process", "Contact"].map((x) => (
          <a key={x} href={`#${x.toLowerCase()}`}>
            {x}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contact">
        Start a project <ArrowUpRight size={15} />
      </a>
      <button
        aria-label="Open menu"
        className="menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="mobile-nav">
          {["Work", "Services", "Process", "Contact"].map((x) => (
            <a
              onClick={() => setOpen(false)}
              key={x}
              href={`#${x.toLowerCase()}`}
            >
              {x}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
function Button({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={light ? "https://calendly.com/brozzedits/intro" : "#contact"}
      target={light ? "_blank" : undefined}
      rel={light ? "noreferrer" : undefined}
      className={`button ${light ? "light" : ""}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
function Grain() {
  return <div className="grain" />;
}
export function Studio() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  const movePlayhead = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--playhead-position", `${position}%`);
  };
  return (
    <main id="top">
      <SiteEffects />
      {!loaded && <Loader done={() => setLoaded(true)} />}
      <Grain />
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            className="eyebrow"
          >
            Independent post-production studio <i />
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.8 }}
          >
            WE DON&apos;T
            <br />
            JUST EDIT
            <br />
            <em>VIDEOS.</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hero-bottom"
          >
            <p>
              We turn raw footage into
              <br />
              the reason people stop scrolling.
            </p>
            <Button>See our work</Button>
          </motion.div>
        </div>
        <div className="orb-wrap" aria-hidden="true">
          <motion.div
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="orb"
          >
            <span>BROZZ</span>
            <span>EDITS</span>
            <span>ATTENTION</span>
            <span>FRAME</span>
          </motion.div>
          <div className="orb-core" />
          <div className="orb-line" />
        </div>
        <div className="scroll-note">
          SCROLL TO PLAY <ArrowDownRight size={15} />
        </div>
      </section>
      <section id="work" className="work section">
        <div className="section-head">
          <p className="eyebrow">Selected work / 2024—25</p>
          <h2>
            Stories with
            <br />
            <em>staying power.</em>
          </h2>
          <p className="smallcopy">
            Every project is a deliberate cut toward a feeling, a thought, an
            action.
          </p>
        </div>
        <div className="projects">
          {projects.map((p, i) => (
            <article className="project" key={p.name}>
              <div className="project-image">
                <Image
                  src={p.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  alt={p.name}
                />
                <div className="project-play">
                  <CirclePlay size={38} />
                </div>
              </div>
              <div className="project-meta">
                <span>{p.type}</span>
                <h3>{p.name}</h3>
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>
        <a className="text-link" href="#contact">
          View all work <ArrowUpRight size={17} />
        </a>
      </section>
      <section id="services" className="services section">
        <div className="services-intro">
          <p className="eyebrow">Capabilities</p>
          <h2>
            Made in the
            <br />
            <em>cutting room.</em>
          </h2>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <a href="#contact" key={s}>
              <span>0{i + 1}</span>
              {s}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
      <section id="process" className="process section">
        <p className="eyebrow">The process / frame by frame</p>
        <div className="process-top">
          <h2>
            Raw chaos.
            <br />
            <em>Clear signal.</em>
          </h2>
          <p>
            We make the invisible work visible: a tested process, an obsessive
            eye, and a story that earns every second.
          </p>
        </div>
        <div className="timeline" onPointerMove={movePlayhead}>
          <div className="timeline-head">
            <span>SEQUENCE_01</span>
            <span>00:00:00:00</span>
            <span>24 FPS</span>
          </div>
          <div className="ruler">
            {Array.from({ length: 24 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="tracks">
            {steps.map((x, i) => (
              <div className="track" key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b
                  style={{
                    width: `${42 + (i % 4) * 13}%`,
                    marginLeft: `${(i % 3) * 7}%`,
                  }}
                >
                  {x}
                </b>
              </div>
            ))}
            <div className="playhead">
              <i />
              <span>00:00:12:08</span>
            </div>
          </div>
        </div>
      </section>
      <section className="about section">
        <p className="eyebrow">A small team with a big edit</p>
        <h2>
          We believe the best
          <br />
          edits are <em>felt,</em>
          <br />
          not noticed.
        </h2>
        <div className="about-bottom">
          <p>
            Brozz Edits is an independent post-production studio built for
            brands and creators who care about the craft. Premiere Pro, After
            Effects, Photoshop and DaVinci Resolve are tools. Taste is the
            difference.
          </p>
          <Button>Meet the studio</Button>
        </div>
      </section>
      <section className="quote">
        <p className="eyebrow">Words from collaborators</p>
        <blockquote>
          “They found the story in footage we&apos;d watched a hundred times.
          The final cut felt inevitable.”
        </blockquote>
        <div>
          <span>ARJUN MEHRA</span>
          <span>Founder, Northline</span>
          <div className="quote-controls">
            <button aria-label="Previous testimonial">
              <ChevronRight />
            </button>
            <button aria-label="Play testimonial">
              <Play size={15} />
            </button>
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="contact-solar" aria-hidden="true">
          <div className="contact-solar-orbit contact-solar-orbit-one" />
          <div className="contact-solar-orbit contact-solar-orbit-two" />
          <div className="contact-solar-core" />
          <div className="contact-solar-satellite" />
        </div>
        <p className="eyebrow">Your next chapter starts here</p>
        <h2>
          LET&apos;S MAKE
          <br />
          SOMETHING
          <br />
          <em>UNSKIPPABLE.</em>
        </h2>
        <Button light>Schedule a meeting</Button>
        <ContactForm />
        <div className="contact-footer">
          <a href="mailto:hello@brozzedits.com">
            <Mail /> hello@brozzedits.com
          </a>
          <a href="https://www.instagram.com/brozz__edits/" target="_blank">
            <Instagram /> @brozz__edits
          </a>
          <span>INDIA / WORLDWIDE</span>
        </div>
      </section>
      <footer>
        <a className="wordmark" href="#top">
          BROZZ
          <br />
          EDITS
        </a>
        <p>© 2025 BROZZ EDITS. ALL RIGHTS RESERVED.</p>
        <a href="#top">
          BACK TO TOP <ArrowUpRight size={13} />
        </a>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Brozz Edits",
            description: "Creative post-production studio",
          }),
        }}
      />
    </main>
  );
}
