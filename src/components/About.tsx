import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const aboutImage =
  'https://images.pexels.com/photos/8353820/pexels-photo-8353820.jpeg?auto=compress&cs=tinysrgb&w=1100&h=800&dpr=2';

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-gradient-to-b from-white to-slate-50/50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <Reveal className="relative order-first lg:order-last">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-xl shadow-primary-900/10 ring-1 ring-slate-200/60">
              <img
                src={aboutImage}
                alt={siteConfig.about.imageAlt}
                width={1100}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Accent shape */}
            <div
              className="pointer-events-none absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-2xl bg-primary-100/60"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-full bg-gold-100/50"
              aria-hidden="true"
            />
          </Reveal>

          {/* Text side */}
          <div>
            <SectionHeading
              heading={siteConfig.about.heading}
              subheading={siteConfig.about.subheading}
              align="left"
            />

            <div className="mt-6 space-y-4">
              {siteConfig.about.paragraphs.map((para, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className="text-base leading-relaxed text-slate-600">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Key highlights */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Client-focused service',
                'Modern technology',
                'Clear communication',
                'Long-term relationships',
              ].map((item, i) => (
                <Reveal key={item} delay={i * 60} as="li">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-primary-800">
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-primary-600"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>

            {/* Regulatory placeholder — hidden unless populated */}
            {siteConfig.legal.sebiRegistration && (
              <p className="mt-6 text-sm text-slate-400">
                SEBI Registration: {siteConfig.legal.sebiRegistration}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
