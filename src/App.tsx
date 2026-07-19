import React, { useState, useEffect, useMemo } from "react";
import { 
  Phone, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  ShoppingCart, 
  MapPin, 
  User, 
  Award, 
  ShieldCheck, 
  Layers, 
  Wrench, 
  ArrowRight, 
  FileText, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  Building, 
  ChevronRight,
  ChevronLeft,
  Info,
  Sliders,
  Sparkles,
  ExternalLink,
  Locate,
  Share2,
  Compass,
  BookOpen,
  Palette
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Category, Product, QuoteItem, QuoteRequest } from "./types";
import { PRODUCTS, BRANDS, COLORS, GAUGES } from "./data/products";
import ProfileIcon from "./components/ProfileIcon";
import InteractiveMagnifier from "./components/InteractiveMagnifier";

// Import premium redesigned components
import WhyChooseUs from "./components/WhyChooseUs";
import CustomerReviews from "./components/CustomerReviews";
import GallerySection from "./components/GallerySection";
import DesignGallery from "./components/DesignGallery";
import ColoursCatalogue from "./components/ColoursCatalogue";

export interface PDFSection {
  name: string;
  subCategory: string;
  page: string;
  category: Category;
  isHardware?: boolean;
}

const PDF_SECTIONS_INDEX: PDFSection[] = [
  { name: "Deluxe Fixed Glazing Sections", subCategory: "Deluxe Fixed Glazing Sections", page: "07", category: Category.SLIDING_SYSTEMS },
  { name: "Economy Fixed Glazing Sections", subCategory: "Economy Fixed Glazing Sections", page: "08", category: Category.SLIDING_SYSTEMS },
  { name: "Pharmacy Profiles", subCategory: "Pharmacy Profiles", page: "08", category: Category.SLIDING_SYSTEMS },
  { name: "Economy Box Sliding Window Sections", subCategory: "Economy Box Sliding Window Sections", page: "09-10", category: Category.SLIDING_SYSTEMS },
  { name: "Single Door Sliding Sections", subCategory: "Single Door Sliding Sections", page: "10", category: Category.SLIDING_SYSTEMS },
  { name: "Deluxe Swing Door Sections", subCategory: "Deluxe Swing Door Sections", page: "11", category: Category.CASEMENT_SYSTEMS },
  { name: "Netting Sections", subCategory: "Netting Sections", page: "12", category: Category.SLIDING_SYSTEMS },
  { name: "Box Sliding Window Sections", subCategory: "Box Sliding Window Sections", page: "13-16", category: Category.SLIDING_SYSTEMS },
  { name: "Box & Fix Door Window Sections", subCategory: "Box & Fix Door Window Sections", page: "17", category: Category.SLIDING_SYSTEMS },
  { name: "Fix & Openable Door Frame Sections", subCategory: "Fix & Openable Door Frame Sections", page: "18-19", category: Category.CASEMENT_SYSTEMS },
  { name: "Fix & Openable Door Window Sections", subCategory: "Fix & Openable Door Window Sections", page: "20-21", category: Category.CASEMENT_SYSTEMS },
  { name: "Economy Sliding Window Sections", subCategory: "Economy Sliding Window Sections", page: "22", category: Category.SLIDING_SYSTEMS },
  { name: "Deluxe Sliding Window Sections", subCategory: "Deluxe Sliding Window Sections", page: "23", category: Category.SLIDING_SYSTEMS },
  { name: "Textile Sections", subCategory: "Textile Sections", page: "23", category: Category.SLIDING_SYSTEMS },
  { name: "A-L Series Door Sections", subCategory: "A-L Series Door Sections", page: "24", category: Category.CASEMENT_SYSTEMS },
  { name: "Decorative Sections", subCategory: "Decorative Sections", page: "25", category: Category.SHOP_FRONT_PARTITIONS },
  { name: "Curtain Wall Sections", subCategory: "Curtain Wall Sections", page: "26-28", category: Category.CURTAIN_WALLS },
  { name: "Double & Single Glaze Window Series", subCategory: "Double & Single Glaze Window Series", page: "29", category: Category.CURTAIN_WALLS },
  { name: "Double & Single Glaze Fix Series", subCategory: "Double & Single Glaze Fix Series", page: "30", category: Category.CURTAIN_WALLS },
  { name: "Double & Single Glaze Door Series", subCategory: "Double & Single Glaze Door Series", page: "31", category: Category.CURTAIN_WALLS },
  { name: "Door Handle Sections", subCategory: "Door Handle Sections", page: "32", category: Category.CHANNELS_ANGLES },
  { name: "Kitchen Section Series (KT Series)", subCategory: "Kitchen Section Series", page: "33", category: Category.KITCHEN_PROFILES },
  { name: "Aluminium Pipes", subCategory: "Aluminium Pipes", page: "34-35", category: Category.PIPES_TUBES },
  { name: "Solar Panel Sections", subCategory: "Solar Panel Sections", page: "36", category: Category.CHANNELS_ANGLES },
  { name: "Partition Sections", subCategory: "Partition Sections", page: "37", category: Category.SHOP_FRONT_PARTITIONS },
  { name: "Shuttering Rolling Sections", subCategory: "Shuttering Rolling Sections", page: "37", category: Category.CHANNELS_ANGLES },
  { name: "Channel Sections (CH Series)", subCategory: "Channel Sections", page: "38-39", category: Category.CHANNELS_ANGLES },
  { name: "Strips & Skirting Panel Sections", subCategory: "Strips & Skirting Panel Sections", page: "40", category: Category.CHANNELS_ANGLES },
  { name: "Vertical Railing & Door Channels", subCategory: "Vertical Railing & Door Channels", page: "41", category: Category.CHANNELS_ANGLES },
  { name: "Louver Sections", subCategory: "Louver Sections", page: "41", category: Category.CHANNELS_ANGLES },
  { name: "Heat Sink Sections", subCategory: "Heat Sink Sections", page: "42-43", category: Category.CHANNELS_ANGLES },
  { name: "Bus Body Sections", subCategory: "Bus Body Sections", page: "44", category: Category.CHANNELS_ANGLES },
  { name: "Industrial Sections", subCategory: "Industrial Sections", page: "44", category: Category.CHANNELS_ANGLES },
  { name: "Glass Set & Sealing Sections", subCategory: "Glass Set & Sealing Sections", page: "45", category: Category.CHANNELS_ANGLES },
  { name: "Cooking Range Profiles", subCategory: "Cooking Range Profiles", page: "46-49", category: Category.CHANNELS_ANGLES },
  { name: "Miscellaneous Sections", subCategory: "Miscellaneous Sections", page: "50-59", category: Category.CHANNELS_ANGLES },
  { name: "Angles", subCategory: "Angles", page: "60-63", category: Category.CHANNELS_ANGLES },
  { name: "Angles & Nosings", subCategory: "Angles & Nosings", page: "63", category: Category.CHANNELS_ANGLES },
  { name: "Groove Pipes (GP Series)", subCategory: "Groove Pipes", page: "64", category: Category.PIPES_TUBES },
  { name: "Aluminium Round Pipes", subCategory: "Aluminium Round Pipes", page: "65", category: Category.PIPES_TUBES },
  { name: "Aluminium Square Rods", subCategory: "Aluminium Square Rods", page: "66", category: Category.PIPES_TUBES },
  { name: "Aluminium Round Rods", subCategory: "Aluminium Round Rods", page: "67", category: Category.PIPES_TUBES },
  { name: "Aluminium Hexagonal Rods", subCategory: "Aluminium Hexagonal Rods", page: "68", category: Category.PIPES_TUBES },
  { name: "Aluminium Strips", subCategory: "Aluminium Strips", page: "69", category: Category.PIPES_TUBES },
  { name: "Glass Suction & Installation Tools", subCategory: "Glass Suction & Installation Tools", page: "02, 05, 08", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Floor Springs & Door Closers", subCategory: "Floor Springs & Door Closers", page: "02", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Glass Patch Fittings & Clamps", subCategory: "Glass Patch Fittings & Clamps", page: "02, 03, 06", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Shower Hinges & Cabin Enclosures", subCategory: "Shower Hinges & Cabin Enclosures", page: "02, 03, 06", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Door & Window Locks & Latches", subCategory: "Door & Window Locks & Latches", page: "02, 04, 06, 08", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Sliding Rollers, Pulleys & Wheels", subCategory: "Sliding Rollers, Pulleys & Wheels", page: "02, 04, 06, 07", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Window Friction Stays & Hinges", subCategory: "Window Friction Stays & Hinges", page: "04, 06", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Commercial Handles & Designer Pulls", subCategory: "Commercial Handles & Designer Pulls", page: "03, 07, 08", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Weather Strips & Insect Screens", subCategory: "Weather Strips & Insect Screens", page: "03, 04", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Kitchen & Aluminium Joint Fittings", subCategory: "Kitchen & Aluminium Joint Fittings", page: "07, 09", category: Category.HARDWARE_ACCESSORIES, isHardware: true },
  { name: "Fasteners, Screws & Buffer Accessories", subCategory: "Fasteners, Screws & Buffer Accessories", page: "04, 07, 08, 09", category: Category.HARDWARE_ACCESSORIES, isHardware: true }
];

const HARDWARE_SUB_MAPPINGS: Record<string, string[]> = {
  "Glass Suction & Installation Tools": ["Glass Suction & Rubber", "Silicone Guns", "Rivet Guns", "Screen Rollers"],
  "Floor Springs & Door Closers": ["Floor Springs", "Door Closers"],
  "Glass Patch Fittings & Clamps": ["Patch Fittings", "Glass Clamps", "Spacers"],
  "Shower Hinges & Cabin Enclosures": ["Shower Hinges", "Shower Cabin Sets", "Stairs & Terrace Pillars"],
  "Door & Window Locks & Latches": ["Door Locks", "Push Handle Locks", "Latches", "Crescent Latches", "Dead Locks", "Hook Locks", "M-23 Locks", "Chitkini / Tower Bolts", "D-38F Handles"],
  "Sliding Rollers, Pulleys & Wheels": ["Glass Rollers", "Jali Wheels", "Sliding Wheels", "Channel Wheels", "DG Wheels", "Glass Set Wheels", "Single & Double Glass Set Wheels"],
  "Window Friction Stays & Hinges": ["Door Hinges", "Friction Stays", "Killi Kabza"],
  "Commercial Handles & Designer Pulls": ["Door Handles", "Bar Handles", "Pipe Handles", "C Handles", "Openable Handles"],
  "Weather Strips & Insect Screens": ["Weather Strips", "Zigzag Screens", "Normal Screens", "Rubber Accessories", "Water Caps", "DG Slider", "Hole Caps"],
  "Kitchen & Aluminium Joint Fittings": ["Kitchen & Aluminium Fittings", "Jali Kona", "Outer Angles", "Jali Angles", "DG Kona", "D-50 L Angle", "DG Angle", "KT-5 Angle"],
  "Fasteners, Screws & Buffer Accessories": ["Blind Rivets", "D-L Pins & Clips", "Rawl Plugs", "Jali Stopper", "Solid Stopper", "Screw Boxes", "DG Accessories", "DG Patri", "KT-8B Patri", "Brackets", "D-48 Packing"]
};

export default function App() {
  // Application states
  const [currentTab, setCurrentTab] = useState<"home" | "catalog" | "gallery" | "assemblies" | "about" | "cart" | "contact" | "colors">("home");
  const [selectedGlobalColor, setSelectedGlobalColor] = useState<string>("Matte Black");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | "All">("All");
  const [selectedBrand, setSelectedBrand] = useState<string | "All">("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<QuoteItem[]>([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(12);

  useEffect(() => {
    setVisibleProductsCount(12);
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedBrand]);
  
  // Sticky header scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Modal configurations
  const [modalThickness, setModalThickness] = useState("");
  const [modalColor, setModalColor] = useState("");
  const [modalQuantity, setModalQuantity] = useState(1);

  // Quote form inputs
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    city: "Gujrat",
    phone: "",
    message: ""
  });

  // Success toast/notification state
  const [notification, setNotification] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("barkat_aluminium_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: QuoteItem[]) => {
    setCart(newCart);
    localStorage.setItem("barkat_aluminium_cart", JSON.stringify(newCart));
  };

  // Show dynamic toast notification
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Add item to quote cart
  const handleAddToCart = (product: Product, quantity: number, thickness?: string, color?: string) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && 
              item.selectedThickness === (thickness || "Standard") && 
              item.selectedColor === (color || COLORS[0])
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product,
        quantity,
        selectedThickness: thickness || product.thicknesses[0] || "Standard",
        selectedColor: color || product.colors[0] || COLORS[0]
      });
    }

    saveCart(newCart);
    triggerNotification(`Successfully added ${product.code} to your Quote Cart!`);
    
    // Reset modal states
    setSelectedProduct(null);
    setModalQuantity(1);
  };

  // Remove item from quote cart
  const handleRemoveFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, idx) => idx !== indexToRemove);
    saveCart(newCart);
    triggerNotification("Item removed from Quote Cart.");
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQty;
    saveCart(newCart);
  };

  // Pre-configured assemblies / complete bills of materials for easy reference
  const assemblies = [
    {
      id: "double-sliding",
      name: "Double Sliding Window Assembly (DC-26 System)",
      description: "Standard dual-track sliding window system with high wind load rating. Ideal for residential and commercial rooms.",
      tag: "Sliding System",
      items: [
        { code: "DC-26G", qty: 1, desc: "Double Slide Head (Top outer guide track)" },
        { code: "DC-26H", qty: 1, desc: "Double Slide Sill (Bottom track with water drain)" },
        { code: "DC-27A", qty: 2, desc: "Single Slide Frame Vertical (Left & right side jambs)" },
        { code: "DC-26A", qty: 2, desc: "Single Slide Lock Star (Vertical handle/lock sash panel)" },
        { code: "DC-26C", qty: 2, desc: "Double Slide Interlock (Central female locking hooks)" },
        { code: "RL-401", qty: 4, desc: "Double Brass Roller with bearings (2 per moving sash)" },
        { code: "SL-202", qty: 2, desc: "Automatic Sliding Window Touch Lock" },
        { code: "WS-501", qty: 2, desc: "Weather Strip Wool Felt Rolls for absolute dustproofing" },
      ]
    },
    {
      id: "casement-swing",
      name: "Modern Casement Window (M-24 Swing System)",
      description: "Hinged opening swing window for maximum ventilation, structural air tightness, and elegant exterior looks.",
      tag: "Casement System",
      items: [
        { code: "M-24", qty: 1, desc: "Casement Outer Frame (Fixed border against wall)" },
        { code: "M-28", qty: 1, desc: "Casement Leaf / Swing Sash (Opening glass sash panel)" },
        { code: "M-23", qty: 1, desc: "Casement Center Mullion T-Section (Optional center divider)" },
        { code: "HG-301", qty: 2, desc: "Heavy-Duty Friction Stay hinges (Allows window to hold angle)" },
        { code: "WS-502", qty: 1, desc: "Weatherproof Silicone Sealant (Prevents glass vibration & water leak)" },
      ]
    },
    {
      id: "shop-front",
      name: "Premium Commercial Shop Front & Partition (4-Inch)",
      description: "Heavy box-framed partition and glass doors designed for corporate offices and high-traffic shopping centers.",
      tag: "Partitions & Shopfronts",
      items: [
        { code: "D-31", qty: 4, desc: "Frame Outer Box Section (4\" x 1.75\" structural frame)" },
        { code: "D-31A", qty: 8, desc: "Shop Front Glass Stop (Bead snap clips to secure 8mm glass)" },
        { code: "DH-102", qty: 1, desc: "Offset Bar Pull Handle 18\" (Premium stainless feel)" },
        { code: "WS-502", qty: 2, desc: "Weatherproof Silicone Sealant (Neutral clear joints)" },
      ]
    },
    {
      id: "kitchen-shutter",
      name: "Elegant Handleless Kitchen Cabinet Door Assembly",
      description: "Rustproof, lightweight aluminium kitchen cabinet door borders featuring hidden pull grooves for minimalist kitchens.",
      tag: "Kitchen Cabinets",
      items: [
        { code: "K-12", qty: 2, desc: "Kitchen Cabinet Border Frame (Clean metal outline)" },
        { code: "K-22", qty: 2, desc: "Integrated Cabinet Pull Handle G-Profile (Hidden hand grip)" },
        { code: "K-23", qty: 1, desc: "Cabinet Connect H-Section (For joining wooden or composite panels)" },
      ]
    }
  ];

  // Add whole assembly to Quote Cart
  const handleAddAssemblyToCart = (assemblyId: string) => {
    const selectedAssembly = assemblies.find(a => a.id === assemblyId);
    if (!selectedAssembly) return;

    let itemsAdded = 0;
    let newCart = [...cart];

    selectedAssembly.items.forEach(item => {
      const matchedProduct = PRODUCTS.find(p => p.code === item.code);
      if (matchedProduct) {
        // Find existing or push
        const existingIndex = newCart.findIndex(
          c => c.product.id === matchedProduct.id && 
               c.selectedThickness === matchedProduct.thicknesses[0] && 
               c.selectedColor === COLORS[0]
        );

        if (existingIndex > -1) {
          newCart[existingIndex].quantity += item.qty;
        } else {
          newCart.push({
            product: matchedProduct,
            quantity: item.qty,
            selectedThickness: matchedProduct.thicknesses[0] || "Standard",
            selectedColor: matchedProduct.isHardware ? matchedProduct.colors[0] : COLORS[0]
          });
        }
        itemsAdded++;
      }
    });

    saveCart(newCart);
    triggerNotification(`Added all ${itemsAdded} items of ${selectedAssembly.name} to Quote Cart!`);
    setCurrentTab("cart");
  };

  // Filter products based on search query, category, subcategory, and brand
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Search text match (code, name, description, application tags, category, subcategory)
      const matchesSearch = 
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category match
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

      // Subcategory match
      let matchesSubCategory = true;
      if (selectedSubCategory !== "All") {
        if (selectedSubCategory === "Window & Door Locksets") {
          // If "Matched Hardware Accessories" is selected from PDF sections index, show all items under Category.HARDWARE_ACCESSORIES
          matchesSubCategory = product.category === Category.HARDWARE_ACCESSORIES;
        } else if (HARDWARE_SUB_MAPPINGS[selectedSubCategory]) {
          matchesSubCategory = HARDWARE_SUB_MAPPINGS[selectedSubCategory].includes(product.subCategory || "");
        } else {
          matchesSubCategory = product.subCategory === selectedSubCategory;
        }
      }

      // Brand match (Since we deal in GR and 3 Star, some items are both, hardware might be imported)
      const matchesBrand = selectedBrand === "All" || product.brands.includes(selectedBrand);

      return matchesSearch && matchesCategory && matchesSubCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedBrand]);

  // Extract all unique subcategories that exist in PRODUCTS
  const uniqueSubCategories = useMemo(() => {
    const subs = new Set<string>();
    PRODUCTS.forEach(p => {
      if (p.subCategory) subs.add(p.subCategory);
    });
    return Array.from(subs).sort();
  }, []);

  // Generate perfect pre-filled WhatsApp link
  const handleSendWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      triggerNotification("Your Quote Cart is empty. Add products to request a quote.");
      return;
    }

    if (!quoteForm.name || !quoteForm.phone) {
      triggerNotification("Please fill in your Name and Contact Number.");
      return;
    }

    // Build highly professional message matching user request details
    let messageText = `*BARKAT ALUMINIUM - DIGITAL QUOTE REQUEST*\n`;
    messageText += `====================================\n`;
    messageText += `*Customer Name:* ${quoteForm.name}\n`;
    messageText += `*City/Town:* ${quoteForm.city}\n`;
    messageText += `*Phone:* ${quoteForm.phone}\n`;
    messageText += `*Preferred Finish/Colour:* ${selectedGlobalColor}\n`;
    if (quoteForm.message) {
      messageText += `*Special Instructions:* ${quoteForm.message}\n`;
    }
    messageText += `====================================\n\n`;
    messageText += `*ITEMS TO QUOTE (GR & 3 Star Alloys):*\n`;

    cart.forEach((item, index) => {
      messageText += `${index + 1}. *[${item.product.code}]* ${item.product.name}\n`;
      messageText += `   - *Qty:* ${item.quantity} length(s) / pc(s)\n`;
      if (!item.product.isHardware) {
        messageText += `   - *Thickness:* ${item.selectedThickness}\n`;
        messageText += `   - *Color Finishing:* ${item.selectedColor}\n`;
      } else {
        messageText += `   - *Type/Color:* ${item.selectedColor}\n`;
      }
      messageText += `\n`;
    });

    messageText += `------------------------------------\n`;
    messageText += `*Requested From Website:* Barkat Aluminium Digital Portal\n`;
    messageText += `*Owner:* Samair Aslam | Gujrat, Pakistan`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/923324984083?text=${encodedText}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    triggerNotification("Opening WhatsApp to send your quote list...");
  };

  // Directly call owner
  const handleCallNow = () => {
    window.open("tel:+923324984083", "_self");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans selection:bg-[#C9A227]/20 selection:text-[#C9A227] relative pb-16 md:pb-0" id="barkat-app-root">
      
      {/* STICKY TRANSPARENT SCROLL-AWARE LUXURY HEADER */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled || currentTab !== "home"
            ? "bg-[#111111]/95 backdrop-blur-md border-b border-[#C9A227]/30 py-3 shadow-xl text-white" 
            : "bg-[#111111]/80 backdrop-blur-sm py-5 text-white border-b border-white/5"
        }`} 
        id="barkat-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo and Premium Brand Branding */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => setCurrentTab("home")}
              id="brand-logo-container"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gold-gradient rounded-lg flex items-center justify-center text-[#111111] shadow-lg transition-transform group-hover:rotate-6">
                <Layers className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black font-display tracking-tight block">
                  BARKAT <span className="text-[#C9A227]">ALUMINIUM</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#C9A227]/80 block uppercase -mt-0.5">
                  PREMIUM LUXURY SYSTEMS
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 text-xs font-bold uppercase tracking-wider text-white" id="desktop-nav">
              <button 
                onClick={() => setCurrentTab("home")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "home" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentTab("catalog"); setSelectedCategory("All"); }}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "catalog" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Catalogue
              </button>
              <button 
                onClick={() => setCurrentTab("gallery")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "gallery" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Design Gallery
              </button>
              <button 
                onClick={() => setCurrentTab("colors")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "colors" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Colour Catalogue
              </button>
              <button 
                onClick={() => setCurrentTab("assemblies")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "assemblies" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Assemblies
              </button>
              <button 
                onClick={() => setCurrentTab("about")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "about" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                About
              </button>
              <button 
                onClick={() => setCurrentTab("contact")}
                className={`px-3 py-2 rounded-lg transition-all ${currentTab === "contact" ? "bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/25 font-bold" : "hover:text-[#C9A227] text-white"}`}
              >
                Contact
              </button>
            </nav>

            {/* Quote Cart Badge Button & Phone trigger */}
            <div className="flex items-center gap-2 sm:gap-3" id="header-action-panel">
              {/* Quote Cart Button */}
              <button 
                onClick={() => setCurrentTab("cart")}
                className="relative p-2.5 rounded-full bg-white/5 hover:bg-[#C9A227]/10 text-white hover:text-[#C9A227] border border-white/10 transition-colors cursor-pointer group"
                aria-label="View Quote Cart"
                id="cart-badge-button"
              >
                <ShoppingCart className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#C9A227] text-[#111111] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#111111] shadow-md animate-bounce">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Instant Call Now Header Button */}
              <button 
                onClick={handleCallNow}
                className="hidden lg:flex items-center gap-2 bg-gold-gradient hover:bg-blue-gradient text-[#111111] hover:text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                id="header-call-button"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </button>

              {/* Instant WhatsApp Header Button */}
              <button 
                onClick={() => window.open("https://wa.me/923324984083", "_blank")}
                className="hidden sm:flex items-center gap-2 bg-[#0A4D8C] hover:bg-[#073562] text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 cursor-pointer hover:scale-105 active:scale-95"
                id="header-whatsapp-button"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white text-[#0A4D8C]" />
                <span>WhatsApp</span>
              </button>

              {/* Mobile menu trigger button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg md:hidden text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-white/5"
                aria-label="Toggle menu"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#111111]/95 overflow-hidden shadow-2xl"
              id="mobile-nav-panel"
            >
              <div className="px-4 py-4 space-y-2 text-sm font-bold uppercase tracking-wider">
                <button 
                  onClick={() => { setCurrentTab("home"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "home" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { setCurrentTab("catalog"); setSelectedCategory("All"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "catalog" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Catalogue
                </button>
                <button 
                  onClick={() => { setCurrentTab("gallery"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "gallery" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Design Gallery
                </button>
                <button 
                  onClick={() => { setCurrentTab("colors"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "colors" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Colour Catalogue
                </button>
                <button 
                  onClick={() => { setCurrentTab("assemblies"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "assemblies" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Assemblies
                </button>
                <button 
                  onClick={() => { setCurrentTab("about"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "about" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  About Us
                </button>
                <button 
                  onClick={() => { setCurrentTab("contact"); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${currentTab === "contact" ? "bg-[#C9A227]/20 text-[#C9A227]" : "hover:bg-white/5 text-gray-300"}`}
                >
                  Contact
                </button>
                <div className="pt-3 border-t border-white/10 flex gap-2">
                  <button 
                    onClick={() => { handleCallNow(); setMobileMenuOpen(false); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold-gradient text-[#111111] py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </button>
                  <button 
                    onClick={() => { window.open("https://wa.me/923324984083", "_blank"); setMobileMenuOpen(false); }}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0A4D8C] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-[#0A4D8C]" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DYNAMIC VIEWPORTS PORT */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10" id="barkat-main-viewport">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME VIEW */}
          {currentTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 sm:space-y-16"
              id="home-view"
            >
              {/* LUXURY HERO BANNER SECTION (FULL-SCREEN EXPERIENCE) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111111] text-white rounded-3xl p-8 sm:p-12 lg:p-20 relative overflow-hidden shadow-2xl border border-[#C9A227]/30" id="hero-banner">
                {/* Parallax background lines & Walnut/Oak wood grain elements represented as premium warm gradient rings */}
                <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-radial from-[#3E2511]/40 via-[#0A4D8C]/15 to-transparent blur-3xl rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#C9A227]/5 to-[#0A4D8C]/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#C9A227_1px,transparent_1px),linear-gradient(to_bottom,#C9A227_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-8 relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] rounded-full text-[10px] font-mono uppercase tracking-widest font-black">
                    <Sparkles className="w-3.5 h-3.5" />
                    Authorized Dealer GR Aluminium
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none text-white">
                    ARCHITECTURAL <br className="hidden sm:block" />
                    <span className="text-gold-gradient font-black">PRECISION.</span> <br />
                    FOREVER ELEGANCE.
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-xl leading-relaxed">
                    Barkat Aluminium supplies premium-grade aluminium sections, sliding casement systems, kitchen profiles, and curtain walls. Authorized dealers for standard-setting brands: <span className="text-white font-bold underline decoration-[#C9A227] decoration-2">GR Aluminium</span> & <span className="text-white font-bold underline decoration-[#0A4D8C] decoration-2">3 Star Aluminium</span>.
                  </p>
                  
                  {/* Action buttons (Gold Gradient with micro interactions) */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => { setCurrentTab("catalog"); setSelectedCategory("All"); }}
                      className="bg-gold-gradient hover:bg-blue-gradient text-[#111111] hover:text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C9A227]/10 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <span>Explore Catalogue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentTab("assemblies")}
                      className="bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                      <Layers className="w-4 h-4 text-[#C9A227]" />
                      <span>Ready Window Sets</span>
                    </button>
                  </div>

                  {/* Core specs trust indicators */}
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                    <div>
                      <span className="text-2xl sm:text-3xl font-black font-display text-white block">100%</span>
                      <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Pure Alloy Ingot</span>
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black font-display text-[#C9A227] block">GR & 3★</span>
                      <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Genuine Profiles</span>
                    </div>
                    <div>
                      <span className="text-2xl sm:text-3xl font-black font-display text-[#0A4D8C] block">Gujrat</span>
                      <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Direct Dealer</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Luxury Glassmorphic Vector Frame */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10 mt-6 lg:mt-0" id="hero-vector-display">
                  <div className="bg-[#181818]/90 p-8 rounded-2xl border border-white/10 w-full max-w-sm shadow-2xl space-y-6 relative overflow-hidden">
                    {/* Glowing background rays behind drawing */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C9A227]/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <div>
                        <span className="text-[10px] font-mono text-[#C9A227] uppercase tracking-widest block font-bold">Featured Extrusion</span>
                        <span className="text-base font-bold font-display text-white">DC-26G Double Slide Head</span>
                      </div>
                      <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded text-[#C9A227] font-bold">1.6 MM</span>
                    </div>
                    <div className="bg-[#111111]/80 p-6 rounded-xl flex items-center justify-center border border-white/5 shadow-inner min-h-[220px]">
                      <InteractiveMagnifier isDarkTheme={true} scale={2.4} lensSize={140}>
                        <ProfileIcon shape="double-track-top" className="w-40 h-40 stroke-[#C9A227]" strokeColor="stroke-[#C9A227]" />
                      </InteractiveMagnifier>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                      <span>Tracks: Double (Dual)</span>
                      <span>Category: Sliding</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BRANDS DEALERSHIP SHOWCASE PANEL */}
              <div className="bg-[#111111] p-8 rounded-2xl border border-[#C9A227]/20 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden" id="brands-dealership">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#0A4D8C]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-1.5 text-center md:text-left relative z-10">
                  <span className="text-xs font-black text-[#C9A227] uppercase tracking-widest block font-mono">AUTHENTIC METALLURGY</span>
                  <h3 className="text-xl font-bold text-white font-display tracking-tight">Only Stocking Certified Structural Alloys</h3>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 relative z-10">
                  {/* Brand 1 Card */}
                  <div className="px-6 py-4 bg-[#181818] border border-white/5 rounded-xl shadow-md text-center group transition-all duration-300 hover:border-[#C9A227]/40 min-w-[150px]">
                    <span className="text-[9px] text-[#C9A227] font-bold block uppercase tracking-widest font-mono">AUTHORIZED DEALER</span>
                    <span className="text-lg font-black tracking-tight text-white font-display">
                      GR <span className="text-gold-gradient font-black">Aluminium</span>
                    </span>
                  </div>
                  {/* Brand 2 Card */}
                  <div className="px-6 py-4 bg-[#181818] border border-white/5 rounded-xl shadow-md text-center group transition-all duration-300 hover:border-[#0A4D8C]/40 min-w-[150px]">
                    <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-widest font-mono">AUTHORIZED DEALER</span>
                    <span className="text-lg font-black tracking-tight text-white font-display">
                      3 STAR <span className="text-[#0A4D8C]">Aluminium</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED MODERN WHY CHOOSE US BENTO SECTION */}
              <WhyChooseUs />

              {/* HIGH-FASHION INSTALLATION PORTFOLIO GALLERY SECTION */}
              <GallerySection />

              {/* ARCHITECTURAL TESTIMONIALS SECTION */}
              <CustomerReviews />

              {/* OWNER'S DIRECT SIGNATURE ASSURANCE PANEL (WALNUT EMBELLISHED) */}
              <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#181818] via-[#111111] to-[#181818] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden" id="owner-banner">
                {/* Oak/Walnut wood texture accent lines */}
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-[#3E2511] via-[#C9A227] to-[#3E2511]" />
                
                <div className="space-y-4 flex-1 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C9A227]/10 text-[#C9A227] text-[10px] font-mono uppercase tracking-widest font-black border border-[#C9A227]/20">
                    Owner Direct Portal
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display tracking-tight">Personal Guarantee of Samair Aslam</h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
                    "Barkat Aluminium is built on trust, precision, and fair business. Every builder, contractor, or home fabricator from Gujrat and neighboring districts gets genuine metal sections directly. Contact me for special wholesale project rates."
                  </p>
                  <div className="text-xs text-gray-500 font-mono">
                    Owner: <span className="text-[#C9A227] font-bold">Samair Aslam</span> | Shadiwal Road, Near Railway Phatak, Gujrat
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 w-full sm:w-auto">
                  <button 
                    onClick={() => setCurrentTab("contact")}
                    className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all duration-300 border border-white/10 cursor-pointer text-center"
                  >
                    Visit Shop Gujrat
                  </button>
                  <button 
                    onClick={() => { window.open("https://wa.me/923324984083?text=Assalamu%20Alaikum%20Samair%20Aslam%20Barkat%20Aluminium%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20supply%20rates%20for%20my%20project.", "_blank") }}
                    className="bg-gold-gradient hover:bg-blue-gradient text-[#111111] hover:text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                    <span>Chat with Owner</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. PRODUCTS CATALOGUE VIEW */}
          {currentTab === "catalog" && (
            <motion.div
              key="catalog-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="catalog-view"
            >
              {/* Filter and search layout wrapper */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Left Sidebar Filter Section */}
                <div className="lg:col-span-1 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-5 sticky top-24 max-h-[calc(100vh-120px)] flex flex-col justify-between" id="sidebar-filters">
                  
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sliders className="w-3.5 h-3.5 text-[#C9A227]" />
                      Catalogue Index
                    </span>
                    {(selectedCategory !== "All" || selectedSubCategory !== "All" || selectedBrand !== "All" || searchQuery) && (
                      <button 
                        onClick={() => { setSelectedCategory("All"); setSelectedSubCategory("All"); setSelectedBrand("All"); setSearchQuery(""); }}
                        className="text-[10px] font-black text-rose-500 hover:text-rose-600 hover:underline cursor-pointer uppercase tracking-wider"
                      >
                        Reset All
                      </button>
                    )}
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-2 shrink-0">
                    <span className="text-[9px] font-black text-slate-400 font-mono uppercase tracking-widest block">
                      {selectedCategory === Category.HARDWARE_ACCESSORIES ? "Hardware Brands" : "Alloy Brands"}
                    </span>
                    {selectedCategory === Category.HARDWARE_ACCESSORIES ? (
                      <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                        <button 
                          onClick={() => setSelectedBrand("All")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "All" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setSelectedBrand("NC Brand")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "NC Brand" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          NC Brand
                        </button>
                        <button 
                          onClick={() => setSelectedBrand("MG Brand")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "MG Brand" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          MG Brand
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                        <button 
                          onClick={() => setSelectedBrand("All")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "All" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setSelectedBrand("GR Aluminium")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "GR Aluminium" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          GR Alum
                        </button>
                        <button 
                          onClick={() => setSelectedBrand("3 Star Aluminium")}
                          className={`text-center text-[10px] py-1.5 rounded-md font-bold transition-all cursor-pointer ${selectedBrand === "3 Star Aluminium" ? "bg-slate-900 text-white shadow-xs" : "hover:text-slate-900 text-slate-500 hover:bg-slate-200/30"}`}
                        >
                          3 Star
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Scrollable PDF Index Section */}
                  <div className="space-y-2 flex-grow flex flex-col min-h-0 overflow-hidden">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9px] font-black text-slate-400 font-mono uppercase tracking-widest block">
                        PDF Sections List
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">
                        Page No.
                      </span>
                    </div>

                    {/* Scrollable index links */}
                    <div className="overflow-y-auto pr-1 space-y-4 flex-grow scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                      {/* Reset option */}
                      <button 
                        onClick={() => { setSelectedCategory("All"); setSelectedSubCategory("All"); }}
                        className={`w-full text-left text-xs px-2.5 py-2 rounded-lg font-bold flex items-center justify-between transition-all cursor-pointer ${selectedCategory === "All" && selectedSubCategory === "All" ? "bg-slate-900 text-white shadow-md border-l-4 border-[#C9A227]" : "hover:bg-slate-50 text-slate-600 hover:text-slate-800"}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 stroke-[2]" />
                          All Catalogue Pages
                        </span>
                        <span className="text-[9px] font-mono opacity-80">
                          {PRODUCTS.length}
                        </span>
                      </button>

                      {/* PDF categories and subcategories grouped */}
                      {Object.values(Category).map((cat) => {
                        const sectionsInCat = PDF_SECTIONS_INDEX.filter(sec => sec.category === cat);
                        if (sectionsInCat.length === 0) return null;

                        const catProductCount = cat === Category.HARDWARE_ACCESSORIES 
                          ? PRODUCTS.filter(p => p.category === Category.HARDWARE_ACCESSORIES).length
                          : PRODUCTS.filter(p => p.category === cat).length;

                        return (
                          <div key={cat} className="space-y-1.5">
                            {/* Top level Category Header */}
                            <button
                              onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedSubCategory("All");
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded-lg font-mono text-[9px] font-black tracking-widest uppercase flex items-center justify-between transition-all ${
                                selectedCategory === cat && selectedSubCategory === "All"
                                  ? "bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20 font-black"
                                  : "text-[#0A4D8C] hover:text-[#0A4D8C]/80 hover:bg-slate-50 font-black"
                              }`}
                            >
                              <span>{cat}</span>
                              <span className="text-[9px] text-slate-400 font-bold shrink-0">
                                ({catProductCount})
                              </span>
                            </button>

                            {/* Subsections under this category */}
                            <div className="space-y-1 pl-1.5 border-l border-slate-100 ml-1">
                              {sectionsInCat.map((sec) => {
                                const isSecActive = selectedSubCategory === sec.subCategory;
                                const secCount = sec.isHardware 
                                  ? PRODUCTS.filter(p => p.category === Category.HARDWARE_ACCESSORIES).length
                                  : PRODUCTS.filter(p => p.subCategory === sec.subCategory).length;

                                return (
                                  <button
                                    key={sec.name}
                                    onClick={() => {
                                      setSelectedCategory(sec.category);
                                      setSelectedSubCategory(sec.subCategory);
                                    }}
                                    className={`w-full text-left text-[11px] px-2 py-1.5 rounded-lg flex items-center justify-between transition-all cursor-pointer group ${
                                      isSecActive
                                        ? "bg-[#C9A227]/5 text-slate-900 border-l-2 border-[#C9A227] font-black pl-3"
                                        : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                                    }`}
                                  >
                                    <span className="truncate max-w-[120px] sm:max-w-[150px] leading-tight font-medium">
                                      {sec.name}
                                    </span>
                                    <div className="flex items-center gap-1 shrink-0">
                                      <span className="text-[9px] text-slate-400 font-bold font-mono">
                                        ({secCount})
                                      </span>
                                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                                        isSecActive
                                          ? "bg-[#C9A227]/20 border-[#C9A227]/30 text-[#C9A227] font-black"
                                          : "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                                      }`}>
                                        {sec.page}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sidebar Footer Info */}
                  <div className="pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-mono text-center shrink-0 leading-relaxed">
                    Deals in: GR & 3 Star Alloys <br />
                    Proprietor: <span className="font-bold text-slate-600">Samair Aslam</span>
                  </div>
                </div>

                {/* Right Main Grid Catalog Section */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Search Engine Header */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4" id="search-bar-container">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Search by profile code (e.g., DC-26G, M-24), section name, or keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 pl-11 pr-4 py-3 rounded-xl text-sm outline-hidden transition-all shadow-inner font-sans font-medium"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {/* Tiny stats info bar */}
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Category: <span className="text-slate-600 font-bold">{selectedCategory}</span></span>
                      <span>Showing <span className="text-amber-600 font-bold">{filteredProducts.length}</span> profile types</span>
                    </div>
                  </div>

                  {/* Breadcrumb Navigation */}
                  <div className="bg-slate-50 border border-slate-200/50 rounded-lg px-4 py-2 flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-mono shadow-3xs" id="catalog-breadcrumbs">
                    <button 
                      onClick={() => { setSelectedCategory("All"); setSelectedSubCategory("All"); }}
                      className="hover:text-[#C9A227] transition-colors cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                    >
                      Catalogue Index
                    </button>
                    {selectedCategory !== "All" && (
                      <>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <button 
                          onClick={() => { setSelectedSubCategory("All"); }}
                          className="hover:text-[#C9A227] transition-colors cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                        >
                          {selectedCategory}
                        </button>
                      </>
                    )}
                    {selectedSubCategory !== "All" && (
                      <>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-800 font-extrabold uppercase tracking-wider text-[10px] truncate max-w-[200px]">
                          {selectedSubCategory}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Interactive Product Cards Grid */}
                  {filteredProducts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
                      {filteredProducts.slice(0, visibleProductsCount).map((product) => (
                        <div 
                          key={product.id} 
                          className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden hover:shadow-md hover:border-amber-100 transition-all flex flex-col justify-between group"
                        >
                          {/* Top vector drawing visual box */}
                          <div className="bg-slate-50 p-4 border-b border-slate-100 relative flex items-center justify-center min-h-[140px] z-10">
                            <InteractiveMagnifier scale={2.2} lensSize={120}>
                              <ProfileIcon shape={product.sectionShape} className="w-24 h-24 stroke-slate-500" />
                            </InteractiveMagnifier>
                            {/* Brand badge overlay */}
                            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                              {product.brands.map((brand, i) => (
                                <span 
                                  key={brand} 
                                  className={`text-[9px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded border ${
                                    brand.includes("GR") 
                                      ? "bg-amber-50 border-amber-100 text-amber-700" 
                                      : brand.includes("3") 
                                        ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                                        : "bg-slate-100 border-slate-200 text-slate-600"
                                  }`}
                                >
                                  {brand}
                                </span>
                              ))}
                            </div>
                            <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/5 px-2 py-0.5 rounded text-slate-600 font-bold font-mono">
                              {product.code}
                            </span>
                            <span className="absolute bottom-2 right-2 text-[8px] tracking-wider text-slate-400 font-bold font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                              {product.isHardware ? "Accessory" : "CAD Cross-Section"}
                            </span>
                          </div>

                          {/* Details Content Box */}
                          <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="font-bold text-slate-800 font-display text-base tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                                {product.name}
                              </h3>
                              <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                                {product.category}
                              </span>
                              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            {/* Specifications summary tags */}
                            {!product.isHardware && (
                              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono border-t border-slate-100 text-slate-500">
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-normal uppercase tracking-wider">Length</span>
                                  <span className="font-semibold text-slate-700">{product.length}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block font-normal uppercase tracking-wider">Gauge</span>
                                  <span className="font-semibold text-amber-700">
                                    {product.thicknesses[0].includes("1.2") 
                                      ? "18 SWG (1.2mm)" 
                                      : product.thicknesses[0].includes("1.6") 
                                        ? "16 SWG (1.6mm)" 
                                        : product.thicknesses[0].includes("2.0") 
                                          ? "14 SWG (2.0mm)" 
                                          : product.thicknesses[0].includes("1.0")
                                            ? "19 SWG (1.0mm)"
                                            : product.thicknesses[0].includes("2.5")
                                              ? "12 SWG (2.5mm)"
                                              : product.thicknesses[0].includes("3.0")
                                                ? "10 SWG (3.0mm)"
                                                : product.thicknesses[0]
                                    }
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Action call buttons */}
                            <div className="pt-3 flex gap-2 border-t border-slate-50">
                              <button 
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setModalThickness(product.thicknesses[0] || "");
                                  setModalColor(product.colors[0] || "");
                                  setModalQuantity(1);
                                }}
                                className="flex-1 bg-[#C9A227] hover:bg-[#C9A227]/90 text-[#111111] px-2 py-2.5 rounded-lg text-xs font-black transition-all text-center flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                              >
                                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Get Quote</span>
                              </button>
                              <button 
                                onClick={() => {
                                  const msg = `Assalam-o-Alaikum Barkat Aluminium! I want to inquire about this product from your catalogue:\n\n*Code:* ${product.code}\n*Name:* ${product.name}\n*Section:* ${product.subCategory || product.category}\n*Gauge:* ${
                                    product.thicknesses[0].includes("1.2") 
                                      ? "18 SWG (1.2mm)" 
                                      : product.thicknesses[0].includes("1.6") 
                                        ? "16 SWG (1.6mm)" 
                                        : product.thicknesses[0].includes("2.0") 
                                          ? "14 SWG (2.0mm)" 
                                          : product.thicknesses[0]
                                  }\n*Brands:* ${product.brands.join(", ")}\n\nPlease provide current rates and delivery time. Thank you.`;
                                  window.open(`https://wa.me/923324984083?text=${encodeURIComponent(msg)}`, "_blank");
                                }}
                                className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 border border-emerald-500/20 px-2 py-2.5 rounded-lg text-xs font-black transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
                                <span>WhatsApp</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {filteredProducts.length > visibleProductsCount && (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 mt-4 border-t border-slate-100" id="pagination-controls">
                        <button 
                          onClick={() => setVisibleProductsCount(prev => prev + 12)}
                          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Load More Products</span>
                          <span className="text-[10px] font-mono text-slate-400">({filteredProducts.length - visibleProductsCount} left)</span>
                        </button>
                        <button 
                          onClick={() => setVisibleProductsCount(filteredProducts.length)}
                          className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Show All</span>
                        </button>
                      </div>
                    )}
                    </>
                  ) : (
                    <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4" id="empty-search-state">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                        <Search className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-800 font-display">No matching sections found</h4>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto">
                        We couldn't find any profiles matching "{searchQuery}". Try searching for specific codes like "DC-26G" or general terms like "pipe", "angle", "handle".
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedBrand("All"); }}
                        className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}

                  {/* Previous / Next Page Navigation */}
                  <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs mt-6" id="catalog-pagination">
                    {/* Previous Button */}
                    {(() => {
                      const currentIndex = PDF_SECTIONS_INDEX.findIndex(sec => sec.subCategory === selectedSubCategory);
                      const prevSec = currentIndex > 0 ? PDF_SECTIONS_INDEX[currentIndex - 1] : null;
                      const nextSec = currentIndex !== -1 && currentIndex < PDF_SECTIONS_INDEX.length - 1 ? PDF_SECTIONS_INDEX[currentIndex + 1] : null;

                      return (
                        <>
                          <button
                            disabled={!prevSec}
                            onClick={() => {
                              if (prevSec) {
                                setSelectedCategory(prevSec.category);
                                setSelectedSubCategory(prevSec.subCategory);
                                document.getElementById("catalog-view")?.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                            className={`w-full sm:w-auto px-4 py-2.5 rounded-lg border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              prevSec 
                                ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300" 
                                : "bg-slate-100/50 border-slate-200/50 text-slate-300 cursor-not-allowed"
                            }`}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <div className="text-left">
                              <span className="text-[9px] text-slate-400 block font-normal uppercase tracking-wider">Previous Page / Sec</span>
                              <span className="truncate max-w-[150px] block">{prevSec ? prevSec.name : "First Section"}</span>
                            </div>
                          </button>

                          {/* Current Status Badge */}
                          <div className="text-center font-mono text-xs text-slate-500">
                            {currentIndex !== -1 ? (
                              <span className="bg-slate-200/60 border border-slate-200 px-3 py-1.5 rounded-full font-bold text-slate-800">
                                PDF Page: <span className="text-amber-700 font-extrabold">{PDF_SECTIONS_INDEX[currentIndex].page}</span> of 68
                              </span>
                            ) : (
                              <span className="text-slate-400 font-medium">Select a section in index to start sequential flip</span>
                            )}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={() => {
                              const next = nextSec || PDF_SECTIONS_INDEX[0];
                              setSelectedCategory(next.category);
                              setSelectedSubCategory(next.subCategory);
                              document.getElementById("catalog-view")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border bg-[#C9A227] border-[#C9A227] hover:bg-[#C9A227]/90 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <div className="text-right">
                              <span className="text-[9px] text-slate-900/60 block font-normal uppercase tracking-wider">Next Page / Sec</span>
                              <span className="truncate max-w-[150px] block font-black">{nextSec ? nextSec.name : PDF_SECTIONS_INDEX[0].name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. WINDOW ASSEMBLIES SCHEMATICS VIEW */}
          {currentTab === "assemblies" && (
            <motion.div
              key="assemblies-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="assemblies-view"
            >
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">FABRICATOR'S SECTION MAP</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-800 tracking-tight">Complete Window Section Bills</h2>
                <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
                  Avoid planning errors! Below is the structural layout map showing exactly how the various profile codes fit together to build sliding frames, ventilators, and modern glass doors. You can get a custom quotation for any entire assembly instantly.
                </p>
              </div>

              {/* Loop Assemblies with clear grid lists */}
              <div className="space-y-8" id="assemblies-full-layout">
                {assemblies.map((assembly) => (
                  <div key={assembly.id} className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left Column Description */}
                    <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50 border-r border-slate-100 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full inline-block">
                          {assembly.tag}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-slate-800 leading-snug">{assembly.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{assembly.description}</p>
                      </div>

                      <div className="pt-6 border-t border-slate-200/60 space-y-3">
                        <button 
                          onClick={() => handleAddAssemblyToCart(assembly.id)}
                          className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Get Full Assembly Quote</span>
                        </button>
                        <button 
                          onClick={() => {
                            window.open(`https://wa.me/923324984083?text=Hi, I would like to get custom fabrication advice for the "${assembly.name}" assembly.`, "_blank");
                          }}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 fill-white text-slate-900" />
                          <span>WhatsApp Fabrication Consultation</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column Product Listing */}
                    <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                      <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider block">Required Extrusion Codes & Hardware</span>
                      <div className="divide-y divide-slate-100">
                        {assembly.items.map((item, index) => {
                          const matchedProd = PRODUCTS.find(p => p.code === item.code);
                          return (
                            <div key={index} className="py-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  {matchedProd ? (
                                    <ProfileIcon shape={matchedProd.sectionShape} className="w-7 h-7 stroke-slate-500" />
                                  ) : (
                                    <Wrench className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                                    {item.code} 
                                    {matchedProd && (
                                      <span className="text-[10px] text-slate-400 font-normal font-sans">
                                        ({matchedProd.name})
                                      </span>
                                    )}
                                  </span>
                                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded shrink-0">
                                Qty: {item.qty}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. ABOUT US VIEW */}
          {currentTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
              id="about-view"
            >
              {/* Detailed introduction layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono block">OUR LEGACY & VALUES</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-800 tracking-tight leading-tight">
                    Premium Aluminium Supply in <br className="hidden sm:block" /> Gujrat & Beyond
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Based in the industrial heart of Gujrat on Shadiwal Road, <strong>Barkat Aluminium</strong> has been a trusted supplier of architectural sections, window extrusions, and premium accessories.
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Under the visionary leadership of our owner, <strong>Samair Aslam</strong>, we have committed ourselves strictly to supplying original brand extrusions with precise gauges. We deal comprehensively in <strong>GR Aluminium</strong> and <strong>3 Star Aluminium</strong> products, ensuring our builders, contractors, and home-owners receive superior architectural-grade profiles that never compromise on structural strength or surface finish.
                  </p>
                  
                  {/* Quick stats tags */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Original Stock Dealership</span>
                        <span className="text-[11px] text-slate-400 block leading-tight">GR & 3 Star alloys exclusively</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Owner Samair Aslam</span>
                        <span className="text-[11px] text-slate-400 block leading-tight">Personal guarantee on weights</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right decorative visual card */}
                <div className="lg:col-span-5 bg-radial from-slate-900 to-slate-950 p-8 rounded-2xl text-white space-y-6 shadow-xl border border-slate-800" id="about-visual-card">
                  <div className="space-y-2 pb-4 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">Business Info</span>
                    <h3 className="text-lg font-bold font-display text-white">Barkat Aluminium</h3>
                  </div>

                  <div className="space-y-4 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">OWNER:</span>
                      <span className="text-white font-bold font-sans">Samair Aslam</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ESTABLISHED IN:</span>
                      <span className="text-white">Gujrat, Pakistan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TYPE:</span>
                      <span className="text-white font-sans">Aluminium Sections & Hardware</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">MAIN DEALS:</span>
                      <span className="text-amber-400 font-bold font-sans">GR & 3 Star Aluminium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">CONTACT:</span>
                      <span className="text-white font-bold">+92 332 4984083</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
                    <div className="flex gap-2 text-xs font-bold font-sans text-amber-400">
                      <MapPin className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>Shadiwal Road, Near Railway Phatak, Gujrat</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                      Strategically located near the railway phatak for easy loading/unloading logistics across Gujrat division.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gujrat Industrial Map & Trust banner */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 font-mono block uppercase">COMMITTED TO INTEGRITY</span>
                  <h4 className="font-bold text-slate-800 font-display text-base">Why Pure Alloy Matters</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed md:col-span-2">
                  Many local suppliers deliver lightweight recycled aluminium that bends easily and leaks air. At Barkat Aluminium, our extrusions are manufactured using pure chemical ingots of Grade 6063 alloy. This delivers premium mechanical properties, perfect anodizing color depth, and excellent tensile strength for residential windows and industrial partitions.
                </p>
              </div>
            </motion.div>
          )}

          {/* 5. REQUEST QUOTE / CART VIEW */}
          {currentTab === "cart" && (
            <motion.div
              key="cart-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="cart-view"
            >
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">ESTIMATE SHEET</span>
                <h2 className="text-2xl font-extrabold font-display text-slate-800 tracking-tight">Your Custom Quote Cart</h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Adjust quantities, select your required thickness gauges and anodized/powder-coated colors, then submit your list directly to <strong>Samair Aslam</strong> on WhatsApp. We will reply instantly with the exact weight estimation and competitive pricing.
                </p>
              </div>

              {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column Items List */}
                  <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden divide-y divide-slate-100" id="cart-items-container">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${item.selectedThickness}-${item.selectedColor}`} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {/* Profile shape icon */}
                          <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                            <ProfileIcon shape={item.product.sectionShape} className="w-8 h-8 stroke-slate-500" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold font-mono">
                              {item.product.code}
                            </span>
                            <h4 className="font-bold text-slate-800 font-display text-sm tracking-tight sm:text-base leading-none pt-0.5">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium font-sans">
                              {item.product.category}
                            </p>
                            
                            {/* Options indicators */}
                            <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono font-bold uppercase tracking-wider">
                              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                                {item.selectedThickness}
                              </span>
                              <span className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                                {item.selectedColor}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Adjust qty, remove buttons */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1 shrink-0">
                            <button 
                              onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                              className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                              className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete from cart button */}
                          <button 
                            onClick={() => handleRemoveFromCart(index)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
                      <span className="text-xs font-mono text-slate-400 font-semibold uppercase">Total Selected Items</span>
                      <span className="text-sm font-bold text-slate-800 font-mono">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)} length(s) / pc(s)
                      </span>
                    </div>
                  </div>

                  {/* Right Column Customer Form & WA Action */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs space-y-6" id="quote-submission-panel">
                    <h3 className="font-bold text-slate-800 font-display text-base tracking-tight pb-3 border-b border-slate-100 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-600" />
                      Submit Quote Details
                    </h3>

                    <form onSubmit={handleSendWhatsAppQuote} className="space-y-4" id="whatsapp-quote-form">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g., Muhammad Sufyan"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs font-medium outline-hidden transition-all"
                        />
                      </div>

                      {/* Contact Number input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Phone / WhatsApp Number *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g., +92 300 1234567"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs font-medium outline-hidden transition-all"
                        />
                      </div>

                      {/* City input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">City / Town *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g., Gujrat / Sialkot"
                          value={quoteForm.city}
                          onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs font-medium outline-hidden transition-all"
                        />
                      </div>

                      {/* Preferred Colour / Finish Selection (Linked to Colour Catalogue) */}
                      <div className="space-y-1 bg-slate-50 border border-slate-200/60 p-3.5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black text-slate-500 font-mono uppercase tracking-wider block">Default Project Colour / Finish</label>
                          <button 
                            type="button"
                            onClick={() => { setCurrentTab("colors"); document.getElementById("header-top")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="text-[9px] text-amber-600 hover:text-amber-500 hover:underline font-extrabold uppercase tracking-wider"
                          >
                            Browse Catalogue
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0 shadow-3xs flex items-center justify-center relative overflow-hidden" 
                               style={{ 
                                 backgroundColor: selectedGlobalColor.toLowerCase().includes("wood") || selectedGlobalColor.toLowerCase().includes("code") ? "#8F6030" : undefined,
                                 background: selectedGlobalColor.toLowerCase().includes("wood") || selectedGlobalColor.toLowerCase().includes("code") 
                                   ? "linear-gradient(to right, #B48A53, #8F6030)" 
                                   : selectedGlobalColor.toLowerCase().includes("antique")
                                     ? "radial-gradient(circle, #D3D3D3 20%, #111111 100%)"
                                     : undefined 
                               }} 
                          >
                            {/* Simple solid color backup if not wood or antique */}
                            {!selectedGlobalColor.toLowerCase().includes("wood") && !selectedGlobalColor.toLowerCase().includes("code") && !selectedGlobalColor.toLowerCase().includes("antique") && (
                              <div className="absolute inset-0 border border-slate-100 rounded-full"
                                   style={{ 
                                     backgroundColor: selectedGlobalColor.toLowerCase().includes("white") || selectedGlobalColor.toLowerCase().includes("cream") ? "#FCFCFC" : 
                                                     selectedGlobalColor.toLowerCase().includes("grey") || selectedGlobalColor.toLowerCase().includes("charcoal") ? "#40464D" : 
                                                     selectedGlobalColor.toLowerCase().includes("black") ? "#1C1D21" : 
                                                     selectedGlobalColor.toLowerCase().includes("champagne") ? "#EADAA2" : "#BCC6CC"
                                   }} 
                              />
                            )}
                          </div>
                          <span className="text-xs text-slate-800 font-black uppercase tracking-wider font-mono">{selectedGlobalColor}</span>
                          <span className="text-[9px] text-slate-400 font-mono ml-auto">Linked to Colours</span>
                        </div>
                      </div>

                      {/* Custom note message input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Special Instructions / Project Size</label>
                        <textarea 
                          rows={3}
                          placeholder="Please let us know if you need specific anodized colors, precise lengths, or have double-glazing specifications."
                          value={quoteForm.message}
                          onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs font-medium outline-hidden transition-all resize-none"
                        />
                      </div>

                      {/* Submit buttons */}
                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/10"
                      >
                        <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                        <span>Submit List via WhatsApp</span>
                      </button>
                    </form>

                    <p className="text-[10px] text-slate-400 font-medium text-center leading-relaxed">
                      Submission directly opens WhatsApp Web or WhatsApp App on your phone. <br />
                      <strong>Barkat Aluminium</strong> | Owner: Samair Aslam | +92 332 4984083
                    </p>
                  </div>

                </div>
              ) : (
                <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto" id="cart-empty-panel">
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 font-display">Your Quote Cart is empty</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Browse our digital catalogue and select specific profile codes, widths, gauges, and colors. Add them to your estimate sheet to send directly to Samair Aslam.
                  </p>
                  <button 
                    onClick={() => { setCurrentTab("catalog"); setSelectedCategory("All"); }}
                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Browse Sections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* 5. WINDOW & DOOR DESIGN GALLERY VIEW */}
          {currentTab === "gallery" && (
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              id="gallery-view"
            >
              <DesignGallery 
                onAddToQuoteCart={(mockProduct) => {
                  const newCartItem: QuoteItem = {
                    product: mockProduct,
                    quantity: 1,
                    selectedThickness: mockProduct.thicknesses[0] || "1.6 mm",
                    selectedColor: mockProduct.colors[0]
                  };
                  const updatedCart = [...cart, newCartItem];
                  saveCart(updatedCart);
                }}
                triggerNotification={triggerNotification}
              />
            </motion.div>
          )}

          {/* 5.5. COLOURS CATALOGUE VIEW */}
          {currentTab === "colors" && (
            <motion.div
              key="colors-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              id="colors-view"
            >
              <ColoursCatalogue 
                onSelectColour={(colorCode) => setSelectedGlobalColor(colorCode)}
                selectedColorState={selectedGlobalColor}
                triggerNotification={triggerNotification}
              />
            </motion.div>
          )}

          {/* 6. CONTACT US VIEW */}
          {currentTab === "contact" && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="contact-view"
            >
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">GET IN TOUCH</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-800 tracking-tight">Visit Barkat Aluminium</h2>
                <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                  Call us, chat with our owner <strong>Samair Aslam</strong>, or visit our retail and wholesale warehouse near Gujrat's railway crossing.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column Contacts */}
                <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-2xs space-y-6" id="contact-info-panel">
                  <h3 className="font-bold text-slate-800 font-display text-base tracking-tight pb-3 border-b border-slate-100 uppercase tracking-wider text-xs text-slate-400">
                    Business Details
                  </h3>

                  <div className="space-y-5 text-sm">
                    {/* Location item */}
                    <div className="flex gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block uppercase font-mono tracking-wider">Address</span>
                        <span className="text-slate-800 font-bold block pt-0.5">Shadiwal Road, Near Railway Phatak, Gujrat, Pakistan</span>
                        <span className="text-xs text-slate-500 block leading-tight">Fast delivery logistics for Gujrat, Sialkot, and Kharian.</span>
                      </div>
                    </div>

                    {/* Owner detail item */}
                    <div className="flex gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <User className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block uppercase font-mono tracking-wider">Owner / Proprietor</span>
                        <span className="text-slate-800 font-bold block pt-0.5">Samair Aslam</span>
                        <span className="text-xs text-slate-500 block leading-tight">Direct call for contractor discount accounts.</span>
                      </div>
                    </div>

                    {/* Phone/WhatsApp detail item */}
                    <div className="flex gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block uppercase font-mono tracking-wider">Call / WhatsApp</span>
                        <span className="text-amber-700 font-black block text-base pt-0.5">+92 332 4984083</span>
                        <span className="text-xs text-slate-500 block leading-tight">Online 8:30 AM to 8:30 PM (Sunday Closed)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-3">
                    <button 
                      onClick={handleCallNow}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Call Samair Aslam Now</span>
                    </button>
                    <button 
                      onClick={() => { window.open("https://wa.me/923324984083", "_blank") }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Right Column General Contact Message Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-2xs space-y-4" id="contact-form-panel">
                  <h3 className="font-bold text-slate-800 font-display text-base tracking-tight pb-3 border-b border-slate-100">
                    Send Direct Message
                  </h3>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      triggerNotification("Thank you! Your message was prepared. Redirecting to WhatsApp...");
                      const contactFormText = `Hi, I saw your contact form. My name is ${quoteForm.name || "Customer"}. I am interested in Barkat Aluminium profiles. Please contact me back.`;
                      window.open(`https://wa.me/923324984083?text=${encodeURIComponent(contactFormText)}`, "_blank");
                    }} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Muhammad Sufyan"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs outline-hidden transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+92 300 1234567"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Query details / Profile types needed</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Please describe what system you are fabricating (e.g. sliding kitchen cabinets, architectural front shop glass) or any special delivery questions."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white text-slate-800 px-3 py-2.5 rounded-lg text-xs outline-hidden transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white text-amber-600" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* RETAIL PROFILE DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="specs-modal-overlay">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/65 backdrop-blur-xs" 
            />

            {/* Modal box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-slate-100"
              id="specs-modal-box"
            >
              {/* Header block */}
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded">
                    {selectedProduct.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">SPECIFICATIONS</span>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
                {/* Visual rendering column */}
                <div className="md:col-span-5 bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center border border-slate-100 relative min-h-[220px] z-10">
                  <InteractiveMagnifier scale={2.5} lensSize={150}>
                    <ProfileIcon shape={selectedProduct.sectionShape} className="w-40 h-40 stroke-slate-600" />
                  </InteractiveMagnifier>
                  <span className="text-[10px] text-slate-400 font-mono uppercase mt-2 font-bold block">Cross Section Profile</span>
                </div>

                {/* Details and selectors column */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-800 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <span className="text-xs text-amber-600 font-bold uppercase tracking-wider block mt-0.5 font-mono">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Standard specs listing */}
                  <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5 font-mono text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Compatible Brands:</span>
                      <span className="text-slate-800 font-bold font-sans">
                        {selectedProduct.brands.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Length:</span>
                      <span className="text-slate-800 font-bold">{selectedProduct.length}</span>
                    </div>
                    {selectedProduct.isHardware && selectedProduct.thicknesses && selectedProduct.thicknesses.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans">Material/Specs:</span>
                        <span className="text-slate-800 font-bold font-sans text-right max-w-[150px] truncate">{selectedProduct.thicknesses.join(", ")}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Weight Index:</span>
                      <span className="text-slate-800 font-bold">{selectedProduct.weightRange}</span>
                    </div>
                  </div>

                  {/* Selector options for quoting */}
                  <div className="space-y-3 pt-2">
                    
                    {/* Gauge/Thickness Selector */}
                    {!selectedProduct.isHardware && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">
                          Select Gauge / Thickness
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProduct.thicknesses.map(thick => (
                            <button 
                              key={thick}
                              onClick={() => setModalThickness(thick)}
                              className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all border cursor-pointer ${modalThickness === thick ? "bg-amber-50 border-amber-500 text-amber-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                              {thick}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color / Finish Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">
                        Select Finish / Color
                      </label>
                      <div className="relative">
                        <select 
                          value={modalColor} 
                          onChange={(e) => setModalColor(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium px-3 py-2 rounded-lg outline-hidden focus:border-amber-500 focus:bg-white"
                        >
                          {selectedProduct.colors.map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">
                        Quotation Quantity (lengths / pcs)
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1">
                          <button 
                            onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-sm font-mono font-bold text-slate-800">
                            {modalQuantity}
                          </span>
                          <button 
                            onClick={() => setModalQuantity(modalQuantity + 1)}
                            className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium font-sans">
                          (Length standard = 12 or 16 ft)
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Action Panel Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-wrap gap-2.5 justify-end">
                {/* Instant inquiry buttons */}
                <button 
                  onClick={() => {
                    const waText = `Assalamu Alaikum Barkat Aluminium, I would like to inquire about standard wholesale pricing for profile code ${selectedProduct.code} (${selectedProduct.name}).`;
                    window.open(`https://wa.me/923324984083?text=${encodeURIComponent(waText)}`, "_blank");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>WhatsApp Ask</span>
                </button>
                <button 
                  onClick={handleCallNow}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </button>
                <button 
                  onClick={() => handleAddToCart(selectedProduct, modalQuantity, modalThickness, modalColor)}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ml-auto"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Quote Cart</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REAL-TIME NOTIFICATION TOAST TOAST */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white py-3.5 px-5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-800"
            id="toast-notification"
          >
            <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-3 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-semibold pr-2">{notification}</p>
            <button 
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION UTILITY BUTTONS (Call & WhatsApp) ON EVERY PAGE */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5" id="floating-actions-container">
        
        {/* Floating Call Button */}
        <button 
          onClick={handleCallNow}
          className="w-12.5 h-12.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group cursor-pointer relative"
          title="Call Owner Samair Aslam"
          aria-label="Call Samair Aslam"
          id="floating-call-btn"
        >
          <Phone className="w-5.5 h-5.5 text-amber-400 group-hover:animate-bounce" />
          <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow-md border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Call Samair Aslam
          </span>
        </button>

        {/* Floating WhatsApp Button */}
        <button 
          onClick={() => {
            window.open("https://wa.me/923324984083?text=Assalamu%20Alaikum%20Barkat%20Aluminium%2C%20I%20would%20like%20to%20inquire%20about%20your%20aluminium%20sections%20and%20hardware.", "_blank");
          }}
          className="w-12.5 h-12.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group cursor-pointer relative"
          title="Inquire via WhatsApp"
          aria-label="WhatsApp Inquiry"
          id="floating-whatsapp-btn"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 pulse-ring-whatsapp pointer-events-none" />
          <MessageSquare className="w-5.5 h-5.5 fill-white text-emerald-600" />
          <span className="absolute right-14 bg-emerald-600 text-white text-[11px] font-bold py-1 px-2.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            WhatsApp Inquiry
          </span>
        </button>
      </div>

      {/* MOBILE PERSISTENT STICKY BOTTOM TAB BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 grid grid-cols-5 h-16" id="mobile-sticky-footer">
        <button 
          onClick={() => { setCurrentTab("home"); setSelectedCategory("All"); }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${currentTab === "home" ? "text-amber-600" : "text-slate-400"}`}
        >
          <Building className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button 
          onClick={() => { setCurrentTab("catalog"); setSelectedCategory("All"); }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${currentTab === "catalog" ? "text-amber-600" : "text-slate-400"}`}
        >
          <Search className="w-5 h-5" />
          <span>Catalogue</span>
        </button>
        <button 
          onClick={() => { setCurrentTab("gallery"); }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${currentTab === "gallery" ? "text-amber-600" : "text-slate-400"}`}
        >
          <Compass className="w-5 h-5" />
          <span>Gallery</span>
        </button>
        <button 
          onClick={() => { setCurrentTab("cart"); }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold relative ${currentTab === "cart" ? "text-[#C9A227]" : "text-slate-400"}`}
        >
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute top-2.5 right-4 bg-[#C9A227] text-[#111111] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          <span>Quote</span>
        </button>
        <button 
          onClick={() => { setCurrentTab("contact"); }}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold ${currentTab === "contact" ? "text-[#C9A227]" : "text-slate-400"}`}
        >
          <MapPin className="w-5 h-5" />
          <span>Contact</span>
        </button>
      </div>

      {/* LUXURY FOOTER SECTION */}
      <footer className="bg-[#111111] text-gray-400 pt-16 pb-24 md:pb-16 border-t border-white/5 mt-16 relative overflow-hidden" id="barkat-footer">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/5">
          
          {/* Col 1 Brand Intro */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold-gradient rounded-lg flex items-center justify-center text-[#111111] font-bold shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-lg font-black font-display text-white tracking-tight">
                BARKAT <span className="text-[#C9A227]">ALUMINIUM</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Supplying Gujrat Division with original-grade GR Aluminium and 3 Star Aluminium profiles. Pure alloy compositions, exact structural gauges, and premium-grade hardware accessories.
            </p>
            <div className="text-xs text-gray-400 pt-2">
              <span className="text-[#C9A227]/80 font-mono uppercase block text-[9px] tracking-widest">Proprietor:</span>
              <span className="text-white font-bold text-sm">Samair Aslam</span>
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-widest text-[#C9A227] uppercase">Product Lines</h4>
            <ul className="text-xs space-y-2 text-gray-400">
              <li><button onClick={() => { setCurrentTab("catalog"); setSelectedCategory(Category.SLIDING_SYSTEMS); }} className="hover:text-[#C9A227] transition-colors cursor-pointer">Sliding Window Systems</button></li>
              <li><button onClick={() => { setCurrentTab("catalog"); setSelectedCategory(Category.CASEMENT_SYSTEMS); }} className="hover:text-[#C9A227] transition-colors cursor-pointer">Casement Swing Windows</button></li>
              <li><button onClick={() => { setCurrentTab("catalog"); setSelectedCategory(Category.SHOP_FRONT_PARTITIONS); }} className="hover:text-[#C9A227] transition-colors cursor-pointer">Shopfronts & Partitions</button></li>
              <li><button onClick={() => { setCurrentTab("catalog"); setSelectedCategory(Category.KITCHEN_PROFILES); }} className="hover:text-[#C9A227] transition-colors cursor-pointer">Kitchen Cabinet Shutter Profiles</button></li>
              <li><button onClick={() => { setCurrentTab("catalog"); setSelectedCategory(Category.HARDWARE_ACCESSORIES); }} className="hover:text-[#C9A227] transition-colors cursor-pointer">Matched Hardware & Accessories</button></li>
            </ul>
          </div>

          {/* Col 3 Logistics and Location */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="text-xs font-bold font-mono tracking-widest text-[#0A4D8C] uppercase">Shop Coordinates</h4>
            <div className="space-y-3">
              <p className="leading-relaxed text-gray-400">
                Shadiwal Road, Near Railway Phatak, <br />
                Gujrat, Pakistan
              </p>
              <div className="flex flex-col gap-1 text-gray-300">
                <span>Phone: <a href="tel:+923324984083" className="text-[#C9A227] font-black hover:underline">+92 332 4984083</a></span>
                <span>WhatsApp: <a href="https://wa.me/923324984083" target="_blank" className="text-[#0A4D8C] font-black hover:underline">+92 332 4984083</a></span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
          <span>&copy; 2026 Barkat Aluminium Gujrat. All rights reserved.</span>
          <div className="flex gap-4">
            <span>Deals in: GR Aluminium & 3 Star</span>
            <span>Owner: Samair Aslam</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
