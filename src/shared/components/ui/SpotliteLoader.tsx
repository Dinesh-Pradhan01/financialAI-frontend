import React from "react";
import { Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SpotliteLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export function SpotliteLoader({
  message = "Restoring secure session…",
  subMessage = "SpotLite Business Intelligence",
  fullScreen = true,
}: SpotliteLoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Brand Icon with Breathing Glow */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Ambient Glow Aura */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-20 w-20 rounded-2xl bg-brand/30 blur-xl pointer-events-none"
        />

        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-16 w-16 rounded-2xl border border-brand/30 border-t-brand border-r-brand/10 pointer-events-none"
        />

        {/* Center Logo Emblem */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-6 w-6 fill-current text-white" />
          </motion.div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col items-center mb-5">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-2xl font-black tracking-tight text-foreground">
            Spot<span className="text-brand">Lite</span>
          </span>
          <span className="rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-widest text-brand">
            Intelligence
          </span>
        </div>
      </div>

      {/* Sleek Linear Fintech Loading Bar */}
      <div className="relative h-1 w-48 overflow-hidden rounded-full bg-border/60 mb-4">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-24 rounded-full bg-linear-to-r from-transparent via-brand to-transparent"
        />
      </div>

      {/* Status Messages */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs font-semibold text-text-primary tracking-wide"
      >
        {message}
      </motion.p>
      {subMessage && (
        <p className="text-[0.6875rem] text-text-secondary mt-1 font-medium flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-brand" />
          {subMessage}
        </p>
      )}
    </div>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-background/95 backdrop-blur-xs">
      {content}
    </div>
  );
}
