export enum Category {
  SLIDING_SYSTEMS = "Sliding Window & Door Systems",
  CASEMENT_SYSTEMS = "Casement (Swing) Systems",
  SHOP_FRONT_PARTITIONS = "Shop Front & Partitions",
  KITCHEN_PROFILES = "Kitchen Cabinet Profiles",
  CURTAIN_WALLS = "Curtain Wall Systems",
  PIPES_TUBES = "Aluminium Pipes & Tubes",
  CHANNELS_ANGLES = "Angles, Channels & Generals",
  HARDWARE_ACCESSORIES = "Hardware & Accessories",
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: Category;
  brands: string[];
  description: string;
  length: string;
  thicknesses: string[]; // e.g. ["1.2 mm", "1.6 mm", "2.0 mm"]
  colors: string[];
  weightRange: string; // e.g. "3.2 kg - 4.5 kg per piece"
  applications: string[];
  isHardware: boolean;
  subCategory?: string;
  sectionShape?: "double-track-top" | "double-track-bottom" | "interlock" | "lock-star" | "outer-frame" | "box" | "circle" | "square" | "rectangular" | "angle" | "u-channel" | "t-section" | "handle" | "hardware" | "hardware-suction" | "hardware-roller" | "hardware-lock" | "hardware-closer" | "hardware-hinge" | "hardware-handle" | "hardware-strip" | "hardware-tool" | "hardware-spacer" | "hardware-mesh" | "hardware-screw" | "hardware-bracket";
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  selectedThickness?: string;
  selectedColor?: string;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  city: string;
  address?: string;
  message?: string;
  items: QuoteItem[];
  createdAt: string;
  status: "pending" | "completed" | "cancelled";
}
