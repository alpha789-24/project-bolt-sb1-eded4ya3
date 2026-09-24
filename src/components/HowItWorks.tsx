import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ContactDropdown from './ContactDropdown';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-slate-50/70 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={siteConfig.howItWorks.heading}
          subheading={siteConfig.howItWorks.subheading}
          eyebrow="Simple Process"
        />

        {/* Timeline */}
        <div className="mt-16">
          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-0 right-0 top-11 h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100"
                aria-hidden="true"
              />
              <div className="grid grid-cols-4 gap-6">
                {siteConfig.howItWorks.steps.map((step, index) => (
                  <Reveal
                    key={step.number}
                    delay={index * 120}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Step circle — use explicit sizes instead of h-22/w-22 */}
                    <span className="relative z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-4 border-white bg-primary-600 text-white shadow-lg shadow-primary-600/20">
                      <span className="font-heading text-xl font-bold">
                        {step.number}
                      </span>
                    </span>
                    <h3 className="mt-5 font-heading text-base font-bold text-primary-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden">
            <div className="relative pl-12">
              {/* Vertical line */}
              <div
                className="absolute bottom-2 left-[1.375rem] top-2 w-0.5 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100"
                aria-hidden="true"
              />
              <div className="space-y-8">
                {siteConfig.howItWorks.steps.map((step, index) => (
                  <Reveal
                    key={step.number}
                    delay={index * 80}
                    className="relative"
                  >
                    {/* Use explicit w-11 h-11 instead of h-13/w-13 */}
                    <span className="absolute -left-12 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-primary-600 text-white shadow-lg shadow-primary-600/20">
                      <span className="font-heading text-sm font-bold">
                        {step.number}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-primary-900">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <ContactDropdown context="cta" variant="outline" />
        </div>
      </div>
    </section>
  );
}
