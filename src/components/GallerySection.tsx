import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Eye, X, MessageSquare, Phone, Layers, Grid } from "lucide-react";
import ProfileIcon from "./ProfileIcon";

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "sliding" | "casement" | "partition" | "kitchen" | "accessory";
  categoryLabel: string;
  description: string;
  tag: string;
  gauge: string;
  shape: "double-track-top" | "double-track-bottom" | "interlock" | "lock-star" | "outer-frame" | "box" | "circle" | "square" | "angle" | "u-channel" | "handle" | "hardware";
  woodAccent?: boolean;
}

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "sliding" | "casement" | "partition" | "kitchen" | "accessory">("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Double Sliding Windows (DC-26 System)",
      category: "sliding",
      categoryLabel: "Sliding Systems",
      description: "Dual-track architectural window finished in premium Bronze Anodized coating. Perfectly sound-proofed and weather-tight.",
      tag: "Luxury Residential",
      gauge: "1.6 mm / 2.0 mm",
      shape: "double-track-top",
    },
    {
      id: "gal-2",
      title: "Minimalist Casement (M-24 Swing System)",
      category: "casement",
      categoryLabel: "Casement Windows",
      description: "Elegant swing window with integrated flyscreen and hidden multi-point lock. Finished in premium Matte Black powder coating.",
      tag: "Contemporary Villa",
      gauge: "1.6 mm",
      shape: "outer-frame",
    },
    {
      id: "gal-3",
      title: "Corporate Partition & 4\" Office Glass Door",
      category: "partition",
      categoryLabel: "Partitions",
      description: "High-load commercial office partitioning utilizing custom 4-inch D-31 box frames and premium Silver Anodized finishes.",
      tag: "Commercial Space",
      gauge: "2.0 mm / 2.5 mm",
      shape: "box",
    },
    {
      id: "gal-4",
      title: "Walnut Texture Kitchen Cabinet Shutters",
      category: "kitchen",
      categoryLabel: "Kitchen Cabinets",
      description: "Luxury handleless cabinet frames featuring natural oak/walnut wood texture finishes. Corrosion-free and high-moisture resistant.",
      tag: "Modular Kitchen",
      gauge: "1.2 mm",
      shape: "u-channel",
      woodAccent: true,
    },
    {
      id: "gal-5",
      title: "High-Precision Double Brass Bearings Rollers",
      category: "accessory",
      categoryLabel: "Hardware",
      description: "Imported premium double brass rollers equipped with synthetic seals and stainless steel cage. Tested for 100,000 smooth cycles.",
      tag: "Accessories",
      gauge: "Heavy Duty",
      shape: "hardware",
    },
    {
      id: "gal-6",
      title: "Minimal G-Profile Integrated Cabinet Pulls",
      category: "kitchen",
      categoryLabel: "Kitchen Cabinets",
      description: "Clean handleless G-profiles designed for modern kitchen drawers. Eliminates visual clutter with continuous seamless grips.",
      tag: "Minimalist Kitchen",
      gauge: "1.2 mm",
      shape: "handle",
    },
    {
      id: "gal-7",
      title: "Heavy Duty Single Slide Interlocks",
      category: "sliding",
      categoryLabel: "Sliding Systems",
      description: "High wind-load interlocking stile designed for coastal or high-altitude projects. Creates an absolute dust-tight compression seal.",
      tag: "Industrial Grade",
      gauge: "2.0 mm",
      shape: "interlock",
    },
    {
      id: "gal-8",
      title: "Anodized Champagne Ventilator System",
      category: "casement",
      categoryLabel: "Casement Windows",
      description: "Classic high-ventilation bathroom and toilet pivot sashes finished in luxurious Champagne Anodized colors.",
      tag: "Standard Fit",
      gauge: "1.2 mm",
      shape: "square",
    }
  ];

  const filters: { value: typeof activeFilter; label: string }[] = [
    { value: "all", label: "Show All" },
    { value: "sliding", label: "Sliding Windows" },
    { value: "casement", label: "Casement Swing" },
    { value: "partition", label: "Office Partitions" },
    { value: "kitchen", label: "Kitchen Profiles" },
    { value: "accessory", label: "Premium Hardware" }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const handleWhatsAppInquiry = (item: GalleryItem) => {
    const text = `Assalamu Alaikum Barkat Aluminium! I saw this design in your luxury gallery:\n\n*System:* ${item.title}\n*Category:* ${item.categoryLabel}\n*Specs:* ${item.gauge} Gauge\n\nPlease let me know pricing and stock details for my project.`;
    window.open(`https://wa.me/923324984083?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="space-y-12" id="gallery-component-root">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-150">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0A4D8C] bg-[#0A4D8C]/5 px-3 py-1 rounded-md border border-[#0A4D8C]/10">
            HIGH-FASHION INSTALLATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            Luxury Aluminium <span className="text-gold-gradient font-black">In-situ Designs</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Explore premium architectural installations using our GR and 3 Star profiles. Click any profile card to inspect precise schematics.
          </p>
        </div>

        {/* Filter categories layout */}
        <div className="flex flex-wrap gap-1.5" id="gallery-category-tabs">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`text-xs px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === filter.value
                  ? "bg-[#0A4D8C] text-white shadow-md shadow-[#0A4D8C]/20 border border-[#0A4D8C]"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Grid Like Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="gallery-masonry-container">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#C9A227]/40 transition-all duration-300 flex flex-col justify-between"
              id={`gallery-item-${item.id}`}
            >
              {/* Image Box (Render profile icon inside detailed luxurious glass card) */}
              <div className={`relative p-8 flex items-center justify-center transition-all duration-500 overflow-hidden ${
                item.woodAccent 
                  ? "bg-gradient-to-br from-[#3E2511]/10 via-[#5C3A21]/5 to-[#111111]/5" 
                  : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
              }`}>
                {/* Parallax background overlay lines */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <ProfileIcon 
                  shape={item.shape} 
                  className={`w-28 h-28 transform transition-transform duration-500 group-hover:scale-110 ${
                    item.woodAccent 
                      ? "stroke-[#5C3A21]" 
                      : "stroke-[#0A4D8C]"
                  }`} 
                />

                {/* Hover overlay magnifying search icon */}
                <div className="absolute inset-0 bg-[#111111]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient text-[#111111] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg font-bold">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Category badge tag */}
                <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider bg-white/90 border border-gray-200 text-gray-500 px-2 py-0.5 rounded shadow-2xs">
                  {item.categoryLabel}
                </span>

                {/* Wood finish indicator badge */}
                {item.woodAccent && (
                  <span className="absolute top-3 right-3 text-[8px] font-mono font-black uppercase tracking-wider bg-[#5C3A21] border border-[#5C3A21]/20 text-white px-2 py-0.5 rounded shadow-2xs">
                    Walnut Finish
                  </span>
                )}
              </div>

              {/* Title Content Box */}
              <div className="p-5 border-t border-gray-100 space-y-2 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-black text-[#C9A227] tracking-wider uppercase">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-gray-800 font-display text-sm sm:text-base leading-snug group-hover:text-[#0A4D8C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-normal line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-50 flex justify-between items-center text-[11px]">
                  <span className="font-mono font-semibold text-[#0A4D8C]">Gauge: {item.gauge}</span>
                  <span className="text-[10px] font-bold text-[#C9A227] hover:underline flex items-center gap-1">
                    <span>Inspect CAD</span>
                    <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox / Zoom Dialog Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="gallery-lightbox-overlay">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#111111]/90 backdrop-blur-md"
            />

            {/* Lightbox box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10"
              id="gallery-lightbox-box"
            >
              <div className="bg-[#111111] px-6 py-4 border-b border-[#C9A227]/20 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-xs font-mono font-bold tracking-widest text-gray-300 uppercase">
                    LIGHTBOX PREVIEW
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left side visual */}
                <div className="md:col-span-5 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center border-r border-gray-100 relative">
                  <ProfileIcon shape={selectedItem.shape} className="w-40 h-40 stroke-[#0A4D8C] animate-pulse" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-4">
                    Extrusion Profile
                  </span>
                </div>

                {/* Right side specs & call triggers */}
                <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C9A227] tracking-widest block uppercase">
                      {selectedItem.categoryLabel}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 leading-tight mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-150 text-xs font-mono">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Gauge Range</span>
                      <span className="font-bold text-gray-800">{selectedItem.gauge}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Alloys Dealer</span>
                      <span className="font-bold text-[#0A4D8C]">GR & 3 Star</span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      onClick={() => handleWhatsAppInquiry(selectedItem)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                      <span>WhatsApp Inquiry</span>
                    </button>
                    <button
                      onClick={() => {
                        window.open("tel:+923324984083", "_self");
                      }}
                      className="flex-1 bg-[#111111] hover:bg-gray-800 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-[#C9A227]" />
                      <span>Call Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
