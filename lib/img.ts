// Centralized image-URL builder. Uses placehold.co — a reliable placeholder
// service that always responds, so the site never shows broken-image icons.
// Swap individual entries below for real product photos when you have them.

type Tone = "light" | "dark" | "gray" | "accent";

const PALETTE: Record<Tone, { bg: string; fg: string }> = {
  light: { bg: "fbfbfd", fg: "1d1d1f" },
  dark: { bg: "000000", fg: "ffffff" },
  gray: { bg: "f5f5f7", fg: "1d1d1f" },
  accent: { bg: "1d1d1f", fg: "2997ff" },
};

export function img(
  w: number,
  h: number,
  text: string,
  tone: Tone = "gray"
): string {
  const { bg, fg } = PALETTE[tone];
  const encoded = encodeURIComponent(text).replace(/%20/g, "+");
  return `https://placehold.co/${w}x${h}/${bg}/${fg}/png?text=${encoded}&font=raleway`;
}

// Pre-built named images so swaps are easy in one place.
export const IMG = {
  // Hero shots (wide)
  iphone15ProHero: img(1200, 800, "iPhone 15 Pro", "dark"),
  iphone15Hero: img(1200, 800, "iPhone 15", "light"),
  macbookProHero: img(1200, 700, "MacBook Pro", "dark"),
  ipadProHero: img(1200, 700, "iPad Pro", "light"),
  watchUltraHero: img(1200, 700, "Apple Watch Ultra 2", "dark"),
  airpodsProHero: img(1200, 700, "AirPods Pro", "light"),

  // Product tiles (tall)
  iphone15Pro: img(600, 700, "iPhone 15 Pro", "gray"),
  iphone15: img(600, 700, "iPhone 15", "gray"),
  iphone14: img(600, 700, "iPhone 14", "gray"),
  iphoneSE: img(600, 700, "iPhone SE", "gray"),

  macbookAir: img(600, 500, "MacBook Air", "gray"),
  macbookPro: img(600, 500, "MacBook Pro", "gray"),
  imac: img(600, 500, "iMac", "gray"),
  macMini: img(600, 500, "Mac mini", "gray"),
  macStudio: img(600, 500, "Mac Studio", "gray"),
  macPro: img(600, 500, "Mac Pro", "gray"),

  ipadPro: img(600, 500, "iPad Pro", "gray"),
  ipadAir: img(600, 500, "iPad Air", "gray"),
  ipad: img(600, 500, "iPad", "gray"),
  ipadMini: img(600, 500, "iPad mini", "gray"),

  watchUltra: img(600, 700, "Apple Watch Ultra 2", "gray"),
  watchSeries9: img(600, 700, "Apple Watch Series 9", "gray"),
  watchSE: img(600, 700, "Apple Watch SE", "gray"),

  airpodsPro2: img(600, 500, "AirPods Pro 2", "gray"),
  airpods3: img(600, 500, "AirPods 3rd gen", "gray"),
  airpods2: img(600, 500, "AirPods 2nd gen", "gray"),
  airpodsMax: img(600, 500, "AirPods Max", "gray"),

  appleTV: img(600, 500, "Apple TV 4K", "gray"),
  homepod: img(600, 500, "HomePod", "gray"),

  // Apple TV+ show stills (16:9)
  showTedLasso: img(800, 450, "Ted Lasso", "dark"),
  showSeverance: img(800, 450, "Severance", "dark"),
  showFoundation: img(800, 450, "Foundation", "dark"),
  showMorningShow: img(800, 450, "The Morning Show", "dark"),
};
