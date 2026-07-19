import React from "react";

interface ProfileIconProps {
  shape?: "double-track-top" | "double-track-bottom" | "interlock" | "lock-star" | "outer-frame" | "box" | "circle" | "square" | "rectangular" | "angle" | "u-channel" | "t-section" | "handle" | "hardware" | "hardware-suction" | "hardware-roller" | "hardware-lock" | "hardware-closer" | "hardware-hinge" | "hardware-handle" | "hardware-strip" | "hardware-tool" | "hardware-spacer" | "hardware-mesh" | "hardware-screw" | "hardware-bracket";
  className?: string;
  strokeColor?: string;
}

export default function ProfileIcon({ shape = "box", className = "w-16 h-16", strokeColor = "stroke-slate-600" }: ProfileIconProps) {
  const baseClasses = `fill-none stroke-2 ${strokeColor} ${className}`;

  switch (shape) {
    case "double-track-top":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Main Top Outer Box */}
          <path d="M 15 25 L 85 25 L 85 35 L 77 35 L 77 75 L 67 75 L 67 35 L 55 35 L 55 75 L 45 75 L 45 35 L 33 35 L 33 75 L 23 75 L 23 35 L 15 35 Z" />
          {/* Inner details / Guidelines */}
          <line x1="20" y1="20" x2="80" y2="20" strokeDasharray="2,2" strokeWidth="1" className="stroke-slate-400" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" strokeWidth="1" className="stroke-amber-400" />
        </svg>
      );

    case "double-track-bottom":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Base Plate */}
          <path d="M 10 75 L 90 75 L 90 65 L 83 65 L 83 40 L 73 40 L 73 65 L 55 65 L 55 40 L 45 40 L 45 65 L 27 65 L 27 40 L 17 40 L 17 65 L 10 65 Z" />
          {/* Water drainage indicators */}
          <path d="M 33 70 L 37 70" strokeWidth="3" className="stroke-sky-500" />
          <path d="M 61 70 L 65 70" strokeWidth="3" className="stroke-sky-500" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" strokeWidth="1" className="stroke-amber-400" />
        </svg>
      );

    case "interlock":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Interlocking curved hook section */}
          <path d="M 25 15 L 65 15 L 65 35 L 45 35 L 45 65 L 75 65 L 75 85 L 65 85 L 65 75 L 35 75 L 35 45 L 25 45 Z" />
          {/* Hook loop */}
          <path d="M 75 65 L 85 65 L 85 50 L 75 50" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" strokeWidth="1" className="stroke-amber-400" />
        </svg>
      );

    case "lock-star":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Main box with locking flanges */}
          <path d="M 25 20 L 75 20 L 75 80 L 25 80 Z" />
          <path d="M 75 35 L 85 35 L 85 65 L 75 65" />
          <path d="M 25 50 L 15 50" />
          {/* Screwhole center */}
          <circle cx="50" cy="50" r="6" strokeDasharray="1,1" strokeWidth="1" />
        </svg>
      );

    case "outer-frame":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Stepped outer mounting frame */}
          <path d="M 20 20 L 80 20 L 80 40 L 55 40 L 55 80 L 20 80 Z" />
          <path d="M 32 32 L 68 32 L 68 40" strokeWidth="1" strokeDasharray="2,2" className="stroke-slate-400" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" strokeWidth="1" className="stroke-amber-400" />
        </svg>
      );

    case "box":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Double thickness rectangular box */}
          <rect x="20" y="20" width="60" height="60" rx="3" />
          <rect x="28" y="28" width="44" height="44" rx="1" strokeDasharray="2,2" strokeWidth="1" className="stroke-slate-400" />
          {/* Center reference lines */}
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-slate-300" />
          <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-slate-300" />
        </svg>
      );

    case "circle":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Concentric tubes */}
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="27" strokeDasharray="2,2" strokeWidth="1" className="stroke-slate-400" />
          {/* Axis indicators */}
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-amber-400" />
          <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-amber-400" />
        </svg>
      );

    case "square":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <rect x="25" y="25" width="50" height="50" />
          <rect x="32" y="32" width="36" height="36" strokeWidth="1" strokeDasharray="2,2" className="stroke-slate-400" />
          <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-slate-300" />
        </svg>
      );

    case "rectangular":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <rect x="15" y="25" width="70" height="50" />
          <rect x="22" y="32" width="56" height="36" strokeWidth="1" strokeDasharray="2,2" className="stroke-slate-400" />
          <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-slate-300" />
        </svg>
      );

    case "angle":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Standard L-angle corner */}
          <path d="M 25 25 L 37 25 L 37 63 L 75 63 L 75 75 L 25 75 Z" />
          {/* Dimension arrows */}
          <path d="M 20 25 L 20 75" strokeWidth="1" className="stroke-slate-400" />
          <path d="M 25 80 L 75 80" strokeWidth="1" className="stroke-slate-400" />
        </svg>
      );

    case "u-channel":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Standard U shape */}
          <path d="M 25 25 L 35 25 L 35 65 L 65 65 L 65 25 L 75 25 L 75 75 L 25 75 Z" />
          <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="4,4" strokeWidth="0.5" className="stroke-slate-300" />
        </svg>
      );

    case "t-section":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* T shaped divider section */}
          <path d="M 15 25 L 85 25 L 85 37 L 56 37 L 56 75 L 44 75 L 44 37 L 15 37 Z" />
          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="3,3" strokeWidth="1" className="stroke-amber-400" />
        </svg>
      );

    case "handle":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Stylized Kitchen profile with pull recess */}
          <path d="M 20 20 L 45 20 C 55 20, 60 25, 60 35 C 60 40, 50 45, 45 45 L 30 45 L 30 80 L 20 80 Z" />
          <path d="M 25 28 L 38 28" strokeWidth="1" className="stroke-slate-400" />
        </svg>
      );

    case "hardware":
      return (
        <svg viewBox="0 0 100 100" className="fill-none stroke-2 stroke-amber-600 w-16 h-16">
          <rect x="20" y="30" width="60" height="40" rx="4" className="stroke-slate-600" />
          <circle cx="38" cy="50" r="12" className="stroke-amber-600 fill-amber-50" />
          <circle cx="38" cy="50" r="3" className="fill-slate-600 stroke-none" />
          <circle cx="62" cy="50" r="12" className="stroke-amber-600 fill-amber-50" />
          <circle cx="62" cy="50" r="3" className="fill-slate-600 stroke-none" />
          <line x1="50" y1="38" x2="50" y2="44" className="stroke-slate-400" />
          <line x1="47" y1="41" x2="53" y2="41" className="stroke-slate-400" />
        </svg>
      );

    case "hardware-suction":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Suction Lifter Handle */}
          <path d="M 20 55 C 20 40, 30 30, 50 30 C 70 30, 80 40, 80 55" strokeWidth="6" />
          <rect x="35" y="25" width="30" height="10" rx="2" className="stroke-slate-400" />
          {/* Left Cup */}
          <circle cx="20" cy="65" r="15" className="fill-amber-50" />
          <line x1="10" y1="65" x2="30" y2="65" className="stroke-slate-400" />
          {/* Right Cup */}
          <circle cx="80" cy="65" r="15" className="fill-amber-50" />
          <line x1="70" y1="65" x2="90" y2="65" className="stroke-slate-400" />
        </svg>
      );

    case "hardware-roller":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Roller bracket */}
          <path d="M 15 45 L 85 45 L 85 55 L 15 55 Z" className="fill-slate-50" />
          <rect x="25" y="32" width="16" height="26" rx="2" className="stroke-amber-600 fill-amber-50" />
          <circle cx="33" cy="45" r="4" className="fill-slate-600" />
          <rect x="59" y="32" width="16" height="26" rx="2" className="stroke-amber-600 fill-amber-50" />
          <circle cx="67" cy="45" r="4" className="fill-slate-600" />
          {/* Screw adjustment holes */}
          <circle cx="50" cy="50" r="3" className="stroke-slate-400" />
        </svg>
      );

    case "hardware-lock":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Cylinder lock / crescent lock mechanism */}
          <rect x="35" y="15" width="30" height="70" rx="6" className="fill-slate-50" />
          {/* Lever thumbturn */}
          <path d="M 50 35 L 75 35 C 80 35, 80 45, 75 45 L 50 45" className="stroke-amber-600 fill-amber-100" />
          <circle cx="50" cy="40" r="6" className="fill-slate-600" />
          {/* Lock keyway */}
          <path d="M 46 65 A 4 4 0 0 1 54 65 L 52 75 L 48 75 Z" className="fill-slate-600" />
        </svg>
      );

    case "hardware-closer":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Hydraulic door closer body and folding arm */}
          <rect x="15" y="45" width="55" height="25" rx="3" className="fill-amber-50" />
          <circle cx="25" cy="57" r="6" className="fill-slate-400" />
          <circle cx="60" cy="57" r="6" className="fill-slate-400" />
          {/* Folding links */}
          <path d="M 25 57 L 50 25 L 85 35" strokeWidth="4" className="stroke-amber-600" />
          <circle cx="50" cy="25" r="4" className="fill-slate-600 stroke-none" />
          <circle cx="85" cy="35" r="4" className="fill-slate-600 stroke-none" />
        </svg>
      );

    case "hardware-hinge":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Butt Hinge / Shower glass hinge */}
          <rect x="15" y="20" width="32" height="60" rx="1" className="fill-slate-50" />
          <rect x="53" y="20" width="32" height="60" rx="1" className="fill-slate-50" />
          {/* Center Pin cylinder */}
          <rect x="46" y="15" width="8" height="70" rx="2" className="stroke-amber-600 fill-amber-100" />
          {/* Screw holes */}
          <circle cx="28" cy="32" r="3" className="stroke-slate-400" />
          <circle cx="28" cy="68" r="3" className="stroke-slate-400" />
          <circle cx="72" cy="32" r="3" className="stroke-slate-400" />
          <circle cx="72" cy="68" r="3" className="stroke-slate-400" />
        </svg>
      );

    case "hardware-handle":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Elegant designer handle */}
          <path d="M 30 15 C 30 15, 30 30, 45 40 C 60 50, 70 65, 70 85" strokeWidth="6" className="stroke-amber-600" />
          {/* Metal standoff brackets */}
          <line x1="30" y1="20" x2="50" y2="20" strokeWidth="4" />
          <line x1="68" y1="80" x2="50" y2="80" strokeWidth="4" />
          <rect x="46" y="16" width="8" height="8" className="fill-slate-600" />
          <rect x="46" y="76" width="8" height="8" className="fill-slate-600" />
        </svg>
      );

    case "hardware-strip":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Weather strip coil / roll */}
          <circle cx="50" cy="50" r="35" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="28" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="12" className="fill-slate-100" />
          {/* Fibers radiating outward slightly */}
          <path d="M 85 50 L 92 50 M 15 50 L 8 50 M 50 15 L 50 8 M 50 85 L 50 92" strokeWidth="2" className="stroke-amber-500" />
        </svg>
      );

    case "hardware-tool":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Silicone Gun assembly */}
          <rect x="25" y="30" width="45" height="16" rx="2" className="fill-slate-50" />
          <path d="M 70 30 L 85 38 L 70 46" className="fill-amber-50" />
          {/* Plunger trigger */}
          <path d="M 32 46 L 32 75 L 42 75" strokeWidth="4" />
          <path d="M 40 46 L 46 65" strokeWidth="4" className="stroke-amber-600" />
          {/* Cartridge tip */}
          <path d="M 85 38 L 94 38" strokeWidth="3" />
        </svg>
      );

    case "hardware-spacer":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Standoff Sign Bolt Spacer */}
          <circle cx="50" cy="40" r="22" className="fill-amber-50" />
          <circle cx="50" cy="40" r="8" className="stroke-slate-400" />
          {/* Spacer cylinder neck */}
          <rect x="42" y="62" width="16" height="24" rx="2" className="fill-slate-100" />
          <line x1="30" y1="62" x2="70" y2="62" strokeWidth="2" />
        </svg>
      );

    case "hardware-mesh":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Wire insect screen hatch texture in a frame */}
          <rect x="15" y="15" width="70" height="70" rx="3" className="fill-slate-50" />
          {/* Wire pattern lines */}
          <line x1="25" y1="15" x2="25" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="35" y1="15" x2="35" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="45" y1="15" x2="45" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="55" y1="15" x2="55" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="65" y1="15" x2="65" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="75" y1="15" x2="75" y2="85" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          
          <line x1="15" y1="25" x2="85" y2="25" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="15" y1="35" x2="85" y2="35" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="15" y1="45" x2="85" y2="45" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="15" y1="55" x2="85" y2="55" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="15" y1="65" x2="85" y2="65" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
          <line x1="15" y1="75" x2="85" y2="75" strokeWidth="0.5" strokeDasharray="1,1" className="stroke-amber-400" />
        </svg>
      );

    case "hardware-screw":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Pop rivet / thread bolt screw */}
          <path d="M 25 25 L 75 25 L 65 35 L 35 35 Z" className="fill-slate-100" />
          <line x1="30" y1="30" x2="70" y2="30" strokeWidth="3" />
          {/* Threaded shaft */}
          <rect x="42" y="35" width="16" height="45" rx="1" className="fill-amber-50" />
          {/* Screw threads */}
          <line x1="42" y1="45" x2="58" y2="48" strokeWidth="2" className="stroke-amber-600" />
          <line x1="42" y1="55" x2="58" y2="58" strokeWidth="2" className="stroke-amber-600" />
          <line x1="42" y1="65" x2="58" y2="68" strokeWidth="2" className="stroke-amber-600" />
          {/* Sharp point tip */}
          <path d="M 42 80 L 50 90 L 58 80 Z" className="fill-slate-400" />
        </svg>
      );

    case "hardware-bracket":
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          {/* Structural shelf bracket or corner angle plate */}
          <path d="M 15 15 L 30 15 L 30 70 L 85 70 L 85 85 L 15 85 Z" className="fill-slate-50" />
          {/* Diagonal truss support brace */}
          <path d="M 30 35 L 70 70 L 30 70 Z" className="fill-amber-50 stroke-amber-600" strokeWidth="2" />
          {/* Connection holes */}
          <circle cx="22.5" cy="25" r="3" className="stroke-slate-400" />
          <circle cx="75" cy="77.5" r="3" className="stroke-slate-400" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <rect x="20" y="20" width="60" height="60" rx="4" />
        </svg>
      );
  }
}
