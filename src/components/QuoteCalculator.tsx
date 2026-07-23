import React, { useState, useEffect } from 'react';
import { QuoteCalculatorState, CalculatedQuoteResult } from '../types';
import { getCache, setCache, QUOTE_CACHE_KEY } from '../utils/cache';
import { Calculator, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface QuoteCalculatorProps {
  onApplyQuoteToForm: (estimateSummary: string, treeHeightText: string) => void;
}

const defaultState: QuoteCalculatorState = {
  treeHeightFt: 35,
  treeCondition: 'healthy',
  proximity: 'clear',
  numberOfTrees: 1,
  includeStumpGrinding: true,
  includeWoodChipping: true,
  emergencyExpress: false,
  zipCode: '90210',
};

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onApplyQuoteToForm }) => {
  const [calcState, setCalcState] = useState<QuoteCalculatorState>(() => {
    return getCache<QuoteCalculatorState>(QUOTE_CACHE_KEY, defaultState);
  });

  const [appliedNotification, setAppliedNotification] = useState(false);

  // Auto-persist calculator inputs to local cache
  useEffect(() => {
    setCache(QUOTE_CACHE_KEY, calcState);
  }, [calcState]);

  // Pricing formula engine
  const calculateResult = (): CalculatedQuoteResult => {
    let base = calcState.treeHeightFt * 8; // $8 per foot base

    // Condition multiplier
    let conditionMult = 1.0;
    if (calcState.treeCondition === 'leaning') conditionMult = 1.25;
    if (calcState.treeCondition === 'dead_rotting') conditionMult = 1.45;
    if (calcState.treeCondition === 'storm_hazard') conditionMult = 1.7;

    // Proximity multiplier
    let proximityMult = 1.0;
    if (calcState.proximity === 'near_house') proximityMult = 1.3;
    if (calcState.proximity === 'powerlines') proximityMult = 1.5;
    if (calcState.proximity === 'tight_space') proximityMult = 1.35;

    let totalPerTree = base * conditionMult * proximityMult;
    let subtotal = totalPerTree * calcState.numberOfTrees;

    // Addons
    if (calcState.includeStumpGrinding) subtotal += 120 * calcState.numberOfTrees;
    if (calcState.includeWoodChipping) subtotal += 75 * calcState.numberOfTrees;
    if (calcState.emergencyExpress) subtotal += 250;

    const minPrice = Math.round(subtotal * 0.9);
    const maxPrice = Math.round(subtotal * 1.15);

    // Risk Factor
    let riskFactor: 'Low' | 'Moderate' | 'High' | 'Severe' = 'Low';
    if (conditionMult >= 1.4 || proximityMult >= 1.4) riskFactor = 'High';
    if (calcState.emergencyExpress || (conditionMult >= 1.6 && proximityMult >= 1.4)) riskFactor = 'Severe';
    else if (conditionMult > 1.1 || proximityMult > 1.1) riskFactor = 'Moderate';

    // Estimated Hours
    const estHoursNum = Math.max(2, Math.round((subtotal / 180) * 10) / 10);
    const estimatedHours = `${estHoursNum} - ${estHoursNum + 1.5} Hours`;

    // Recommended Equipment
    const equipment = ['ISA Arborist Rigging Crew', 'Wood Chipper Truck'];
    if (calcState.treeHeightFt > 50 || proximityMult >= 1.4) equipment.push('75ft Aerial Bucket Crane');
    if (calcState.includeStumpGrinding) equipment.push('Hydraulic Stump Grinder');

    return {
      minPrice,
      maxPrice,
      estimatedHours,
      riskFactor,
      recommendedEquipment: equipment,
    };
  };

  const result = calculateResult();

  const handleApply = () => {
    const summaryText = `Calculated Estimate: $${result.minPrice} - $${result.maxPrice} (${calcState.numberOfTrees} Tree(s), ~${calcState.treeHeightFt}ft tall, ${calcState.proximity} hazard level)`;
    const heightText = `${calcState.treeHeightFt} ft (${calcState.numberOfTrees} tree/s)`;
    onApplyQuoteToForm(summaryText, heightText);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3000);

    // Scroll to contact form smoothly
    const contactEl = document.querySelector('#contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="glass rounded-[32px] p-6 sm:p-10 border border-white/20 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15">
            <div className="flex items-center justify-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Instant Quote Estimator</span>
            </div>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Transparent Price Estimator
          </h2>
          <p className="text-sm text-gray-200 mt-2">
            Adjust tree dimensions and hazards below for an immediate cost range estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tree Height Slider */}
            <div className="space-y-2 p-5 rounded-2xl glass border border-white/10">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>Approximate Tree Height</span>
                <span className="text-[#A3E635] font-mono text-base font-extrabold">
                  {calcState.treeHeightFt} Feet
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={calcState.treeHeightFt}
                onChange={(e) =>
                  setCalcState({ ...calcState, treeHeightFt: parseInt(e.target.value) })
                }
                className="w-full accent-[#A3E635] h-2 bg-white/20 rounded-lg cursor-pointer"
                id="calc-height-slider"
              />
              <div className="flex justify-between text-[11px] text-gray-300 font-medium">
                <span>10ft (Small ornamental)</span>
                <span>45ft (Medium oak/maple)</span>
                <span>90ft+ (Giant pine/redwood)</span>
              </div>
            </div>

            {/* Tree Condition Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Tree Health / Structural Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'healthy', label: 'Healthy / Trim' },
                  { id: 'leaning', label: 'Leaning Trunk' },
                  { id: 'dead_rotting', label: 'Dead / Rotting' },
                  { id: 'storm_hazard', label: 'Storm Danger' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setCalcState({ ...calcState, treeCondition: item.id as any })
                    }
                    className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      calcState.treeCondition === item.id
                        ? 'bg-[#A3E635] text-[#064E3B] border-[#A3E635] shadow-lg shadow-[#A3E635]/20'
                        : 'glass text-gray-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Proximity Hazards */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Location Hazards & Obstacles
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'clear', label: 'Open Yard' },
                  { id: 'near_house', label: 'Near House / Roof' },
                  { id: 'powerlines', label: 'Near Powerlines' },
                  { id: 'tight_space', label: 'Tight Backyard' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCalcState({ ...calcState, proximity: item.id as any })}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      calcState.proximity === item.id
                        ? 'bg-[#A3E635] text-[#064E3B] border-[#A3E635] shadow-lg shadow-[#A3E635]/20'
                        : 'glass text-gray-200 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Trees & Zip Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">
                  Number of Trees
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCalcState({
                        ...calcState,
                        numberOfTrees: Math.max(1, calcState.numberOfTrees - 1),
                      })
                    }
                    className="w-10 h-10 rounded-xl glass font-bold text-lg text-white hover:bg-white/15 cursor-pointer flex items-center justify-center border border-white/15"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-white">
                    {calcState.numberOfTrees} Tree(s)
                  </span>
                  <button
                    onClick={() =>
                      setCalcState({
                        ...calcState,
                        numberOfTrees: Math.min(10, calcState.numberOfTrees + 1),
                      })
                    }
                    className="w-10 h-10 rounded-xl glass font-bold text-lg text-white hover:bg-white/15 cursor-pointer flex items-center justify-center border border-white/15"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300">
                  Zip / Postal Code
                </label>
                <input
                  type="text"
                  value={calcState.zipCode}
                  onChange={(e) => setCalcState({ ...calcState, zipCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-mono focus:outline-none focus:border-[#A3E635]"
                />
              </div>
            </div>

            {/* Optional Addons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Optional Service Addons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-3 rounded-xl glass border border-white/10 text-xs font-medium text-gray-200 cursor-pointer hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={calcState.includeStumpGrinding}
                    onChange={(e) =>
                      setCalcState({ ...calcState, includeStumpGrinding: e.target.checked })
                    }
                    className="accent-[#A3E635] rounded"
                  />
                  <span>Stump Grinding (+$120)</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl glass border border-white/10 text-xs font-medium text-gray-200 cursor-pointer hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={calcState.includeWoodChipping}
                    onChange={(e) =>
                      setCalcState({ ...calcState, includeWoodChipping: e.target.checked })
                    }
                    className="accent-[#A3E635] rounded"
                  />
                  <span>Wood Chipping (+$75)</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl glass border border-white/10 text-xs font-medium text-gray-200 cursor-pointer hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={calcState.emergencyExpress}
                    onChange={(e) =>
                      setCalcState({ ...calcState, emergencyExpress: e.target.checked })
                    }
                    className="accent-[#A3E635] rounded"
                  />
                  <span>Same-Day Emergency (+$250)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Box */}
          <div className="lg:col-span-5 glass rounded-[32px] p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-bold text-[#A3E635] uppercase tracking-widest">
                Estimated Price Range
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full glass text-[#A3E635] font-mono border border-white/10">
                Cached Live Calculation
              </span>
            </div>

            <div className="text-center py-2">
              <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#86efac]">
                ${result.minPrice} - ${result.maxPrice}
              </p>
              <p className="text-xs text-gray-300 mt-1 font-medium">
                No hidden fees &bull; Includes full site clean-up
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between p-3 rounded-xl glass border border-white/10">
                <span className="text-gray-300">Estimated Project Time:</span>
                <span className="font-bold text-white font-mono">{result.estimatedHours}</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl glass border border-white/10">
                <span className="text-gray-300">Hazard / Risk Level:</span>
                <span
                  className={`font-bold uppercase ${
                    result.riskFactor === 'Low'
                      ? 'text-[#A3E635]'
                      : result.riskFactor === 'Moderate'
                      ? 'text-amber-300'
                      : 'text-red-400'
                  }`}
                >
                  {result.riskFactor} Risk
                </span>
              </div>

              <div className="p-3.5 rounded-xl glass border border-white/10 space-y-2">
                <span className="text-gray-300 block font-semibold">Recommended Equipment:</span>
                <ul className="space-y-1.5">
                  {result.recommendedEquipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-[#A3E635]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A3E635]" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Apply to Contact Form CTA */}
            <button
              onClick={handleApply}
              className="w-full py-4 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] font-bold text-sm shadow-xl shadow-[#A3E635]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all"
              id="calc-transfer-to-form-btn"
            >
              <span>Transfer Quote to Contact Form</span>
              <ArrowRight className="w-4 h-4 text-[#064E3B]" />
            </button>

            {appliedNotification && (
              <p className="text-xs text-center text-[#A3E635] font-bold animate-bounce">
                ✓ Quote parameters successfully transferred to contact form below!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
