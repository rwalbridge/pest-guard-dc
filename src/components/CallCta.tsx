import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, PHONE_ARIA } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface CallCtaProps {
  variant?: "inline" | "outline" | "inline-light";
  prefix?: string;
  className?: string;
}

/**
 * Secondary "call instead" CTA. Always renders a tel: link.
 * - inline: subtle text+icon on light backgrounds
 * - inline-light: subtle text+icon on dark/colored backgrounds
 * - outline: outline button matching shadcn Button variant="outline"
 */
const CallCta = ({ variant = "inline", prefix = "or call", className }: CallCtaProps) => {
  if (variant === "outline") {
    return (
      <a
        href={PHONE_HREF}
        aria-label={PHONE_ARIA}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-md border border-input bg-background text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
          className
        )}
      >
        <Phone className="h-4 w-4" />
        Call {PHONE_DISPLAY}
      </a>
    );
  }

  const colorClass =
    variant === "inline-light"
      ? "text-white/80 hover:text-white"
      : "text-muted-foreground hover:text-primary";

  return (
    <a
      href={PHONE_HREF}
      aria-label={PHONE_ARIA}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
        colorClass,
        className
      )}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      <span>
        {prefix} <span className="font-semibold underline-offset-2 hover:underline">{PHONE_DISPLAY}</span>
      </span>
    </a>
  );
};

export default CallCta;
