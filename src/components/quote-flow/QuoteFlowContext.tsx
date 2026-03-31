import { createContext, useContext } from "react";

export interface QuoteState {
  // Step 1
  address: string | null;
  addressFormatted: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;

  // Step 2
  squareFootage: number | null;
  propertyType: string | null;
  yearBuilt: number | null;
  lotSize: string | null;
  yardSize: string | null;
  riskFlags: string[];

  // Step 3
  pestsSelected: string[];
  pestNotes: string | null;

  // Step 4
  preSelectedPlan: string | null;
  recommendedPlan: string | null;
  selectedPlan: string | null;
  billingCycle: "monthly" | "annual";
  calculatedPrice: number | null;
  annualPrice: number | null;

  // Step 5
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  referralSource: string | null;
  emailOptIn: boolean;

  // Step 6
  appointmentDate: string | null;
  appointmentTime: string | null;
  schedulingMethod: string | null;

  // Meta
  submittedAt: string | null;
  flowStartedAt: string;
  abandonedAtStep: number | null;
}

export const initialQuoteState: QuoteState = {
  address: null,
  addressFormatted: null,
  city: null,
  state: null,
  zipCode: null,
  squareFootage: null,
  propertyType: null,
  yearBuilt: null,
  lotSize: null,
  yardSize: null,
  riskFlags: [],
  pestsSelected: [],
  pestNotes: null,
  preSelectedPlan: null,
  recommendedPlan: null,
  selectedPlan: null,
  billingCycle: "monthly",
  calculatedPrice: null,
  annualPrice: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  referralSource: null,
  emailOptIn: true,
  appointmentDate: null,
  appointmentTime: null,
  schedulingMethod: null,
  submittedAt: null,
  flowStartedAt: new Date().toISOString(),
  abandonedAtStep: null,
};

export interface QuoteFlowContextType {
  quoteState: QuoteState;
  updateQuoteState: (updates: Partial<QuoteState>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (n: number) => void;
  closeFlow: () => void;
  direction: "forward" | "back";
}

export const QuoteFlowContext = createContext<QuoteFlowContextType | null>(null);

export const useQuoteFlow = () => {
  const ctx = useContext(QuoteFlowContext);
  if (!ctx) throw new Error("useQuoteFlow must be used within QuoteFlowProvider");
  return ctx;
};
