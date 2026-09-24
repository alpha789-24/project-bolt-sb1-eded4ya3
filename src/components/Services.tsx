import {
  TrendingUp,
  Target,
  PieChart,
  Bot,
  Briefcase,
  Headset,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Target,
  PieChart,
  Bot,
  Briefcase,
  Headset,
};

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-slate-50/70 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading="Our Services"
          subheading="Comprehensive financial and market-related solutions designed around your needs"
          eyebrow="What We Offer"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? TrendingUp;
            return (
              <Reveal
                key={service.title}
                delay={(index % 3) * 80}
                as="article"
                className="group relative flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5"
              >
                {/* Top accent line on hover */}
                <span
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-primary-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  aria-label={`Enquire about ${service.title}`}
                >
                  Enquire now
                  <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
