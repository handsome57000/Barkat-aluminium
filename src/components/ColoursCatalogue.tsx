import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Sliders, Check, Info, Sparkles, Award, X, BookOpen, 
  Palette, ShoppingBag, Filter, ArrowUpDown, Flame, HelpCircle
} from "lucide-react";

export interface ColorItem {
  id: string;
  code: string;
  name: string;
  category: "American Best Powder Coatings" | "Pakistan's Best Powder Coatings" | "Textured & Antique Finishes" | "Aluminium Wood Styles";
  hex: string;
  finish: "High Gloss" | "Dead Matt" | "Semi Matt" | "Textured" | "Coarse Textured" | "Antique Finish" | "Wood Grain";
  glossLevel: "gloss" | "matt" | "textured" | "wood";
  colorGroup: "white-cream" | "grey" | "brown-beige" | "colorful" | "wood" | "dark";
  description: string;
  isPopular?: boolean;
}

const COLOURS_DATA: ColorItem[] = [
  // 1. AMERICAN BEST POWDER COATINGS (Pages 2)
  {
    id: "am-9001-hg",
    code: "GR 9001 HG",
    name: "Cream High Gloss",
    category: "American Best Powder Coatings",
    hex: "#FDFCF0",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Premium American-specification off-white cream finish with elegant reflective sheen and maximum durability.",
    isPopular: true
  },
  {
    id: "am-9003-hg",
    code: "GR 9003 HG",
    name: "Signal White High Gloss",
    category: "American Best Powder Coatings",
    hex: "#FFFFFF",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Ultra-pure classic white with highly polished glossy finish, delivering maximum light reflection and clean architectural lines."
  },
  {
    id: "am-9016-hg",
    code: "GR 9016 HG",
    name: "Traffic White High Gloss",
    category: "American Best Powder Coatings",
    hex: "#F4F7F4",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Crisp architectural white with brilliant gloss, suitable for modern residential glazing and commercial curtain walls."
  },
  {
    id: "am-9016-dm",
    code: "GR 9016 DM",
    name: "Traffic White Dead Matt",
    category: "American Best Powder Coatings",
    hex: "#EAEBEA",
    finish: "Dead Matt",
    glossLevel: "matt",
    colorGroup: "white-cream",
    description: "Non-reflective luxury dead matt traffic white for highly elegant, glare-free minimalist window structures."
  },
  {
    id: "am-9003-dm",
    code: "GR 9003 DM",
    name: "Signal White Dead Matt",
    category: "American Best Powder Coatings",
    hex: "#FCFCFC",
    finish: "Dead Matt",
    glossLevel: "matt",
    colorGroup: "white-cream",
    description: "Ultra-matte pure white powder finish that resists fingerprints and creates a soft, chalky modern look.",
    isPopular: true
  },
  {
    id: "am-9017-hg",
    code: "GR 9017 HG",
    name: "Traffic Black High Gloss",
    category: "American Best Powder Coatings",
    hex: "#1C1D21",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "dark",
    description: "Rich black high gloss with piano-like polished reflectivity, framing glass in high-contrast luxury."
  },
  {
    id: "am-9011-hg",
    code: "GR 9011 HG",
    name: "Graphite Black High Gloss",
    category: "American Best Powder Coatings",
    hex: "#27292B",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "dark",
    description: "Slightly warmer graphite charcoal tone in brilliant high gloss, perfect for dual-tone profile configurations."
  },
  {
    id: "am-7102-hg",
    code: "GR 7102 HG",
    name: "Light Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#C5C7C4",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Elegant standard grey with highly polished reflective gloss, popular in industrial and high-rise office layouts."
  },
  {
    id: "am-9010-hg",
    code: "GR 9010 HG",
    name: "Pure White High Gloss",
    category: "American Best Powder Coatings",
    hex: "#F7F9F6",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Luminous white with highly polished protective finish, excellent for exterior sliding profiles exposed to sunlight."
  },
  {
    id: "am-9104-hg",
    code: "GR 9104 HG",
    name: "Cream Silk High Gloss",
    category: "American Best Powder Coatings",
    hex: "#F5F3E5",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Smooth cream with golden yellow undertones, adding a warm traditional aesthetic to casement profiles."
  },
  {
    id: "am-9103-hg",
    code: "GR 9103 HG",
    name: "Pale Lavender Gloss",
    category: "American Best Powder Coatings",
    hex: "#D4D5E6",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "colorful",
    description: "A unique pastel blue-lavender high gloss finish, engineered for special creative projects."
  },
  {
    id: "am-1100-hg",
    code: "GR 1100 HG",
    name: "Champagne High Gloss",
    category: "American Best Powder Coatings",
    hex: "#EADAA2",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "brown-beige",
    description: "Glossy luxury champagne metallic shade with light gold highlights, representing elite residential status.",
    isPopular: true
  },
  {
    id: "am-1015-hg",
    code: "GR 1015 HG",
    name: "Light Ivory High Gloss",
    category: "American Best Powder Coatings",
    hex: "#EAE3CD",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "Warm classic ivory gloss, giving a highly authentic colonial touch to sliding doors."
  },
  {
    id: "am-1002-hg",
    code: "GR 1002 HG",
    name: "Sand Yellow High Gloss",
    category: "American Best Powder Coatings",
    hex: "#E0AB34",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "colorful",
    description: "Bold glossy golden-yellow finish used for safety borders, accents, or distinctive architectural layouts."
  },
  {
    id: "am-4100-sm",
    code: "GR 4100 SM",
    name: "Smooth Cocoa Semi Matt",
    category: "American Best Powder Coatings",
    hex: "#806350",
    finish: "Semi Matt",
    glossLevel: "matt",
    colorGroup: "brown-beige",
    description: "Satiny smooth milk chocolate brown, providing an organic earth-tone casing for large villa openings."
  },
  {
    id: "am-7006-sm",
    code: "GR 7006 SM",
    name: "Beige Grey Semi Matt",
    category: "American Best Powder Coatings",
    hex: "#756B5E",
    finish: "Semi Matt",
    glossLevel: "matt",
    colorGroup: "grey",
    description: "Sophisticated grey-beige taupe finish with a smooth velvet-like matt surface, highly favored by contemporary designers."
  },
  {
    id: "am-7001-hg",
    code: "GR 7001 HG",
    name: "Silver Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#8F99A3",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "High-spec metallic silver-grey coating with high gloss protective seal against atmospheric corrosion."
  },
  {
    id: "am-7032-hg",
    code: "GR 7032 HG",
    name: "Pebble Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#B5B8AA",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Earthy greenish pebble grey with elegant glossy finish, blending with outdoor landscaping gardens."
  },
  {
    id: "am-7012-hg",
    code: "GR 7012 HG",
    name: "Basalt Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#596166",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Deep volcanic slate basalt grey gloss. Beautifully mirrors outdoor skies in luxury storefront systems."
  },
  {
    id: "am-7021-hg",
    code: "GR 7021 HG",
    name: "Black Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#2B3036",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "dark",
    description: "Ultra-dark navy charcoal black gloss, providing a premium alternative to standard pure black."
  },
  {
    id: "am-7024-hg",
    code: "GR 7024 HG",
    name: "Graphite Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#40464D",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Classic high gloss graphite grey, matching international luxury apartment standards."
  },
  {
    id: "am-7038-hg",
    code: "GR 7038 HG",
    name: "Agate Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#B8BCBE",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Lighter quartz/agate grey glossy finish, reflecting bright light and keeping profiles cool."
  },
  {
    id: "am-7041-hg",
    code: "GR 7041 HG",
    name: "Slate Grey High Gloss",
    category: "American Best Powder Coatings",
    hex: "#596168",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Elegantly balanced mid-dark slate grey with deep, durable shine."
  },
  {
    id: "am-7047-sm",
    code: "GR 7047 SM",
    name: "Telegrey Smooth Matt",
    category: "American Best Powder Coatings",
    hex: "#CFD2D6",
    finish: "Semi Matt",
    glossLevel: "matt",
    colorGroup: "grey",
    description: "Very smooth semi-matt light grey, often specified for premium double-glazed thermal break windows."
  },
  {
    id: "am-7024-edm",
    code: "GR 7024 EDM",
    name: "Graphite Grey Extra Dull Matt",
    category: "American Best Powder Coatings",
    hex: "#383C42",
    finish: "Dead Matt",
    glossLevel: "matt",
    colorGroup: "grey",
    description: "A highly prestigious, completely matte graphite coating with zero light reflection, producing a solid cast-metal appearance.",
    isPopular: true
  },
  {
    id: "am-8705-sm",
    code: "GR 8705 SM",
    name: "Espresso Black Semi Matt",
    category: "American Best Powder Coatings",
    hex: "#383533",
    finish: "Semi Matt",
    glossLevel: "matt",
    colorGroup: "dark",
    description: "Very deep coffee-tinted black finish with smooth silk matt shine. Resists wear and outdoor smog."
  },
  {
    id: "am-8007-hg",
    code: "GR 8007 HG",
    name: "Fawn Brown High Gloss",
    category: "American Best Powder Coatings",
    hex: "#6B4321",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "brown-beige",
    description: "Rich glossy chestnut fawn brown, styled to give metal an expensive traditional wood-like presence."
  },
  {
    id: "am-8017-hg",
    code: "GR 8017 HG",
    name: "Chocolate Brown High Gloss",
    category: "American Best Powder Coatings",
    hex: "#402A1D",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "brown-beige",
    description: "Deep dark chocolate glossy tone, popular for main entrance doors and exterior louvers."
  },
  {
    id: "am-8019-hg",
    code: "GR 8019 HG",
    name: "Grey Brown High Gloss",
    category: "American Best Powder Coatings",
    hex: "#3B322C",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "brown-beige",
    description: "Sooty grey-brown earth tone in highly polished protective gloss coating."
  },
  {
    id: "am-5102-hg",
    code: "GR 5102 HG",
    name: "Sparkling Blue High Gloss",
    category: "American Best Powder Coatings",
    hex: "#2C7BC0",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "colorful",
    description: "Brilliant royal blue with metallic sparkling gloss, ideal for distinctive showrooms or brand-specific setups."
  },

  // 2. PAKISTAN'S BEST POWDER COATINGS (Page 3)
  {
    id: "pk-9001-hg",
    code: "PK 9001 HG",
    name: "Econ Cream High Gloss",
    category: "Pakistan's Best Powder Coatings",
    hex: "#FAF9EB",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "white-cream",
    description: "High-yield local specification glossy cream, specifically engineered to withstand Pakistan's hot & humid monsoon climate."
  },
  {
    id: "pk-9003-dm",
    code: "PK 9003 DM",
    name: "Econ Signal White Matte",
    category: "Pakistan's Best Powder Coatings",
    hex: "#FAF8F8",
    finish: "Dead Matt",
    glossLevel: "matt",
    colorGroup: "white-cream",
    description: "Extremely popular white matte locally coated finish offering best value with elegant non-glare surface."
  },
  {
    id: "pk-1100-hg",
    code: "PK 1100 HG",
    name: "Econ Champagne Gold",
    category: "Pakistan's Best Powder Coatings",
    hex: "#E5D497",
    finish: "High Gloss",
    glossLevel: "gloss",
    colorGroup: "brown-beige",
    description: "The classic Gujrat & Lahore favorite premium light golden champagne glossy coating.",
    isPopular: true
  },
  {
    id: "pk-7024-edm",
    code: "PK 7024 EDM",
    name: "Econ Charcoal Matte",
    category: "Pakistan's Best Powder Coatings",
    hex: "#3D4148",
    finish: "Dead Matt",
    glossLevel: "matt",
    colorGroup: "grey",
    description: "Econ dead matt dark charcoal grey, delivering top-tier aesthetic style on a friendly budget."
  },

  // 3. TEXTURED & ANTIQUE FINISHES (Page 4)
  {
    id: "st-8003",
    code: "GR 8003 ST",
    name: "Copper Brown Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#9A602E",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "brown-beige",
    description: "Rough, sand-blasted texture in rich copper brown. Resists scratches, impact, and hides micro-dust beautifully.",
    isPopular: true
  },
  {
    id: "st-8011",
    code: "GR 8011 ST",
    name: "Mahogany Dark Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#5A391C",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "brown-beige",
    description: "Coarse granular wood-colored sand texture, perfect for rustic gates and high-end exterior panels."
  },
  {
    id: "st-8012",
    code: "GR 8012 ST",
    name: "Crimson Red Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#7D2229",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "colorful",
    description: "Bold textured deep brick-red coating with coarse touch feel, designed for custom accent sections."
  },
  {
    id: "st-7024",
    code: "GR 7024 ST",
    name: "Graphite Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#3C4146",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "grey",
    description: "Modern architectural graphite grey with deep textured grit, incredibly popular for premium villa window systems."
  },
  {
    id: "st-9005",
    code: "GR 9005 ST",
    name: "Pitch Black Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#1E1E1E",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "dark",
    description: "The ultimate rugged matte black finish with coarse granular grit. Offers maximum modern style and scratch protection.",
    isPopular: true
  },
  {
    id: "finish-sahara",
    code: "GR Sahara Champagne",
    name: "Sahara Champagne Metallic",
    category: "Textured & Antique Finishes",
    hex: "#C5B38F",
    finish: "Coarse Textured",
    glossLevel: "textured",
    colorGroup: "brown-beige",
    description: "Glistening sand-textured metallic beige gold that emulates Sahara Desert sand dunes. Sparkling golden touch."
  },
  {
    id: "finish-aztec",
    code: "GR Aztec Grey",
    name: "Aztec Volcanic Grey",
    category: "Textured & Antique Finishes",
    hex: "#50535A",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "grey",
    description: "Textured dark concrete grey that mimics cold volcanic basalt stone. Delivers an industrial brutalist edge."
  },
  {
    id: "finish-atlantis",
    code: "GR Atlantis Grey-Blue",
    name: "Atlantis Ocean Texture",
    category: "Textured & Antique Finishes",
    hex: "#434F5D",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "grey",
    description: "Beautiful slate grey blended with ocean blue, topped with granular sand grit."
  },
  {
    id: "finish-diamond-blue",
    code: "GR Diamond Blue Sparkle",
    name: "Diamond Blue Textured",
    category: "Textured & Antique Finishes",
    hex: "#1E4A7C",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "colorful",
    description: "Premium metallic cobalt blue with intense sparkle elements and coarse texture. Incredibly striking."
  },
  {
    id: "finish-silver-smooth",
    code: "GR Silver Smooth",
    name: "Silver Smooth Metallic",
    category: "Textured & Antique Finishes",
    hex: "#BCC6CC",
    finish: "Semi Matt",
    glossLevel: "gloss",
    colorGroup: "grey",
    description: "Satin metallic silver with subtle light reflection, emulating clean anodised natural finish with premium powder durability."
  },
  {
    id: "finish-golden-smooth",
    code: "GR Golden Smooth",
    name: "Golden Smooth Satin",
    category: "Textured & Antique Finishes",
    hex: "#D4AF37",
    finish: "Semi Matt",
    glossLevel: "gloss",
    colorGroup: "colorful",
    description: "Bright royal gold with satin gloss finish. Highly luxury option for decorative dividers and luxury screen sets."
  },
  {
    id: "finish-silver-antique",
    code: "GR Silver Antique",
    name: "Hammered Silver Antique",
    category: "Textured & Antique Finishes",
    hex: "repeating-radial-gradient(#D3D3D3, #111)",
    finish: "Antique Finish",
    glossLevel: "textured",
    colorGroup: "grey",
    description: "Veined hammer-tone antique texture with dynamic black and silver ripples, creating an ancient wrought iron charm.",
    isPopular: true
  },
  {
    id: "finish-golden-antique",
    code: "GR Golden Antique",
    name: "Hammered Gold Antique",
    category: "Textured & Antique Finishes",
    hex: "repeating-radial-gradient(#B8860B, #111)",
    finish: "Antique Finish",
    glossLevel: "textured",
    colorGroup: "brown-beige",
    description: "Luxury hammer-tone antique finish with bronze-gold and charcoal black veins, bringing rustic elegance to front door handles."
  },
  {
    id: "finish-9003t",
    code: "GR 9003 T",
    name: "Pure White Sand Texture",
    category: "Textured & Antique Finishes",
    hex: "#FAFAFA",
    finish: "Textured",
    glossLevel: "textured",
    colorGroup: "white-cream",
    description: "Beautiful chalk white with micro-sand textured layer, blocking dirt and retaining white aesthetic indefinitely."
  },
  {
    id: "finish-1100ct",
    code: "GR 1100 CT",
    name: "Champagne Coarse Textured",
    category: "Textured & Antique Finishes",
    hex: "#E0CCA3",
    finish: "Coarse Textured",
    glossLevel: "textured",
    colorGroup: "brown-beige",
    description: "Classic golden champagne shade with heavily granulated coarse texture, highly recommended for outdoor gate sets."
  },

  // 4. ALUMINIUM WOOD STYLES (Page 5)
  {
    id: "wood-915",
    code: "Code 915",
    name: "Natural Golden Honey Oak",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #B48A53, #8F6030)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Bright honey oak wood effect with fine straight golden grains, ideal for warm interior partition sets.",
    isPopular: true
  },
  {
    id: "wood-917",
    code: "Code 917",
    name: "Pale Cherry / Natural Maple",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #D2A679, #9B6F43)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Light pastel yellowish cherry style wood grain with highly subtle swirl patterns, adding space and warmth to any room."
  },
  {
    id: "wood-815",
    code: "Code 815",
    name: "Royal Golden Teak",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #7D4F27, #4E2E10)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Elegant reddish-brown teakwood with high-contrast darker veins. The classic choice for premium office entrance doors.",
    isPopular: true
  },
  {
    id: "wood-133",
    code: "Code 133",
    name: "Dark Olive Walnut",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #5A3D28, #30200C)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Luxury deep olive brown walnut grain with rich chocolate patterns, mimicking dense high-end structural timber."
  },
  {
    id: "wood-935",
    code: "Code 935",
    name: "Elite Imperial Mahogany",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #802A2A, #4A1515)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Deep red-burgundy mahogany wood finish with strong, authoritative grain lines. Best match for luxury classic residences."
  },
  {
    id: "wood-916",
    code: "Code 916",
    name: "Vintage Pine Wood",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #556B2F, #3D4F1D)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Unique forest-tinted pine with subtle greenish wood tones, perfect for garden-facing lounge sliders."
  },
  {
    id: "wood-807",
    code: "Code 807",
    name: "Dark Rustic Espresso Walnut",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #3D2314, #1C0F0B)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Extremely dark espresso black-brown wood grains, offering absolute modern minimalism paired with natural timber texture."
  },
  {
    id: "wood-16",
    code: "Code 16",
    name: "Classic Beech Wood",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #D8A060, #A06828)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Light and airy beige-golden beech style with straight fine uniform pores."
  },
  {
    id: "wood-115",
    code: "Code 115",
    name: "Medium Golden Oak",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #C68E4F, #8E5A1F)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Highly requested mid-tone oak finish, combining gold reflections and rich brown streaks."
  },
  {
    id: "wood-107",
    code: "Code 107",
    name: "Tiger Zebrawood",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #9C663C, #4D2D1B)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Dramatic tiger-stripe wood style with highly pronounced light and dark bands, adding maximum visual character."
  },
  {
    id: "wood-816",
    code: "Code 816",
    name: "Antique Weathered Walnut",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #6E472A, #3A2211)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Earthy weathered walnut with realistic fine cracks and rustic knots simulated across the profile width."
  },
  {
    id: "wood-817",
    code: "Code 817",
    name: "Deep Obsidian Wenge Wood",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #2C1A14, #0F0907)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "A solid charcoal-brown wenge wood pattern that appears nearly black from afar but reveals beautiful timber grain up close."
  },
  {
    id: "wood-806",
    code: "Code 806",
    name: "Rich Spanish Cedar",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #8E3524, #501D11)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Warm Spanish cedar red-brown finish with soft, uniform grain patterns."
  },
  {
    id: "wood-905",
    code: "Code 905",
    name: "Lustrous Western Red Cedar",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #B56545, #7D3F25)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Classic cedar finish showing rich reddish-amber variations and clean parallel grain lines."
  },
  {
    id: "wood-10",
    code: "Code 10",
    name: "Premium Siberian Ash",
    category: "Aluminium Wood Styles",
    hex: "linear-gradient(to right, #E2B38E, #AA7B58)",
    finish: "Wood Grain",
    glossLevel: "wood",
    colorGroup: "wood",
    description: "Light beige ash timber look, perfect for warm organic minimalist environments."
  }
];

