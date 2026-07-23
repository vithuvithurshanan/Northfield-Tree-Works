import React, { useState } from 'react';
import { TREE_SERVICES } from '../data/treeServicesData';
import { TreeServiceItem } from '../types';
import { Scissors, Zap, Disc, Stethoscope, Tractor, CheckCircle2, ArrowRight, Shield, X, AlertTriangle } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalService, setSelectedModalService] = useState<TreeServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'trimming', label: 'Trimming & Pruning' },
    { id: 'removal', label: 'Tree Removal' },
    { id: 'emergency', label: '24/7 Storm Emergency' },
    { id: 'health', label: 'Arborist Health' },
    { id: 'land', label: 'Land & Stump' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? TREE_SERVICES
      : TREE_SERVICES.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors':
        return Scissors;
      case 'Zap':
        return Zap;
      case 'Disc':
        return Disc;
      case 'Stethoscope':
        return Stethoscope;
      case 'Tractor':
        return Tractor;
      default:
        return Shield;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15 shadow-md">
          Professional Tree Care Solutions
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Comprehensive Arborist & Tree Services
        </h2>
        <p className="mt-3 text-gray-200 text-base">
          From high-canopy crown reduction to heavy storm clearance and stump eradication, our licensed arborists handle every tree challenge safely.
        </p>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#A3E635] text-[#064E3B] shadow-lg shadow-[#A3E635]/30 scale-105'
                  : 'glass text-gray-200 hover:text-[#A3E635] hover:bg-white/10'
              }`}
              id={`service-cat-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const Icon = getIcon(service.iconName);
          return (
            <div
              key={service.id}
              className="glass rounded-[28px] overflow-hidden border border-white/15 hover:border-[#A3E635]/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-2xl"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Service Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-transparent to-transparent" />

                  {service.urgencyRecommended && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg backdrop-blur-md">
                      <Zap className="w-3 h-3 text-[#A3E635]" />
                      <span>24/7 Rapid Dispatch</span>
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#A3E635] text-[#064E3B] flex items-center justify-center shadow-lg font-bold">
                      <Icon className="w-5 h-5 text-[#064E3B]" />
                    </div>
                    <span className="text-white text-xs font-bold drop-shadow">
                      From ${service.priceStartingFrom} {service.unit}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#A3E635] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-1.5 pt-2">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedModalService(service)}
                  className="text-xs font-bold text-gray-300 hover:text-[#A3E635] cursor-pointer"
                >
                  View Details & Protocols
                </button>
                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="px-4 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] text-xs font-bold flex items-center gap-1 shadow-lg shadow-[#A3E635]/20 cursor-pointer transition-all hover:scale-105"
                  id={`quote-btn-${service.id}`}
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#064E3B]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedModalService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {selectedModalService.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Starting from ${selectedModalService.priceStartingFrom} {selectedModalService.unit}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {selectedModalService.fullDesc}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Included Features & Equipment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedModalService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-xs font-medium text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">ISA Arborist Safety Protocol:</span> Every project includes full site property protection mats, ground spotters, and a post-completion clean yard sweep.
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedModalService(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectServiceForQuote(selectedModalService.title);
                    setSelectedModalService(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
