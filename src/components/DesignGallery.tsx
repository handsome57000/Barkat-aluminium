import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Heart, Share2, Download, ExternalLink, MessageSquare, 
  ShoppingCart, Sliders, ChevronDown, Check, Compass, Info,
  Sparkles, ShieldCheck, Award, Layers, Eye, X, BookOpen, MapPin, ZoomIn
} from "lucide-react";
import InteractiveMagnifier from "./InteractiveMagnifier";
import { Category } from "../types";

// Color Options structure
interface ColorOption {
  id: string;
  name: string;
  hex: string;
  isWooden?: boolean;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: "black", name: "Matte Black", hex: "#1A1A1A" },
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "silver", name: "Silver", hex: "#E5E5E5" },
  { id: "champagne", name: "Champagne", hex: "#E8DCC4" },
  { id: "bronze", name: "Bronze", hex: "#4E3629" },
  { id: "golden", name: "Golden", hex: "#C9A227" },
  { id: "oak", name: "Wooden Finish (Oak)", hex: "#D4A373", isWooden: true },
  { id: "walnut", name: "Wooden Finish (Walnut)", hex: "#5C3A21", isWooden: true },
  { id: "teak", name: "Wooden Finish (Teak)", hex: "#8B5A2B", isWooden: true },
  { id: "dark_grey", name: "Dark Grey", hex: "#4A5568" },
  { id: "charcoal", name: "Charcoal Grey", hex: "#2D3748" },
  { id: "custom", name: "Custom Powder Coating", hex: "linear-gradient(to right, #C9A227, #3B82F6, #EF4444)", isWooden: false }
];

// Design interface
export interface DesignItem {
  id: string;
  name: string;
  category: "Sliding Windows" | "Openable Windows" | "Fixed Windows" | "Doors" | "Multi-Panel Sliding Doors" | "Curtain Wall Systems" | "Thermal Break Systems" | "Insect Screen Systems";
  type: "window" | "door" | "facade" | "screen";
  openingStyle: "Sliding" | "Openable" | "Fixed" | "Folding" | "Pivot" | "Insect Screen";
  image: string;
  description: string;
  glassOptions: string;
  hardware: string;
  thermalBreak: boolean;
  thermalBreakOption?: string;
  openingType: string;
}

