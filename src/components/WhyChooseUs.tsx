import {
  UserRound,
  Eye,
  Smartphone,
  HeartHandshake,
  LineChart,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const iconMap: Record<string, LucideIcon> = {
  UserRound,
  Eye,
  Smartphone,
  HeartHandshake,
  LineChart,
  Users,
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-16 bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={siteConfig.whyChooseUs.heading}
          subheading={siteConfig.whyChooseUs.subheading}
          eyebrow="Our Approach"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.whyChooseUs.points.map((point, index) => {
            const Icon = iconMap[point.icon] ?? UserRound;
            return (
              <Reveal
                key={point.title}
                delay={(index % 3) * 80}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-slate-50/60 p-5 shadow-sm transition-all duration-200 hover:border-primary-200 hover:bg-white hover:shadow-md"
              >
                {/* Use primary palette consistently — no blue secondary */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-bold text-primary-900">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
