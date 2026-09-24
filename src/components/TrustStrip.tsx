import {
  UserCheck,
  MessageSquareText,
  Cpu,
  Handshake,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import Reveal from './Reveal';

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  MessageSquareText,
  Cpu,
  Handshake,
};

export default function TrustStrip() {
  return (
    <section
      aria-label="Why ALPHA-24"
      className="border-y border-slate-100 bg-white py-10 sm:py-12"
    >
      {/* Visually hidden h2 preserves heading hierarchy without displaying */}
      <h2 className="sr-only">Why ALPHA-24</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {siteConfig.trustItems.map((item, index) => {
            const Icon = iconMap[item.icon] ?? UserCheck;
            return (
              <Reveal
                key={item.title}
                delay={index * 80}
                className="flex items-start gap-4 sm:items-center sm:gap-3 lg:flex-col lg:items-start lg:gap-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 lg:mb-3">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {item.description}
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
