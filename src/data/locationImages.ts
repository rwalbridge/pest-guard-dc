// Location hero images. AI-generated for affluent/distinctive areas,
// Unsplash stock for typical suburbs. Alt text is SEO-optimized
// ("[home style] in [city, state]") for image search ranking.

import washingtonDc from "@/assets/locations/washington-dc-home.jpg";
import bethesdaMd from "@/assets/locations/bethesda-md-home.jpg";
import mcleanVa from "@/assets/locations/mclean-va-home.jpg";
import tysonsVa from "@/assets/locations/tysons-va-home.jpg";
import annapolisMd from "@/assets/locations/annapolis-md-home.jpg";

export interface LocationImage {
  src: string;
  alt: string;
}

export const locationImages: Record<string, LocationImage> = {
  // AI-generated (affluent / architecturally distinctive)
  "washington-dc": {
    src: washingtonDc,
    alt: "Historic Federal-style brick rowhouse on a tree-lined Georgetown street in Washington DC",
  },
  "bethesda-md": {
    src: bethesdaMd,
    alt: "Classic white colonial home with black shutters and manicured lawn in Bethesda, Maryland",
  },
  "mclean-va": {
    src: mcleanVa,
    alt: "Stately stone-and-brick colonial home with mature landscaping in McLean, Virginia",
  },
  "tysons-va": {
    src: tysonsVa,
    alt: "Modern luxury brick-and-glass townhome in Tysons, Virginia",
  },
  "annapolis-md": {
    src: annapolisMd,
    alt: "Historic white clapboard waterfront colonial home overlooking the Chesapeake Bay in Annapolis, Maryland",
  },

  // Unsplash stock (typical suburban areas — free, real homes)
  "arlington-va": {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1024&q=85&fit=crop",
    alt: "Two-story craftsman-style suburban home with front porch in Arlington, Virginia",
  },
  "alexandria-va": {
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1024&q=85&fit=crop",
    alt: "Charming brick townhouse with front steps in a historic Alexandria, Virginia neighborhood",
  },
  "rockville-md": {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1024&q=85&fit=crop",
    alt: "Suburban single-family home with attached garage and green lawn in Rockville, Maryland",
  },
  "silver-spring-md": {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1024&q=85&fit=crop",
    alt: "Mid-century bungalow with mature trees in a Silver Spring, Maryland neighborhood",
  },
  "fairfax-va": {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1024&q=85&fit=crop",
    alt: "Suburban two-story family home with landscaped front yard in Fairfax, Virginia",
  },
  "reston-va": {
    src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1024&q=85&fit=crop",
    alt: "Modern wooded townhome community surrounded by trees in Reston, Virginia",
  },
  "college-park-md": {
    src: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1024&q=85&fit=crop",
    alt: "Classic brick American foursquare home on a residential street in College Park, Maryland",
  },
};
