import type { ReactNode } from 'react';

interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  variant?: 'dark' | 'light';
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  heading,
  subheading,
  eyebrow,
  align = 'center',
  variant = 'dark',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const headingColor = variant === 'light' ? 'text-white' : 'text-primary-900';
  const subColor = variant === 'light' ? 'text-white/80' : 'text-slate-600';
  const eyebrowColor = variant === 'light' ? 'text-gold-400' : 'text-primary-600';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3 ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight ${headingColor}`}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={`mt-4 text-lg leading-relaxed ${subColor}`}>{subheading}</p>
      )}
    </div>
  );
}
