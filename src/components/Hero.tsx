import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig, getWhatsAppUrl, getTelUrl } from '@/config/siteConfig';

const heroImage =
  'https://images.pexels.com/photos/8068654/pexels-photo-8068654.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1';

export default function Hero() {
  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24"
    >
      {/* Decorative background shapes */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-gold-100/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content — always first in DOM for mobile */}
          <div className="hero-fade-in flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold text-primary-700">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
              Professional Financial Services · {siteConfig.location}
            </span>

            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] text-primary-900 sm:text-5xl lg:text-6xl">
              {siteConfig.hero.heading}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              {siteConfig.hero.subheading}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary CTA */}
              <a
                href={siteConfig.hero.primaryCta.target}
                onClick={(e) => scrollTo(e, siteConfig.hero.primaryCta.target)}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              {/* Secondary CTA — direct call */}
              <a
                href={getTelUrl()}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-7 py-3.5 text-base font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Talk to Us
              </a>
            </div>

            {/* Trust indicator — WhatsApp only */}
            <div className="mt-10 flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                WhatsApp Support
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="hero-fade-in-delayed relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary-900/10 ring-1 ring-slate-200/60">
              <img
                src={heroImage}
                alt={siteConfig.hero.imageAlt}
                width={900}
                height={600}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-5 -left-3 hidden rounded-xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 transition-transform hover:-translate-y-1 sm:block lg:-left-6">
              <a
                href={getTelUrl()}
                className="group flex items-center gap-3"
                aria-label={`Call ${siteConfig.contactPerson}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Call directly</p>
                  <p className="text-sm font-bold text-primary-800 transition-colors group-hover:text-primary-600">
                    {siteConfig.contactPerson}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
