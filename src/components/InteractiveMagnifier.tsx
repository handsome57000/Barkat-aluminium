import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, Sparkles } from "lucide-react";

interface InteractiveMagnifierProps {
  children: React.ReactElement;
  scale?: number;
  lensSize?: number;
  isDarkTheme?: boolean;
}

export default function InteractiveMagnifier({
  children,
  scale = 2.2,
  lensSize = 130,
  isDarkTheme = false
}: InteractiveMagnifierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if touch is supported/used
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(true);
    };
    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Constraint coordinates within container boundaries
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    setCoords({
      x,
      y,
      width: rect.width,
      height: rect.height
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsActive(true);
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const handleTouchEnd = () => setIsActive(false);

  // Clone child with a custom className to ensure it expands nicely
  const baseChild = React.cloneElement(children, {
    className: "w-full h-full object-contain pointer-events-none transition-none"
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden group/magnifier"
      style={{ touchAction: "none" }}
    >
      {/* Normal Base View */}
      <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-hover/magnifier:opacity-85">
        {children}
      </div>

      {/* Visual Instruction Badge (Guides fabricator about zoom feature) */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xs px-2 py-1 rounded-md text-[9px] font-black text-[#0A4D8C] dark:text-[#C9A227] border border-slate-100 dark:border-white/5 shadow-xs opacity-80 group-hover/magnifier:opacity-0 transition-opacity duration-300 pointer-events-none select-none font-mono uppercase tracking-wider">
        <ZoomIn className="w-3 h-3 text-[#C9A227]" />
        <span>{isTouchDevice ? "Hold to Zoom" : "Hover to Zoom"}</span>
      </div>

      {/* Interactive Magnifier Glass Overlay */}
      <AnimatePresence>
        {isActive && coords.width > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none z-30 shadow-2xl overflow-hidden"
            style={{
              width: lensSize,
              height: lensSize,
              left: coords.x - lensSize / 2,
              top: coords.y - lensSize / 2,
              border: "3px solid #C9A227",
              backgroundColor: isDarkTheme ? "#111111" : "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 16px rgba(0, 0, 0, 0.1)"
            }}
          >
            {/* Cloned Zoomed Content Container */}
            <div
              className="absolute"
              style={{
                left: -coords.x + lensSize / 2,
                top: -coords.y + lensSize / 2,
                width: coords.width,
                height: coords.height,
                transform: `scale(${scale})`,
                transformOrigin: `${coords.x}px ${coords.y}px`
              }}
            >
              {baseChild}
            </div>

            {/* Inner Glass Reflection/Glossy Highlight Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
            
            {/* Center Fabricator Crosshair Reticle (Very cool precision detailing tool) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <div className="absolute w-8 h-[1px] bg-[#C9A227]" />
              <div className="absolute h-8 w-[1px] bg-[#C9A227]" />
            </div>

            {/* Micro Scale Indicator Badge */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/75 px-1.5 py-0.5 rounded text-[8px] font-black text-white font-mono tracking-widest uppercase">
              {scale.toFixed(1)}X
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
