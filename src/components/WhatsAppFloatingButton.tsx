import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Clock } from 'lucide-react';

const GHL_FORM_SCRIPT_SRC = 'https://link.kdlead.com/js/form_embed.js';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Load the GoHighLevel embed script once (guards against duplicate injection on re-render)
  useEffect(() => {
    if (document.querySelector(`script[src="${GHL_FORM_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = GHL_FORM_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expandable Quick Contact Widget */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[360px] glass-panel bg-white/95 dark:bg-slate-900/95 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200 flex flex-col max-h-[560px]">
          <div className="flex items-center justify-between p-4 pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Quick Contact</h4>
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Arborist Online Now
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close Quick Contact"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            <iframe
              src="https://link.kdlead.com/widget/form/d8izbIaLeZyw5ooVZior"
              style={{ width: '100%', height: '460px', border: 'none' }}
              id="inline-d8izbIaLeZyw5ooVZior-fab"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Northfield Tree Works"
              data-height="877"
              data-layout-iframe-id="inline-d8izbIaLeZyw5ooVZior-fab"
              data-form-id="d8izbIaLeZyw5ooVZior"
              title="Northfield Tree Works Quick Contact"
            />
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
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
        aria-label="Quick Contact Widget"
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
