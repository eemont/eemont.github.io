import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { logos } from "../data/logos";

const PX_PER_SEC = 50;
const FRICTION = 0.96; // per frame at 60fps — higher = more glide

export default function Logos() {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const visibleRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const recentMovesRef = useRef([]);
  const velocityRef = useRef(0);

  const doubled = [...logos, ...logos];

  const wrap = (offset) => {
    const half = halfRef.current;
    if (half <= 0) return offset;
    while (offset > 0) offset -= half;
    while (offset < -half) offset += half;
    return offset;
  };

  const applyTransform = (offset) => {
    if (stripRef.current) stripRef.current.style.transform = `translate3d(${offset}px,0,0)`;
  };

  const tick = useCallback((ts) => {
    if (lastTimeRef.current !== null) {
      const elapsed = Math.min(ts - lastTimeRef.current, 33);
      const half = halfRef.current;
      if (half > 0) {
        offsetRef.current -= (elapsed / 1000) * PX_PER_SEC;
        if (Math.abs(offsetRef.current) >= half) offsetRef.current += half;
        applyTransform(offsetRef.current);
      }
    }
    lastTimeRef.current = ts;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Autoplay only while on screen, no modal open, and motion is allowed
  const startAnim = useCallback(() => {
    if (rafRef.current || !visibleRef.current || pausedRef.current || isDraggingRef.current) return;
    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopAnim = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    lastTimeRef.current = null;
  }, []);

  // Momentum glide after drag release
  const runMomentum = useCallback(() => {
    let lastTs = null;
    const step = (ts) => {
      if (lastTs !== null) {
        const elapsed = ts - lastTs;
        velocityRef.current *= Math.pow(FRICTION, elapsed / 16.67);
        offsetRef.current = wrap(offsetRef.current + (velocityRef.current * elapsed) / 1000);
        applyTransform(offsetRef.current);
      }
      lastTs = ts;
      if (Math.abs(velocityRef.current) > 8) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        resumeTimerRef.current = setTimeout(startAnim, 1000);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [startAnim]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Loop length = distance from the first logo to its duplicate (includes the trailing gap)
    const measure = () => {
      const strip = stripRef.current;
      const first = strip?.children[0];
      const copy = strip?.children[logos.length];
      if (first && copy) halfRef.current = copy.offsetLeft - first.offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motion.matches;
    pausedRef.current = motion.matches;

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) startAnim();
      else { stopAnim(); clearTimeout(resumeTimerRef.current); }
    });
    if (containerRef.current) io.observe(containerRef.current);

    return () => { io.disconnect(); stopAnim(); clearTimeout(resumeTimerRef.current); };
  }, [startAnim, stopAnim]);

  useEffect(() => {
    pausedRef.current = reducedMotionRef.current || selected !== null;
    if (pausedRef.current) { stopAnim(); clearTimeout(resumeTimerRef.current); }
    else startAnim();
  }, [selected, startAnim, stopAnim]);

  const onPointerDown = (e) => {
    hasDraggedRef.current = false;
    isDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    recentMovesRef.current = [];
    velocityRef.current = 0;
  };

  const onPointerMove = (e) => {
    if (e.buttons === 0) return;
    const now = performance.now();

    // Track recent positions for velocity calculation
    recentMovesRef.current.push({ x: e.clientX, t: now });
    recentMovesRef.current = recentMovesRef.current.filter((m) => now - m.t < 80);

    const delta = e.clientX - dragStartXRef.current;
    if (!isDraggingRef.current) {
      if (Math.abs(delta) <= 5) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      e.currentTarget.setPointerCapture(e.pointerId);
      stopAnim();
      clearTimeout(resumeTimerRef.current);
    }

    offsetRef.current = wrap(dragStartOffsetRef.current + (e.clientX - dragStartXRef.current));
    applyTransform(offsetRef.current);
  };

  const onPointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Calculate release velocity from recent samples
    const moves = recentMovesRef.current;
    if (moves.length >= 2) {
      const first = moves[0];
      const last = moves[moves.length - 1];
      const dt = last.t - first.t;
      velocityRef.current = dt > 0 ? ((last.x - first.x) / dt) * 1000 : 0;
    } else {
      velocityRef.current = 0;
    }

    if (Math.abs(velocityRef.current) > 20) {
      runMomentum();
    } else {
      resumeTimerRef.current = setTimeout(startAnim, 50);
    }
  };

  return (
    <section id="logos" className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <h2 className="section-title">Logo Designs</h2>
        <p className="mt-4 text-zinc-300">
          A selection of logos I've designed for clients.
        </p>
      </FadeIn>

      <div
        ref={containerRef}
        className="relative mt-10 overflow-hidden py-8 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Edge fades as overlays — cheaper than mask-image over a moving layer */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12%] bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12%] bg-gradient-to-l from-ink to-transparent" />
        <div ref={stripRef} className="flex w-max gap-6" style={{ willChange: "transform" }}>
          {doubled.map((logo, i) => (
            <button
              key={i}
              onClick={() => { if (!hasDraggedRef.current) setSelected(logo); }}
              className="group relative flex h-36 w-56 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:scale-125 hover:border-brand-500/60 hover:bg-white/10 hover:z-10 cursor-pointer hover:shadow-xl hover:shadow-black/50"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="h-full w-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-20"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {logo.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="animate-modal-in relative flex max-w-lg w-full flex-col items-center gap-6 rounded-2xl border border-white/10 bg-zinc-900 p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-zinc-400 transition-colors hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selected.image}
              alt={selected.name}
              className="max-h-64 w-full object-contain"
            />
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-lg font-semibold text-white">{selected.name}</p>
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-brand-400 transition-colors duration-200 hover:text-brand-300 hover:underline"
                >
                  {selected.urlLabel ?? new URL(selected.url).hostname.replace(/^www\./, "")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
