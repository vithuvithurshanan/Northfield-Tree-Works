import React, { useState } from 'react';
import { Sliders, Sparkles, CheckCircle2 } from 'lucide-react';

export const BeforeAfterShowcase: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Interactive Property Transformation</span>
          </div>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
          Before & After Trimming Comparison
        </h2>
        <p className="text-sm text-gray-200 mt-2">
          Drag the interactive slider left and right to compare overgrown roof hazard branches against our clean, safe arborist crown restoration.
        </p>
      </div>

      <div className="glass p-4 sm:p-6 rounded-[32px] border border-white/20 shadow-2xl max-w-4xl mx-auto">
        <div className="relative h-[320px] sm:h-[450px] w-full rounded-2xl overflow-hidden select-none border border-white/10 shadow-inner">
          {/* After Image (Full background) */}
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80"
            alt="After Professional Tree Care"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#A3E635] text-[#064E3B] text-xs font-extrabold shadow-lg">
            AFTER: Clean & Safe Canopy
          </span>

          {/* Before Image (Clipped overlay) */}
          <div
            className="absolute top-0 bottom-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=80"
              alt="Before Tree Trimming"
              className="absolute top-0 left-0 h-full max-w-none object-cover"
              style={{ width: '100%', minWidth: '100%' }}
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass text-amber-300 text-xs font-bold shadow-lg border border-white/20">
              BEFORE: Overgrown Storm Risk
            </span>
          </div>

          {/* Vertical Slider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#A3E635] shadow-[0_0_12px_#A3E635] cursor-ew-resize flex items-center justify-center z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-9 h-9 rounded-full bg-[#A3E635] text-[#064E3B] flex items-center justify-center shadow-2xl border-2 border-white -ml-4 font-bold">
              <Sliders className="w-4 h-4 text-[#064E3B]" />
            </div>
          </div>

          {/* Invisible Range Control */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            id="before-after-slider"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-200 px-2 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>20+ Feet Roof Clearance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>100% Sunlight Flow Restored</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
            <span>Zero Lawn Drag Marks</span>
          </div>
        </div>
      </div>
    </section>
  );
};
