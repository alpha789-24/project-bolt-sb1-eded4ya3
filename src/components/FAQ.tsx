import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const faqs = [
  {
    q: 'What services does ALPHA-24 offer?',
    a: 'We offer a range of financial and market-related services including Stock Broking, Investment Planning, Mutual Funds, Algo Trading, Portfolio & Wealth Services, and Market & Trading Support. Each service is designed around your individual goals and preferences.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply fill out the enquiry form on this page or reach out to us directly via WhatsApp or phone. Our team will get in touch to understand your requirements and walk you through the relevant options.',
  },
  {
    q: 'Is my personal information safe?',
    a: 'Yes. Information submitted through this website is used solely to respond to your enquiry and to provide relevant assistance. We do not share your data with third parties for marketing purposes.',
  },
  {
    q: 'Do you offer services outside Vadodara?',
    a: 'While we are based in Vadodara, Gujarat, we serve clients across India. You can connect with our team remotely via phone or WhatsApp for consultations and ongoing support.',
  },
  {
    q: 'Are there any guaranteed returns?',
    a: 'No. All investments in securities markets are subject to market risks. We do not promise or guarantee any specific returns. Our role is to provide guidance and assistance based on your goals and risk profile.',
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'Minimum investment amounts vary depending on the service and instrument. Please reach out to our team directly and we will clarify the details relevant to your situation.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (idx: number) => setOpen((prev) => (prev === idx ? null : idx));

  return (
    <section id="faq" className="scroll-mt-16 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading="Frequently Asked Questions"
          subheading="Quick answers to common questions. Still have more? Reach out directly."
          eyebrow="FAQ"
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-slate-200/80">
          {faqs.map((faq, idx) => (
            <Reveal key={faq.q} delay={idx * 60}>
              <div className="py-1">
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={open === idx}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 rounded-lg px-1"
                >
                  <span className="font-heading text-base font-semibold text-primary-900 sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary-500 transition-transform duration-300 ${
                      open === idx ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pb-5 pl-1 pr-6 text-base leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-primary-50 p-6 text-center sm:p-8">
          <p className="font-heading text-lg font-semibold text-primary-900">
            Still have questions?
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Our team is happy to help — reach out and we'll respond promptly.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Send an Enquiry
            </a>
            <a
              href={`https://wa.me/919619011555`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-primary-200 bg-white px-6 py-2.5 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
