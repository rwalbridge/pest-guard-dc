import { useState, useEffect, useCallback, useRef } from "react";
import { Shield, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteFlowContext, QuoteState, initialQuoteState } from "./QuoteFlowContext";
import Step1Address from "./steps/Step1Address";
import Step2HomeDetails from "./steps/Step2HomeDetails";
import Step3PestSelection from "./steps/Step3PestSelection";
import Step4Quote from "./steps/Step4Quote";
import Step5ContactDetails from "./steps/Step5ContactDetails";
import Step6Scheduling from "./steps/Step6Scheduling";
import ConfirmationScreen from "./steps/ConfirmationScreen";

const STORAGE_KEY = "greenshield_quote_draft";
const DRAFT_TTL = 24 * 60 * 60 * 1000; // 24 hours

const stepProgress: Record<number, number> = {
  1: 16, 2: 33, 3: 50, 4: 66, 5: 83, 6: 100,
};

const mobileCTALabels: Record<number, string> = {
  1: "Find My Home →",
  2: "Confirm Details →",
  3: "Build My Quote →",
  4: "Choose This Plan →",
  5: "See Scheduling Options →",
  6: "Confirm Appointment →",
};

interface QuoteFlowProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPlan?: string | null;
}

const trackQuoteEvent = (eventName: string, data: Record<string, unknown> = {}) => {
  // ANALYTICS — connect to GA4, Segment, or any platform in Prompt 10
  console.log("Quote Event:", eventName, {
    ...data,
    timestamp: new Date().toISOString(),
  });
};

