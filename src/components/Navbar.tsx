import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/config/siteConfig';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Track scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = siteConfig.navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock + focus management for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const focusable = mobileMenuRef.current?.querySelectorAll('a, button');
      (focusable?.[0] as HTMLElement)?.focus();
    } else {
      document.body.style.overflow = '';
      hamburgerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
          aria-label={`${siteConfig.companyName} — go to home`}
        >
          <Logo />
        </a>

        {/* Desktop nav — hidden on <xl */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? 'text-primary-600'
                  : 'text-slate-600 hover:text-primary-600'
              }`}
              aria-current={
                activeSection === item.href.slice(1) ? 'page' : undefined
              }
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary-600" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop right: "Enquire Now" only — phone removed per design */}
        <div className="hidden shrink-0 items-center xl:flex">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="fixed inset-0 top-16 z-30 xl:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/20"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute inset-x-0 top-0 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg">
            <div className="flex flex-col gap-1 px-4 py-4">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  aria-current={
                    activeSection === item.href.slice(1) ? 'page' : undefined
                  }
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile contact actions — phone number removed, WhatsApp + Enquire kept */}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1da851]"
                >
                  WhatsApp Us
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
