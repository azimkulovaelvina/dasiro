export const businessTypes = [
  "Café",
  "Bakery",
  "Restaurant",
  "Beauty salon",
  "Retail shop",
] as const;
export type BusinessType = (typeof businessTypes)[number];
export const neighborhoods = [
  "All Jeonju",
  "Gaeksa",
  "Hyoja-dong",
  "Jeonju Hanok Village",
  "Songcheon-dong",
  "Jungang-dong",
  "Deokjin-dong",
];

export interface Property {
  id: string;
  title: string;
  type: BusinessType;
  neighborhood: string;
  size: number;
  rent: number;
  deposit: number;
  available: string;
  status: string;
  image: string;
  gallery: string[];
  equipment: string[];
  suitable: BusinessType[];
  description: string;
  detail: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: "gaeksa-cafe",
    title: "A little café. A lot of possibility.",
    type: "Café",
    neighborhood: "Gaeksa",
    size: 68,
    rent: 1200000,
    deposit: 20000000,
    available: "2027-02-01",
    status: "Planning a transition",
    image: "/assets/cafe.webp",
    gallery: [
      "/assets/cafe.webp",
      "/assets/coffee.webp",
      "/assets/cafe-detail.webp",
    ],
    equipment: [
      "Espresso machine",
      "Coffee grinder",
      "Refrigerator",
      "Tables & seating",
      "Air conditioning",
    ],
    suitable: ["Café", "Bakery", "Retail shop"],
    description:
      "A light-filled neighborhood café with warm timber, a generous counter, and room for your own story.",
    detail:
      "An illustrative ground-floor space on a quiet side street in Gaeksa. Its open layout and existing coffee setup make it a useful starting point for a neighborhood café, dessert counter, or a small concept store.",
    features: [
      "Ground floor",
      "Street-facing windows",
      "Water & drainage",
      "Existing service counter",
    ],
  },
  {
    id: "hyoja-bakery",
    title: "Made for your daily bread.",
    type: "Bakery",
    neighborhood: "Hyoja-dong",
    size: 92,
    rent: 1500000,
    deposit: 25000000,
    available: "2027-03-01",
    status: "Exploring a handover",
    image: "/assets/bakery.webp",
    gallery: [
      "/assets/bakery.webp",
      "/assets/bakery-detail.webp",
      "/assets/cafe-detail.webp",
    ],
    equipment: [
      "Commercial oven",
      "Dough mixer",
      "Refrigerator",
      "Display counter",
      "Air conditioning",
    ],
    suitable: ["Bakery", "Café", "Restaurant"],
    description:
      "An inviting bakery space with a fitted preparation area and a window-side display counter.",
    detail:
      "This fictional Hyoja-dong bakery pairs an open retail area with a practical back-of-house workspace. The equipment set could support a small bakery or a café with a baking program, subject to professional inspections.",
    features: [
      "Ground floor",
      "Preparation area",
      "Three-phase power",
      "Display frontage",
    ],
  },
  {
    id: "hanok-restaurant",
    title: "A new chapter at the table.",
    type: "Restaurant",
    neighborhood: "Jeonju Hanok Village",
    size: 110,
    rent: 1800000,
    deposit: 30000000,
    available: "2027-02-15",
    status: "Planning a transition",
    image: "/assets/restaurant.webp",
    gallery: [
      "/assets/restaurant.webp",
      "/assets/cafe-detail.webp",
      "/assets/cafe.webp",
    ],
    equipment: [
      "Commercial range",
      "Extraction hood",
      "Refrigerator",
      "Dishwasher",
      "Tables & seating",
      "Air conditioning",
    ],
    suitable: ["Restaurant", "Café", "Bakery"],
    description:
      "A characterful dining room with a fitted kitchen, ready to inspire a different menu.",
    detail:
      "A demonstration restaurant near the Hanok Village area. A separate kitchen and flexible dining area illustrate the value that can remain when a business closes. All equipment and suitability would need independent assessment.",
    features: [
      "Separate kitchen",
      "Existing ventilation",
      "Dining room",
      "Water & drainage",
    ],
  },
  {
    id: "songcheon-salon",
    title: "Room for a fresh perspective.",
    type: "Beauty salon",
    neighborhood: "Songcheon-dong",
    size: 54,
    rent: 950000,
    deposit: 15000000,
    available: "2027-01-15",
    status: "Ready to discuss",
    image: "/assets/salon.webp",
    gallery: ["/assets/salon.webp", "/assets/cafe-detail.webp"],
    equipment: [
      "Styling chairs",
      "Wash stations",
      "Mirrors",
      "Air conditioning",
      "Refrigerator",
    ],
    suitable: ["Beauty salon", "Retail shop"],
    description:
      "A calm, airy salon with existing wash stations and a compact, easy-to-adapt floor plan.",
    detail:
      "A fictional neighborhood salon with street-level access. Existing plumbing and styling stations demonstrate infrastructure that a future operator might reuse, depending on its condition and the new business requirements.",
    features: [
      "Ground floor",
      "Existing plumbing",
      "Reception area",
      "Natural light",
    ],
  },
  {
    id: "jungang-retail",
    title: "Small space. Big ideas.",
    type: "Retail shop",
    neighborhood: "Jungang-dong",
    size: 42,
    rent: 700000,
    deposit: 10000000,
    available: "2027-01-01",
    status: "Ready to discuss",
    image: "/assets/shop.webp",
    gallery: ["/assets/shop.webp", "/assets/cafe-detail.webp"],
    equipment: [
      "Display shelving",
      "Display counter",
      "Air conditioning",
      "Storage units",
    ],
    suitable: ["Retail shop", "Beauty salon"],
    description:
      "A compact concept-store setting for carefully chosen objects and independent ideas.",
    detail:
      "This illustrative retail unit offers an open shop floor, movable displays, and rear storage. Its modest footprint is intended to show how a smaller space could fit an entrepreneur with a more limited startup budget.",
    features: [
      "Street frontage",
      "Rear storage",
      "Flexible layout",
      "Display lighting",
    ],
  },
  {
    id: "deokjin-cafe",
    title: "Your neighborhood’s next favorite.",
    type: "Café",
    neighborhood: "Deokjin-dong",
    size: 78,
    rent: 1100000,
    deposit: 18000000,
    available: "2027-03-15",
    status: "Exploring a handover",
    image: "/assets/coffee.webp",
    gallery: [
      "/assets/coffee.webp",
      "/assets/cafe.webp",
      "/assets/cafe-detail.webp",
    ],
    equipment: [
      "Espresso machine",
      "Coffee grinder",
      "Refrigerator",
      "Display counter",
      "Air conditioning",
    ],
    suitable: ["Café", "Bakery"],
    description:
      "An intimate café with a generous coffee bar and the bones of a welcoming local spot.",
    detail:
      "A fictional café in Deokjin-dong with a service counter and a dedicated coffee station. The later illustrative handover date provides an example of how transition timing can affect a business match.",
    features: [
      "Coffee bar",
      "Water & drainage",
      "Corner location",
      "Storage area",
    ],
  },
  {
    id: "hyoja-kitchen",
    title: "Good food starts somewhere.",
    type: "Restaurant",
    neighborhood: "Hyoja-dong",
    size: 85,
    rent: 1400000,
    deposit: 22000000,
    available: "2027-02-01",
    status: "Ready to discuss",
    image: "/assets/kitchen.webp",
    gallery: ["/assets/kitchen.webp", "/assets/restaurant.webp"],
    equipment: [
      "Commercial range",
      "Extraction hood",
      "Refrigerator",
      "Dishwasher",
      "Air conditioning",
    ],
    suitable: ["Restaurant", "Bakery"],
    description:
      "A practical neighborhood kitchen with existing ventilation and a flexible front room.",
    detail:
      "An illustrative small restaurant with an equipped kitchen and an adaptable dining area. Reusing the range, extraction, and refrigeration could reduce duplication if the equipment passes inspection and suits the incoming concept.",
    features: [
      "Fitted kitchen",
      "Existing ventilation",
      "Dining area",
      "Water & drainage",
    ],
  },
  {
    id: "gaeksa-studio",
    title: "A home for the things you love.",
    type: "Retail shop",
    neighborhood: "Gaeksa",
    size: 61,
    rent: 1050000,
    deposit: 15000000,
    available: "2027-02-15",
    status: "Planning a transition",
    image: "/assets/studio.webp",
    gallery: ["/assets/studio.webp", "/assets/shop.webp"],
    equipment: [
      "Display shelving",
      "Display counter",
      "Storage units",
      "Air conditioning",
    ],
    suitable: ["Retail shop", "Beauty salon", "Café"],
    description:
      "A sunlit retail studio for a small collection, a creative idea, or a fresh beginning.",
    detail:
      "A demonstration retail studio with adaptable shelving and street-facing windows. A conversion into food service would require additional plumbing, equipment, and a professional review of permitted use.",
    features: [
      "Large windows",
      "Flexible displays",
      "Rear storage",
      "Ground floor",
    ],
  },
];

