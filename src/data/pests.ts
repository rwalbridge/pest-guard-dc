export interface PestFAQ {
  q: string;
  a: string;
}

export interface PestData {
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  definition: string[];
  signs: { title: string; description: string }[];
  regionalProblem: string[];
  treatment: { stage: string; description: string }[];
  diyVsPro: string[];
  faqs: PestFAQ[];
  ctaText: string;
}

export const pests: PestData[] = [
  {
    slug: "ants",
    name: "Ants",
    titleTag: "Ant Control Washington DC & MD/VA | PestGuard — Eco-Friendly Treatment",
    metaDescription: "Get rid of ants in your DC metro home. Eco-friendly ant control for carpenter ants, odorous ants & more. Safe for kids & pets. No contracts.",
    h1: "Ant Control in Washington DC & Surrounding Areas",
    quickAnswer: "Ant infestations are one of the most common pest problems in the DC metro area. Professional ant control targets colonies at their source, eliminates entry points, and prevents re-infestation — something store-bought sprays rarely accomplish.",
    definition: [
      "Ants are social insects that live in colonies ranging from a few hundred to hundreds of thousands of individuals. They enter homes searching for food, water, and shelter.",
      "In the Washington DC metro area, the warm, humid climate supports year-round ant activity, with peak infestations occurring from March through November when colonies expand and send scouts indoors."
    ],
    signs: [
      { title: "Ant trails", description: "Lines of ants traveling along baseboards, countertops, or window sills indicate an established colony with scouts directing workers to food sources." },
      { title: "Small piles of dirt or debris", description: "Pavement ants push soil through cracks in concrete, and carpenter ants leave behind sawdust-like frass near nesting sites." },
      { title: "Winged ants indoors", description: "Swarmers (reproductive ants) emerging inside your home signal a mature colony nearby, possibly within your walls." },
      { title: "Rustling sounds in walls", description: "Large carpenter ant colonies produce faint rustling or crinkling sounds within wall voids, especially at night." },
      { title: "Damaged wood", description: "Carpenter ants excavate galleries in wood for nesting, creating smooth tunnels that weaken structural timbers over time." }
    ],
    regionalProblem: [
      "The DC metro area's Mid-Atlantic climate — hot, humid summers and mild winters — creates ideal conditions for multiple ant species. Odorous house ants are the most common invaders in DC-area kitchens, attracted to sugary foods and moisture.",
      "Carpenter ants pose a structural threat, particularly in homes near wooded areas in Arlington, Bethesda, and McLean, where mature trees harbor satellite colonies that extend into residential structures. Pavement ants are ubiquitous in urban neighborhoods with concrete driveways and sidewalks.",
      "According to the National Pest Management Association, ants are the number one nuisance pest in the United States, and the DC metro area is no exception."
    ],
    treatment: [
      { stage: "Inspection & Identification", description: "We identify the ant species in your home, locate entry points, and trace trails back to nesting areas. Different species require different treatment approaches, and correct identification is critical." },
      { stage: "Targeted Treatment", description: "We apply EPA-approved gel baits, granular treatments, and perimeter barriers. For carpenter ants, we treat wall voids and nesting sites directly. All products are eco-friendly and safe for children and pets." },
      { stage: "Ongoing Prevention", description: "Regular scheduled visits maintain a protective barrier around your home. We seal common entry points and advise on moisture reduction and food storage practices that discourage ant activity." }
    ],
    diyVsPro: [
      "Store-bought ant sprays and bait traps can handle minor ant sightings. Spray kills visible ants on contact, and consumer bait stations can reduce small colonies. These are reasonable first steps for a handful of ants near a windowsill.",
      "However, DIY methods rarely solve the root problem. Most ant colonies are located outside or deep within wall voids, and killing visible workers doesn't affect the queen or the colony's reproductive capacity. Spray repellents can actually worsen the problem by causing colonies to split — a phenomenon called \"budding\" — creating multiple satellite colonies.",
      "Professional treatment is warranted when you see persistent ant trails, winged swarmers indoors, or signs of carpenter ant damage. A licensed technician identifies the species, locates the colony, and uses targeted products that workers carry back to the nest, eliminating the entire colony at the source."
    ],
    faqs: [
      { q: "How do I get rid of ants in my kitchen in Washington DC?", a: "Clean up food and moisture sources, seal cracks around windows and baseboards, and use ant bait near trails. For persistent infestations, professional treatment targets the colony at its source, which store-bought sprays cannot reach." },
      { q: "Are carpenter ants dangerous to my home?", a: "Yes. Carpenter ants excavate wood to create nesting galleries, which weakens structural timbers over time. Unlike termites, they don't eat wood — they remove it. Left untreated, damage can require costly repairs." },
      { q: "What's the difference between carpenter ants and termites?", a: "Carpenter ants leave smooth, clean galleries in wood and produce sawdust-like frass. Termites consume wood, leaving rough, mud-lined tunnels. Both cause structural damage, but treatment methods differ significantly." },
      { q: "How much does ant control cost in the DC metro area?", a: "PestGuard's recurring plans start at $49/month and include ant treatment at every visit. One-time ant treatments from other providers typically range from $150-$300, but don't prevent re-infestation." },
      { q: "When is ant season in Washington DC?", a: "Ant activity peaks from March through November in the DC area, with the heaviest infestations in late spring and summer. However, carpenter ants and some species remain active in heated buildings year-round." }
    ],
    ctaText: "Ready to get rid of ants for good?"
  },
  {
    slug: "cockroaches",
    name: "Cockroaches",
    titleTag: "Cockroach Control DC Metro | PestGuard — Safe, Effective Treatment",
    metaDescription: "Eliminate cockroaches in your DC metro home. German & American roach treatment. Eco-friendly, safe for families. No contracts. Get started today.",
    h1: "Cockroach Control in Washington DC & Surrounding Areas",
    quickAnswer: "Cockroaches are a health hazard that thrive in DC's warm, humid climate. Professional cockroach control uses targeted baits and growth regulators to eliminate colonies completely — far more effective than store-bought sprays, which only kill roaches on contact.",
    definition: [
      "Cockroaches are resilient insects that have survived for over 300 million years. They're nocturnal, fast-reproducing, and highly adaptable to indoor environments.",
      "In the DC metro area, German cockroaches and American cockroaches are the two most common species found in homes and apartments. German cockroaches prefer kitchens and bathrooms, while American cockroaches inhabit basements, crawl spaces, and storm drains."
    ],
    signs: [
      { title: "Droppings", description: "Small, dark, pepper-like specks along baseboards, in cabinets, and under sinks indicate German cockroach activity. American cockroach droppings are larger and ridged." },
      { title: "Musty odor", description: "A strong, oily, musty smell in kitchens or bathrooms often indicates a significant cockroach population nearby." },
      { title: "Egg cases (oothecae)", description: "Brown, purse-shaped egg cases found behind appliances, under furniture, or in cabinet hinges contain 30-50 eggs each." },
      { title: "Live roaches at night", description: "Seeing cockroaches when you turn on lights at night confirms an active infestation. If you see them during the day, the population is likely large." },
      { title: "Shed skins", description: "Cockroaches molt multiple times as they mature. Finding translucent shed skins near food and water sources indicates an established population." }
    ],
    regionalProblem: [
      "The DC metro area's humid climate and dense housing stock create perfect conditions for cockroach populations. German cockroaches are especially prevalent in apartment buildings, townhomes, and older row houses where shared walls and plumbing provide pathways between units.",
      "Cockroaches are more than a nuisance — they're a documented health hazard. Their droppings, shed skins, and saliva contain allergens that trigger asthma and allergic reactions, particularly in children.",
      "The Asthma and Allergy Foundation of America identifies cockroach allergens as a leading trigger for childhood asthma in urban areas. In the DC metro's multi-unit housing, cockroach infestations can spread rapidly between units through shared walls and plumbing."
    ],
    treatment: [
      { stage: "Assessment", description: "We identify the cockroach species, locate harborage areas, and assess the severity. We check behind appliances, under sinks, in wall voids, and around plumbing penetrations." },
      { stage: "Targeted Elimination", description: "We use professional-grade gel baits, insect growth regulators (IGRs), and targeted crack-and-crevice treatments. These methods are far more effective than broadcast sprays because roaches carry bait back to the colony. All products are eco-friendly and safe for families." },
      { stage: "Monitoring & Prevention", description: "Follow-up visits monitor population reduction with sticky traps, reapply treatments as needed, and seal common entry points. For multi-unit buildings, we coordinate with property managers." }
    ],
    diyVsPro: [
      "Over-the-counter roach sprays kill cockroaches on contact but don't address the colony or prevent reproduction. Bug bombs (foggers) are largely ineffective — they disperse pesticide into open air while roaches shelter in cracks and wall voids untouched.",
      "DIY bait stations from hardware stores can help with light infestations. Keep kitchens clean, fix leaky plumbing, and seal gaps around pipes to reduce attractants.",
      "Professional treatment is necessary when you see roaches regularly, find egg cases, or notice a musty odor. German cockroach populations double approximately every 60 days, so early professional intervention prevents a small problem from becoming severe."
    ],
    faqs: [
      { q: "Are cockroaches dangerous to my family's health?", a: "Yes. Cockroach allergens — found in their droppings, shed skins, and saliva — are a leading trigger for asthma and allergic reactions, especially in children. They also carry bacteria including Salmonella and E. coli." },
      { q: "How do I get rid of German cockroaches in my DC apartment?", a: "Keep your kitchen spotless, fix water leaks, and seal cracks around pipes and cabinets. For established infestations, professional gel bait treatment is the most effective method. Coordinate with your building manager." },
      { q: "Why do I see large cockroaches in my basement?", a: "Large cockroaches in basements are typically American cockroaches (water bugs). They enter through floor drains, foundation cracks, and utility penetrations from the storm drain system." },
      { q: "How much does cockroach treatment cost in the DC area?", a: "PestGuard plans covering cockroach treatment start at $49/month. Standalone cockroach treatments typically cost $200-$400. Recurring treatment is more cost-effective for prevention." },
      { q: "How long does it take to get rid of cockroaches?", a: "With professional treatment, most cockroach populations are reduced by 80-90% within 2-3 weeks. Complete elimination typically requires 2-3 treatment cycles over 4-8 weeks." }
    ],
    ctaText: "Ready to get rid of cockroaches for good?"
  },
  {
    slug: "mice-rats",
    name: "Mice & Rats",
    titleTag: "Rodent Control DC Metro | PestGuard — Mice & Rat Removal",
    metaDescription: "Mice and rat control in Washington DC, MD & VA. Humane, eco-friendly rodent removal. Seal entry points, eliminate infestations. No contracts.",
    h1: "Mice & Rat Control in Washington DC & Surrounding Areas",
    quickAnswer: "Mice and rats are year-round pests in the DC metro area. Professional rodent control combines trapping, exclusion (sealing entry points), and monitoring to eliminate current infestations and prevent new ones — far more effective than traps alone.",
    definition: [
      "Mice and rats are warm-blooded mammals that have lived alongside humans for thousands of years. House mice and Norway rats are the two species most commonly found in DC-area homes.",
      "Mice can enter through gaps as small as a dime (¼ inch), while rats need only a half-inch opening. Both species reproduce rapidly — a single pair of mice can produce 50-60 offspring per year under favorable conditions."
    ],
    signs: [
      { title: "Droppings", description: "Mouse droppings are small (¼ inch), dark, and pointed. Rat droppings are larger (½-¾ inch) and blunt-ended. Fresh droppings are soft and dark; old droppings are dry and gray." },
      { title: "Gnaw marks", description: "Rodents chew on wood, plastic, and electrical wiring. Fresh gnaw marks are light-colored; older marks darken over time. Chewed wiring is a fire hazard." },
      { title: "Scratching sounds", description: "Scurrying or scratching noises in walls, ceilings, or under floors, particularly at night, indicate rodent activity." },
      { title: "Nests", description: "Mice build nests from shredded paper, fabric, insulation, and plant material in sheltered areas like wall voids, attics, and behind appliances." },
      { title: "Grease marks", description: "Rats leave dark, oily smudge marks along walls and baseboards where they travel repeatedly. These rub marks are a reliable indicator of established runways." }
    ],
    regionalProblem: [
      "Washington DC has consistently ranked among the most rodent-infested cities in the United States. The District's dense urban environment, restaurant corridors, and aging infrastructure provide abundant food and shelter for Norway rats.",
      "Surrounding suburbs face their own pressures — house mice infiltrate homes through foundation gaps, garage doors, and utility penetrations from fall through spring. Row houses in Capitol Hill and Georgetown share walls that rodents travel between.",
      "Rodents contaminate food, damage electrical wiring (creating fire risk), and carry diseases including hantavirus, salmonella, and leptospirosis."
    ],
    treatment: [
      { stage: "Inspection & Entry Point Mapping", description: "We conduct a thorough inspection of your property, identifying active entry points, nesting areas, and food sources. We map rodent pathways using droppings, grease marks, and gnaw evidence." },
      { stage: "Trapping & Exclusion", description: "We deploy professional-grade traps in strategic locations and begin sealing entry points with rodent-proof materials. Our methods are humane and eco-friendly — we prioritize trapping over rodenticides, especially in homes with children and pets." },
      { stage: "Monitoring & Prevention", description: "Follow-up visits check traps, assess for new activity, and complete exclusion work. Regular monitoring prevents re-entry and catches any new rodent activity early." }
    ],
    diyVsPro: [
      "Snap traps and catch-and-release traps are effective for catching individual mice. Sealing visible gaps around pipes, doors, and windows with steel wool or caulk can help. These are good steps for a single mouse sighting.",
      "However, mice and rats are remarkably adaptive. They learn to avoid traps that have caught other rodents, and they can squeeze through openings you may not notice.",
      "Professional rodent control is warranted when you hear scratching in walls, find multiple droppings, or see gnaw marks on food packaging. A licensed technician performs a complete exclusion assessment, identifies hidden entry points, and develops a plan that addresses the entire population."
    ],
    faqs: [
      { q: "How do I know if I have mice or rats in my DC home?", a: "Check for droppings, gnaw marks on food packaging or wiring, scratching sounds in walls at night, and greasy smudge marks along baseboards. Any of these signs warrant a professional inspection." },
      { q: "Are rodents a health risk to my family?", a: "Yes. Mice and rats contaminate food and surfaces with urine and droppings that can carry salmonella, hantavirus, and other pathogens. They also chew electrical wiring, creating a documented fire hazard." },
      { q: "How much does rodent control cost in the DC metro area?", a: "PestGuard plans including rodent control start at $49/month. Standalone rodent exclusion services typically range from $300-$800 depending on the number of entry points needing sealing." },
      { q: "Can mice come back after treatment?", a: "Without proper exclusion (sealing entry points), mice can return. PestGuard's approach combines trapping with exclusion and ongoing monitoring. Our recurring visits catch new activity early." },
      { q: "When are rodents most active in DC?", a: "Rodent activity peaks in fall and winter as mice and rats seek warmth indoors. However, they breed year-round in the DC metro area, making ongoing prevention the most effective strategy." }
    ],
    ctaText: "Ready to get rid of mice and rats for good?"
  },
  {
    slug: "mosquitoes",
    name: "Mosquitoes",
    titleTag: "Mosquito Control DC Metro | PestGuard — Yard Treatment That Works",
    metaDescription: "Effective mosquito control in Washington DC, MD & VA. Monthly yard treatments reduce mosquitoes up to 90%. Eco-friendly. No contracts.",
    h1: "Mosquito Control in Washington DC & Surrounding Areas",
    quickAnswer: "Professional mosquito control in the DC metro area uses monthly barrier treatments applied to your yard's perimeter, vegetation, and standing water sources. These treatments reduce mosquito populations on your property by up to 90%, making outdoor spaces usable again.",
    definition: [
      "Mosquitoes are blood-feeding insects that breed in standing water. Female mosquitoes require blood meals to produce eggs, and they can lay 100-200 eggs at a time in as little as a bottlecap of stagnant water.",
      "In the DC metro area, the Asian tiger mosquito and common house mosquito are the most prevalent species. They're active from April through November, with peak populations from June through September."
    ],
    signs: [
      { title: "Bites during outdoor activities", description: "Frequent bites while in your yard, especially at dawn and dusk, indicate a local breeding population." },
      { title: "Buzzing at dusk", description: "Mosquitoes are most active at dawn and dusk. If you hear or see them swarming near your porch or patio, breeding sites are nearby." },
      { title: "Standing water on your property", description: "Birdbaths, clogged gutters, planters, tarps, and tire swings all collect water that mosquitoes use for breeding." },
      { title: "Mosquitoes indoors", description: "Finding mosquitoes inside your home means they're likely breeding close to your foundation and entering through doors, windows, or gaps." },
      { title: "Larvae in water", description: "Small, wriggling larvae visible in standing water confirm active mosquito breeding on your property." }
    ],
    regionalProblem: [
      "The DC metro area's hot, humid summers and abundant waterways create one of the East Coast's most intense mosquito environments. The Potomac River, Anacostia River, Rock Creek, and hundreds of tributaries provide vast breeding habitat.",
      "Beyond being a nuisance, mosquitoes are the deadliest animals on Earth, responsible for transmitting diseases including West Nile virus, Zika, and Eastern equine encephalitis.",
      "The DC metro area has confirmed West Nile virus cases in recent years, and local health departments actively monitor mosquito-borne disease risk throughout the region."
    ],
    treatment: [
      { stage: "Property Survey", description: "We identify standing water sources, vegetation that harbors resting mosquitoes, and areas of poor drainage. We assess proximity to waterways and neighborhood conditions." },
      { stage: "Barrier Treatment", description: "We apply EPA-approved barrier sprays to vegetation, fence lines, under decks, and around outdoor living spaces. We treat standing water that can't be eliminated with larvicide. All products are eco-friendly and safe for families." },
      { stage: "Monthly Reapplication", description: "Mosquito treatments are most effective with monthly reapplication from April through October. Each visit includes re-treatment and assessment of new breeding sites." }
    ],
    diyVsPro: [
      "Citronella candles, bug zappers, and personal repellent sprays provide limited, short-term relief. Eliminating standing water on your property is an important and free first step that every homeowner should take.",
      "However, mosquitoes breed in your neighbors' yards, nearby streams, and storm drains too. Individual property cleanup helps but can't control the mosquitoes arriving from surrounding areas.",
      "Professional barrier treatments create a protective zone on your property that repels and kills mosquitoes on contact, providing consistent relief that DIY methods can't achieve. This makes the most sense for homeowners who use outdoor spaces regularly or live near waterways."
    ],
    faqs: [
      { q: "How much does mosquito control cost in Washington DC?", a: "PestGuard's Plus and Premium plans include mosquito control. The Plus plan starts at $79/month with bi-monthly visits. Standalone mosquito-only treatments typically cost $70-$100 per application." },
      { q: "When should I start mosquito treatment in the DC area?", a: "Start in April before populations build. Monthly treatments through October provide consistent protection. Beginning early prevents the exponential population growth that makes mid-summer overwhelming." },
      { q: "Is mosquito spray safe for kids and pets?", a: "Yes. PestGuard uses EPA-approved products safe for children and pets once dry, which typically takes 30-60 minutes. We recommend keeping people and pets off treated vegetation during drying." },
      { q: "Do mosquito treatments kill bees and butterflies?", a: "Our targeted application methods minimize impact on pollinators. We apply products to mosquito resting areas rather than flowering plants, and avoid treating gardens during pollinator-active hours." },
      { q: "What's the most effective way to reduce mosquitoes in my yard?", a: "Combine professional barrier treatment with property maintenance: eliminate standing water, keep gutters clean, trim overgrown vegetation, and repair window screens. This two-pronged approach gives the best results." }
    ],
    ctaText: "Ready to enjoy your yard again?"
  },
  {
    slug: "termites",
    name: "Termites",
    titleTag: "Termite Control DC Metro | PestGuard — Inspection & Treatment",
    metaDescription: "Termite treatment in Washington DC, MD & VA. Annual inspections, eco-friendly treatment, prevention. Protect your home's structure. No contracts.",
    h1: "Termite Control in Washington DC & Surrounding Areas",
    quickAnswer: "Termites cause an estimated $5 billion in property damage annually in the United States, and the DC metro area's climate and housing stock make it a high-risk region. Professional termite control includes annual inspections, liquid barrier treatments or bait systems, and ongoing monitoring.",
    definition: [
      "Termites are wood-destroying insects that feed on cellulose — the main structural component of wood. Eastern subterranean termites are the species found throughout the DC metro area.",
      "They live in underground colonies that can contain hundreds of thousands of individuals and access your home through mud tubes built from the soil to wood structures. Because they work silently inside walls and foundations, termite damage often goes undetected for years."
    ],
    signs: [
      { title: "Mud tubes on foundations", description: "Pencil-width tubes of soil running up foundation walls, piers, or crawl space supports are the most visible sign of subterranean termite activity." },
      { title: "Hollow-sounding wood", description: "Tap on baseboards, door frames, and window sills. If wood sounds hollow or papery, termites may have consumed the interior." },
      { title: "Swarmers", description: "Winged termites emerging indoors, especially in spring, indicate a mature colony nearby. Finding discarded wings on windowsills is a common indicator." },
      { title: "Sagging floors or sticking doors", description: "Structural damage from termites can cause floors to sag, doors to stick, and walls to develop cracks as wood framing weakens." },
      { title: "Frass or pellets", description: "Though more common with drywood termites (rare in DC), any wood-colored pellets near woodwork should be investigated." }
    ],
    regionalProblem: [
      "The DC metro area sits firmly within the USDA's \"moderate to heavy\" termite activity zone. Eastern subterranean termites are active in every jurisdiction — DC, Northern Virginia, and Maryland.",
      "Historic homes in Georgetown, Capitol Hill, Old Town Alexandria, and Annapolis are especially vulnerable due to original wood framing, limited vapor barriers, and aging foundations.",
      "But newer homes aren't immune — termites can access any structure with wood-to-soil contact, improper grading, or foundation cracks. Termite damage is not covered by standard homeowners insurance, making prevention and early detection critical."
    ],
    treatment: [
      { stage: "Professional Inspection", description: "Our licensed inspectors examine your property's foundation, crawl spaces, basement, and exterior for mud tubes, wood damage, and moisture conditions. We provide a detailed written report." },
      { stage: "Treatment", description: "We recommend liquid barrier treatment (applied to soil around your foundation) or a baiting system that eliminates the colony over time. Both methods are EPA-approved and eco-friendly. We discuss options transparently before treatment begins." },
      { stage: "Annual Monitoring", description: "Our Premium plan includes annual termite inspections and monitoring. Early detection of new activity allows treatment before structural damage occurs." }
    ],
    diyVsPro: [
      "Termite control is one area where professional treatment is almost always necessary. DIY termite products are significantly less effective than commercial-grade treatments. Liquid termiticides require professional application equipment to create a continuous barrier.",
      "The one DIY step every homeowner should take is prevention: reduce wood-to-soil contact, maintain proper drainage, keep mulch at least 6 inches from your home, and fix any wood-to-water contact.",
      "Professional treatment is essential if you find mud tubes, hollow-sounding wood, or swarmers inside your home. The cost of treatment is significantly less than the cost of structural repairs from undetected termite damage."
    ],
    faqs: [
      { q: "How much does termite treatment cost in DC?", a: "Liquid barrier treatments typically range from $800-$2,500, and bait systems from $1,200-$3,000. PestGuard's Premium plan ($119/month) includes annual termite inspections for ongoing monitoring." },
      { q: "Does homeowners insurance cover termite damage?", a: "No. Standard homeowners insurance policies in DC, Maryland, and Virginia do not cover termite damage. This makes prevention and regular inspections especially important for protecting your investment." },
      { q: "How often should I get a termite inspection in the DC area?", a: "Annual termite inspections are recommended for all DC metro homes. Homes older than 20 years, with previous termite history, or near wooded areas should be inspected every year without exception." },
      { q: "When is termite season in Washington DC?", a: "Termite swarm season in DC runs from March through May, when winged termites emerge to start new colonies. However, subterranean termites work year-round underground and inside structures." },
      { q: "Can termites damage a home with a concrete foundation?", a: "Yes. Termites enter through cracks as small as 1/32 of an inch in concrete foundations, expansion joints, and around plumbing penetrations. No foundation type is fully immune." }
    ],
    ctaText: "Ready to protect your home from termites?"
  },
  {
    slug: "bed-bugs",
    name: "Bed Bugs",
    titleTag: "Bed Bug Treatment DC Metro | PestGuard — Fast, Effective Removal",
    metaDescription: "Bed bug treatment in Washington DC, MD & VA. Professional heat and chemical treatment. Discreet, effective, guaranteed results. Contact us today.",
    h1: "Bed Bug Treatment in Washington DC & Surrounding Areas",
    quickAnswer: "Bed bugs are wingless parasitic insects that feed on human blood, typically at night. Washington DC consistently ranks among the top US cities for bed bug infestations. Professional treatment using heat or targeted chemical methods is the most reliable way to eliminate them.",
    definition: [
      "Bed bugs (Cimex lectularius) are small, flat, reddish-brown insects about the size of an apple seed. They feed exclusively on blood, primarily human, and are most active at night while hosts sleep.",
      "Bed bugs don't fly or jump — they spread by hitchhiking on luggage, clothing, furniture, and personal items. A single pregnant female can start an infestation that grows to hundreds of bugs within months."
    ],
    signs: [
      { title: "Bite marks", description: "Red, itchy welts in lines or clusters on exposed skin that appear after sleeping. Not everyone reacts to bed bug bites, so absence of bites doesn't mean absence of bugs." },
      { title: "Blood spots on sheets", description: "Small rust-colored or reddish stains on bedding from crushed bed bugs that have recently fed." },
      { title: "Dark spots on mattress seams", description: "Tiny black dots (bed bug excrement) along mattress seams, box spring edges, and headboard joints." },
      { title: "Live bugs", description: "Adult bed bugs are visible to the naked eye but hide in crevices during the day. Check mattress seams, behind headboards, and in nightstand drawers." },
      { title: "Sweet, musty odor", description: "A distinctive sweet, musty smell in the bedroom can indicate a significant bed bug population." }
    ],
    regionalProblem: [
      "Washington DC consistently ranks in the top 5 US cities for bed bug infestations according to multiple pest control industry surveys. The District's dense population, frequent travel, abundant hotels, and high proportion of multi-unit housing all contribute.",
      "The surrounding suburbs — particularly areas with apartment complexes, college housing (College Park), and hotel corridors (Tysons, Crystal City) — face similar pressures.",
      "Bed bugs don't discriminate by cleanliness or income level. DC's Metro system, shared laundry facilities, and high population turnover in rental housing all facilitate transmission."
    ],
    treatment: [
      { stage: "Thorough Inspection", description: "We conduct a detailed inspection of bedrooms, living areas, and adjacent spaces. We check mattresses, box springs, headboards, nightstands, baseboards, and upholstered furniture." },
      { stage: "Treatment", description: "We use targeted chemical treatments and/or heat treatment depending on severity. Chemical treatments use EPA-approved residual products. Heat treatments raise temperatures to lethal levels (120°F+). Both are safe and effective." },
      { stage: "Follow-Up Verification", description: "Bed bug treatment typically requires 2-3 follow-up visits over 4-6 weeks to ensure complete elimination. We monitor with interceptor traps and re-inspect all affected areas." }
    ],
    diyVsPro: [
      "DIY bed bug treatment is extremely difficult and usually unsuccessful. Encasing mattresses in bed bug-proof covers is a good protective step. Laundering bedding in hot water (130°F+) and high-heat drying kills bugs on fabrics.",
      "However, bed bugs hide in dozens of locations beyond the mattress. Over-the-counter sprays rarely reach harborage sites, and bed bugs have developed resistance to many consumer insecticides. Bug bombs are ineffective and can spread them.",
      "Professional treatment is strongly recommended for any confirmed bed bug infestation. The longer you wait, the larger the population grows and the more difficult elimination becomes."
    ],
    faqs: [
      { q: "How long does bed bug treatment take?", a: "Initial treatment takes 2-4 hours depending on area size. Heat treatments may take 6-8 hours. Complete elimination typically requires 2-3 visits over 4-6 weeks to address all life stages." },
      { q: "How much does bed bug treatment cost in DC?", a: "Professional bed bug treatment in the DC metro area typically ranges from $500-$1,500 per room for chemical treatment and $1,000-$2,500 for whole-room heat treatment." },
      { q: "Can I get bed bugs from riding the Metro?", a: "While uncommon, bed bugs can transfer in any public seating environment. The greater risk is from travel, overnight guests, used furniture, and adjacent infested apartments." },
      { q: "Do bed bugs spread diseases?", a: "Bed bugs are not known to transmit diseases to humans. However, their bites cause itching, allergic reactions in some people, and significant psychological distress including anxiety and insomnia." },
      { q: "How do I prevent bed bugs in my DC apartment?", a: "Use mattress encasements, inspect secondhand furniture, reduce clutter around sleeping areas, and inspect hotel rooms when traveling. Report any signs immediately in multi-unit buildings." }
    ],
    ctaText: "Ready to eliminate bed bugs?"
  },
  {
    slug: "wasps-hornets",
    name: "Wasps & Hornets",
    titleTag: "Wasp & Hornet Control DC Metro | PestGuard — Safe Nest Removal",
    metaDescription: "Wasp and hornet nest removal in Washington DC, MD & VA. Safe, eco-friendly. Paper wasps, yellow jackets, hornets. Don't risk DIY. Call today.",
    h1: "Wasp & Hornet Control in Washington DC & Surrounding Areas",
    quickAnswer: "Wasps and hornets build nests around homes from spring through fall in the DC metro area. Professional removal is the safest option — disturbing a nest without proper equipment can trigger aggressive stinging behavior, which is dangerous for anyone with allergies.",
    definition: [
      "Wasps and hornets are stinging insects that build paper or mud nests around homes and structures. In the DC metro area, the most common species are paper wasps, yellow jackets, and bald-faced hornets.",
      "Paper wasps build small, open-comb nests under eaves. Yellow jackets nest underground or in wall voids and are the most aggressive species. Bald-faced hornets build large, enclosed paper nests in trees and shrubs."
    ],
    signs: [
      { title: "Visible nests", description: "Paper wasp nests appear as small, umbrella-shaped combs under eaves, porch ceilings, and deck rails. Yellow jacket nests are often hidden underground or in wall voids." },
      { title: "Increased wasp activity", description: "Multiple wasps hovering around a specific area of your home indicates a nest nearby. They're territorial and will return to the same spot." },
      { title: "Wasps entering your home", description: "Wasps flying in through attic vents, gaps in siding, or around windows may indicate a nest inside wall voids or attic spaces." },
      { title: "Ground holes with traffic", description: "Multiple wasps entering and exiting a hole in the ground usually indicates a yellow jacket nest, which can contain thousands of individuals." },
      { title: "Aggressive behavior", description: "Wasps and hornets become increasingly aggressive in late summer and early fall as colonies reach peak size and food competition increases." }
    ],
    regionalProblem: [
      "The DC metro area's warm climate supports large wasp and hornet populations from April through November. Homes with wooden eaves, covered porches, decks, and play structures provide abundant nesting sites.",
      "Yellow jackets are especially problematic at late-summer outdoor events — they're attracted to food and sugary drinks and will sting without provocation when defending food sources.",
      "Wasp and hornet stings are painful and can cause severe allergic reactions (anaphylaxis). According to the CDC, insect stings cause an average of 62 deaths per year in the United States."
    ],
    treatment: [
      { stage: "Nest Location", description: "We identify all active nests on your property, including hidden ground nests and wall-void colonies that aren't immediately visible." },
      { stage: "Safe Removal", description: "Our technicians wear protective equipment and use targeted treatments. We treat nests directly and remove accessible ones. For ground and wall-void nests, we apply products that eliminate the colony over 24-48 hours." },
      { stage: "Prevention", description: "We treat common nesting sites with residual products that deter future nest building. Regular treatment during spring and summer prevents new colonies from establishing." }
    ],
    diyVsPro: [
      "A single paper wasp nest under an easily accessible eave can sometimes be knocked down at night when wasps are dormant. Store-bought sprays with 15-20 foot range can treat small, visible nests.",
      "However, DIY removal is risky for nests in difficult locations, large colonies (yellow jacket nests can contain 5,000+ individuals), and for anyone with sting allergies.",
      "Professional removal is recommended for any nest you can't safely reach, any ground nest, any nest near doorways or play areas, and any nest you've been unable to eliminate with consumer sprays."
    ],
    faqs: [
      { q: "How do I get rid of a yellow jacket nest in my yard?", a: "Do not attempt to dig up or pour liquids into a yellow jacket ground nest. Professional treatment applied at the nest entrance in the evening eliminates the colony safely within 24-48 hours." },
      { q: "When are wasps most active in the DC area?", a: "Wasp activity peaks from July through October in the DC metro area. Colonies reach maximum size in late summer and become more aggressive as they compete for diminishing food sources." },
      { q: "Are bald-faced hornets dangerous?", a: "Yes. Bald-faced hornets are highly aggressive when their nest is disturbed and can sting repeatedly. Their nests should only be removed by professionals with proper protective equipment." },
      { q: "Can wasps damage my home?", a: "Wasps don't cause major structural damage, but yellow jackets nesting in wall voids can chew through interior drywall. Paper wasp nests stain surfaces and attract other pests when abandoned." },
      { q: "How much does wasp nest removal cost in DC?", a: "Standalone wasp nest removal typically costs $100-$300 per visit. PestGuard subscribers have wasp treatment included in their recurring plan at no extra charge." }
    ],
    ctaText: "Ready to remove wasps and hornets safely?"
  },
  {
    slug: "spiders",
    name: "Spiders",
    titleTag: "Spider Control DC Metro | PestGuard — Safe Removal & Prevention",
    metaDescription: "Spider control in Washington DC, MD & VA. Remove spiders and prevent infestations. Eco-friendly, safe for families. No contracts. Get protected.",
    h1: "Spider Control in Washington DC & Surrounding Areas",
    quickAnswer: "Most spiders in the DC metro area are harmless and actually beneficial — they eat other pests. However, large spider populations inside your home often indicate an underlying insect prey problem. Professional spider control addresses both the spiders and the pests attracting them.",
    definition: [
      "Spiders are eight-legged arachnids that feed primarily on insects. They're predators, not parasites, and most species found in DC-area homes are harmless to humans.",
      "The most common household spiders include cellar spiders (daddy longlegs), wolf spiders, house spiders, and jumping spiders. The brown recluse, while rare in the DC area, is the only medically significant spider species residents should be concerned about."
    ],
    signs: [
      { title: "Webs in corners and ceilings", description: "Cobwebs accumulating in corners, window frames, and ceiling joints indicate resident spider populations." },
      { title: "Egg sacs", description: "Small, silk-wrapped egg sacs attached to webs or hidden in dark areas can contain hundreds of spiderlings." },
      { title: "Frequent sightings", description: "Seeing spiders regularly — especially large wolf spiders or multiple species — suggests a significant population supported by abundant prey." },
      { title: "Other insects present", description: "Heavy spider populations are almost always accompanied by prey insects that attracted them in the first place." },
      { title: "Spiders in specific rooms", description: "Concentrations in basements, garages, and attics indicate moisture, clutter, or entry points that facilitate both spider and prey access." }
    ],
    regionalProblem: [
      "The DC metro area's warm, humid climate supports a diverse insect population, which in turn supports healthy spider communities. Basements and garages in suburban homes provide dark, undisturbed harborage where spiders thrive.",
      "Homes near wooded areas — common in McLean, Bethesda, Reston, and Fairfax — see elevated wolf spider activity as outdoor populations migrate indoors during temperature changes.",
      "While most DC-area spiders are harmless, their presence makes homes feel uncomfortable. The brown recluse is occasionally found in DC metro homes, primarily in undisturbed storage areas."
    ],
    treatment: [
      { stage: "Source Assessment", description: "We identify what's attracting spiders — usually an underlying insect population. We inspect for prey pests, entry points, and environmental conditions that draw insects and spiders." },
      { stage: "Dual Treatment", description: "We treat for both spiders and their prey. Exterior perimeter treatments reduce insects that attract spiders, while interior web removal and targeted treatments address existing populations. All products are eco-friendly." },
      { stage: "Environmental Recommendations", description: "We advise on reducing spider-friendly conditions: switching outdoor lights to yellow/sodium vapor, reducing clutter in storage areas, sealing entry points, and managing moisture." }
    ],
    diyVsPro: [
      "Regular vacuuming of webs, reducing clutter, sealing cracks, and switching to yellow outdoor lighting are effective DIY steps. Glue traps placed along baseboards can monitor and reduce spider populations.",
      "For most homeowners, occasional spiders don't require professional treatment. However, if you're seeing large numbers, finding egg sacs regularly, or dealing with persistent populations despite cleaning, professional treatment addresses the root cause.",
      "Professional treatment is also recommended if brown recluse spiders are identified in your home."
    ],
    faqs: [
      { q: "Are there dangerous spiders in the DC area?", a: "The brown recluse is the only medically significant spider occasionally found in the DC metro area. Black widows are extremely rare. The vast majority — wolf spiders, cellar spiders, house spiders — are harmless." },
      { q: "Why do I have so many spiders in my basement?", a: "Basements provide dark, undisturbed environments with consistent moisture — ideal for spiders. More importantly, basements attract prey insects that spiders feed on. Treating the prey problem typically reduces spider populations." },
      { q: "Do spiders come inside during winter in DC?", a: "Some outdoor spiders migrate indoors as temperatures drop in fall. However, many indoor spiders are year-round residents. Sealing entry points in September and October reduces seasonal spider influx." },
      { q: "How do I keep spiders out of my garage?", a: "Seal gaps around the garage door and windows, reduce clutter, use yellow bulbs in exterior lights, and maintain regular pest treatments to reduce insect prey. Glue traps along walls help monitor activity." },
      { q: "Does PestGuard's regular treatment cover spiders?", a: "Yes. All PestGuard plans include spider treatment as part of the regular service. Our approach targets both spiders and the insect prey that attracts them." }
    ],
    ctaText: "Want fewer spiders in your home?"
  },
  {
    slug: "stink-bugs",
    name: "Stink Bugs",
    titleTag: "Stink Bug Control DC Metro | PestGuard — Prevention & Treatment",
    metaDescription: "Stink bug control in Washington DC, MD & VA. Prevent fall invasions. Eco-friendly treatment, seal entry points. No contracts. Start today.",
    h1: "Stink Bug Control in Washington DC & Surrounding Areas",
    quickAnswer: "Brown marmorated stink bugs invade DC-area homes every fall seeking warmth. They don't bite or cause structural damage, but they release a foul odor when disturbed. Preventive exterior treatment in late summer is the most effective control strategy.",
    definition: [
      "The brown marmorated stink bug (BMSB) is an invasive species from Asia that has become one of the most common household nuisance pests in the Mid-Atlantic. These shield-shaped, mottled brown insects are about ¾ inch long.",
      "They're named for the unpleasant odor they release from scent glands when threatened or crushed. Stink bugs don't bite, sting, or cause structural damage — but they invade homes in large numbers seeking overwintering shelter."
    ],
    signs: [
      { title: "Clusters on south-facing walls", description: "Stink bugs gather on warm, sun-facing exterior walls in fall, often around windows and doorframes." },
      { title: "Bugs around windows and lights", description: "They're attracted to light and heat, congregating on window screens and around light fixtures inside and outside your home." },
      { title: "Foul odor when disturbed", description: "The characteristic sharp, cilantro-like odor indicates their presence, especially if you vacuum them or handle them." },
      { title: "Buzzing flight indoors", description: "Stink bugs are clumsy fliers. Hearing buzzing and seeing them fly toward light sources inside your home is a common late-fall indicator." },
      { title: "Large numbers in attics or wall voids", description: "Stink bugs cluster in attics, wall voids, and crawl spaces for overwintering. You may not see them until warm winter days draw them out." }
    ],
    regionalProblem: [
      "The DC metro area is ground zero for brown marmorated stink bugs in the United States. The species was first identified in Allentown, PA in 1998 and spread rapidly across the Mid-Atlantic.",
      "The area's warm summers allow stink bugs to reproduce prolifically, and fall temperatures trigger mass migration into homes through cracks around windows, gaps in siding, and openings around utility penetrations.",
      "Once inside wall voids and attics, they enter a dormant state for winter. On warm days, they become active and emerge into living spaces — sometimes in large numbers."
    ],
    treatment: [
      { stage: "Entry Point Assessment", description: "We identify how stink bugs are entering your home — gaps around windows, siding seams, soffit vents, and utility penetrations are the most common entry points." },
      { stage: "Preventive Barrier Treatment", description: "We apply residual exterior treatments in late August through September, before stink bugs begin their fall migration. This creates a barrier that kills stink bugs on contact." },
      { stage: "Exclusion Support", description: "We advise on sealing entry points and can coordinate window screen repairs, caulking, and weatherstripping that prevent future invasions." }
    ],
    diyVsPro: [
      "Sealing entry points is the most important DIY step: caulk around windows, repair torn screens, and install door sweeps. When stink bugs are inside, vacuum them with a shop vac and dispose of the bag outside.",
      "Do not crush stink bugs — this releases their defensive odor and can stain surfaces. Avoid using bug bombs indoors, as these are ineffective against stink bugs in wall voids.",
      "Professional treatment is most effective as a preventive measure applied before fall migration (late August–September). Once stink bugs are established in wall voids, they're extremely difficult to eliminate until spring."
    ],
    faqs: [
      { q: "When do stink bugs invade homes in DC?", a: "Stink bug migration typically occurs from mid-September through November, triggered by shortening daylight and cooling temperatures. Preventive treatment should be applied in late August or early September." },
      { q: "Do stink bugs cause damage to homes?", a: "No. Stink bugs don't bite, sting, or damage structures. They're a nuisance pest that enters homes for warmth. Their primary annoyance is their numbers and the foul odor when disturbed." },
      { q: "Why do stink bugs appear inside on warm winter days?", a: "Stink bugs overwintering in wall voids and attics become active when temperatures rise on sunny winter days. They're drawn toward light and warmth, appearing around windows and light fixtures." },
      { q: "How do I get stink bugs out without the smell?", a: "Use a shop vacuum — empty the canister outdoors immediately. You can also capture individual bugs with a tissue and flush them. Avoid crushing them, which triggers the defensive odor." },
      { q: "Does PestGuard's treatment prevent stink bugs?", a: "Yes. Our Plus and Premium plans include fall preventive stink bug treatment. We apply exterior barrier treatments in late summer/early fall before migration begins." }
    ],
    ctaText: "Stop stink bugs before they get in."
  },
  {
    slug: "silverfish",
    name: "Silverfish",
    titleTag: "Silverfish Control DC Metro | PestGuard — Removal & Prevention",
    metaDescription: "Silverfish control in Washington DC, MD & VA. Protect books, clothes & paper. Eco-friendly treatment, moisture solutions. No contracts.",
    h1: "Silverfish Control in Washington DC & Surrounding Areas",
    quickAnswer: "Silverfish are moisture-loving insects that feed on paper, glue, and starchy materials. They're common in DC-area bathrooms, basements, and attics. Professional treatment combines targeted insecticide application with moisture reduction to eliminate them and prevent their return.",
    definition: [
      "Silverfish (Lepisma saccharina) are small, wingless insects with distinctive silver-gray scales and a fish-like body shape. They're typically ½ to 1 inch long with long antennae and three tail-like appendages.",
      "Silverfish are nocturnal, fast-moving, and thrive in dark, damp environments. They feed on carbohydrates including paper, book bindings, wallpaper paste, clothing starch, and photographs."
    ],
    signs: [
      { title: "Irregular holes in paper", description: "Small, irregular feeding holes or surface scraping on books, wallpaper, documents, and stored paper indicate silverfish activity." },
      { title: "Yellow stains on fabric", description: "Silverfish feeding on clothing starch and sizing leave yellowish stains and small holes in stored garments." },
      { title: "Shed skins", description: "Silverfish molt throughout their lives (which can span 3-6 years). Finding tiny, translucent shed skins in bathrooms or basements is a sign of infestation." },
      { title: "Live silverfish at night", description: "Turn on lights in bathrooms or basements at night — silverfish scatter quickly from exposed surfaces when disturbed." },
      { title: "Droppings", description: "Silverfish leave tiny, pepper-like droppings and scales in areas they frequent, particularly around bookcases, boxes, and bathroom fixtures." }
    ],
    regionalProblem: [
      "The DC metro area's humid climate makes it an ideal environment for silverfish. Homes with poor ventilation, leaky plumbing, and unfinished basements are especially susceptible. Silverfish thrive at relative humidity levels above 75%.",
      "Older homes in Capitol Hill, Georgetown, Bethesda, and Annapolis with finished basements containing libraries, stored documents, and archived clothing are particularly vulnerable.",
      "Silverfish can damage valuable books, photographs, and heirloom textiles. While they don't bite or carry diseases, their presence indicates excess moisture that may also attract other pests."
    ],
    treatment: [
      { stage: "Moisture Assessment", description: "We identify the moisture sources and high-humidity areas in your home that support silverfish populations. Bathrooms, basements, laundry rooms, and under-sink areas are checked." },
      { stage: "Targeted Treatment", description: "We apply eco-friendly dust formulations and residual treatments in cracks, crevices, and harborage areas. We treat behind baseboards, around plumbing, and in closets. All products are safe for families and pets." },
      { stage: "Moisture Management", description: "We provide recommendations for reducing humidity: dehumidifier placement, ventilation improvements, fixing plumbing leaks, and proper storage. Reducing moisture is the most important long-term silverfish control strategy." }
    ],
    diyVsPro: [
      "Reducing humidity is the single most effective DIY measure. Use dehumidifiers in basements, fix leaky pipes, improve ventilation, and store books and clothing in sealed plastic containers rather than cardboard boxes.",
      "Store-bought sticky traps placed along baseboards can monitor activity and catch some silverfish, but they won't eliminate a population.",
      "Professional treatment is appropriate when silverfish are in multiple rooms, when valuable books or documents are at risk, or when populations persist despite moisture reduction efforts."
    ],
    faqs: [
      { q: "Are silverfish harmful to humans?", a: "Silverfish don't bite, sting, or transmit diseases. However, they damage paper, books, wallpaper, photographs, and stored clothing by feeding on starch, glue, and cellulose materials." },
      { q: "Why do I find silverfish in my bathroom?", a: "Bathrooms provide warm, humid conditions silverfish need to survive. They're attracted to moisture around tubs, showers, sinks, and toilet bases. Improving ventilation and fixing leaks reduces their habitat." },
      { q: "Can silverfish damage my book collection?", a: "Yes. Silverfish feed on book bindings, paper, and bookmaking glue. Valuable books should be stored in sealed containers or climate-controlled environments." },
      { q: "How long do silverfish live?", a: "Silverfish can live 3-6 years under favorable conditions and continue reproducing throughout their lifespan. This longevity means infestations can persist for years without targeted treatment." },
      { q: "Does reducing humidity really help with silverfish?", a: "Yes. Silverfish require relative humidity above 75% to thrive. Running a dehumidifier and maintaining humidity below 60% makes your home inhospitable and is the most effective long-term control strategy." }
    ],
    ctaText: "Protect your home and belongings from silverfish."
  }
];
