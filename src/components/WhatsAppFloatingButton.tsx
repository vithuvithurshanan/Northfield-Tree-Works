import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickQuestions = [
    { title: '⚡ 24/7 Storm Emergency', msg: 'Hello! I have a storm emergency tree removal request.' },
    { title: '✂️ Tree Trimming Quote', msg: 'Hi! I would like a free estimate for tree trimming.' },
    { title: '🪵 Stump Grinding Inquiry', msg: 'Hello! How much does stump grinding cost?' },
  ];

  const handleOpenWhatsApp = (customMsg: string) => {
    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/15558733328?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expandable Quick Inquiry Panel */}
      {isOpen && (
        <div className="mb-3 w-80 glass-panel bg-white/95 dark:bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-5 shadow-2xl space-y-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">WhatsApp Inquiry</h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Arborist Online Now
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Select a quick question below to connect with an arborist on WhatsApp immediately:
          </p>

          <div className="space-y-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleOpenWhatsApp(q.msg)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 text-left flex items-center justify-between transition-colors cursor-pointer"
                id={`whatsapp-quick-${idx}`}
              >
                <span>{q.title}</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Average reply: 2 mins
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Northfield Tree Works 24/7</span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Quick WhatsApp Inquiry"
        id="whatsapp-floating-trigger"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>

        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7 animate-bounce" />}
      </button>
    </div>
  );
};