export const requiredEquipment: Record<BusinessType, string[]> = {
  Café: [
    "Espresso machine",
    "Coffee grinder",
    "Refrigerator",
    "Tables & seating",
    "Air conditioning",
  ],
  Bakery: [
    "Commercial oven",
    "Dough mixer",
    "Refrigerator",
    "Display counter",
    "Air conditioning",
  ],
  Restaurant: [
    "Commercial range",
    "Extraction hood",
    "Refrigerator",
    "Dishwasher",
    "Tables & seating",
    "Air conditioning",
  ],
  "Beauty salon": [
    "Styling chairs",
    "Wash stations",
    "Mirrors",
    "Air conditioning",
  ],
  "Retail shop": [
    "Display shelving",
    "Display counter",
    "Storage units",
    "Air conditioning",
  ],
};

export interface MatchPreferences {
  type: BusinessType;
  budget: number;
  location: string;
  date: string;
}
export interface MatchResult {
  property: Property;
  score: number;
  reusable: string[];
  missing: string[];
  upfront: number;
  breakdown: {
    label: string;
    points: number;
    max: number;
    explanation: string;
  }[];
}

export function matchProperty(
  property: Property,
  preferences: MatchPreferences,
): MatchResult {
  const required = requiredEquipment[preferences.type];
  const reusable = required.filter((item) => property.equipment.includes(item));
  const missing = required.filter((item) => !property.equipment.includes(item));
  const ratio = reusable.length / required.length;
  const upfront =
    property.deposit +
    property.rent * 2 +
    15000000 +
    Math.round((1 - ratio) * 20000000);
  const typePoints =
    property.type === preferences.type
      ? 30
      : property.suitable.includes(preferences.type)
        ? 22
        : 8;
  const equipmentPoints = Math.round(ratio * 25);
  const budgetPoints =
    preferences.budget >= upfront
      ? 25
      : Math.max(
          0,
          25 -
            Math.round(
              ((upfront - preferences.budget) /
                Math.max(1, preferences.budget)) *
                25,
            ),
        );
  const locationPoints =
    preferences.location === "All Jeonju" ||
    preferences.location === property.neighborhood
      ? 10
      : 3;
  const delay = Math.max(
    0,
    Math.ceil(
      (Date.parse(preferences.date + "T00:00:00Z") -
        Date.parse(property.available + "T00:00:00Z")) /
        86400000,
    ) * -1,
  );
  const timingPoints = Math.max(0, 10 - Math.ceil(delay / 7) * 2);
  const breakdown = [
    {
      label: "Business fit",
      points: typePoints,
      max: 30,
      explanation:
        property.type === preferences.type
          ? "Same existing business type."
          : property.suitable.includes(preferences.type)
            ? "Included in the example’s suitable business types."
            : "A different use requiring a professional suitability review.",
    },
    {
      label: "Equipment overlap",
      points: equipmentPoints,
      max: 25,
      explanation: `${reusable.length} of ${required.length} assumed equipment needs overlap.`,
    },
    {
      label: "Budget fit",
      points: budgetPoints,
      max: 25,
      explanation:
        "25 if budget covers the example setup cost; reduced proportionally for a shortfall.",
    },
    {
      label: "Location",
      points: locationPoints,
      max: 10,
      explanation:
        locationPoints === 10
          ? "Matches your selected area or all Jeonju."
          : "Outside your preferred neighborhood.",
    },
    {
      label: "Timing",
      points: timingPoints,
      max: 10,
      explanation:
        delay === 0
          ? "Available by your desired opening date. Preparation time still needs review."
          : `${delay} days after your desired date; 2 points deducted per week, rounded up.`,
    },
  ];
  return {
    property,
    score: breakdown.reduce((sum, item) => sum + item.points, 0),
    reusable,
    missing,
    upfront,
    breakdown,
  };
}

