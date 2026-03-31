import { useState, useRef } from "react";
import { Check, Pencil, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const referralOptions = [
  "Google Search",
  "Nextdoor",
  "Facebook or Instagram",
  "Friend or neighbor referral",
  "Saw your truck or yard sign",
  "Already a customer (adding service)",
  "Other",
];

function formatPhone(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

const Step5ContactDetails = () => {
  const { quoteState, updateQuoteState, goToNextStep, goToStep } = useQuoteFlow();

  const [firstName, setFirstName] = useState(quoteState.firstName || "");
  const [lastName, setLastName] = useState(quoteState.lastName || "");
  const [email, setEmail] = useState(quoteState.email || "");
  const [phone, setPhone] = useState(quoteState.phone || "");
  const [referral, setReferral] = useState(quoteState.referralSource || "");
  const [emailOptIn, setEmailOptIn] = useState(quoteState.emailOptIn ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddressConfirm, setShowAddressConfirm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const streetOnly = quoteState.addressFormatted?.split(",")[0] || quoteState.address?.split(",")[0] || "";
  const priceLabel = quoteState.calculatedPrice != null
    ? `$${quoteState.calculatedPrice}/mo`
    : "Custom";

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "Please enter your first name";
    if (!lastName.trim()) errs.lastName = "Please enter your last name";
    if (!email.trim() || !isValidEmail(email)) errs.email = "Please enter a valid email address";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) errs.phone = "Please enter your phone number";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    updateQuoteState({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone,
      referralSource: referral || null,
      emailOptIn,
    });

    console.log("Quote Event:", "contact_submitted", {
      plan: quoteState.selectedPlan,
      referralSource: referral || null,
      timestamp: new Date().toISOString(),
    });

    goToNextStep();
  };

  const inputClass = (field: string) =>
    `w-full h-14 px-4 text-base rounded-xl border-2 bg-background text-foreground outline-none transition-all
     ${errors[field] ? "border-destructive" : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(61,184,122,0.15)]"}`;

  return (
    <div className="p-6 md:p-10" ref={formRef}>
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        Almost done — where should we send your quote?
      </h2>
      <p className="mt-2 text-base text-muted-foreground mb-8">
        We'll also use this to confirm your appointment.
      </p>

      {/* Quote summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-muted rounded-xl px-4 py-3 mb-8">
        <span className="text-sm font-semibold text-foreground">
          {quoteState.selectedPlan} Plan — {priceLabel}
        </span>
        <span className="text-sm text-muted-foreground hidden sm:inline">{streetOnly}</span>
        <button onClick={() => goToStep(4)} className="text-sm text-primary font-medium hover:underline">
          Edit
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div data-field="firstName">
          <label className="text-sm font-medium text-foreground block mb-1.5">First Name</label>
          <input
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
            className={inputClass("firstName")}
          />
          {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div data-field="lastName">
          <label className="text-sm font-medium text-foreground block mb-1.5">Last Name</label>
          <input
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
            className={inputClass("lastName")}
          />
          {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="mt-4" data-field="email">
        <label className="text-sm font-medium text-foreground block mb-1.5">Email Address</label>
        <div className="relative">
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
            className={inputClass("email")}
          />
          {email && isValidEmail(email) && !errors.email && (
            <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          )}
        </div>
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="mt-4" data-field="phone">
        <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number</label>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => { setPhone(formatPhone(e.target.value)); setErrors((p) => ({ ...p, phone: "" })); }}
          placeholder="(202) 555-0100"
          className={inputClass("phone")}
        />
        {errors.phone ? (
          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
        ) : (
          <p className="text-[13px] text-muted-foreground mt-1">
            We'll text or call to confirm your appointment. No spam, ever.
          </p>
        )}
      </div>

      {/* Referral */}
      <div className="mt-4">
        <label className="text-sm font-medium text-foreground block mb-1.5">
          How did you hear about us? <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <select
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
          className="w-full h-14 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary transition-all appearance-none"
        >
          <option value="" disabled>Select one...</option>
          {referralOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Service address confirmation */}
      <div className="mt-6">
        <label className="text-sm font-medium text-foreground block mb-1.5">Service Address</label>
        {quoteState.addressFormatted ? (
          <div className="relative">
            <div className="w-full h-14 px-4 pr-12 flex items-center text-base rounded-xl border-2 border-border bg-muted text-muted-foreground">
              {quoteState.addressFormatted}
            </div>
            <button
              onClick={() => setShowAddressConfirm(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Change address"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <input
            type="text"
            value={quoteState.address || ""}
            onChange={(e) => updateQuoteState({ address: e.target.value, addressFormatted: e.target.value })}
            placeholder="Enter your service address"
            className="w-full h-14 px-4 text-base rounded-xl border-2 border-border bg-background text-foreground outline-none focus:border-primary transition-all"
          />
        )}
      </div>

      {/* Address change confirmation dialog */}
      {showAddressConfirm && (
        <div className="mt-3 p-4 rounded-xl border-2 border-border bg-card animate-fade-in">
          <p className="text-sm text-foreground">
            Going back will clear your current quote progress. Are you sure?
          </p>
          <div className="flex gap-3 mt-3">
            <Button size="sm" variant="destructive" onClick={() => goToStep(1)}>
              Yes, change address
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowAddressConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Email opt-in */}
      <label className="mt-6 flex items-start gap-3 cursor-pointer">
        <div
          className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-all
            ${emailOptIn ? "bg-primary border-primary" : "border-border bg-background"}`}
          onClick={() => { setEmailOptIn(!emailOptIn); updateQuoteState({ emailOptIn: !emailOptIn }); }}
        >
          {emailOptIn && <Check className="h-3 w-3 text-primary-foreground" />}
        </div>
        <span className="text-sm text-muted-foreground" onClick={() => { setEmailOptIn(!emailOptIn); updateQuoteState({ emailOptIn: !emailOptIn }); }}>
          Send me seasonal pest alerts for the DC area — I'll know what's coming before it arrives.
        </span>
      </label>

      {/* Privacy line */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        <span>
          By continuing, you agree to our{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Privacy Policy
          </a>
          . We never sell your information.
        </span>
      </div>

      {/* Desktop CTA */}
      <Button
        className="hidden md:flex w-full mt-6 h-[52px] text-[17px] font-bold rounded-full"
        onClick={handleSubmit}
      >
        See Scheduling Options →
      </Button>
      <p className="hidden md:block text-[13px] text-muted-foreground text-center mt-2">
        No payment required — this is your estimate only.
      </p>
    </div>
  );
};

export default Step5ContactDetails;