const DESIGN_GALLERY_ITEMS: DesignItem[] = [
  // Sliding Windows
  {
    id: "dsgn-sw-2p",
    name: "2 Panel Sliding Window",
    category: "Sliding Windows",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Elegant 2-panel configuration designed for high air tightness, dust resistance, and ultra-smooth glide. Offers maximize natural lighting and slim sightlines.",
    glassOptions: "24mm Double Glazed (6mm Clear + 12Argon + 6mm Low-E)",
    hardware: "Premium multi-point lockset, silent nylon-brass adjustable twin rollers",
    thermalBreak: false,
    openingType: "Horizontal Double Slider"
  },
  {
    id: "dsgn-sw-3p",
    name: "3 Panel Sliding Window",
    category: "Sliding Windows",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    description: "Premium triple track window allowing 2/3rd opening space. Specially designed overlapping interlocking profile to prevent water drainage.",
    glassOptions: "12mm Single Tempered, or 24mm Double Glazed Option",
    hardware: "Barkat heavy duty flush handles, integrated flyscreen sliding system",
    thermalBreak: false,
    openingType: "3-Track Triple Slider"
  },
  {
    id: "dsgn-sw-4p",
    name: "4 Panel Sliding Window",
    category: "Sliding Windows",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious 4-panel setup ideal for broad openings. Center opening panels glide out of the way, giving wide unobstructed panoramic garden views.",
    glassOptions: "6mm Tinted Tempered / 12mm Frosted / 24mm Acoustic Glass",
    hardware: "Dual sided security lock keys, premium steel alignment rollers",
    thermalBreak: false,
    openingType: "Double Track Quad Slider"
  },
  {
    id: "dsgn-sw-lg",
    name: "Large Sliding Window",
    category: "Sliding Windows",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    description: "Grand format architectural sliding pane for contemporary duplexes. High structural rigidity designed to support extra-large heavy glass sheets.",
    glassOptions: "32mm Triple Glazed Low-E Acoustic with Argon Gas Fill",
    hardware: "Italian imported continuous grip handles, automatic dampeners",
    thermalBreak: true,
    thermalBreakOption: "Optional - 24mm Polyamide Insulating Bars",
    openingType: "Architectural Grand Slider"
  },
  {
    id: "dsgn-sw-cn",
    name: "Corner Sliding Window",
    category: "Sliding Windows",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    description: "Sophisticated zero-corner-post sliding window system. When open, the corner is entirely free, creating a seamless connection to the outdoors.",
    glassOptions: "24mm Tempered High-Performance solar heat reflective glass",
    hardware: "Specialized 90-degree corner gaskets, locking pins, heavy-duty track",
    thermalBreak: true,
    thermalBreakOption: "PA66 high-performance thermal insulation barrier",
    openingType: "90° Open Corner Sliding"
  },

  // Openable Windows
  {
    id: "dsgn-ow-so",
    name: "Side Openable Window",
    category: "Openable Windows",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    description: "Classic high-ventilation side-hung openable window. Compression gasket sealing ensures a complete hermetic barrier against rain and winds.",
    glassOptions: "8mm Tempered Clear Glass with high acoustic insulation",
    hardware: "Premium multi-point lock lever, friction stay hinges up to 90°",
    thermalBreak: false,
    openingType: "Outward Side-Hung Casement"
  },
  {
    id: "dsgn-ow-th",
    name: "Top Hung Window",
    category: "Openable Windows",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description: "Awning-style windows that open outwards from the bottom. Perfect for letting cool air flow in while shielding the interior from rain.",
    glassOptions: "6mm Clear / Reflective / Frosted Privacy Glass",
    hardware: "Telescopic window stays, heavy-duty bottom handle with safety latch",
    thermalBreak: false,
    openingType: "Top-Hung Awning Outward"
  },
  {
    id: "dsgn-ow-bh",
    name: "Bottom Hung Window",
    category: "Openable Windows",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    description: "Hopper-style window that tilts inward from the top. Highly safe ventilation choice for basements, washrooms, and high-altitude buildings.",
    glassOptions: "8mm Patterned/Frosted Privacy Tempered Glass",
    hardware: "Inward tilt arm restrictors, dual position lock latches",
    thermalBreak: false,
    openingType: "Inward-Tilting Hopper"
  },
  {
    id: "dsgn-ow-tt",
    name: "Tilt & Turn Window",
    category: "Openable Windows",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
    description: "Premium European double-action system. Turn the handle 90° to open sideways, or turn 180° to tilt the top inward for safe, secure ventilation.",
    glassOptions: "28mm Triple Glazed High-Performance Glass (Argon-filled)",
    hardware: "Imported German concealed Tilt-Turn system with security cams",
    thermalBreak: true,
    thermalBreakOption: "Standard Polyamide Thermal Break - ultimate insulation",
    openingType: "Inward Tilt and Turn Double Action"
  },
  {
    id: "dsgn-ow-cs",
    name: "Casement Window",
    category: "Openable Windows",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Architectural grade, heavy duty casement swing window. Features broad frames to withstand massive storm loads and continuous everyday operations.",
    glassOptions: "10mm Single Clear Tempered, or 24mm Double Glazed",
    hardware: "Concealed heavy-load friction hinges, European multi-point locks",
    thermalBreak: false,
    openingType: "Side-Hung Swing Out"
  },

  // Fixed Windows
  {
    id: "dsgn-fw-fx",
    name: "Fixed Glass Window",
    category: "Fixed Windows",
    type: "window",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Minimalist fixed light window focused entirely on broad glass area and slim architectural framing. Offers maximum energy-efficiency and seal.",
    glassOptions: "12mm High-strength Tempered Glass, clear or tinted",
    hardware: "Structural glazing adhesive gaskets, high-security internal beads",
    thermalBreak: false,
    openingType: "Non-Opening Fixed Framed"
  },
  {
    id: "dsgn-fw-pt",
    name: "Picture Window",
    category: "Fixed Windows",
    type: "window",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    description: "Over-sized fixed picture window designed for landscape views. Seamlessly captures natural scenery like a living luxury portrait.",
    glassOptions: "24mm Low-E High-Transmission Double Insulated Glass",
    hardware: "Extra-deep structural glass pockets, premium weather-resistant seals",
    thermalBreak: true,
    thermalBreakOption: "PA66 Polyamide thermal core insulating barrier",
    openingType: "Grand-Format Fixed Landscape"
  },
  {
    id: "dsgn-fw-cb",
    name: "Combination Fixed Window",
    category: "Fixed Windows",
    type: "window",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    description: "Dynamic transom and mullion layouts pairing large fixed glass with top-hung awning vents or side-hung ventilation sashes.",
    glassOptions: "Custom configurations matching various glazing thickness",
    hardware: "Integrated heavy-duty joinery connectors, multi-point vent locksets",
    thermalBreak: false,
    openingType: "Fixed Framing with Active Vents"
  },

  // Doors
  {
    id: "dsgn-dr-sd",
    name: "Single Door",
    category: "Doors",
    type: "door",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Aesthetic single-panel entry swing door. Clean minimalist frame profiles, ideal for executive office entries, balcony exits, and bedrooms.",
    glassOptions: "10mm Clear or Acid Etched Frosted Safety Tempered Glass",
    hardware: "D-Handle 12-inch premium pull, high-grade security cylinder lock",
    thermalBreak: false,
    openingType: "Single Swing Openable"
  },
  {
    id: "dsgn-dr-dd",
    name: "Double Door",
    category: "Doors",
    type: "door",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Luxurious double-leaf swing door system. Offers a grand entrance walkway, heavy commercial grade pivot hinges, and double-gasket insulation.",
    glassOptions: "12mm Tempered Clear Glass / Double Glazing option",
    hardware: "36-inch architectural H-handles, concealed top/bottom door closers",
    thermalBreak: false,
    openingType: "Double Leaf Swing Out"
  },
  {
    id: "dsgn-dr-sl",
    name: "Sliding Door",
    category: "Doors",
    type: "door",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Slimline luxury sliding patio door. Extra thin visual frame lines to emphasize maximum glass view, equipped with soft-slide tracks.",
    glassOptions: "24mm Soundproof Double Glazing with safety lamination",
    hardware: "Concealed slide pull lock, heavy-duty stainless-steel rollers",
    thermalBreak: false,
    openingType: "Premium Horizontal Sliding"
  },
  {
    id: "dsgn-dr-od",
    name: "Openable Door",
    category: "Doors",
    type: "door",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "All-purpose highly sealed openable door with thick aluminium profiles. Specifically built to block noise, wind, and heavy driving rain.",
    glassOptions: "10mm Clear High-Strength Tempered Glass",
    hardware: "European lock cylinders, three-dimensional adjustable premium hinges",
    thermalBreak: false,
    openingType: "Outward/Inward Swing Door"
  },
  {
    id: "dsgn-dr-fd",
    name: "French Door",
    category: "Doors",
    type: "door",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=1200&q=80",
    description: "Classic French-style door featuring divided lites (muntins) grid styling. Provides a timeless, elegant, and nostalgic aesthetic to patio walkways.",
    glassOptions: "Double Glazed 22mm with decorative internal grids",
    hardware: "Vintage lever brass handles, multi-point interlocking bolts",
    thermalBreak: false,
    openingType: "Grid-Pattern Double Swing"
  },
  {
    id: "dsgn-dr-fl",
    name: "Folding Door",
    category: "Doors",
    type: "door",
    openingStyle: "Folding",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    description: "Premium accordion-style Bi-Fold doors. Multiple panels fold and stack compactly to the sides, transforming your entire wall into an open passage.",
    glassOptions: "28mm Argon-Filled Insulating Double Laminated Safety Glass",
    hardware: "Heavy-duty top-hung carrier wheels, stainless steel hinges, pull pins",
    thermalBreak: true,
    thermalBreakOption: "Polyamide insulating strips, optimal weather seals",
    openingType: "Multi-Panel Concertina Folding"
  },
  {
    id: "dsgn-dr-pv",
    name: "Pivot Door",
    category: "Doors",
    type: "door",
    openingStyle: "Pivot",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-luxury modern grand pivot entry door. Rotation pivot is located offset inside the frame instead of hinges on the wall, enabling oversized doors.",
    glassOptions: "12mm Triple Laminated Toughened Architectural Glass",
    hardware: "State-of-the-art German self-closing floor pivot, smart lock cylinder",
    thermalBreak: true,
    thermalBreakOption: "Optional high-efficiency energy thermal cores",
    openingType: "Heavy-Duty Offset Pivot Rotating"
  },

  // Multi-Panel Sliding Doors
  {
    id: "dsgn-mp-2p",
    name: "2 Panel Sliding Door",
    category: "Multi-Panel Sliding Doors",
    type: "door",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Highly practical, heavy-load dual panel sliding patio door. Combines massive strength with smooth operations, perfect for modern villas.",
    glassOptions: "24mm High Acoustic Double Glazing",
    hardware: "European sleek locks, heavy duty dual brass tandem rollers",
    thermalBreak: false,
    openingType: "Double Track Patio Slider"
  },
  {
    id: "dsgn-mp-3p",
    name: "3 Panel Sliding Door",
    category: "Multi-Panel Sliding Doors",
    type: "door",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    description: "Premium triple-track three panel sliding door configuration. Allows 2 sashes to stack behind 1 fixed pane for extra-wide breeze paths.",
    glassOptions: "24mm Low-E Double Insulating safety glass",
    hardware: "Flush pulls, dynamic weather seals, interlock reinforcing",
    thermalBreak: false,
    openingType: "3-Track Triple Sliding"
  },
  {
    id: "dsgn-mp-4p",
    name: "4 Panel Sliding Door",
    category: "Multi-Panel Sliding Doors",
    type: "door",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Luxury quad panel system. Offers massive glass panels, opening in the center to create a breathtaking grand-scale transition between interior and deck.",
    glassOptions: "30mm Triple Glazed laminated with heat-shield coatings",
    hardware: "Premium multi-lock mechanisms, structural alignment rollers",
    thermalBreak: true,
    thermalBreakOption: "High-density thermal break cores",
    openingType: "Quad Panel Center Opening Slider"
  },
  {
    id: "dsgn-mp-hd",
    name: "Heavy Duty Sliding Door",
    category: "Multi-Panel Sliding Doors",
    type: "door",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Extra heavy structural profiles designed for high-wind environments and high-traffic areas. Can easily slide panels weighting up to 400 kg.",
    glassOptions: "32mm Laminated Insulated Glass Unit (IGU)",
    hardware: "Lift-and-slide imported high-load roller bearings and lever",
    thermalBreak: true,
    thermalBreakOption: "Standard - 24mm Polyamide thermal break system",
    openingType: "Heavy-Duty Lift & Slide"
  },

  // Curtain Wall Systems
  {
    id: "dsgn-cw-ac",
    name: "Aluminium Curtain Wall",
    category: "Curtain Wall Systems",
    type: "facade",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Premium mullion-transom vertical curtain walling. Perfect for multi-story modern commercial glass buildings and high-rise facades.",
    glassOptions: "28mm Double Glazed heat strengthened glass, blue or silver tinted",
    hardware: "Concealed expansion joints, structural mullion steel inserts",
    thermalBreak: true,
    thermalBreakOption: "Standard thermal isolators with EPDM weather-strips",
    openingType: "Mullion-Transom Framed Facade"
  },
  {
    id: "dsgn-cw-sg",
    name: "Structural Glazing",
    category: "Curtain Wall Systems",
    type: "facade",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Sleek seamless structural glazing where the aluminium profiles are entirely concealed from the outside. Offers clean, continuous glass aesthetics.",
    glassOptions: "24mm Argon filled silicone-sealed Double Glazed Unit",
    hardware: "Concealed toggle brackets, Dow Corning structural silicone sealant",
    thermalBreak: true,
    thermalBreakOption: "High insulation thermal barrier strips",
    openingType: "Seamless Concealed Framing"
  },
  {
    id: "dsgn-cw-sp",
    name: "Spider Glazing",
    category: "Curtain Wall Systems",
    type: "facade",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Highly artistic point-supported spider glazing facade. Features cast stainless-steel arm connectors fixed to glass corner holes for ultimate transparency.",
    glassOptions: "12mm+12mm Toughened Laminated Clear SentryGlass",
    hardware: "Grade-316 Stainless Steel Spider brackets, routels, glass fins",
    thermalBreak: false,
    openingType: "Point-Supported Glass Fin Facade"
  },
  {
    id: "dsgn-cw-cf",
    name: "Commercial Glass Facade",
    category: "Curtain Wall Systems",
    type: "facade",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Premium modular storefront facade layout utilizing heavy-gauge 100mm/150mm box frames. Perfect for luxury showrooms and high-street outlets.",
    glassOptions: "12mm Toughened Clear Glass / Double Glaze optional",
    hardware: "Heavy-duty structural anchoring plates, premium EPDM beads",
    thermalBreak: false,
    openingType: "Framed Shop Front Facade"
  },

  // Thermal Break Systems
  {
    id: "dsgn-tb-sw",
    name: "Thermal Break Sliding Window",
    category: "Thermal Break Systems",
    type: "window",
    openingStyle: "Sliding",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-insulated thermal break sliding window. Outer and inner aluminium frames are separated by a Polyamide structural insulator to block outside hot heat.",
    glassOptions: "24mm Low-E Double Glazed (6-12-6) with Warm Edge Spacers",
    hardware: "German Roto/Giesse lift-and-slide gearings, multi-locking pins",
    thermalBreak: true,
    thermalBreakOption: "PA66 Polyamide 24mm high strength insulating core",
    openingType: "Thermally Separated Slider"
  },
  {
    id: "dsgn-tb-cw",
    name: "Thermal Break Casement Window",
    category: "Thermal Break Systems",
    type: "window",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Maximum energy-efficient swing window. Designed with a multi-chambered thermal core to save up to 40% on air-conditioning electricity bills.",
    glassOptions: "28mm Triple Glazed low-emissivity glass, filled with Argon",
    hardware: "Concealed heavy-load tilt hinges, dual-gasket multi-locking sashes",
    thermalBreak: true,
    thermalBreakOption: "Concealed structural polyamide thermal insulating core",
    openingType: "Swing Out with Thermal Core"
  },
  {
    id: "dsgn-tb-dr",
    name: "Thermal Break Door",
    category: "Thermal Break Systems",
    type: "door",
    openingStyle: "Openable",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Heavy-duty entry door incorporating high thermal break bars. Keeps external high summer heat outside, providing a comfortable cozy space indoors.",
    glassOptions: "24mm Double Glazed tempered laminated acoustic safety glass",
    hardware: "Heavy-duty pivot mechanism / multi-point locking security rods",
    thermalBreak: true,
    thermalBreakOption: "PA66 Glass-fiber reinforced polyamide thermal bars",
    openingType: "Thermally Efficient Swing Entry"
  },
  {
    id: "dsgn-tb-ee",
    name: "Energy Efficient Aluminium Systems",
    category: "Thermal Break Systems",
    type: "window",
    openingStyle: "Fixed",
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=1200&q=80",
    description: "Elite tier passive house certified frame system. Delivers exceptionally low U-values for premium eco-conscious architectural layouts.",
    glassOptions: "36mm Triple Low-E Glazing with Swiss warm-edge spacer bars",
    hardware: "Concealed structural pivot assemblies, EPDM double barrier seal",
    thermalBreak: true,
    thermalBreakOption: "Reinforced 34mm Polyamide thermal separation barrier",
    openingType: "Passive House High-Efficiency Fixed"
  },

  // Insect Screen Systems
  {
    id: "dsgn-is-zz",
    name: "Zigzag Insect Screen",
    category: "Insect Screen Systems",
    type: "screen",
    openingStyle: "Insect Screen",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    description: "Premium accordion plisse insect screen. The mesh folds into a neat zigzag stack when slid open, requiring virtually zero storage slot.",
    glassOptions: "Not Applicable (Equipped with High-durability Waterproof Polyester Mesh)",
    hardware: "Tension wire guide system, slim track bottom guide, magnetic closure",
    thermalBreak: false,
    openingType: "Plisse Accordion Folding Side-Slide"
  },
  {
    id: "dsgn-is-pm",
    name: "Pleated Mosquito Net",
    category: "Insect Screen Systems",
    type: "screen",
    openingStyle: "Insect Screen",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description: "Luxurious low-profile pleated mesh designed for large patio entries. Rust-proof alloy frame containing dust-resistant fiber screen net.",
    glassOptions: "Not Applicable (Concealed fiberglass pleat mesh structure)",
    hardware: "Quiet glider sliders, self-cleaning track brushes, magnetic seals",
    thermalBreak: false,
    openingType: "Pleated Barrier-Free Horizontal Slider"
  },
  {
    id: "dsgn-is-sm",
    name: "Sliding Mosquito Net",
    category: "Insect Screen Systems",
    type: "screen",
    openingStyle: "Insect Screen",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Sturdy framed mosquito net screen designed to slide smoothly inside dedicated tracks of GR and 3 Star triple-track sliding systems.",
    glassOptions: "Not Applicable (Equipped with SS-304 Stainless Steel metal mesh)",
    hardware: "Nylon sliders, structural heavy wire-mesh clips, pull handle",
    thermalBreak: false,
    openingType: "Heavy-Duty Track Sliding Screen"
  },
  {
    id: "dsgn-is-om",
    name: "Openable Mosquito Net",
    category: "Insect Screen Systems",
    type: "screen",
    openingStyle: "Insect Screen",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    description: "Classic swing-out insect screen frame, perfect for mounting on casement swing windows. Equipped with self-closing spring hinges.",
    glassOptions: "Not Applicable (Equipped with Fire-retardant Fiberglass Netting)",
    hardware: "Auto-closing spring hinges, magnetic locking blocks, grip handle",
    thermalBreak: false,
    openingType: "Swing Out Casement Screen"
  }
];

