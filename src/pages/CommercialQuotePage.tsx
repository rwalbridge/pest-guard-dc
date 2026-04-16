import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const propertyTypes = [
  "Restaurant / Food Service",
  "Office Building",
  "Retail / Shopping",
  "Warehouse / Industrial",
  "Multi-Family / HOA",
  "Healthcare / Medical",
  "School / Daycare",
  "Hotel / Hospitality",
  "Other",
];

const pestOptions = [
  "Rodents", "Cockroaches", "Ants", "Bed Bugs", "Mosquitoes",
  "Termites", "Flies", "Stored Product Pests", "Other",
];

const frequencies = ["Monthly", "Bi-Monthly", "Quarterly", "I'd like a recommendation"];

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CommercialQuotePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pests, setPests] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [state, setState] = useState("DC");

  const togglePest = (p: string) => {
    setPests((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const fd = new FormData(e.currentTarget);
      const data = Object.fromEntries(fd.entries());
      const payload = { ...data, state, propertyType, frequency, pests };
      // TODO: wire to GorillaDesk API when credentials are available
      console.log("Commercial quote submission:", payload);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Request a Commercial Quote | PestGuard DC</title>
        <meta
          name="description"
          content="Tell us about your property and we'll build a custom pest control proposal for your DC-area business."
        />
      </Helmet>

      <Header />

      <main className="bg-muted min-h-screen pt-28 pb-20 px-6">
        <motion.div {...fadeIn} className="max-w-[680px] mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3DB87A]">
              Commercial Services
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-3">
              Request a Commercial Quote
            </h1>
            <p className="text-muted-foreground mt-3">
              Fill out the form below and your account manager will follow up within one business day.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#3DB87A]/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-9 w-9 text-[#3DB87A]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mt-6">
                  Thank you! We'll be in touch within one business day.
                </h2>
                <Link
                  to="/commercial"
                  className="inline-block mt-6 text-[#3DB87A] font-medium hover:underline"
                >
                  ← Back to Commercial
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" name="company" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" name="name" required className="mt-1.5" />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" required className="mt-1.5" />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" name="jobTitle" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="locations">Number of Locations</Label>
                    <Input id="locations" name="locations" type="number" min="1" className="mt-1.5" />
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <Label>Property Type *</Label>
                  <Select value={propertyType} onValueChange={setPropertyType} required>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Row 5 */}
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" name="address" required className="mt-1.5" />
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input id="zip" name="zip" required className="mt-1.5" />
                  </div>
                </div>

                {/* Row 7 - Pests */}
                <div>
                  <Label>Primary Pest Concerns</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {pestOptions.map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-2 cursor-pointer text-sm text-foreground"
                      >
                        <Checkbox
                          checked={pests.includes(p)}
                          onCheckedChange={() => togglePest(p)}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 8 - Frequency */}
                <div>
                  <Label>Preferred Service Frequency</Label>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {frequencies.map((f) => (
                      <label
                        key={f}
                        className="flex items-center gap-2 cursor-pointer text-sm text-foreground"
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={f}
                          checked={frequency === f}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="accent-[#3DB87A]"
                        />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 9 - Notes */}
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" name="notes" rows={4} className="mt-1.5" />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full bg-[#3DB87A] hover:bg-[#2ea86a] text-white font-semibold py-6 text-base"
                >
                  Submit Quote Request →
                </Button>

                {error && (
                  <p className="text-center text-sm text-destructive mt-3">{error}</p>
                )}
              </form>
            )}
          </div>

          <div className="text-center mt-6 space-y-1.5 text-sm text-muted-foreground">
            <div>🔒 Your information is never sold or shared</div>
            <div>📞 Prefer to call? (202) 555-0100</div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default CommercialQuotePage;
