import { useState } from 'react';
import { Mail, MapPin, MessageCircle, X } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/config/siteConfig';
import Logo from './Logo';

type LegalKey = 'privacyPolicy' | 'terms' | 'riskDisclosure';

export default function Footer() {
  const [modalContent, setModalContent] = useState<{ title: string; text: string } | null>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLegal = (key: LegalKey) => {
    const title =
      key === 'privacyPolicy'
        ? 'Privacy Policy'
        : key === 'terms'
          ? 'Terms & Conditions'
          : 'Risk Disclosure';
    const text = siteConfig.legal[key];
    setModalContent({ title, text });
  };

  const socials = Object.entries(siteConfig.socialLinks).filter(
    ([, url]) => url !== null,
  );

  return (
    <>
      <footer className="bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Logo variant="light" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                {siteConfig.footer.description}
              </p>

              {/* Regulatory placeholder — hidden unless populated */}
              {siteConfig.legal.sebiRegistration && (
                <p className="mt-4 text-xs text-white/50">
                  SEBI Registration: {siteConfig.legal.sebiRegistration}
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white/90">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white/90">
                Contact
              </h3>
              <ul className="mt-4 space-y-3.5">
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-medium text-white">{siteConfig.contactPerson}</p>
                    <div className="mt-1 flex gap-2">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white underline"
                      >
                        WhatsApp Support
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="break-words hover:text-white underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" aria-hidden="true" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>

              {/* Social links — only if populated */}
              {socials.length > 0 && (
                <div className="mt-4 flex gap-3">
                  {socials.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                      aria-label={platform}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Legal links */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white/90">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.footer.legalLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      type="button"
                      onClick={() => openLegal(link.key as LegalKey)}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk disclosure block */}
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">
              Risk Disclosure
            </p>
            <p className="text-xs leading-relaxed text-white/70">
              {siteConfig.legal.riskDisclosure}
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Professional Financial Services · {siteConfig.location}
            </p>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setModalContent(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <h2
                id="modal-title"
                className="font-heading text-xl font-bold text-primary-900"
              >
                {modalContent.title}
              </h2>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {modalContent.text}
            </p>
            <button
              type="button"
              onClick={() => setModalContent(null)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
