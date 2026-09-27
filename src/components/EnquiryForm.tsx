/**
 * EnquiryForm.tsx
 *
 * Submits to Netlify Forms via AJAX (fetch POST to "/__forms.html").
 *
 * HOW NETLIFY FORMS WORKS:
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Netlify's build bot scans public/__forms.html for a hidden <form> with
 *    data-netlify="true" and registers the form by name.
 * 2. This React form does NOT use a traditional POST; instead it sends an
 *    AJAX fetch with Content-Type: application/x-www-form-urlencoded and
 *    includes "form-name" matching the registered form name.
 * 3. Netlify intercepts that POST at the CDN edge and stores the submission.
 *
 * ⚠️  This ONLY works on the deployed Netlify site — NOT in local dev
 *     (localhost). On localhost, the form will show success but Netlify
 *     will not receive anything. That is expected.
 *
 * EMAIL NOTIFICATIONS:
 *   After deploying, go to:
 *   Netlify Dashboard → Your Site → Site configuration → Forms → Form notifications
 *   Add an email notification for the "enquiry" form.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useRef, useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Mail,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/config/siteConfig';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

// ── The Netlify form name must match the form in public/__forms.html ────────
const NETLIFY_FORM_NAME = 'enquiry';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;   // field name matches index.html hidden form "service"
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  consent?: string;
}

const initialState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  consent: false,
};

// ── Validation ───────────────────────────────────────────────────────────────

function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'Please enter your full name.';
  if (trimmed.length < 2) return 'Please enter a valid name (at least 2 characters).';
  if (!/^[A-Za-z\s]+$/.test(trimmed))
    return 'Please enter a valid name using letters only.';
  return undefined;
}

/**
 * Indian mobile number: exactly 10 digits, must start with 6, 7, 8, or 9.
 * Strips optional leading +91 / 91 prefix before validation.
 */
function validatePhone(value: string): string | undefined {
  // Strip spaces, hyphens, plus
  let cleaned = value.replace(/[\s+-]/g, '');
  // Strip country code if present
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }
  if (!cleaned) return 'Please enter a valid 10-digit Indian mobile number.';
  if (!/^\d{10}$/.test(cleaned))
    return 'Please enter a valid 10-digit Indian mobile number.';
  // Must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(cleaned))
    return 'Please enter a valid Indian mobile number (must start with 6–9).';
  return undefined;
}

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'Please enter a valid email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    return 'Please enter a valid email address.';
  return undefined;
}

function validateService(value: string): string | undefined {
  if (!value) return 'Please select a service.';
  return undefined;
}