interface DesignGalleryProps {
  onAddToQuoteCart: (item: any) => void;
  triggerNotification: (text: string) => void;
}

export default function DesignGallery({ onAddToQuoteCart, triggerNotification }: DesignGalleryProps) {
  // Query States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedOpening, setSelectedOpening] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  // Card specific state (favourite and selected custom color)
  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem("barkat_design_favs");
    return saved ? JSON.parse(saved) : [];
  });

  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, string>>({});

  // Lightbox view state
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [activeLightboxColor, setActiveLightboxColor] = useState<string>("Matte Black");

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem("barkat_design_favs", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favourites.includes(id)) {
      setFavourites(prev => prev.filter(item => item !== id));
      triggerNotification("Removed design from your Bookmarks!");
    } else {
      setFavourites(prev => [...prev, id]);
      triggerNotification("Added design to your Bookmarks! Saved locally.");
    }
  };

  const handleShare = (design: DesignItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = cardSelectedColors[design.id] || "Matte Black";
    const shareText = `*Barkat Aluminium Gujrat - Luxury Catalogue*\nCheck out the premium *${design.name}* under *${design.category}* in *${chosenColor}*.\nOpening Type: ${design.openingType}.\nWhatsApp inquiry: wa.me/923324984083`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      triggerNotification("Copied brochure details & contact link to clipboard!");
    } else {
      triggerNotification("Sharing not supported in this frame, details copied!");
    }
  };

  // PDF Download Trigger
  const handleDownloadBrochure = (design: DesignItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = cardSelectedColors[design.id] || "Matte Black";
    
    // Create print-friendly layout
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      triggerNotification("Failed to open print portal. Check popup blockers!");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>${design.name} - Barkat Aluminium Digital Brochure</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #111;
              background: #fff;
              margin: 0;
              padding: 40px;
            }
            .header {
              border-bottom: 3px solid #C9A227;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .brand-name {
              font-size: 28px;
              font-weight: 900;
              letter-spacing: -1px;
            }
            .brand-name span {
              color: #C9A227;
            }
            .subtitle {
              font-size: 11px;
              font-family: 'JetBrains Mono', monospace;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-top: 5px;
            }
            .brochure-tag {
              font-family: 'JetBrains Mono', monospace;
              background: #F1E9D2;
              color: #8D6B10;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
            }
            .container {
              display: grid;
              grid-template-columns: 1fr 1.2fr;
              gap: 40px;
            }
            .img-box {
              border: 1px solid #eee;
              border-radius: 12px;
              overflow: hidden;
              background: #fafafa;
              height: 380px;
            }
            .img-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .details {
              display: flex;
              flex-col: column;
              justify-content: space-between;
            }
            .category-title {
              font-family: 'JetBrains Mono', monospace;
              color: #C9A227;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .design-name {
              font-size: 32px;
              font-weight: 800;
              margin: 10px 0 15px 0;
              letter-spacing: -1px;
            }
            .desc {
              font-size: 14px;
              color: #555;
              line-height: 1.6;
              margin-bottom: 25px;
            }
            .specs-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              background: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #eee;
              font-size: 13px;
              margin-bottom: 30px;
            }
            .spec-label {
              color: #888;
              font-size: 11px;
              text-transform: uppercase;
              font-family: 'JetBrains Mono', monospace;
              margin-bottom: 3px;
            }
            .spec-value {
              font-weight: 600;
            }
            .footer-info {
              margin-top: 60px;
              border-t: 1px solid #eee;
              padding-top: 20px;
              font-size: 11px;
              color: #777;
              display: flex;
              justify-content: space-between;
            }
            .dealer-info {
              font-weight: bold;
              color: #111;
            }
            @media print {
              .no-print { display: none; }
              body { padding: 20px; }
            }
            .print-btn {
              background: #C9A227;
              color: #111;
              border: none;
              padding: 10px 20px;
              font-size: 12px;
              font-weight: bold;
              border-radius: 6px;
              cursor: pointer;
              font-family: 'Inter', sans-serif;
              text-transform: uppercase;
              letter-spacing: 1px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="background: #111; padding: 15px; margin: -40px -40px 30px -40px; display: flex; justify-content: space-between; align-items: center; color: white;">
            <span style="font-size: 12px; font-weight: bold;">Barkat Aluminium - Premium Digital Brochure Hub</span>
            <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
          </div>

          <div class="header">
            <div>
              <div class="brand-name">BARKAT <span>ALUMINIUM</span></div>
              <div class="subtitle">Premium Luxury Aluminium & Glazing Systems</div>
            </div>
            <div class="brochure-tag">Specification Brochure</div>
          </div>

          <div class="container">
            <div class="img-box">
              <img src="${design.image}" alt="${design.name}" />
            </div>
            <div class="details">
              <div>
                <div class="category-title">${design.category}</div>
                <div class="design-name">${design.name}</div>
                <p class="desc">${design.description}</p>
                
                <div class="specs-grid">
                  <div>
                    <div class="spec-label">Selected Finish</div>
                    <div class="spec-value" style="color: #8D6B10;">${chosenColor}</div>
                  </div>
                  <div>
                    <div class="spec-label">Opening Type</div>
                    <div class="spec-value">${design.openingType}</div>
                  </div>
                  <div>
                    <div class="spec-label">Glazing Options</div>
                    <div class="spec-value">${design.glassOptions}</div>
                  </div>
                  <div>
                    <div class="spec-label">Hardware System</div>
                    <div class="spec-value">${design.hardware}</div>
                  </div>
                  <div>
                    <div class="spec-label">Thermal Break Cores</div>
                    <div class="spec-value">${design.thermalBreak ? (design.thermalBreakOption || "Yes, PA66 Core") : "Not Applicable"}</div>
                  </div>
                  <div>
                    <div class="spec-label">Dealer Network</div>
                    <div class="spec-value">GR & Prime Alloys Authorized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-info">
            <div>
              <span class="dealer-info">Authorized Dealer: GR Aluminium & Prime Aluminium</span><br/>
              Gujrat Road, Gujrat City, Pakistan
            </div>
            <div style="text-align: right;">
              Proprietor: <strong>Samair Aslam</strong><br/>
              Phone: +92 332 4984083 | Support: muhammadsufyan57000@gmail.com
            </div>
          </div>
          <script>
            // Auto open print trigger
            window.onload = function() {
              // window.print();
            }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    triggerNotification(`Opened print & PDF generator for ${design.name}!`);
  };

  const handleWhatsAppInquiry = (design: DesignItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const chosenColor = cardSelectedColors[design.id] || "Matte Black";
    const message = `Assalamu Alaikum Barkat Aluminium!\nI am interested in getting a rate quote for the premium architectural design:\n\n*Design:* ${design.name}\n*Category:* ${design.category}\n*Finish Finish:* ${chosenColor}\n*Glass Spec:* ${design.glassOptions}\n*Hardware:* ${design.hardware}\n\nPlease share estimated rates per square foot and lead time for Gujrat. Thank you!`;
    window.open(`https://wa.me/923324984083?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleRequestQuote = (design: DesignItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = cardSelectedColors[design.id] || "Matte Black";
    
    let mappedCategory = Category.SLIDING_SYSTEMS;
    if (design.category === "Curtain Wall Systems") {
      mappedCategory = Category.CURTAIN_WALLS;
    } else if (design.category === "Insect Screen Systems") {
      mappedCategory = Category.HARDWARE_ACCESSORIES;
    } else if (design.category === "Fixed Windows" || design.category === "Openable Windows") {
      mappedCategory = Category.CASEMENT_SYSTEMS;
    } else if (design.category === "Doors" || design.category === "Multi-Panel Sliding Doors") {
      mappedCategory = Category.SLIDING_SYSTEMS;
    }

    // We construct a mock product that conforms perfectly to the Product interface in types.ts
    const mockProduct = {
      id: design.id,
      code: `DSGN-${design.id.toUpperCase()}`,
      name: `${design.name} (Design Template)`,
      category: mappedCategory,
      subCategory: design.category,
      brands: ["GR Aluminium", "Prime Aluminium"],
      colors: [chosenColor],
      thicknesses: ["1.6 mm", "2.0 mm"],
      length: "Custom Sized",
      weightRange: "Calculated upon size",
      isHardware: false,
      sectionShape: "outer-frame" as any,
      applications: [design.openingStyle, "Luxury Residence"],
      description: `${design.description} | Glazing: ${design.glassOptions} | Hardware: ${design.hardware}`
    };

    onAddToQuoteCart(mockProduct);
    triggerNotification(`Added ${design.name} (${chosenColor}) to Quote Cart!`);
  };

  // Filters logic
  const filteredDesigns = useMemo(() => {
    return DESIGN_GALLERY_ITEMS.filter(design => {
      // Search Query
      const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            design.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            design.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category Filter
      const matchesCategory = selectedCategory === "All" || design.category === selectedCategory;

      // Opening Style
      const matchesOpening = selectedOpening === "All" || design.openingStyle === selectedOpening;

      // Type Filter
      const matchesType = selectedType === "All" || design.type === selectedType;

      // Favourite filter
      const matchesFavourite = selectedColor !== "Favourites" || favourites.includes(design.id);

      // Color filter matching (since all designs support all finishes, we can just filter by general list or custom bookmarks)
      return matchesSearch && matchesCategory && matchesOpening && matchesType && matchesFavourite;
    });
  }, [searchQuery, selectedCategory, selectedOpening, selectedColor, selectedType, favourites]);

  const uniqueCategories = [
    "Sliding Windows", "Openable Windows", "Fixed Windows", "Doors", 
    "Multi-Panel Sliding Doors", "Curtain Wall Systems", "Thermal Break Systems", "Insect Screen Systems"
  ];

  return (
    <section className="space-y-10" id="design-gallery-section">
      {/* 1. International Premium Banner */}
      <div className="bg-[#111111] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="gallery-hero-banner">
        {/* Abstract background geometry */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 rounded-full bg-[#0A4D8C]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 rounded-full bg-[#C9A227]/15 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Award className="w-3 h-3 text-[#C9A227]" />
              Authorized GR & Prime Dealer
            </span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3 h-3" />
              Serving Gujrat District
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none text-white">
            Architectural <span className="text-gold-gradient font-black">Design Brochure</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Explore ready-to-use luxury sliding windows, thermal breaks, curtain walls, pivot doors, and plissee nets. Custom manufactured according to premium architectural blueprints using certified <strong className="text-white">GR Aluminium</strong> and <strong className="text-white">Prime Aluminium</strong> alloy billets.
          </p>
          <div className="text-[10px] sm:text-xs font-mono text-slate-400 border-l-2 border-[#C9A227] pl-3 py-1 bg-white/5 rounded-r">
            Gujrat’s leading fabricator hub. Quality assurance led by proprietor <strong className="text-white">Samair Aslam</strong>.
          </div>
        </div>

        {/* Brand visual showcase */}
        <div className="relative shrink-0 flex flex-col items-end gap-2 text-right bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xs min-w-[220px]">
          <span className="text-[9px] font-mono font-black text-[#C9A227] tracking-widest uppercase">Premium Alloys</span>
          <div className="font-black text-xl text-white">GR & PRIME SYSTEM</div>
          <div className="text-[10px] text-gray-400 font-mono">100% Genuine billets</div>
          <div className="flex gap-1.5 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-white/20" title="Matte Black"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" title="Golden Finish"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" title="Silver Anodized"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#5C3A21]" title="Walnut Finish"></span>
          </div>
        </div>
      </div>

      {/* 2. Advanced Search & Double-Layer Filtering Dashboard */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6" id="gallery-filter-dashboard">
        {/* First Row: Search Input + Type Switchers */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch">
          {/* Search bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search premium designs by name, category, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#C9A227] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-rose-500 font-bold hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Segment Type Switchers */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/50 shrink-0">
            {[
              { id: "All", label: "All Items" },
              { id: "window", label: "Windows" },
              { id: "door", label: "Doors" },
              { id: "facade", label: "Curtain Walls" },
              { id: "screen", label: "Insect Nets" }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`text-[10px] sm:text-xs px-3 py-2 rounded-lg font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedType === type.id 
                    ? "bg-slate-900 text-white shadow-xs" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/30"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Favourites toggle */}
          <button
            onClick={() => setSelectedColor(selectedColor === "Favourites" ? "All" : "Favourites")}
            className={`flex items-center gap-1.5 text-xs px-4 py-3 rounded-xl font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              selectedColor === "Favourites"
                ? "bg-rose-50 border-rose-200 text-rose-600 shadow-2xs"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Heart className={`w-4 h-4 ${selectedColor === "Favourites" ? "fill-rose-500 text-rose-500" : ""}`} />
            <span>Bookmarks ({favourites.length})</span>
          </button>
        </div>

        {/* Second Row: Detailed Dropdown Filter Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest block">Design Category</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl p-3 font-bold outline-hidden focus:border-[#C9A227] cursor-pointer appearance-none"
              >
                <option value="All">All Categories ({uniqueCategories.length})</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Opening Style Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest block">Opening Mechanism</label>
            <div className="relative">
              <select
                value={selectedOpening}
                onChange={(e) => setSelectedOpening(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl p-3 font-bold outline-hidden focus:border-[#C9A227] cursor-pointer appearance-none"
              >
                <option value="All">All Opening Styles</option>
                <option value="Sliding">Sliding Mechanisms</option>
                <option value="Openable">Openable Casements</option>
                <option value="Fixed">Fixed Non-Opening</option>
                <option value="Folding">Accordion Folding</option>
                <option value="Pivot">Heavy Offset Pivots</option>
                <option value="Insect Screen">Insect Nets</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Thermal Break Badge quick filter */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest block">Core Technology</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedCategory("Thermal Break Systems");
                  setSelectedOpening("All");
                }}
                className={`flex-1 text-center text-xs py-3 rounded-xl font-bold transition-all border ${
                  selectedCategory === "Thermal Break Systems"
                    ? "bg-[#0A4D8C]/15 border-[#0A4D8C]/30 text-[#0A4D8C] font-black shadow-2xs"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                Thermal Break Only
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Insect Screen Systems");
                  setSelectedOpening("All");
                }}
                className={`flex-1 text-center text-xs py-3 rounded-xl font-bold transition-all border ${
                  selectedCategory === "Insect Screen Systems"
                    ? "bg-slate-900 border-slate-800 text-white font-black"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                Insect Screen Only
              </button>
            </div>
          </div>
        </div>

        {/* Reset Filter Bar */}
        {(selectedCategory !== "All" || selectedOpening !== "All" || selectedType !== "All" || selectedColor !== "All" || searchQuery) && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">
              Found <strong className="text-slate-800">{filteredDesigns.length}</strong> matching architectural designs
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedOpening("All");
                setSelectedType("All");
                setSelectedColor("All");
                setSearchQuery("");
              }}
              className="text-[11px] font-black uppercase text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer tracking-wider"
            >
              <X className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* 3. Designs Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" id="designs-grid-container">
        <AnimatePresence mode="popLayout">
          {filteredDesigns.map((design) => {
            const isFav = favourites.includes(design.id);
            const currentSelectedColor = cardSelectedColors[design.id] || "Matte Black";
            const currentHexObj = COLOR_OPTIONS.find(col => col.name === currentSelectedColor) || COLOR_OPTIONS[0];

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={design.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden hover:shadow-xl hover:border-[#C9A227]/30 transition-all duration-300 flex flex-col justify-between group/card relative"
                id={`design-card-${design.id}`}
              >
                {/* Image Showcase Box with Hover-to-Zoom */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-50 border-b border-slate-100 shrink-0 z-10">
                  {/* Custom Hover-to-Zoom Image Magnifier component */}
                  <InteractiveMagnifier scale={2.5} lensSize={130}>
                    <img 
                      src={design.image} 
                      alt={design.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-102"
                      loading="lazy"
                    />
                  </InteractiveMagnifier>

                  {/* Dark transparent gradient cover for header icons visibility */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Top floating controls */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                    <span className="text-[9px] font-black font-mono uppercase tracking-widest bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded border border-white/10 shadow-xs">
                      {design.category}
                    </span>

                    <div className="flex gap-1.5">
                      {/* Heart Bookmark */}
                      <button 
                        onClick={(e) => toggleFavourite(design.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                          isFav 
                            ? "bg-rose-500/90 text-white border border-rose-500" 
                            : "bg-black/40 hover:bg-black/60 text-white border border-white/10"
                        }`}
                        title="Add to Favourites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-white" : ""}`} />
                      </button>

                      {/* Share link */}
                      <button 
                        onClick={(e) => handleShare(design, e)}
                        className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
                        title="Copy brochure message"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* High Quality Technology Overlay badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-20 pointer-events-none">
                    {design.thermalBreak && (
                      <span className="text-[8px] font-mono font-black uppercase tracking-wider bg-[#0A4D8C] text-white px-2 py-0.5 rounded shadow-xs border border-[#0A4D8C]/30 flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        Thermal Break
                      </span>
                    )}
                    {design.openingStyle === "Insect Screen" && (
                      <span className="text-[8px] font-mono font-black uppercase tracking-wider bg-amber-600 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        Insect Protection
                      </span>
                    )}
                  </div>

                  {/* Lightbox Trigger icon */}
                  <button
                    onClick={() => {
                      setSelectedDesign(design);
                      setActiveLightboxColor(currentSelectedColor);
                    }}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover/card:opacity-100 z-20 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>View Lightbox</span>
                  </button>
                </div>

                {/* Body Details Layout */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-black font-display text-slate-900 leading-tight tracking-tight group-hover/card:text-[#0A4D8C] transition-colors">
                        {design.name}
                      </h3>
                      <span className="text-[10px] font-mono font-black uppercase text-[#C9A227] bg-[#C9A227]/5 border border-[#C9A227]/10 px-2 py-0.5 rounded-sm shrink-0">
                        {design.openingStyle}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {design.description}
                    </p>

                    {/* Dynamic color finish picker */}
                    <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-mono font-black text-slate-400 uppercase tracking-wider">Select Finish</span>
                        <span className="font-black font-mono text-slate-700 uppercase">{currentSelectedColor}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {COLOR_OPTIONS.map((col) => {
                          const isSelected = currentSelectedColor === col.name;
                          return (
                            <button
                              key={col.id}
                              onClick={() => setCardSelectedColors(prev => ({ ...prev, [design.id]: col.name }))}
                              className={`w-4 h-4 rounded-full transition-all relative border ${
                                isSelected 
                                  ? "ring-2 ring-[#C9A227] ring-offset-1 scale-110" 
                                  : "border-slate-300 hover:scale-105"
                              }`}
                              style={{ background: col.hex }}
                              title={col.name}
                            >
                              {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[3] mix-blend-difference" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Architectural Specifications Table */}
                    <div className="text-[11px] space-y-1.5 pt-1.5 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-mono uppercase tracking-wider">Opening Type:</span>
                        <span className="text-slate-700 font-bold text-right truncate max-w-[160px]" title={design.openingType}>{design.openingType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-mono uppercase tracking-wider">Glass Glazing:</span>
                        <span className="text-slate-700 font-bold text-right truncate max-w-[160px]" title={design.glassOptions}>{design.glassOptions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-mono uppercase tracking-wider">Hardware:</span>
                        <span className="text-slate-700 font-bold text-right truncate max-w-[160px]" title={design.hardware}>{design.hardware}</span>
                      </div>
                      {design.thermalBreak && (
                        <div className="flex justify-between items-center text-[#0A4D8C]">
                          <span className="font-mono uppercase tracking-wider text-[#0A4D8C]/80">Thermal Break:</span>
                          <span className="font-black text-right truncate max-w-[160px]" title={design.thermalBreakOption || "Included"}>
                            {design.thermalBreakOption || "High Insulation PA66"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                      {/* WhatsApp Inquiry */}
                      <button
                        onClick={(e) => handleWhatsAppInquiry(design, e)}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 border border-emerald-500/25 px-3 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                        <span>WhatsApp</span>
                      </button>

                      {/* Request Quote adding to quote cart */}
                      <button
                        onClick={(e) => handleRequestQuote(design, e)}
                        className="bg-[#C9A227] hover:bg-[#B59121] text-slate-900 px-3 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add Quote</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Download Brochure PDF print trigger */}
                      <button
                        onClick={(e) => handleDownloadBrochure(design, e)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Print Spec PDF</span>
                      </button>

                      {/* Details specs preview */}
                      <button
                        onClick={() => {
                          setSelectedDesign(design);
                          setActiveLightboxColor(currentSelectedColor);
                        }}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60 px-2.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Inspect Brochure</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State illustration if filters yield 0 */}
      {filteredDesigns.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-16 text-center space-y-4" id="empty-designs-state">
          <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Sliders className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold font-display text-lg text-slate-800">No matching luxury designs found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your search query, choosing &ldquo;All Categories&rdquo;, or selecting different window/door types.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedOpening("All");
              setSelectedType("All");
              setSelectedColor("All");
              setSearchQuery("");
            }}
            className="bg-slate-900 text-white font-black uppercase tracking-widest text-xs px-5 py-3 rounded-xl transition-all hover:bg-slate-800"
          >
            Show All Designs
          </button>
        </div>
      )}

      {/* 4. Full Featured Lightbox Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" id="lightbox-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-lg"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative z-10 border border-white/10 flex flex-col max-h-[90vh]"
              id="lightbox-modal-box"
            >
              {/* Header */}
              <div className="bg-slate-900 px-6 py-4.5 border-b border-[#C9A227]/20 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] animate-ping" />
                  <span className="text-xs font-mono font-black tracking-widest text-[#C9A227] uppercase">
                    BARKAT ALUMINIUM &bull; DIGITAL BROCHURE LIGHTBOX
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content - Scrollable if content exceeds bounds */}
              <div className="overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-12">
                {/* Left Side: Premium Image Stage */}
                <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-center items-center relative min-h-[300px] md:min-h-[450px]">
                  {/* Absolute subtle background text */}
                  <div className="absolute text-[80px] font-black text-white/2 font-display pointer-events-none tracking-tighter select-none">
                    ALUMINIUM
                  </div>

                  {/* Interactive zoom image viewer */}
                  <div className="w-full h-full max-h-[380px] rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl relative">
                    <InteractiveMagnifier scale={2.8} lensSize={160} isDarkTheme={true}>
                      <img 
                        src={selectedDesign.image} 
                        alt={selectedDesign.name} 
                        className="w-full h-full object-cover"
                      />
                    </InteractiveMagnifier>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 flex items-center gap-1.5 text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest select-none">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Hover/Drag on Image to Magnify Extrusion Junctions</span>
                  </div>
                </div>

                {/* Right Side: Specifications Panel */}
                <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Category Label */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-black text-[#C9A227] tracking-widest uppercase bg-[#C9A227]/5 px-2.5 py-1 rounded">
                        {selectedDesign.category}
                      </span>
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest border border-slate-200 px-2 py-0.5 rounded">
                        {selectedDesign.openingStyle} Style
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight leading-tight">
                      {selectedDesign.name}
                    </h2>

                    {/* Long Description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {selectedDesign.description}
                    </p>

                    {/* Selected Finish in Lightbox */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider">CHOSEN COATING FINISH</span>
                        <span className="text-xs font-black text-slate-800 font-mono uppercase">{activeLightboxColor}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {COLOR_OPTIONS.map((col) => {
                          const isSelected = activeLightboxColor === col.name;
                          return (
                            <button
                              key={col.id}
                              onClick={() => {
                                setActiveLightboxColor(col.name);
                                // Sync back to card Selected state
                                setCardSelectedColors(prev => ({ ...prev, [selectedDesign.id]: col.name }));
                              }}
                              className={`w-5 h-5 rounded-full transition-all relative border ${
                                isSelected 
                                  ? "ring-2 ring-[#C9A227] ring-offset-2 scale-110" 
                                  : "border-slate-300 hover:scale-105"
                              }`}
                              style={{ background: col.hex }}
                              title={col.name}
                            >
                              {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white stroke-[3] mix-blend-difference" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Specification Sheet */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-widest block">ARCHITECTURAL SPECIFICATION DATA</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Opening Style</span>
                          <span className="font-bold text-slate-800">{selectedDesign.openingType}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Glazing Standard</span>
                          <span className="font-bold text-slate-800">{selectedDesign.glassOptions}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Hardware Integration</span>
                          <span className="font-bold text-slate-800">{selectedDesign.hardware}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-150">
                          <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Thermal Break Core</span>
                          <span className="font-bold text-slate-800">
                            {selectedDesign.thermalBreak ? (selectedDesign.thermalBreakOption || "PA66 Polyamide Insulator") : "Not Applicable"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions area */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleWhatsAppInquiry(selectedDesign)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                      <span>WhatsApp Inquiry</span>
                    </button>

                    <button
                      onClick={(e) => {
                        handleRequestQuote(selectedDesign, e);
                        setSelectedDesign(null);
                      }}
                      className="flex-1 bg-[#C9A227] hover:bg-[#B59121] text-slate-900 px-5 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                      <span>Add Quote Request</span>
                    </button>

                    <button
                      onClick={(e) => handleDownloadBrochure(selectedDesign, e)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#C9A227]" />
                      <span>Print PDF Brochure</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Brand Authorized Dealer Signature Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0A4D8C]/10 rounded-full flex items-center justify-center text-[#0A4D8C]">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <span className="font-black text-slate-800 text-sm block">BARKAT ALUMINIUM CO. GUJRAT</span>
            <span className="text-[10px] tracking-wider uppercase">Authorized wholesale dealer for genuine GR and Prime Alloys profiles</span>
          </div>
        </div>
        <div className="text-right text-[11px] leading-relaxed">
          Proprietor: <span className="font-bold text-slate-800">Samair Aslam</span><br />
          Display Center: Gujrat City, Pakistan &bull; WhatsApp Support: <strong className="text-[#0A4D8C]">+92 332 4984083</strong>
        </div>
      </div>
    </section>
  );
}