interface ColoursCatalogueProps {
  onSelectColour?: (colourName: string) => void;
  selectedColorState?: string;
  triggerNotification: (msg: string) => void;
}

export default function ColoursCatalogue({ onSelectColour, selectedColorState, triggerNotification }: ColoursCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeColour, setActiveColour] = useState<ColorItem | null>(null);

  const categories = ["All", "American Best Powder Coatings", "Pakistan's Best Powder Coatings", "Textured & Antique Finishes", "Aluminium Wood Styles"];
  const colorGroups = [
    { label: "All Hues", value: "All" },
    { label: "Whites & Creams", value: "white-cream" },
    { label: "Greys & Slates", value: "grey" },
    { label: "Browns & Beiges", value: "brown-beige" },
    { label: "Wood Grains", value: "wood" },
    { label: "Charcoal & Darks", value: "dark" },
    { label: "Special Colors", value: "colorful" }
  ];

  // Search and filter logic
  const filteredColours = useMemo(() => {
    return COLOURS_DATA.filter(col => {
      const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            col.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            col.finish.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = selectedCategory === "All" || col.category === selectedCategory;
      const matchesGroup = selectedGroup === "All" || col.colorGroup === selectedGroup;

      return matchesSearch && matchesCat && matchesGroup;
    });
  }, [searchQuery, selectedCategory, selectedGroup]);

  // Handle color selection
  const handleColorClick = (col: ColorItem) => {
    setActiveColour(col);
  };

  const handlePickColor = (col: ColorItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectColour) {
      onSelectColour(col.code);
      triggerNotification(`"${col.code}" preferred finish selected for quote forms!`);
    } else {
      triggerNotification(`Selected "${col.code}". Add items to quote cart to apply.`);
    }
    setActiveColour(null);
  };

  // Helper to render beautiful visual swatches
  const renderSwatch = (col: ColorItem) => {
    const isWood = col.glossLevel === "wood";
    const isAntique = col.finish === "Antique Finish";
    
    let style: React.CSSProperties = {};
    if (isWood) {
      style = { background: col.hex };
    } else if (isAntique) {
      if (col.id === "finish-silver-antique") {
        style = {
          backgroundColor: "#4D4D4D",
          backgroundImage: "radial-gradient(circle, #D3D3D3 20%, #111111 100%)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)"
        };
      } else {
        style = {
          backgroundColor: "#3A2800",
          backgroundImage: "radial-gradient(circle, #B8860B 20%, #111111 100%)",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)"
        };
      }
    } else {
      style = { backgroundColor: col.hex };
    }

    return (
      <div 
        className="w-full h-36 rounded-lg relative overflow-hidden shadow-xs border border-slate-200/60 group-hover:shadow-md transition-all duration-300"
        style={style}
      >
        {/* Subtle lighting shine effect for High Gloss */}
        {col.glossLevel === "gloss" && (
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-white/40 pointer-events-none transform -skew-x-12 translate-x-1/3" />
        )}

        {/* Textured gritty overlay for sand finishes */}
        {col.glossLevel === "textured" && (
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
               style={{
                 backgroundImage: "radial-gradient(#000 10%, transparent 11%), radial-gradient(#fff 10%, transparent 11%)",
                 backgroundSize: "4px 4px",
                 backgroundPosition: "0 0, 2px 2px"
               }} 
          />
        )}

        {/* Wood lines overlay for grain finishes */}
        {isWood && (
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                 backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 20px)",
               }}
          />
        )}

        {/* Selected badge overlay */}
        {selectedColorState === col.code && (
          <div className="absolute top-2 right-2 bg-[#C9A227] text-white rounded-full p-1.5 shadow-md flex items-center justify-center animate-pulse">
            <Check className="w-4 h-4 stroke-[3px]" />
          </div>
        )}

        {/* Finish label tag on hover */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider">
          {col.finish}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 py-2" id="colours-catalogue-main">
      {/* Tab Header Banner */}
      <div className="relative bg-slate-900 text-white rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10 shadow-lg border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            Official GR Aluminium Colours
          </div>
          <h1 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white uppercase">
            Colours & Wood Styles <span className="text-[#C9A227]">Catalogue</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Browse, inspect, and select original anodized, premium sand textured, antique hammered, and organic wood style powder coatings. Selected finishes automatically synchronize with your digital quote request sent to Samair Aslam at <strong>Barkat Aluminium</strong>.
          </p>
        </div>
      </div>

      {/* Control Dashboard Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4" id="colours-filter-dashboard">
        {/* Row 1: Search & Controls */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search colours by code or name... (e.g., 9016, Sahara, Walnut)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#C9A227] focus:bg-white text-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium outline-hidden transition-all shadow-3xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-mono text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              {colorGroups.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setSelectedGroup(g.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedGroup === g.value 
                      ? "bg-white text-slate-850 shadow-xs" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-3xs bg-white"
              title="Toggle View Mode"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 2: Category Filter Tabs */}
        <div className="overflow-x-auto pb-1" id="colour-categories-scroll">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-[#C9A227] text-slate-950 font-black shadow-xs" 
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat === "All" ? "All Coatings & Woods" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swatches Gallery Grid */}
      {filteredColours.length > 0 ? (
        <div 
          className={
            viewMode === "grid" 
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" 
              : "space-y-3"
          }
          id="colours-catalogue-gallery"
        >
          {filteredColours.map((col) => (
            <motion.div
              layout
              key={col.id}
              onClick={() => handleColorClick(col)}
              className={`bg-white rounded-xl border border-slate-200/80 p-3 shadow-3xs hover:border-[#C9A227] hover:shadow-xs transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                selectedColorState === col.code ? "ring-2 ring-[#C9A227] ring-offset-2" : ""
              }`}
            >
              {viewMode === "grid" ? (
                // GRID VIEW LAYOUT
                <div className="space-y-2.5">
                  {renderSwatch(col)}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider">{col.code}</span>
                      {col.isPopular && (
                        <span className="bg-amber-100 text-[#C9A227] text-[8px] font-black font-mono px-1 rounded uppercase">Popular</span>
                      )}
                    </div>
                    <h3 className="text-slate-800 text-xs font-extrabold tracking-tight truncate group-hover:text-[#C9A227] transition-colors">{col.name}</h3>
                    <p className="text-[10px] text-slate-500 font-sans truncate">{col.category}</p>
                  </div>
                </div>
              ) : (
                // LIST VIEW LAYOUT
                <div className="flex items-center gap-4">
                  <div className="w-24 shrink-0">
                    {renderSwatch(col)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono font-bold">{col.code}</span>
                      <span className="bg-slate-100 text-slate-600 text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider">{col.finish}</span>
                      {col.isPopular && (
                        <span className="bg-amber-100 text-[#C9A227] text-[8px] font-black font-mono px-1.5 rounded uppercase">Popular</span>
                      )}
                    </div>
                    <h3 className="text-slate-800 text-sm font-extrabold truncate">{col.name}</h3>
                    <p className="text-xs text-slate-500 font-sans truncate">{col.description}</p>
                  </div>
                  <div className="shrink-0 pr-2">
                    <button
                      onClick={(e) => handlePickColor(col, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedColorState === col.code 
                          ? "bg-amber-50 text-amber-700 border border-amber-200" 
                          : "bg-slate-100 hover:bg-[#C9A227] hover:text-slate-950 text-slate-700"
                      }`}
                    >
                      {selectedColorState === col.code ? "Selected" : "Select Finish"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-6" id="colours-empty-state">
          <Palette className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-800 font-extrabold text-sm uppercase">No Colours Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            We couldn't find any coatings matching "{searchQuery}" inside "{selectedCategory}". Try clearing your filters or testing other codes like "HG", "DM", or "ST".
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedGroup("All"); }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-[#C9A227] hover:text-slate-950 text-slate-700 text-xs font-bold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Detail Popup Modal */}
      <AnimatePresence>
        {activeColour && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="colour-detail-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-slate-200/80 shadow-2xl relative"
              id="colour-detail-modal"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveColour(null)}
                className="absolute top-4 right-4 bg-black/5 hover:bg-black/10 text-slate-700 hover:text-slate-900 rounded-full p-2 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Swatch Render Panel */}
              {(() => {
                const isWood = activeColour.glossLevel === "wood";
                const isAntique = activeColour.finish === "Antique Finish";
                
                let style: React.CSSProperties = {};
                if (isWood) {
                  style = { background: activeColour.hex };
                } else if (isAntique) {
                  if (activeColour.id === "finish-silver-antique") {
                    style = {
                      backgroundColor: "#4D4D4D",
                      backgroundImage: "radial-gradient(circle, #D3D3D3 20%, #111111 100%)",
                    };
                  } else {
                    style = {
                      backgroundColor: "#3A2800",
                      backgroundImage: "radial-gradient(circle, #B8860B 20%, #111111 100%)",
                    };
                  }
                } else {
                  style = { backgroundColor: activeColour.hex };
                }

                return (
                  <div className="w-full h-52 relative overflow-hidden flex items-end justify-between p-6" style={style}>
                    {/* Shiny overlays */}
                    {activeColour.glossLevel === "gloss" && (
                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
                    )}

                    {activeColour.glossLevel === "textured" && (
                      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                           style={{
                             backgroundImage: "radial-gradient(#000 10%, transparent 11%), radial-gradient(#fff 10%, transparent 11%)",
                             backgroundSize: "4px 4px",
                             backgroundPosition: "0 0, 2px 2px"
                           }} 
                      />
                    )}

                    {isWood && (
                      <div className="absolute inset-0 opacity-15 pointer-events-none"
                           style={{
                             backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 3px, transparent 3px, transparent 24px)",
                           }}
                      />
                    )}

                    <div className="relative z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-mono text-xs uppercase tracking-wider font-extrabold border border-white/10">
                      {activeColour.finish} Finish
                    </div>
                  </div>
                );
              })()}

              {/* Details Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono font-bold tracking-widest">{activeColour.code}</span>
                    <span className="bg-[#C9A227]/15 text-[#C9A227] text-[9px] font-mono px-2 py-0.5 rounded font-black uppercase">
                      {activeColour.category}
                    </span>
                  </div>
                  <h2 className="text-slate-800 text-xl font-extrabold font-sans uppercase">{activeColour.name}</h2>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans">{activeColour.description}</p>

                {/* Simulated Architectural Window Preview */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">Window Frame Simulation</span>
                  <div className="flex items-center gap-3">
                    {/* Simulated window corner */}
                    <div className="w-12 h-12 rounded border-4 relative overflow-hidden flex items-center justify-center bg-sky-100"
                         style={{ 
                           borderColor: activeColour.hex.startsWith("linear") ? "#8B5A2B" : activeColour.hex,
                           backgroundImage: activeColour.hex.startsWith("linear") ? activeColour.hex : undefined
                         }}
                    >
                      <div className="w-full h-0.5 bg-slate-300 absolute" />
                      <div className="h-full w-0.5 bg-slate-300 absolute" />
                      <div className="text-[8px] font-mono text-sky-600 font-extrabold absolute">Glass</div>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight">
                      This colour represents an elite finish style suitable for large double-glazed casement frames, security door sections, or custom sliding tracks.
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setActiveColour(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={(e) => handlePickColor(activeColour, e)}
                    className="bg-[#C9A227] hover:bg-[#b08b1b] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Select This Colour</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
