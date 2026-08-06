"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

type Reel = { src: string; label: string; index: string; name?: string };

const creativeReels: Reel[] = [
  { src: "/videos/showcase/reel-01.mp4", label: "Creative campaign edit", index: "01" },
  { src: "/videos/showcase/reel-02.mp4", label: "Social storytelling", index: "02" },
  { src: "/videos/showcase/reel-03.mp4", label: "Performance reel", index: "03" },
];

const testimonials: Reel[] = [
  { src: "/videos/testimonials/humza.mp4", label: "Client testimonial", name: "Humza", index: "01" },
  { src: "/videos/testimonials/pam.mp4", label: "Client testimonial", name: "Pam", index: "02" },
  { src: "/videos/testimonials/client-03.mp4", label: "Client testimonial", name: "Client story", index: "03" },
];

function ReelCard({ reel }: { reel: Reel }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const play = () => video.current?.play();
  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (video.current) { video.current.muted = nextMuted; void video.current.play(); }
  };
  return <article className="reel-card" onMouseEnter={play} onFocus={play}>
    <video ref={video} src={reel.src} muted={muted} loop playsInline preload="metadata" aria-label={reel.label} />
    <div className="reel-shade" />
    <div className="reel-top"><span>{reel.index} / 03</span><button aria-label={muted ? "Enable sound" : "Mute video"} onClick={toggleSound}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button></div>
    <div className="reel-bottom"><span>{reel.name ?? reel.label}</span><button aria-label={`Play ${reel.label}`} onClick={play}><Play size={15} fill="currentColor" /></button></div>
  </article>;
}

export function ReelShowcase({ kind }: { kind: "creative" | "testimonials" }) {
  const reels = kind === "creative" ? creativeReels : testimonials;
  return <section id={kind === "creative" ? "work" : "testimonials"} className={`reels ${kind === "testimonials" ? "reel-testimonials" : ""}`}>
    <div className="reels-heading"><p className="eyebrow">{kind === "creative" ? "The edit suite / selected reels" : "Unfiltered feedback / video testimonials"}</p><h2>{kind === "creative" ? <>Built for<br/><em>the replay.</em></> : <>Real words.<br/><em>Real results.</em></>}</h2></div>
    <div className="reel-rail">{reels.map((reel) => <ReelCard key={reel.src} reel={reel} />)}</div>
  </section>;
}
