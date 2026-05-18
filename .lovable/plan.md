## Goal

Make calling for a quote a visible, lower-priority option everywhere the primary "Get a Quote" CTA appears, starting with the header. Use the existing number `(202) 555-0100` (already in `Step6Scheduling.tsx`).

## 1. Centralize the phone number

Create `src/lib/contact.ts` exporting:
- `PHONE_DISPLAY = "(202) 555-0100"`
- `PHONE_HREF = "tel:+12025550100"`

Replace the hardcoded number in `Step6Scheduling.tsx` with these constants so we have a single source of truth.

## 2. Header (`src/components/Header.tsx`)

Desktop (lg+):
- Add a phone link to the left of the green "Get a Quote" button.
- Format: `Phone` icon + "(202) 555-0100" as a `tel:` link, styled as a subtle secondary action — same `text-white/75 hover:text-white` treatment used by nav links, no button background. This keeps the green pill as the clear primary CTA.

Mobile (<lg, in the top bar, not the menu):
- Add an icon-only `Phone` button (tel: link) next to the hamburger, white icon, ~44px tap target, `aria-label="Call PestGuard"`. Visible whether or not the menu is open.
- Inside the mobile menu's pinned bottom area, add a secondary outline "Call (202) 555-0100" link above the green "Get a Quote" button so users in the open menu also see it.

## 3. Secondary CTA pattern next to primary quote CTAs

Introduce a small reusable component `src/components/CallCta.tsx` that renders a `tel:` link with a `Phone` icon and the formatted number. Two variants:
- `variant="inline"` — text link with icon, used next to dark-background hero / banner CTAs.
- `variant="outline"` — outline button matching `Button variant="outline"` sizing, used next to in-card primary CTAs.

Add it next to existing primary CTAs in these locations (chosen because each is a "Get a Quote" decision point; we deliberately skip in-card plan CTAs and small inline blog links to avoid clutter):

1. `src/components/Hero.tsx` — under/next to the hero "Get a Quote" button: "or call (202) 555-0100".
2. `src/pages/PlansPage.tsx`:
   - Final CTA banner (`openQuote()` at line ~642) — add `CallCta` next to the button.
   - Bottom dark CTA section (line ~723) — add `CallCta` styled for dark bg.
   - Skip the per-plan-card "Start Basic/Plus/Premium" buttons (would dilute conversion).
3. `src/pages/PestPage.tsx` — both "Get a Quote" CTAs (lines ~138, ~360): add `CallCta` beneath.
4. `src/pages/LocationPage.tsx` — "Get a Quote" CTA (line ~154): add `CallCta` beneath.
5. `src/pages/BlogArticle.tsx` — the article sidebar "Get a Quote" card (~line 516): add a "Or call (202) 555-0100" line below the button.
6. `src/components/PricingPlans.tsx` — under the secondary One-Time / Commercial row, add a single centered "Prefer to talk? Call (202) 555-0100" line.

## 4. Footer (small addition)

In `src/components/Footer.tsx` brand column, add the phone number as a `tel:` link below the tagline so it appears on every page even outside CTA contexts.

## 5. Accessibility & SEO

- All phone elements use `<a href="tel:+12025550100">` with `aria-label="Call PestGuard at (202) 555-0100"` on icon-only instances.
- Add `telephone=no` meta is NOT added (we want auto-detect on mobile).
- Optionally add `"telephone": "+1-202-555-0100"` to any existing JSON-LD LocalBusiness schema if present (will check during implementation).

## Out of scope

- No changes to the quote flow itself.
- No analytics events beyond what already exists (can add `call_clicked` tracking in a follow-up).
- Phone number value stays the placeholder `(202) 555-0100` until you provide the real one.

## Technical summary

New files: `src/lib/contact.ts`, `src/components/CallCta.tsx`.
Edited: `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `PricingPlans.tsx`, `PlansPage.tsx`, `PestPage.tsx`, `LocationPage.tsx`, `BlogArticle.tsx`, `quote-flow/steps/Step6Scheduling.tsx`.
