"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

export function SiteEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !pointer.matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    let frame = 0, x = innerWidth / 2, y = innerHeight / 2, targetX = x, targetY = y;
    const render = () => { x += (targetX - x) * .28; y += (targetY - y) * .28; cursor.style.transform = `translate3d(${x}px,${y}px,0)`; frame = requestAnimationFrame(render); };
    const move = (event: PointerEvent) => { targetX = event.clientX; targetY = event.clientY; cursor.classList.add("is-visible"); cursor.classList.toggle("is-active", Boolean((event.target as HTMLElement).closest("a,button,input,textarea,[role='button']"))); };
    const down = () => cursor.classList.add("is-pressed");
    const up = () => cursor.classList.remove("is-pressed");
    const leave = () => cursor.classList.remove("is-visible");
    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); document.documentElement.addEventListener("mouseleave", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); document.documentElement.removeEventListener("mouseleave", leave); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1.2 });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return <div ref={cursorRef} className="cursor" aria-hidden="true"><svg viewBox="0 0 32 42" fill="none"><path d="M4 3.5 4.1 34.9l8.1-8.3 6.2 11.8 7.1-3.8-6.3-11.8 11.3-.2L4 3.5Z" fill="#fff" stroke="#090909" strokeWidth="2.5" strokeLinejoin="round"/><path d="m12.2 26.6 6.2 11.8 7.1-3.8-6.3-11.8" fill="#D9D9D9" fillOpacity=".38"/></svg><span /></div>;
}
