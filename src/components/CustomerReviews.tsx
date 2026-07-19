import React from "react";
import { MessageSquare, Star, Quote } from "lucide-react";

export default function CustomerReviews() {
  const testimonials = [
    {
      name: "Architect Faisal Mehmood",
      role: "Lead Consultant at Apex Design Studio, Sialkot Hub",
      review: "We specified Barkat Aluminium for three premium canal-view villas in Gujrat. Their GR Aluminium sliding sections met our exact micrometer tolerances (1.6mm true gauge). The woodgrain texture finish matches our walnut woodwork beautifully.",
      rating: 5,
      location: "Gujrat"
    },
    {
      name: "Chaudhary Basharat",
      role: "Chief Contractor, Basharat & Sons Builders",
      review: "For commercial storefronts on Shadiwal Road, structural strength is paramount. Barkat Aluminium provided 4-inch D-31 double-glazing frames. Every piece was delivered exactly as ordered, with Samair Aslam personally guaranteeing metal weights.",
      rating: 5,
      location: "Shadiwal Road"
    },
    {
      name: "Engr. Yasir Awan",
      role: "Project Manager, Landmark Highrises",
      review: "What sets Barkat apart is their complete matched hardware ecosystem. We didn't have to source locks and rollers elsewhere. Their automatic touch locks and heavy-duty brass rollers provide smooth, rattle-free sliding.",
      rating: 5,
      location: "Kharian Cantt"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAFAFA] overflow-hidden" id="luxury-customer-reviews">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0A4D8C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0A4D8C] uppercase bg-[#0A4D8C]/10 px-3.5 py-1.5 rounded-full border border-[#0A4D8C]/20 inline-block">
            ARCHITECTURAL ACCLAIM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#111111] tracking-tight leading-none">
            Endorsed By Premium <span className="text-[#0A4D8C]">Builders & Architects</span>
          </h2>
          <div className="w-24 h-[2px] bg-[#C9A227] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Our commitment to original metallurgy, flawless anodizing, and direct, honest weight-to-gauge measurements makes us Gujrat's trusted supply partner.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div 
              key={index}
              className="glass-card-light rounded-2xl p-8 border border-gray-200/60 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-[#0A4D8C]/20 hover:-translate-y-1 transition-all duration-300 relative"
              id={`testimonial-card-${index}`}
            >
              {/* Golden quote marker */}
              <div className="absolute top-6 right-8 text-[#C9A227]/20">
                <Quote className="w-12 h-12 stroke-1 fill-[#C9A227]/5" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A227] stroke-[#C9A227]" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{test.review}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-end relative z-10">
                <div>
                  <h4 className="font-bold text-gray-900 font-display text-sm sm:text-base leading-snug">
                    {test.name}
                  </h4>
                  <span className="text-[11px] text-gray-400 block pt-0.5 leading-none">
                    {test.role}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#0A4D8C] bg-[#0A4D8C]/5 border border-[#0A4D8C]/10 px-2 py-0.5 rounded-md shrink-0">
                  {test.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
