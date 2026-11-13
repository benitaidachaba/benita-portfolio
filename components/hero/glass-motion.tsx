"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function GlassMotion({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const angle = useTransform(scrollY, [0, 1000], [-12, 38], { clamp: true });
  const rotation = useSpring(angle, { stiffness: 180, damping: 32, mass: 0.3 });
  const reduced = useReducedMotion();
  return (
    <div className="hero-artwork" aria-hidden="true">
      <motion.div
        className="glass-rotator"
        style={{ rotate: reduced ? 0 : rotation }}
      >
        {children}
      </motion.div>
    </div>
  );
}
