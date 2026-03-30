import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight, ArrowLeft } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

const homeTypes = ["Apartment", "Townhouse", "Single Family"];

const SignupModal = ({ isOpen, onClose, selectedPlan }: SignupModalProps) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [homeType, setHomeType] = useState("");
  const [billingFreq, setBillingFreq] = useState<"monthly" | "annual">("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setDone(true);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setAddress("");
    setHomeType("");
    setName("");
    setEmail("");
    setPhone("");
    setDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={resetAndClose}
      />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Progress */}
        {!done && (
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground">Where's your home?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              We'll customize your plan for your area.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Washington DC"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Home Type</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {homeTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setHomeType(t)}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        homeType === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              disabled={!address || !homeType}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground">Confirm Your Plan</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You selected the <span className="font-semibold text-primary">{selectedPlan}</span> plan.
            </p>

            <div className="mt-6 space-y-3">
              <label className="text-sm font-medium text-foreground">Billing Frequency</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBillingFreq("monthly")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    billingFreq === "monthly"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-sm font-bold text-foreground">Monthly</div>
                  <div className="text-xs text-muted-foreground">Pay as you go</div>
                </button>
                <button
                  onClick={() => setBillingFreq("annual")}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    billingFreq === "annual"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-sm font-bold text-foreground">Annual</div>
                  <div className="text-xs text-primary font-medium">Save 20%</div>
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continue <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground">Your Details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Almost there! We just need a few more details.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(202) 555-0100"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Card Details</label>
                <div className="mt-1 w-full px-4 py-3 rounded-lg border border-input bg-muted text-muted-foreground text-sm">
                  Stripe payment form placeholder
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button
                className="flex-1"
                disabled={!name || !email || !phone}
                onClick={handleSubmit}
              >
                Start Protection
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === 4 && done && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">You're Covered!</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              A technician will contact you within 24 hours to schedule your first treatment.
            </p>
            <Button className="mt-6" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
