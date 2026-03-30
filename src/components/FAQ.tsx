import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the subscription work?",
    a: "Choose a plan, and we'll schedule regular treatments at your home. You're billed monthly or annually — no long-term contracts. You can cancel or pause anytime from your account.",
  },
  {
    q: "Are your products safe for pets and kids?",
    a: "Absolutely. We use EPA-approved, eco-friendly products that are safe for your family and pets. Our technicians will walk you through everything before each treatment.",
  },
  {
    q: "What if pests come back between visits?",
    a: "We've got you covered — literally. If pests return between scheduled visits, we'll come back and re-treat for free. That's our guarantee.",
  },
  {
    q: "Do I need to be home during treatment?",
    a: "Nope! Most exterior treatments don't require you to be home. For interior treatments, we'll coordinate a time that works for you.",
  },
  {
    q: "Can I cancel or pause my plan?",
    a: "Yes, anytime. There are no contracts or cancellation fees. You can pause or cancel directly from your account dashboard.",
  },
  {
    q: "What areas do you service?",
    a: "We serve the entire DC metro area including Washington DC, Northern Virginia (Arlington, Alexandria, McLean, Fairfax, Reston, Tysons) and Maryland (Bethesda, Rockville, Silver Spring, College Park, Annapolis).",
  },
];

const FAQ = () => (
  <section id="faq" className="section-padding bg-muted">
    <div className="container-max max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
        Frequently Asked Questions
      </h2>
      <p className="mt-3 text-muted-foreground text-center">
        Everything you need to know about GreenShield.
      </p>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
