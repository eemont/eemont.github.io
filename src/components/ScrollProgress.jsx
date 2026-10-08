import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = null;

    // Writes straight to the DOM (no React re-render), at most once per frame
    const update = () => {
      frame = null;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300 shadow-[0_0_8px_rgba(79,142,247,0.6)]"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
