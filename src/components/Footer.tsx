import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import logoIcon from '../assets/images/logo-icon.webp';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 glass border-t border-white/20 text-gray-200 pt-16 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoIcon} alt="Northfield Tree Works" className="h-10 w-auto drop-shadow-lg" />
              <span className="text-xl font-black text-white tracking-tight">Northfield Tree Works</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Licensed & ISA-Certified Tree Care Specialists. Serving residential and commercial properties with 24/7 storm response and precision trimming.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A3E635] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
              <span>$2,000,000 Liability Insurance</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-[#A3E635] shrink-0" />
              <span>273 Nottingham Terrace, Buffalo, NY 14216</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-[#A3E635] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#A3E635] transition-colors">Service</a></li>
              <li><a href="#gallery" className="hover:text-[#A3E635] transition-colors">Gallery</a></li>
              <li><a href="#about" className="hover:text-[#A3E635] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#A3E635] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Service Regions</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#A3E635]" /> Oakridge & Green Valley</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#A3E635]" /> Suburban Pines & West Meadow</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#A3E635]" /> Highland Heights & Riverbend</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#A3E635]" /> Greater Metro County (50mi Radius)</li>
            </ul>
          </div>

          {/* Contact Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">24/7 Emergency Dispatch</h4>
            <a
              href="tel:7164123623"
              className="p-4 rounded-2xl glass border border-white/20 text-white block hover:border-[#A3E635] transition-all group"
            >
              <div className="flex items-center gap-2 text-red-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>RAPID DISPATCH HOTLINE</span>
              </div>
              <p className="text-lg font-black text-[#A3E635] mt-1 group-hover:scale-105 transition-transform">(716) 412-3623</p>
              <p className="text-[10px] text-gray-300 mt-0.5">Dispatched in under 60 minutes</p>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <p>© {new Date().getFullYear()} Northfield Tree Works. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy.html" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/terms-of-service.html" className="hover:text-white">Terms of Service</a>
        
          </div>
        </div>
      </div>
    </footer>
  );
};
