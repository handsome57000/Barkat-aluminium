import React from "react";
import { Award, ShieldCheck, Wrench, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-[#C9A227]" />,
      title: "Perfect Gauge Guarantee",
      desc: "We strictly deliver the exact mill-certified micrometre thickness you buy. 1.2mm (18 SWG), 1.6mm (16 SWG), or heavy 2.0mm (14 SWG) gauges are measured truthfully with zero tolerance for underweight profiles.",
      badge: "Pure Gauge"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0A4D8C]" />,
      title: "Elite Architectural Finishing",
      desc: "Stocking highly consistent anodized coatings (Silver, Champagne, Bronze) and thick weather-proof powder-coated wood-textured finishes (Walnut/Oak) designed to endure Pakistan's intense heat and monsoon seasons.",
      badge: "Premium Finishes"
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#C9A227]" />,
      title: "Complete Hardware Match",
      desc: "Avoid store-to-store frustration. From silent heavy-duty double brass bearing rollers to high-security automatic touch locks, weatherproof wool felt strip rolls, and neutral silicones—we supply perfectly matched accessories.",
      badge: "All-in-One Supply"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#0A4D8C]" />,
      title: "6063-T6 Pure Alloy Ingot",
      desc: "Many local suppliers deliver lightweight recycled aluminium scrap that bends easily and leaks air. At Barkat Aluminium, our extrusions are manufactured using pure chemical ingots of Grade 6063-T6 alloy for maximum structural tensile strength.",
      badge: "Pure Alloy"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#111111] overflow-hidden rounded-3xl border border-[#C9A227]/20" id="luxury-why-choose-us">
      {/* Visual background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0A4D8C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
      
      {/* Oak Woodgrain Texture Subtle Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3E2511] via-[#C9A227] to-[#3E2511]" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C9A227] uppercase bg-[#C9A227]/10 px-3.5 py-1.5 rounded-full border border-[#C9A227]/20 inline-block">
            UNCOMPROMISING PRECISION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-none">
            Why Elite Builders Choose <span className="text-gold-gradient font-extrabold">Barkat Aluminium</span>
          </h2>
          <div className="w-24 h-[2px] bg-[#C9A227] mx-auto my-3" />
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Engineered for international architectural standards. Every section we supply features perfect alloy composition and verified gauges for a lifetime of premium sliding, swing, and curtain wall operations.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, index) => (
            <div 
              key={index} 
              className="group relative bg-[#181818] rounded-2xl p-8 sm:p-10 border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#C9A227]/30 hover:shadow-[#C9A227]/5 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              id={`why-us-card-${index}`}
            >
              {/* Radial wood-like glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3E2511]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-full group-hover:border-[#C9A227]/30 group-hover:text-[#C9A227] transition-all">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-display text-white tracking-tight group-hover:text-[#C9A227] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feat.desc}
                  </p>
                </div>
              </div>

              {/* Decorative golden corner line */}
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-transparent group-hover:border-[#C9A227] transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
