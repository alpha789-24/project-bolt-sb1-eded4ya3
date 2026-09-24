import { siteConfig } from '@/config/siteConfig';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'dark' | 'light';
}

/**
 * Company logo — image mark + wordmark.
 * To replace with a real logo file:
 *   1. Add /public/logo.svg (or logo.png)
 *   2. Swap the <img> src below to "/logo.svg"
 *
 * The wordmark uses a CSS gradient (navy → royal-blue) defined inline so it
 * works without any extra Tailwind config. The "-24" accent is a lighter blue.
 * "FINANCIAL SERVICES" sits below in small, wide-tracked uppercase slate-blue.
 */
export default function Logo({
  className = '',
  showText = true,
  variant = 'dark',
}: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/*
        Logo image — h-8 fits comfortably inside the h-16 navbar.
        mix-blend-multiply makes the white background of the JPG transparent
        on light surfaces; on the dark footer we swap to a plain render.
      */}
      <img
        src="/alpha-24-logo.jpg"
        alt={isDark ? '' : siteConfig.companyName}
        className={`h-8 w-auto shrink-0 ${isDark ? 'mix-blend-multiply' : 'opacity-90'}`}
        aria-hidden={showText ? 'true' : undefined}
      />

      {showText && (
        <span
          className="flex flex-col leading-none"
          aria-hidden="true"
        >
          {/* ── Wordmark ── */}
          <span className="flex items-baseline gap-0 font-heading font-extrabold tracking-[0.06em]">
            {isDark ? (
              /* Dark variant: gradient text navy → royal-blue */
              <>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #0B2A5B 0%, #1D4ED8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.2rem',
                    lineHeight: 1,
                  }}
                >
                  ALPHA
                </span>
                <span
                  style={{
                    background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.2rem',
                    lineHeight: 1,
                  }}
                >
                  -24
                </span>
              </>
            ) : (
              /* Light variant (footer): solid white */
              <span
                className="text-white"
                style={{ fontSize: '1.2rem', lineHeight: 1 }}
              >
                ALPHA<span className="text-white/75">-24</span>
              </span>
            )}
          </span>

          {/* ── Tagline ── */}
          <span
            className={`mt-[5px] block text-[8.5px] font-semibold uppercase tracking-[0.22em] ${
              isDark ? 'text-slate-400' : 'text-white/60'
            }`}
          >
            Financial Services
          </span>
        </span>
      )}
    </div>
  );
}
