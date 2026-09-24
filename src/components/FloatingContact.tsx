import { useEffect, useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { siteConfig, getWhatsAppUrl, getTelUrl } from '@/config/siteConfig';

export default function FloatingContact() {
  const [hidden, setHidden] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Hide when enquiry form is in view
  useEffect(() => {
    const contactSection = document.querySelector('#contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHidden(entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  // Close expanded panel on outside click
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('#floating-contact')) setExpanded(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded]);

  return (
    <div
      id="floating-contact"
      className={`fixed bottom-6 right-4 z-30 transition-all duration-300 sm:bottom-8 sm:right-6 ${
        hidden ? 'pointer-events-none translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Expanded contact panel */}
      {expanded && (
        <div className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10 animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="flex items-center justify-between px-1 pb-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Reach Us
            </p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:text-slate-600"
              aria-label="Close contact panel"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center gap-3 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100"
            onClick={() => setExpanded(false)}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              <MessageCircle className="h-4 w-4 text-green-700" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span>WhatsApp {siteConfig.contactPerson.split(' ')[0]}</span>
              <span className="text-xs font-normal text-green-600">Chat now</span>
            </span>
          </a>

          {/* Call */}
          <a
            href={getTelUrl()}
            className="flex min-h-[44px] items-center gap-3 rounded-xl bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-100"
            onClick={() => setExpanded(false)}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
              <Phone className="h-4 w-4 text-primary-600" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span>Call {siteConfig.contactPerson.split(' ')[0]}</span>
              <span className="text-xs font-normal text-primary-500">{siteConfig.phoneDisplay}</span>
            </span>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Close contact options' : 'Open contact options'}
        aria-expanded={expanded}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl shadow-primary-600/30 transition-all hover:scale-105 hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        {expanded ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Phone className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