function loadDraft(): { state: QuoteState; step: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const savedAt = new Date(parsed.savedAt).getTime();
    if (Date.now() - savedAt > DRAFT_TTL) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return { state: parsed.quoteState, step: parsed.lastStep };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const QuoteFlow = ({ isOpen, onClose, preSelectedPlan }: QuoteFlowProps) => {
  const [quoteState, setQuoteState] = useState<QuoteState>({
    ...initialQuoteState,
    flowStartedAt: new Date().toISOString(),
    preSelectedPlan: preSelectedPlan ?? null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const [draftAvailable, setDraftAvailable] = useState<{ state: QuoteState; step: number } | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const mountedRef = useRef(false);
  const isConfirmation = currentStep === 7;

  // On mount: check draft & track start
  useEffect(() => {
    if (!isOpen) return;
    if (!mountedRef.current) {
      mountedRef.current = true;
      const draft = loadDraft();
      if (draft) {
        setDraftAvailable(draft);
        setShowDraftBanner(true);
      }
      trackQuoteEvent("quote_flow_started", { step: 1 });
    }
  }, [isOpen]);

  // Update preSelectedPlan when prop changes
  useEffect(() => {
    if (preSelectedPlan) {
      setQuoteState((prev) => ({ ...prev, preSelectedPlan }));
    }
  }, [preSelectedPlan]);

  // Persist to localStorage on every state change
  useEffect(() => {
    if (!isOpen) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        quoteState,
        lastStep: currentStep,
        savedAt: new Date().toISOString(),
      })
    );
  }, [quoteState, currentStep, isOpen]);

  const updateQuoteState = useCallback((updates: Partial<QuoteState>) => {
    setQuoteState((prev) => ({ ...prev, ...updates }));
  }, []);

  const animateTransition = (newStep: number, dir: "forward" | "back") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      trackQuoteEvent("step_viewed", { step: newStep });
      setTimeout(() => setIsAnimating(false), 250);
    }, 250);
  };

  const goToNextStep = useCallback(() => {
    if (currentStep < 6) animateTransition(currentStep + 1, "forward");
    else if (currentStep === 6) animateTransition(7, "forward"); // confirmation
  }, [currentStep, isAnimating]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) animateTransition(currentStep - 1, "back");
  }, [currentStep, isAnimating]);

  const goToStep = useCallback((n: number) => {
    const dir = n > currentStep ? "forward" : "back";
    animateTransition(n, dir);
  }, [currentStep, isAnimating]);

  const closeFlow = useCallback(() => {
    // EXIT_INTENT — built in Prompt 9
    onClose();
    // Reset for next open
    setTimeout(() => {
      mountedRef.current = false;
      setCurrentStep(1);
      setShowDraftBanner(false);
      setDraftAvailable(null);
      setIsAnimating(false);
    }, 300);
  }, [onClose]);

  const handleContinueDraft = () => {
    if (draftAvailable) {
      setQuoteState(draftAvailable.state);
      setCurrentStep(draftAvailable.step);
    }
    setShowDraftBanner(false);
  };

  const handleStartFresh = () => {
    localStorage.removeItem(STORAGE_KEY);
    setQuoteState({ ...initialQuoteState, flowStartedAt: new Date().toISOString(), preSelectedPlan: preSelectedPlan ?? null });
    setCurrentStep(1);
    setShowDraftBanner(false);
  };

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Address />;
      case 2: return <Step2HomeDetails />;
      case 3: return <Step3PestSelection />;
      case 4: return <Step4Quote />;
      case 5: return <Step5ContactDetails />;
      case 6: return <Step6Scheduling />;
      case 7: return <ConfirmationScreen />;
      default: return null;
    }
  };

  const slideClass = isAnimating
    ? direction === "forward"
      ? "translate-x-full"
      : "-translate-x-full"
    : "translate-x-0";

  return (
    <QuoteFlowContext.Provider
      value={{ quoteState, updateQuoteState, currentStep, goToNextStep, goToPrevStep, goToStep, closeFlow, direction }}
    >
      {/* Desktop: modal overlay | Mobile: full-screen takeover */}
      <div className="fixed inset-0 z-[100]">
        {/* Overlay — desktop only */}
        <div
          className="hidden md:block absolute inset-0 bg-black/60"
          onClick={closeFlow}
        />

        {/* Modal container */}
        <div className="relative md:flex md:items-center md:justify-center md:h-full">
          <div className="bg-background w-full h-[100dvh] md:h-auto md:max-h-[90vh] md:w-full md:max-w-[720px] md:rounded-2xl md:shadow-2xl md:mx-4 flex flex-col overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <button
                onClick={goToPrevStep}
                className={`p-2 rounded-lg hover:bg-muted transition-colors ${currentStep === 1 || isConfirmation ? "invisible" : ""}`}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 text-foreground" />
              </button>

              <div className="flex items-center gap-1.5">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-base font-bold text-secondary">
                  Green<span className="text-primary">Shield</span>
                </span>
              </div>

              <button
                onClick={closeFlow}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Progress bar */}
            {!isConfirmation && (
              <div className="h-1 w-full bg-border shrink-0">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${stepProgress[currentStep] ?? 0}%` }}
                />
              </div>
            )}

            {/* Step counter */}
            {!isConfirmation && (
              <p className="text-center text-xs text-muted-foreground py-2 shrink-0">
                Step {currentStep} of 6
              </p>
            )}

            {/* Draft recovery banner */}
            {showDraftBanner && currentStep === 1 && (
              <div className="mx-4 mt-2 p-3 rounded-lg bg-accent border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                <p className="text-sm text-foreground flex-1">
                  Welcome back — want to continue where you left off?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleContinueDraft}>
                    Continue my quote
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleStartFresh}>
                    Start fresh
                  </Button>
                </div>
              </div>
            )}

            {/* Step content with slide animation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <div
                className={`transform transition-transform duration-250 ease-in-out ${slideClass}`}
                style={{ transitionDuration: "250ms" }}
              >
                {renderStep()}
              </div>
            </div>

            {/* Mobile bottom CTA bar */}
            {!isConfirmation && currentStep !== 6 && (
              <div className="md:hidden shrink-0 border-t border-border bg-background px-4 py-4">
                <Button className="w-full h-12 text-base font-semibold" onClick={goToNextStep}>
                  {mobileCTALabels[currentStep]}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </QuoteFlowContext.Provider>
  );
};

export default QuoteFlow;
