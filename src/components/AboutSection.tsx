import React from 'react';
import { Award, ShieldCheck, Users, TreePine, CheckCircle2, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15">
          <div className="flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>ISA Certified Arborists</span>
          </div>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
          About Northfield Tree Works Specialists
        </h2>
        <p className="text-sm text-gray-200 mt-3 leading-relaxed">
          For over 15 years, Northfield Tree Works has provided premier residential and commercial arborist care, preserving urban canopy health while protecting properties from severe weather hazards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Image & Stats Card */}
        <div className="relative rounded-[32px] overflow-hidden glass border border-white/20 p-4 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
            alt="Northfield Tree Works Arborist Team at Work"
            className="w-full h-[380px] object-cover rounded-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#A3E635]">15+</span>
                <span className="text-[11px] text-gray-200 uppercase font-semibold">Years Experience</span>
              </div>
              <div className="border-x border-white/15 px-2">
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#A3E635]">4,800+</span>
                <span className="text-[11px] text-gray-200 uppercase font-semibold">Trees Pruned</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-[#A3E635]">100%</span>
                <span className="text-[11px] text-gray-200 uppercase font-semibold">Safety Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Details */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/15 space-y-4">
            <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#A3E635]" />
              Licensed, Bonded & $2M Insured
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              We operate under full state licensing and carry comprehensive $2,000,000 commercial liability insurance to ensure complete peace of mind for residential homeowners and commercial property managers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#A3E635]/20 flex items-center justify-center text-[#A3E635]">
                <TreePine className="w-5 h-5 text-[#A3E635]" />
              </div>
              <h4 className="text-base font-bold text-white">Botanical Care</h4>
              <p className="text-xs text-gray-300">
                Scientific pruning methods that promote root vitality and canopy structural strength.
              </p>
            </div>

            <div className="glass p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#A3E635]/20 flex items-center justify-center text-[#A3E635]">
                <Users className="w-5 h-5 text-[#A3E635]" />
              </div>
              <h4 className="text-base font-bold text-white">Certified Crew</h4>
              <p className="text-xs text-gray-300">
                Every project is supervised directly on-site by an ISA Certified Master Arborist.
              </p>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-8 h-8 text-[#A3E635]" />
              <div>
                <span className="text-sm font-bold text-white block">Dedicated 24/7 Emergency Response</span>
                <span className="text-xs text-gray-300">Rapid storm dispatch within 60 minutes across the region.</span>
              </div>
            </div>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-[#A3E635] text-[#064E3B] font-extrabold text-xs whitespace-nowrap shadow-lg hover:scale-105 transition-transform"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
