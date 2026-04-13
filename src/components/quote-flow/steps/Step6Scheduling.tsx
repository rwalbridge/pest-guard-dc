import { useState, useMemo } from "react";
import { Calendar, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteFlow } from "../QuoteFlowContext";

const timeSlots = [
  "8am – 10am",
  "10am – 12pm",
  "12pm – 2pm",
  "2pm – 4pm",
  "4pm – 6pm",
];

// Deterministic "full" slots based on day-of-week
function getFullSlots(dayOfWeek: number): number[] {
  const patterns: Record<number, number[]> = {
    0: [], // Sunday — blocked entirely
    1: [2, 4],
    2: [0, 3],
    3: [1, 4],
    4: [0, 2],
    5: [3, 4],
    6: [1, 3],
  };
  return patterns[dayOfWeek] || [];
}

function generateDays(): { date: Date; label: string; dayNum: number; dayName: string; isSunday: boolean }[] {
  const days: { date: Date; label: string; dayNum: number; dayName: string; isSunday: boolean }[] = [];
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      dayName: names[d.getDay()],
      dayNum: d.getDate(),
      label: `${months[d.getMonth()]} ${d.getDate()}`,
      isSunday: d.getDay() === 0,
    });
  }
  return days;
}

// ─────────────────────────────────────
// TODO: GorillaDesk Integration
// When GorillaDesk account is configured:
// 1. Replace this calendar UI with
//    GorillaDesk availability endpoint:
//    GET /v2/availability
// 2. On slot selection, create job:
//    POST /v2/jobs
// 3. Remove the admin email notification
//    and replace with GorillaDesk
//    job confirmation webhook
// Docs: developers.gorilladesk.com
// API Key env var: VITE_GORILLADESK_API_KEY
// ─────────────────────────────────────

const Step6Scheduling = () => {
  const { quoteState, updateQuoteState, goToNextStep } = useQuoteFlow();

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<"online" | "call" | null>(null);

  const days = useMemo(generateDays, []);

  const fullSlots = selectedDay ? getFullSlots(selectedDay.getDay()) : [];

  const dayLabel = selectedDay
    ? selectedDay.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "";

  const handleSchedule = () => {
    if (!selectedDay || !selectedSlot) return;

    // Placeholder email notifications — built in Prompt 8
    const sendCustomerConfirmation = (_state: typeof quoteState) => {
      console.log("Email placeholder: customer confirmation", _state.email);
    };
    const sendAdminNotification = (_state: typeof quoteState) => {
      console.log("Email placeholder: admin notification", _state.selectedPlan);
    };

    updateQuoteState({
      appointmentDate: selectedDay.toISOString(),
      appointmentTime: selectedSlot,
      schedulingMethod: "online",
      submittedAt: new Date().toISOString(),
    });

    console.log("Quote Event:", "appointment_scheduled", {
      date: selectedDay.toISOString(),
      timeSlot: selectedSlot,
      plan: quoteState.selectedPlan,
      timestamp: new Date().toISOString(),
    });

    sendCustomerConfirmation(quoteState);
    sendAdminNotification(quoteState);

    localStorage.removeItem("pestguard_quote_draft");
    goToNextStep();
  };

  const handleCallSchedule = () => {
    updateQuoteState({
      schedulingMethod: "call",
      submittedAt: new Date().toISOString(),
    });
    console.log("Quote Event:", "call_to_schedule_selected", { timestamp: new Date().toISOString() });
    localStorage.removeItem("pestguard_quote_draft");
    goToNextStep();
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-[28px] font-bold text-secondary leading-tight">
        You're protected — let's lock it in.
      </h2>
      <p className="mt-2 text-base text-muted-foreground mb-10">
        Choose how you'd like to confirm your quote and schedule your first visit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Option A — Schedule Online */}
        <div
          className={`relative rounded-2xl border-2 p-7 transition-all cursor-pointer ${
            activeCard === "online" ? "border-primary shadow-lg" : "border-primary"
          }`}
          onClick={() => setActiveCard("online")}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full">
            Most Popular
          </div>
          <Calendar className="h-8 w-8 text-primary mb-3" />
          <h3 className="text-xl font-bold text-foreground">Schedule My First Visit</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a date and time. Your technician will confirm within 2 hours.
          </p>

          {/* Day selector */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-7 md:overflow-visible">
            {days.map((d) => (
              <button
                key={d.date.toISOString()}
                disabled={d.isSunday}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDay(d.date);
                  setSelectedSlot(null);
                  setActiveCard("online");
                }}
                className={`flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-xl border-2 text-xs font-medium transition-all
                  ${d.isSunday ? "opacity-30 cursor-not-allowed border-border" : ""}
                  ${selectedDay?.toDateString() === d.date.toDateString()
                    ? "bg-primary text-primary-foreground border-primary"
                    : !d.isSunday ? "border-border hover:border-primary/40 cursor-pointer" : "border-border"
                  }`}
              >
                <span className="text-[11px]">{d.dayName}</span>
                <span className="text-lg font-bold">{d.dayNum}</span>
              </button>
            ))}
          </div>

          {/* Time slots */}
          {selectedDay && (
            <div className="mt-4 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot, i) => {
                  const isFull = fullSlots.includes(i);
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      disabled={isFull}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSlot(slot);
                      }}
                      className={`py-3 px-3 rounded-lg border-2 text-sm font-medium transition-all
                        ${isFull ? "opacity-40 cursor-not-allowed border-border" : ""}
                        ${isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : !isFull ? "border-border hover:border-primary/40" : "border-border"
                        }`}
                    >
                      {isFull ? "Full" : slot}
                    </button>
                  );
                })}
              </div>
              <p className="text-[13px] text-muted-foreground italic mt-3">
                ⏱ First visit typically takes 45–90 minutes
              </p>
            </div>
          )}

          {/* CTA inside card */}
          {selectedDay && selectedSlot && (
            <Button
              className="w-full mt-4 h-12 text-base font-bold rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleSchedule();
              }}
            >
              Confirm My Appointment →
            </Button>
          )}
        </div>

        {/* Option B — Call to Schedule */}
        <div
          className={`rounded-2xl border-2 p-7 transition-all cursor-pointer ${
            activeCard === "call" ? "border-primary shadow-lg" : "border-border"
          }`}
          onClick={() => setActiveCard("call")}
        >
          <Phone className="h-8 w-8 text-secondary mb-3" />
          <h3 className="text-xl font-bold text-foreground">Call Us to Schedule</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Prefer to talk to a real person? We're available Mon–Sat, 8am–6pm.
          </p>
          <a
            href="tel:+12025550100"
            onClick={(e) => {
              e.stopPropagation();
              handleCallSchedule();
            }}
            className="block text-4xl md:text-5xl font-bold text-secondary mt-6 hover:text-primary transition-colors"
          >
            (202) 555-0100
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            Or text us at the same number
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground text-center">
        Questions before you commit?{" "}
        <a href="/contact" className="text-primary font-medium hover:underline">
          Chat with us →
        </a>
      </p>
    </div>
  );
};

export default Step6Scheduling;
