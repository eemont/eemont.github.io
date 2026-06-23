import { useState, useRef, useEffect, useCallback } from "react";
import FadeIn from "../components/FadeIn";
import { logos } from "../data/logos";

const PX_PER_SEC = 50;
const FRICTION = 0.96; // per frame at 60fps — higher = more glide

export default function Logos() {
  const [selected, setSelected] = useState(null);
  const stripRef = useRef(null);
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

  const startAnim = useCallback(() => {
    if (rafRef.current) return;
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
    const measure = () => {
      if (stripRef.current) halfRef.current = stripRef.current.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    startAnim();
    return () => { stopAnim(); clearTimeout(resumeTimerRef.current); };
  }, [startAnim, stopAnim]);

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
        <h2 className="text-2xl font-bold tracking-tight">Logo Design</h2>
        <p className="mt-2 text-zinc-300">
          A selection of logos I've designed for clients.
        </p>
      </FadeIn>

      <div
        className="mt-10 overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={stripRef} className="flex w-max gap-6" style={{ willChange: "transform" }}>
          {doubled.map((logo, i) => (
            <button
              key={i}
              onClick={() => { if (!hasDraggedRef.current) setSelected(logo); }}
              className="group relative flex h-36 w-56 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-125 hover:border-white/30 hover:bg-white/10 hover:z-10 cursor-pointer hover:shadow-xl hover:shadow-black/50"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="h-full w-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-20"
                loading="lazy"
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
            <p className="text-lg font-semibold text-white">{selected.name}</p>
          </div>
        </div>
      )}
    </section>
  );
}
