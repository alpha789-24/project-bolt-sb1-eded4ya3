import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
} from 'react';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

/**
 * Scroll-reveal wrapper using IntersectionObserver.
 * Adds a visible class once when the element enters the viewport.
 * Respects prefers-reduced-motion (element is visible immediately).
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
