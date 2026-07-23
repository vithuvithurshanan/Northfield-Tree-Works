import React, { useState } from 'react';
import { TREE_SYMPTOMS } from '../data/treeServicesData';
import { TreeSymptom } from '../types';
import { Stethoscope, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export const TreeHealthDiagnosis: React.FC = () => {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(TREE_SYMPTOMS[0].id);

  const activeSymptom: TreeSymptom =
    TREE_SYMPTOMS.find((s) => s.id === selectedSymptomId) || TREE_SYMPTOMS[0];

  return (
    <section id="diagnosis" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-3 border border-white/15">
          <div className="flex items-center justify-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-[#A3E635]" />
            <span>Arborist Diagnostic Tool</span>
          </div>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
          Tree Health & Symptom Diagnoser
        </h2>
        <p className="text-sm text-gray-200 mt-2">
          Unsure if your tree needs trimming, disease treatment, or urgent removal? Select observed tree symptoms below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Symptoms */}
        <div className="lg:col-span-5 space-y-2">
          {TREE_SYMPTOMS.map((symptom) => {
            const isSelected = symptom.id === selectedSymptomId;
            return (
              <button
                key={symptom.id}
                onClick={() => setSelectedSymptomId(symptom.id)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#A3E635] text-[#064E3B] font-bold border-[#A3E635] shadow-lg shadow-[#A3E635]/20'
                    : 'glass text-gray-200 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
                id={`symptom-tab-${symptom.id}`}
              >
                <div className="space-y-1 pr-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#064E3B]/20 text-[#064E3B]'
                        : symptom.severity === 'critical'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {symptom.severity} urgency
                  </span>
                  <p className="text-sm font-bold">{symptom.symptomName}</p>
                </div>
                <ChevronRight className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#064E3B]' : 'text-gray-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Symptom Diagnosis & Treatment Advice */}
        <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-[32px] border border-white/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-[#A3E635] text-[#064E3B] shadow-md font-bold">
              <Stethoscope className="w-6 h-6 text-[#064E3B]" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {activeSymptom.symptomName}
              </h3>
              <span className="text-xs font-bold text-[#A3E635]">
                Diagnostic Category: {activeSymptom.category.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl glass border border-amber-400/20 text-amber-200 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span>Suspected Root Cause</span>
              </span>
              <p className="text-sm">{activeSymptom.possibleCause}</p>
            </div>

            <div className="p-4 rounded-2xl glass border border-white/10 text-gray-200 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#A3E635]">
                <ShieldCheck className="w-4 h-4 text-[#A3E635]" />
                <span>Recommended Arborist Action</span>
              </span>
              <p className="text-sm leading-relaxed">{activeSymptom.recommendedAction}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-300">
              Need on-site trunk density testing or leaf sample diagnosis?
            </p>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-[#064E3B] font-bold text-xs shadow-lg shadow-[#A3E635]/20 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>Book Arborist Inspection</span>
              <ChevronRight className="w-4 h-4 text-[#064E3B]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
