import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';

const GHL_FORM_SCRIPT_SRC = 'https://link.kdlead.com/js/form_embed.js';

export const GlassContactForm: React.FC = () => {
  // Load the GoHighLevel embed script once (guards against duplicate injection on re-render)
  useEffect(() => {
    if (document.querySelector(`script[src="${GHL_FORM_SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = GHL_FORM_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl mx-auto">
      {/* Container with Glassmorphism Blur Effect */}
      <div className="relative rounded-[32px] p-6 sm:p-12 glass border border-white/20 shadow-2xl backdrop-blur-2xl overflow-hidden text-white">
        {/* Glow Accent Circles in Background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-8 pb-6 border-b border-white/10">
            <span className="inline-block px-4 py-1.5 rounded-full glass text-[#A3E635] text-xs font-semibold tracking-widest uppercase mb-2 border border-white/15">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Glass Blur Request Portal</span>
              </div>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight">
              Get Your Free Arborist Estimate
            </h2>
          </div>

          {/* GoHighLevel Embedded Lead Form */}
          <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5" style={{ height: '877px' }}>
            <iframe
              src="https://link.kdlead.com/widget/form/d8izbIaLeZyw5ooVZior"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
              id="inline-d8izbIaLeZyw5ooVZior"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Northfield Tree Works"
              data-height="877"
              data-layout-iframe-id="inline-d8izbIaLeZyw5ooVZior"
              data-form-id="d8izbIaLeZyw5ooVZior"
              title="Northfield Tree Works"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