export function getMatches(preferences: MatchPreferences): MatchResult[] {
  return properties
    .map((property) => matchProperty(property, preferences))
    .sort((a, b) => b.score - a.score || a.upfront - b.upfront);
}

export interface TransitionInputs {
  rent: number;
  vacancyMonths: number;
  renovation: number;
  equipment: number;
  reuse: number;
  preparationWeeks: number;
  handoverWeeks: number;
}
export function calculateTransition(inputs: TransitionInputs) {
  const traditional = {
    vacancy: inputs.rent * inputs.vacancyMonths,
    renovation: inputs.renovation,
    equipment: inputs.equipment,
    weeks: inputs.preparationWeeks,
  };
  const coordinated = {
    vacancy: (inputs.rent * inputs.handoverWeeks) / 4,
    renovation: Math.round(
      inputs.renovation * (1 - (inputs.reuse / 100) * 0.5),
    ),
    equipment: Math.round(inputs.equipment * (1 - inputs.reuse / 100)),
    weeks: Math.max(
      inputs.handoverWeeks,
      Math.ceil(inputs.preparationWeeks * (1 - (inputs.reuse / 100) * 0.6)),
    ),
  };
  const traditionalTotal =
    traditional.vacancy + traditional.renovation + traditional.equipment;
  const coordinatedTotal =
    coordinated.vacancy + coordinated.renovation + coordinated.equipment;
  return {
    traditional,
    coordinated,
    traditionalTotal,
    coordinatedTotal,
    difference: traditionalTotal - coordinatedTotal,
  };
}

export const won = (amount: number) =>
  "₩" + Math.round(amount).toLocaleString("en-US");
export const compactWon = (amount: number) =>
  amount >= 1000000
    ? `₩${Number((amount / 1000000).toFixed(1))}M`
    : won(amount);
export const formatDate = (value: string) =>
  new Date(value + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
