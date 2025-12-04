"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GlassNavProps {
  className?: string;
}

// Custom easing curve - punchy ease-out for responsive feel
// Based on https://emilkowal.ski/ui/7-practical-animation-tips
const snappyEase = [0.23, 1, 0.32, 1] as const;

// Shared transition config for consistent, fast interactions
const buttonTransition = {
  type: "tween" as const,
  duration: 0.15, // Fast - under 300ms rule
  ease: snappyEase,
};

export default function GlassNav({ className = "" }: GlassNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: snappyEase }}
      className={`
        flex items-center
        h-[50px]
        px-[20px]
        rounded-full
        bg-transparent
        border border-white
        gap-[10px]
        ${className}
      `}
      style={{
        width: 1200, // Fixed width: 1340px container - 70px left margin - 70px right margin
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={buttonTransition}
        className="flex items-center shrink-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/logo.svg"
          alt="Aura"
          width={91}
          height={20}
          priority
          className="h-[20px] w-[91px] object-contain"
        />
      </motion.a>

      {/* Spacer - flex-grow to push icons to the right */}
      <div className="flex-1 min-w-[1px] min-h-[24px]" />

      {/* Social Icons Container */}
      <div className="flex items-center justify-center gap-[10px] h-[30px] overflow-visible shrink-0">
        <motion.a
          href="https://x.com/Auramoney"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.08,
            filter: "brightness(1.1)",
          }}
          whileTap={{ 
            scale: 0.97, // Magic number from article
            filter: "blur(0.3px)", // Subtle blur on press
          }}
          transition={buttonTransition}
          className="flex items-center justify-center w-[25px] h-[25px] shrink-0"
          style={{ willChange: "transform, filter" }}
        >
          <Image
            src="/x.svg"
            alt="X"
            width={25}
            height={25}
            className="w-[25px] h-[25px]"
          />
        </motion.a>
        <motion.a
          href="https://t.me/auradotmoney"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            scale: 1.08,
            filter: "brightness(1.1)",
          }}
          whileTap={{ 
            scale: 0.97, // Magic number from article
            filter: "blur(0.3px)", // Subtle blur on press
          }}
          transition={buttonTransition}
          className="flex items-center justify-center w-[25px] h-[25px] shrink-0"
          style={{ willChange: "transform, filter" }}
        >
          <Image
            src="/telegram.svg"
            alt="Telegram"
            width={25}
            height={25}
            className="w-[25px] h-[25px]"
          />
        </motion.a>
      </div>
    </motion.nav>
  );
}

