"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import GlassNav from "./GlassNav";
import GlassButton from "./GlassButton";

// Design dimensions - from Figma (content area only, not including margins)
const DESIGN_WIDTH = 1340; // Main container width
const DESIGN_HEIGHT = 924; // Main container height
// Margin as percentage of viewport (Figma: ~3.5% of 1440 = 50px)
const MARGIN_PERCENT = 0.025; // 2.5% margin on each side for a tighter fit
const MIN_SCALE = 0.55; // Minimum scale for tablets (~768px)
const MAX_SCALE = 2.0; // Scale up for large screens
const MOBILE_BREAKPOINT = 768; // Below this, show mobile version

// Custom easing curve - punchy ease-out for responsive feel
const snappyEase = [0.23, 1, 0.32, 1] as const;

// Shared transition config for consistent, fast interactions
const buttonTransition = {
  type: "tween" as const,
  duration: 0.15,
  ease: snappyEase,
};

// Stagger animation for mobile elements
const mobileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: snappyEase,
    },
  },
};

const mobilePhoneVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: snappyEase,
    },
  },
};

export default function LandingPage() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Check if mobile
      if (width < MOBILE_BREAKPOINT) {
        setIsMobile(true);
        return;
      }
      
      setIsMobile(false);

      // Calculate available space after viewport-relative margins
      const marginX = width * MARGIN_PERCENT;
      const marginY = height * MARGIN_PERCENT;
      const availableWidth = width - (marginX * 2);
      const availableHeight = height - (marginY * 2);
      
      // Calculate scale to fit content in available space
      const scaleX = availableWidth / DESIGN_WIDTH;
      const scaleY = availableHeight / DESIGN_HEIGHT;
      
      // Use the smaller scale to fit both dimensions
      const newScale = Math.max(MIN_SCALE, Math.min(scaleX, scaleY, MAX_SCALE));
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  // SSR: render nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Mobile version - Beautiful full-screen experience
  if (isMobile) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Full-bleed background image - mobile optimized version (unoptimized to preserve quality) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/background-mobile.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Content layer */}
        <motion.div
          variants={mobileContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center min-h-screen pt-5 px-[40px] pb-0 w-full"
          style={{
            paddingLeft: 'clamp(24px, 10vw, 40px)',
            paddingRight: 'clamp(24px, 10vw, 40px)',
          }}
        >
          {/* Glass Navigation Bar - wider, responsive to window size */}
          <motion.nav
            variants={mobileItemVariants}
            className="w-full h-[50px] px-5 rounded-full bg-black/5 border border-white/90 backdrop-blur-sm flex items-center gap-2.5"
          >
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={buttonTransition}
              className="flex items-center shrink-0"
            >
              <Image
                src="/logo.svg"
                alt="Aura"
                width={91}
                height={20}
                priority
                unoptimized
                className="h-5 w-[91px] object-contain"
              />
            </motion.a>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <motion.a
                href="https://x.com/Auramoney"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={buttonTransition}
                className="flex items-center justify-center w-[25px] h-[25px]"
              >
                <Image
                  src="/x.svg"
                  alt="X"
                  width={25}
                  height={25}
                  unoptimized
                  className="w-[25px] h-[25px]"
                />
              </motion.a>
              <motion.a
                href="https://t.me/auradotmoney"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={buttonTransition}
                className="flex items-center justify-center w-[25px] h-[25px]"
              >
                <Image
                  src="/telegram.svg"
                  alt="Telegram"
                  width={25}
                  height={25}
                  unoptimized
                  className="w-[25px] h-[25px]"
                />
              </motion.a>
            </div>
          </motion.nav>

          {/* Spacer - pushes content down */}
          <div className="h-[80px] shrink-0" />

          {/* Main Headline */}
          <motion.h1
            variants={mobileItemVariants}
            className="text-white text-[44px] leading-tight text-center font-normal tracking-tight"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              textShadow: "0 2px 20px rgba(0,0,0,0.15)",
            }}
          >
            <span className="italic font-light">Trade</span>
            <span> everything</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={mobileItemVariants}
            className="text-white text-[20px] sm:text-[23px] text-center font-normal mt-1 tracking-wide"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              textShadow: "0 1px 10px rgba(0,0,0,0.1)",
            }}
          >
            Perps, sports, politics, &amp; more
          </motion.p>

          {/* Spacer */}
          <div className="h-[30px] shrink-0" />

          {/* CTA Button */}
          <motion.div variants={mobileItemVariants}>
            <a
              href="https://t.me/+wCyhe2kIvyc1NjI5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={buttonTransition}
                className="h-[50px] px-8 rounded-full bg-black/5 border border-white/90 backdrop-blur-sm text-white text-[18px] cursor-pointer flex items-center justify-center"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 510,
                  textShadow: "0 1px 5px rgba(0,0,0,0.1)",
                }}
              >
                Early access
              </motion.button>
            </a>
          </motion.div>

          {/* Spacer before phone */}
          <div className="h-[40px] sm:h-[60px] shrink-0" />

          {/* iPhone Mockup - extending past bottom of screen */}
          <motion.div
            variants={mobilePhoneVariants}
            className="relative w-full max-w-[326px] flex-1 min-h-[400px]"
          >
            <Image
              src="/iphone-mockup.png"
              alt="Aura App on iPhone"
              fill
              priority
              className="object-contain object-top"
              style={{
                filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Subtle gradient overlay at top for depth */}
        <div 
          className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none z-[5]"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  return (
    // Outer container fills viewport, centers the content
    <div className="h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      {/* Scaling wrapper - sized to fit with proper margins */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-[20px] overflow-hidden bg-neutral-700 relative"
        style={{
          width: DESIGN_WIDTH * scale,
          height: DESIGN_HEIGHT * scale,
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Inner content at original size, scaled down */}
        <div
          className="relative"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
            {/* Background Image - positioned at left: -128px, full height */}
            <div 
              className="absolute top-0 h-full w-[1595px]"
              style={{ left: -128 }}
            >
              <Image
                src="/background.jpg"
                alt="Sky background"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "50% 50%" }}
              />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full">
              {/* Top Navigation Bar - positioned at top: 40px, left: 70px */}
              <div className="absolute top-[40px] left-[70px]">
                <GlassNav />
              </div>

              {/* Main Heading - centered at left: 670px (50% of 1340), top: 142px */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-[142px] left-[670px] -translate-x-1/2 text-white text-[58px] font-normal text-center whitespace-nowrap"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  lineHeight: "normal",
                }}
              >
                <span className="italic">Trade</span>
                <span> everything</span>
              </motion.h1>

              {/* Subheading - centered at left: 669.5px, top: 211px */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-[211px] left-[669.5px] -translate-x-1/2 text-white text-[23px] font-normal text-center whitespace-nowrap"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  lineHeight: "normal",
                }}
              >
                Perps, sports, politics, &amp; more
              </motion.p>

              {/* Early Access Button - positioned at left: 594px, top: 266px */}
              <div className="absolute top-[266px] left-[594px]">
                <a 
                  href="https://t.me/+wCyhe2kIvyc1NjI5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassButton>Early access</GlassButton>
                </a>
              </div>

              {/* iPhone Mockup - positioned at left: 464px, top: 374px, size: 411x840 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="absolute left-[464px] top-[374px] w-[411px] h-[840px]"
              >
                <Image
                  src="/iphone-mockup.png"
                  alt="Aura App on iPhone"
                  width={411}
                  height={840}
                  priority
                  className="w-full h-full object-contain object-top"
                />
              </motion.div>

              {/* Bottom Left Text - "Powered by:" at left: 70px, top: 830px */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute left-[70px] top-[830px] text-white text-[23px] font-normal whitespace-nowrap"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  lineHeight: "normal",
                }}
              >
                <p className="m-0">Powered by:</p>
                <p className="m-0">Hyperliquid, Polymarket</p>
              </motion.div>

              {/* Bottom Right Text - right-aligned at left: 1270px (from right edge), top: 835px */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute left-[1270px] top-[835px] -translate-x-full text-white text-[23px] font-normal text-right whitespace-nowrap"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  lineHeight: "normal",
                }}
              >
                <p className="m-0">iOS, Android</p>
                <p className="m-0">Apple Pay, Google Pay</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
    </div>
  );
}

