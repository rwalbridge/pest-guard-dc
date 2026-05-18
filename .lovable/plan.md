## Fix phone CTA alignment + add missing CTA on Plans page

Three small presentational fixes — no logic changes.

### 1. Homepage hero (`src/components/Hero.tsx`)
The "or call …" link currently sits in its own `motion.div` with `mt-4`, while the buttons row above has `mb-[52px]`. Combined spacing pushes the phone link ~68px below the buttons and visually detaches it from the CTAs.

- Move the `CallCta` inside the CTA buttons block (same motion wrapper) so it reads as part of the CTA group.
- Remove the extra `mt-4` wrapper; replace with `mt-3` directly under the buttons.
- Keep `mb-[52px]` on the outer CTA group so spacing to the trust bar is unchanged.

Result: phone link sits tightly centered ~12px under the two buttons, then normal gap to trust bar.

### 2. Homepage pricing section (`src/components/PricingPlans.tsx`)
The "Prefer to talk? Call …" link is currently nested **inside** the 2-column `grid` that holds the One-Time and Commercial cards (it's a sibling of the Commercial card). On `md+` it becomes a third grid cell, which throws off the visual alignment.

- Close the grid `</div>` after the Commercial card.
- Move the `<div className="mt-6 flex justify-center"><CallCta … /></div>` out to be a sibling of the grid (same level as `mt-12 grid …`).
- Also fix the stray mismatched indentation in that block.

Result: phone CTA appears centered below both cards on its own row at all breakpoints.

### 3. Plans page (`src/pages/PlansPage.tsx`)
The "Secondary options" grid (lines 431–466) ends without a phone CTA, unlike the homepage version.

- After the closing `</div>` of the secondary-options grid (line 466), add:
  ```tsx
  <div className="mt-6 flex justify-center">
    <CallCta prefix="Prefer to talk? Call" />
  </div>
  ```
- `CallCta` is already imported at line 16.

### Out of scope
- No copy changes, no styling changes to the buttons themselves, no other pages.
- No changes to phone number, routing, or quote flow.

### Files touched
- `src/components/Hero.tsx`
- `src/components/PricingPlans.tsx`
- `src/pages/PlansPage.tsx`
