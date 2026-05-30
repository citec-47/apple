export const BRAND = {
  name: "Nova",
  tagline: "Built for tomorrow.",
  shortDescription: "Smart devices, curated tech, and the gear you actually want.",
  longDescription:
    "Nova is a modern tech storefront — phones, laptops, tablets, watches, audio and home gear, picked and tuned for what you'll need next year.",
  year: 2026,
} as const;

export const CATEGORIES: { slug: string; label: string; tagline: string; accent: string }[] = [
  { slug: "phones", label: "Phones", tagline: "Pocket power, redefined.", accent: "#5b8def" },
  { slug: "laptops", label: "Laptops", tagline: "All-day creativity.", accent: "#7b5fee" },
  { slug: "tablets", label: "Tablets", tagline: "Draw, play, work.", accent: "#e87ab5" },
  { slug: "watches", label: "Watches", tagline: "Health on your wrist.", accent: "#3ac39a" },
  { slug: "audio", label: "Audio", tagline: "Lossless, anywhere.", accent: "#f0a14b" },
  { slug: "home", label: "Home & TV", tagline: "Cinema, room-filled.", accent: "#9a7caa" },
  { slug: "accessories", label: "Accessories", tagline: "Everything that connects.", accent: "#4ec5d6" },
];
