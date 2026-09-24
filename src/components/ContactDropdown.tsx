import { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { siteConfig, getWhatsAppUrl, getTelUrl } from '@/config/siteConfig';

interface ContactDropdownProps {
  /** Where the dropdown is used — affects positioning */
  context?: 'navbar' | 'hero' | 'cta' | 'floating';
  /** Label shown on the trigger button */
  label?: string;
  /** Show phone number in the trigger */
  showPhone?: boolean;
  /** Variant styling */
  variant?: 'navbar' | 'button' | 'light' | 'outline' | 'hero';
  className?: string;
}

/**
 * Reusable contact dropdown.
 * Clicking opens a popover with "Call" and "WhatsApp" options.
 * Closes on outside click, Escape, and option selection.
 */
export default function ContactDropdown({
  context = 'navbar',
  label,
  showPhone = false,
  variant = 'navbar',
  className = '',
}: ContactDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const triggerLabel =
    label ?? (showPhone ? siteConfig.phoneDisplay : `Talk to ${siteConfig.contactPerson.split(' ')[0]}`);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      // Focus first menu item after opening
      setTimeout(() => {
        const firstItem = menuRef.current?.querySelector('a, button');
        (firstItem as HTMLElement)?.focus();
      }, 0);
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent) => {
    const items = menuRef.current?.querySelectorAll('a, button');
    if (!items) return;
    const itemsArray = Array.from(items) as HTMLElement[];
    const currentIndex = itemsArray.indexOf(document.activeElement as HTMLElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = itemsArray[(currentIndex + 1) % itemsArray.length];
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = itemsArray[(currentIndex - 1 + itemsArray.length) % itemsArray.length];
      prev?.focus();
    } else if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  // Position the menu differently depending on context
  const menuPositionClass =
    context === 'floating'
      ? 'bottom-full right-0 mb-3'
      : context === 'hero' || context === 'cta'
        ? 'top-full left-0 mt-3'
        : 'top-full right-0 mt-3';

  // Trigger styling per variant
  const triggerClass =
    variant === 'navbar'
      ? 'flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors px-2 py-1 rounded-md hover:bg-primary-50'
      : variant === 'light'
        ? 'flex items-center gap-2 text-white hover:bg-white/10 font-semibold text-sm transition-colors px-4 py-2 rounded-lg border border-white/20'
        : variant === 'hero'
          ? 'flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:border-primary-400 hover:bg-primary-50 font-semibold text-base transition-all px-7 py-3.5 rounded-lg shadow-sm hover:shadow-md min-h-[48px]'
          : 'flex items-center gap-2 bg-white text-primary-600 border border-primary-200 hover:border-primary-400 hover:bg-primary-50 font-semibold text-sm transition-all px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Contact options for ${siteConfig.contactPerson}`}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={`absolute ${menuPositionClass} z-50 min-w-[200px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10`}
        >
          <a
            href={getTelUrl()}
            role="menuitem"
            onKeyDown={handleMenuItemKeyDown}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors min-h-[44px]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-semibold">Call {siteConfig.contactPerson.split(' ')[0]}</span>
              <span className="text-xs text-slate-500">{siteConfig.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onKeyDown={handleMenuItemKeyDown}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 transition-colors min-h-[44px]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-semibold">WhatsApp {siteConfig.contactPerson.split(' ')[0]}</span>
              <span className="text-xs text-slate-500">Chat with pre-filled message</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
