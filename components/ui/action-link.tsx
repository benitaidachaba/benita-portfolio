"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.a
        href={href}
        className={`button ${secondary ? "button-secondary" : "button-primary"}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        <ArrowUpRight size={18} aria-hidden="true" />
      </motion.a>
    </MotionConfig>
  );
}
