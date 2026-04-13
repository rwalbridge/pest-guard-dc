import { useQuoteFlow } from "../QuoteFlowContext";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Footprints, Lock, Home } from "lucide-react";

function generateICS(state: {
  appointmentDate: string | null;
  appointmentTime: string | null;
  addressFormatted: string | null;
}) {
  if (!state.appointmentDate) return null;
  const d = new Date(state.appointmentDate);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const fmt = (dt: Date) =>
    `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
  const end = new Date(d.getTime() + 2 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(d)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:PestGuard Visit",
    `DESCRIPTION:Your first GreenShield treatment at ${state.addressFormatted || "your home"}`,
    `LOCATION:${state.addressFormatted || ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const ConfirmationScreen = () => {
  const { quoteState, closeFlow } = useQuoteFlow();

  const isOnline = quoteState.schedulingMethod === "online";
  const dayLabel = quoteState.appointmentDate
    ? new Date(quoteState.appointmentDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const priceLabel =
    quoteState.calculatedPrice != null ? `$${quoteState.calculatedPrice}/month` : "Custom pricing";

  const handleAddToCalendar = () => {
    const ics = generateICS(quoteState);
    if (!ics) return;
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "greenshield-appointment.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareText = () => {
    const msg = `I just scheduled GreenShield pest control for ${quoteState.addressFormatted || "my home"}. First visit: ${dayLabel} between ${quoteState.appointmentTime || "TBD"}. pestguard.com`;
    window.open(`sms:?body=${encodeURIComponent(msg)}`, "_self");
  };

  const handleReturn = () => {
    localStorage.removeItem("greenshield_quote_draft");
    closeFlow();
  };

  return (
    <div className="p-6 md:p-10 text-center">
      {/* Animated checkmark */}
      <div className="mx-auto w-20 h-20 mb-6">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            className="animate-draw-circle"
          />
          <path
            d="M24 42 L34 52 L56 30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-check"
          />
        </svg>
      </div>

      <h2 className="text-[32px] font-bold text-secondary leading-tight">
        You're all set, {quoteState.firstName || "there"}! 🎉
      </h2>

      {/* Summary card */}
      <div className="mt-8 mx-auto max-w-md rounded-2xl border-2 border-primary bg-primary/5 p-7 text-left">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          Your GreenShield Quote
        </p>
        <p className="text-lg font-bold text-foreground mt-1">
          {quoteState.selectedPlan} Plan — {priceLabel}
        </p>

        <div className="my-4 border-t border-border" />

        {isOnline ? (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">📅 First Visit Scheduled</p>
            <p className="text-sm text-muted-foreground">
              {dayLabel} between {quoteState.appointmentTime}
            </p>
            <p className="text-xs text-muted-foreground">
              A technician will confirm by tomorrow.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">📞 Call us to schedule your first visit</p>
            <a href="tel:+12025550100" className="text-lg font-bold text-secondary hover:text-primary transition-colors">
              (202) 555-0100
            </a>
            <p className="text-xs text-muted-foreground">Mon–Sat, 8am–6pm</p>
          </div>
        )}

        <div className="my-4 border-t border-border" />

        <div className="space-y-2 text-sm text-muted-foreground">
          {quoteState.addressFormatted && (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0" /> {quoteState.addressFormatted}
            </p>
          )}
          {(quoteState.squareFootage || quoteState.propertyType) && (
            <p className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary shrink-0" />
              {[
                quoteState.squareFootage ? `${quoteState.squareFootage.toLocaleString()} sq ft` : null,
                quoteState.propertyType && quoteState.propertyType !== "Unknown" ? quoteState.propertyType : null,
              ].filter(Boolean).join(" · ")}
            </p>
          )}
          {quoteState.email && (
            <p className="flex items-center gap-2 text-[13px]">
              <Mail className="h-4 w-4 text-primary shrink-0" /> Confirmation sent to {quoteState.email}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 mx-auto max-w-xs space-y-3">
        {isOnline && (
          <Button className="w-full h-12 rounded-full text-base font-semibold" onClick={handleAddToCalendar}>
            Add to Calendar
          </Button>
        )}
        {isOnline && (
          <Button
            variant="outline"
            className="w-full h-12 rounded-full text-base font-semibold md:hidden"
            onClick={handleShareText}
          >
            Share via Text
          </Button>
        )}
        <button
          onClick={handleReturn}
          className="block w-full text-center text-sm text-primary font-medium hover:underline py-2"
        >
          Return to Homepage
        </button>
      </div>

      {/* While you wait */}
      <div className="mt-10 mx-auto max-w-sm text-left">
        <h3 className="text-base font-semibold text-secondary mb-4">While you wait:</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Footprints className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Walk your property and note any areas of concern to show your technician</p>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Make sure there's access to your backyard gate if you have one</p>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">Check your email — your full quote summary is on its way</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