function validateConsent(checked: boolean): string | undefined {
  if (!checked) return 'Please agree to be contacted to submit the form.';
  return undefined;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormErrors) => {
    let error: string | undefined;
    switch (field) {
      case 'fullName': error = validateName(form.fullName); break;
      case 'phone':    error = validatePhone(form.phone);   break;
      case 'email':    error = validateEmail(form.email);   break;
      case 'service':  error = validateService(form.service); break;
      case 'consent':  error = validateConsent(form.consent); break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handlePhoneChange = (value: string) => {
    // Allow digits only, strip spaces / + / -, strip leading 91, cap at 10
    let cleaned = value.replace(/[\s+-]/g, '');
    if (cleaned.startsWith('91') && cleaned.length > 10) {
      cleaned = cleaned.slice(2);
    }
    cleaned = cleaned.replace(/\D/g, '').slice(0, 10);
    updateField('phone', cleaned);
  };

  const handleNameChange = (value: string) => {
    // Allow letters and spaces only
    updateField('fullName', value.replace(/[^A-Za-z\s]/g, ''));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      fullName: validateName(form.fullName),
      phone:    validatePhone(form.phone),
      email:    validateEmail(form.email),
      service:  validateService(form.service),
      consent:  validateConsent(form.consent),
    };
    setErrors(newErrors);

    // Focus the first invalid field
    const firstError = (Object.keys(newErrors) as (keyof FormErrors)[]).find(
      (k) => newErrors[k],
    );
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return; // prevent double-submit

    if (!validateAll()) return;

    setStatus('submitting');

    try {
      /*
       * Netlify Forms AJAX submission.
       * Field names here must match public/__forms.html exactly.
       * Content-Type MUST be application/x-www-form-urlencoded (not JSON).
       */
      const fields = {
        'form-name':  NETLIFY_FORM_NAME,
        'bot-field':  '',             // honeypot — always empty for real users
        fullName:     form.fullName.trim(),
        phone:        form.phone,
        email:        form.email.trim(),
        service:      form.service,
        message:      form.message.trim(),
        consent:      'yes',
      };

      const response = await fetch('/__forms.html', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    new URLSearchParams(fields).toString(),
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Netlify form submission failed', {
          status: response.status,
          responseText,
        });
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setCharCount(0);
    setStatus('idle');
  };

  // ── Style helpers ──────────────────────────────────────────────────────────
  const inputBase =
    'w-full rounded-lg border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 min-h-[48px]';
  const inputOk  = 'border-slate-300';
  const inputErr = 'border-red-400 focus:border-red-500 focus:ring-red-500/30';
  const labelBase = 'block text-sm font-semibold text-slate-700 mb-1.5';
  const errBase   = 'mt-1.5 text-sm text-red-600 flex items-center gap-1.5';

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <section
        id="contact"
        className="scroll-mt-16 bg-gradient-to-b from-slate-50/70 to-white py-20 lg:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-primary-900/5 sm:p-12">
            <div className="success-check mx-auto flex h-20 w-20 items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-primary-900">
              Thank you! Your enquiry has been received.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Our team will contact you shortly.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {siteConfig.contactPerson.split(' ')[0]}
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-primary-200 px-5 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Send another enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-gradient-to-b from-slate-50/70 to-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading={siteConfig.enquiryForm.heading}
          subheading={siteConfig.enquiryForm.subheading}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* ── Contact info panel ── */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <h3 className="font-heading text-lg font-bold text-primary-900">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Reach out directly or fill out the form — we'll respond promptly.
                </p>
              </div>

              <div className="space-y-5">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary-900">WhatsApp Support</p>
                    <p className="text-sm text-slate-500">{siteConfig.contactPerson}</p>
                    <div className="mt-2 flex gap-2">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary-900">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="break-words text-sm text-primary-600 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary-900">Office</p>
                    <p className="text-sm text-slate-500">{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              {/* Privacy notice */}
              <div className="mt-auto rounded-lg bg-slate-50 p-4">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                  {siteConfig.enquiryForm.privacyNotice}
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Form ── */}
          <Reveal delay={100} className="lg:col-span-3">
            {/* Netlify detects this form from public/__forms.html. */}
            <form
              name={NETLIFY_FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              noValidate
              aria-describedby="form-status"
            >
              {/* Required hidden fields for Netlify */}
              <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />

              {/* Honeypot — hidden from real users, traps bots */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label>
                  Do not fill this in:{' '}
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {/* ── Error banner ── */}
              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-800">
                      Submission failed. Please try again.
                    </p>
                    <p className="mt-1 text-sm text-red-700">
                      You can also reach us directly via WhatsApp — your details are preserved below.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 hover:bg-green-200"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen-reader status announcer */}
              <div
                id="form-status"
                role="status"
                aria-live="polite"
                className="sr-only"
              >
                {status === 'submitting' && 'Submitting your enquiry, please wait.'}
                {status === 'error'      && 'There was an error submitting the form.'}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className={labelBase}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={(el) => { fieldRefs.current.fullName = el; }}
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    placeholder="Enter your full name"
                    className={`${inputBase} ${errors.fullName ? inputErr : inputOk}`}
                  />
                  {errors.fullName && (
                    <p id="error-fullName" className={errBase} role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={(el) => { fieldRefs.current.phone = el; }}
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    placeholder="10-digit mobile number"
                    className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
                  />
                  {errors.phone && (
                    <p id="error-phone" className={errBase} role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={(el) => { fieldRefs.current.email = el; }}
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    placeholder="you@example.com"
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                  />
                  {errors.email && (
                    <p id="error-email" className={errBase} role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service (was "Interested In" / interestedIn) */}
                <div className="sm:col-span-2">
                  <label htmlFor="service" className={labelBase}>
                    Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    ref={(el) => { fieldRefs.current.service = el; }}
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={(e) => updateField('service', e.target.value)}
                    onBlur={() => handleBlur('service')}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'error-service' : undefined}
                    className={`${inputBase} ${errors.service ? inputErr : inputOk}`}
                  >
                    <option value="">Select a service</option>
                    {siteConfig.enquiryForm.interestedInOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="error-service" className={errBase} role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelBase}>
                    Message / Requirement{' '}
                    <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={siteConfig.enquiryForm.maxMessageLength}
                    value={form.message}
                    onChange={(e) => {
                      updateField('message', e.target.value);
                      setCharCount(e.target.value.length);
                    }}
                    placeholder="Tell us briefly about what you're looking for"
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                  <p className="mt-1 text-right text-xs text-slate-400">
                    {charCount}/{siteConfig.enquiryForm.maxMessageLength}
                  </p>
                </div>

                {/* Consent */}
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      ref={(el) => { fieldRefs.current.consent = el; }}
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      onBlur={() => handleBlur('consent')}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'error-consent' : undefined}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-primary-600 focus:ring-2 focus:ring-primary-500/30"
                    />
                    <span className="text-sm leading-relaxed text-slate-600">
                      I agree to be contacted regarding the services requested.{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="error-consent" className={`${errBase} mt-1.5`} role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
