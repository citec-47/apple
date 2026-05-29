import Link from "next/link";
import HotlinkImage from "@/components/HotlinkImage";
import AccessoryBrowser from "@/components/AccessoryBrowser";
import { img } from "@/lib/img";

const CDN = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is";

// Real apple.com Store CDN URLs (extracted from the live shop pages).
const PRODUCT_IMAGES = {
  techwovenCase: `${CDN}/MGF44?wid=532&hei=582&fmt=png-alpha&.v=U2pkbzQ0MHdwUU54RGE3Ynp2ajY0QUhqc0NvK2RZTVd5TWVhUDFuQlo0MEVMWC9xbVh4KzA2U0tUUXprZWhodmlPT2h0WHpsRlBNRE91R0xWOHdsTGc`,
  iphone17SiliconeCase: `${CDN}/MHVQ4_FV401?wid=1420&hei=930&fmt=png-alpha&.v=NDlNSEY4dWYwTW1Ja3cwL3paSDlnRUJTMHZrdGM3YVhOamhhQWtVbXVxSEhxZjQyanFrTDN5a241WlpqRHdlVDM0SlZQU3NQSHlNYkFsZCtpYmJ0WkE`,
  iphone17eSiliconeCase: `${CDN}/MHWF4?wid=532&hei=582&fmt=png-alpha&.v=blpHMkFBUDJkRVJpMXZmeEs2cnZaUUhqc0NvK2RZTVd5TWVhUDFuQlo0MXd0Wk9sajhyMU55WS9GRFJ6dlp6amhDZEMvSFdQWWh0ZlA4cXNmVW83SVE`,
  crossbodyStrap: `${CDN}/MHYX4?wid=532&hei=582&fmt=png-alpha&.v=dEtBeEVIaTMzc3hFNmQ5aEpmTloxZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MDZLa0ZhcGhyM3hZZHkxT051RDA2d21kT1hCTDRBV1Z2MHFvcUcvQkFCM0E`,
  iphoneAirCase: `${CDN}/MGH34?wid=532&hei=582&fmt=png-alpha&.v=MzM0b2FteXRYLzNjb2ROdjA5akRhUUhqc0NvK2RZTVd5TWVhUDFuQlo0MHhZcjdWMHRqdlJLYjZkK3BOWEpkQWRHR2R2TWU1RzFGOHkrQnNHR3RSMlE`,
  applePencilPro: `${CDN}/MX2D3?wid=532&hei=582&fmt=png-alpha&.v=YVo4RFdhVU5yOEtndnBqTVBDZytYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MlVSVEd3WGxyWkRkbCttOFdLT3Y0VUdXQ1pIVUZFeHUrOEx0QnlPY1lrdWc`,
  magicKeyboardIpadAirBlack: `${CDN}/MGYY4_FV401_GEO_US?wid=1420&hei=930&fmt=png-alpha&.v=cXFITEJiVHJneThsNzB1c1dHallack93N2ptdVY3YnhocStTK0NwU3BkSTJIbGNwQ3FINUZXNytOeFd0WEY2ckpPTFA0YlRMK0w0UUhqUzhwRUxPclcvbGF6R3UrWFlxWUREYWYxU3NtcVE`,
  smartFolioIpadAirSage: `${CDN}/MWK73?wid=532&hei=582&fmt=png-alpha&.v=QWd2YXd4Um1rb1JSeHFHSUxVUmRkZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MWhjVHd0KzFCcHdjc1ZkU0ZlazcrWDRIeXVid1BXOU9Pa0RQcnhSdFVWOWc`,
  magicKeyboardIpadProWhite: `${CDN}/MWR03?wid=532&hei=582&fmt=png-alpha&.v=WGdQQmYxTHpudDRaTi9PcXplejZiQUhqc0NvK2RZTVd5TWVhUDFuQlo0M3VJK2RiQkFEb1A5SXpwN1pFQWVxMk5LZnl4Z2NLUk15aUJVVGNTenFYalE`,
  applePencilUsbC: `${CDN}/MUWA3?wid=532&hei=582&fmt=png-alpha&.v=MWxxejZka05YVWIrWnl0NXZuUklYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MGorUDVBOUI1cTBZQVBWUytzNUoxSEdTU21VeUx6cEpCL0VEQm9uN1FQSlE`,
  powerAdapter40W: `${CDN}/MGKN4?wid=532&hei=582&fmt=png-alpha&.v=T0lOcnNHdkZoVHZXUE1wQk9tZ1A4d0hqc0NvK2RZTVd5TWVhUDFuQlo0M0NzdzNDT1N4VEJGYnliSWtxOW1wYWxkajZ1cGQ5WVZidWhPak1Ga21BOGc`,
  studioDisplay: `${CDN}/MFEX4?wid=1420&hei=930&fmt=png-alpha&.v=dHN0TVZvczlPY0c3TFg0WktjODh6blhxNEZUZDRrSTNYTWl6R2dBdTdxUHhRaC84S0V6YjI5Z0xwY2txZ1U3eWxwRUM1ZzRUODRyVWxyU0tIcnQ1dmc`,
  studioDisplayXDR: `${CDN}/MFEL4?wid=532&hei=582&fmt=png-alpha&.v=eHV6SzVxYnErY1lnZnFGbm43MnRld0hqc0NvK2RZTVd5TWVhUDFuQlo0M3YzcG5UekJGa1NTUlI3aFMvTS8vbThEd1FhZ3hucDd1d3NPNU1Ydzhsdmc`,
  magicKeyboardTouchId: `${CDN}/MXK83?wid=532&hei=582&fmt=png-alpha&.v=eFlJa0thaHg0Zk5Uc3lIcElEZThBZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MWlQcU93cWwvb0J4b2lHc01aQ3FTRmpTVDErb2pvVFNyNGl4TzdpOGhXQnc`,
  magicMouse: `${CDN}/MXK63?wid=532&hei=582&fmt=png-alpha&.v=QnNzVEw4ZWFrcDAyd0dVR2h6eGpMUUhqc0NvK2RZTVd5TWVhUDFuQlo0MFgyc213MCtPWGVtdXJJZ0RZeUVsYTAyRDl6R2VMekg2TUo4L1RVSE5EZ2c`,
  sportBand: `${CDN}/MHYH4ref_FV501?wid=532&hei=582&fmt=png-alpha&.v=a2xTTEx3V2JBbSsrM05YeVpWOHQ0LzFsZmNiME9WSGpaazRyMjZBZXNDYlRmMUFhaXkzWVI4b3hpbGUzQlh3YUgwTEI4eHdvRmhQQ3VoYVBzVlpISnc`,
  sportLoopPride: `${CDN}/MJ5C4_FV401?wid=1420&hei=930&fmt=png-alpha&.v=NXVDTHJVenFsZTJpUFFKMzI4cVRwRUJTMHZrdGM3YVhOamhhQWtVbXVxSEhxZjQyanFrTDN5a241WlpqRHdlVHNEeTNpVDdUQU16MlRpT3dBQ3U4L3c`,
  milaneseLoop: `${CDN}/MGJ44ref_FV401?wid=532&hei=582&fmt=png-alpha&.v=azFJTFNCR0xtc09ReHZYa1RNeEZVZjFsZmNiME9WSGpaazRyMjZBZXNDYlRmMUFhaXkzWVI4b3hpbGUzQlh3YVpxZTBKWGNjQkI0NTVJVTA1UlpiNGc`,
  nikeSportLoop: `${CDN}/MGD24_FV401?wid=532&hei=582&fmt=png-alpha&.v=bXhyOUg3SHlTRFZ0QkM5M21wUFZwQ1AyQkRuTmdJem9TZ0dDa0s1WkZVbjJDbFRqd09tZGpzYlFSbUlUOURibWxQcjBXbW9KWGR2N3Q2cEJmanZnMXc`,
  braidedSoloLoop: `${CDN}/MFMP4ref_FV401?wid=532&hei=582&fmt=png-alpha&.v=eDhOcTk1NEdDbVQyWmQ0V1Z4Tjh6ZjFsZmNiME9WSGpaazRyMjZBZXNDYlRmMUFhaXkzWVI4b3hpbGUzQlh3YUlHcDVXZVJRekYwdUVFUGk2bFd2blE`,
};

const BANNER_IMAGES = {
  iphoneMagsafe: `${CDN}/iphone-magsafe-header-accessories-202603?wid=2880&hei=960&fmt=png-alpha&.v=WjEyRExLV0FFRnNnU0s4SkhGUS9ZNmVzMjJZL0dPQVFuajNQRU8yMGdMR3ZaeWJXMDArQWdvRG5WQXA4d2tNVzhmajVaNGY3VWFpQytQbGVsVkd0L2V6TjdEcFFOUXljQ0RBVUNTdEpRdm9WNklaSWZZRHl4UEptU2lTUDlwYUo`,
  homepodMini: `${CDN}/homepod-mini-accessories-202110?wid=2140&hei=532&fmt=jpeg&qlt=90&.v=aE9lTjA3MVZ1TzRkdVVQVW5JOHBJdVFPK3JlTEtyd0VIWFFDYmN6Rm16ZVhsTitNWlY2Z050L3A0WDFSNUY0QWJGcXNRQnFCV0w3WVRjTExvdm1ic2FWOE5SM2k4dGZwUXpkRE5DVlZVTVVVRk5BYjU4dkMrYjBKSjFqVXFOVGg`,
  macThunderbolt: `${CDN}/mac-cables-accessories-usbc-202203?wid=1972&hei=116&fmt=png-alpha&.v=RmVXSjRVQXk2THdQZm1GRFZPTVg4aXFPem9vV0pudzVNeEp0VjRBQXVxdmRURGpPUXhPTHNCUVNxNmtHdGNQNXBoVTZveC9hV09oRG5aNURGN1RUQStVamFobU5FU1ZjeXB1SGNuUVFQNTE5SGwrVW1WWGxTS3o5bDl1ek5hbVY`,
  macMagsafe: `${CDN}/mac-cables-accessories-magsafe-202203?wid=2304&hei=240&fmt=png-alpha&.v=RmVXSjRVQXk2THdQZm1GRFZPTVg4dUZ2YXRBWUh4OWFXL0YwN1lNR0VqY2owQ05tUVVxYytFN2hvVnB5OGhsQmllcldheldCZ2k0cFgzbW1HRDRSRFEvbG5PdUJITitNTmI0UGFIeHhSWC9rdDdCTDhveW1zNmdsQjlLdEwxTHc`,
  airpodsEngraving: `${CDN}/airpods-acc-inpage-engraving-202509?wid=2140&hei=462&fmt=png-alpha&.v=RDhmMFBPelB0Yk9HTml5ckVuaDFKNXFhdC9JSXVGdDMwR3M4OERZMTJBL2xGbGRIem82S2xXRFhQMWtuc0F1eDdJZ0syZnIrZFhEZU1NQ0RuWEJlSmQ0RnludndGMzFRZkhTM2N0NUllSE5veWoxS3p3UVBVbWtaaTZ6WUE2UTU`,
  appleCarePlusMac: `${CDN}/mac-alp-applecare-plus-202603?wid=1220&hei=410&fmt=jpeg&qlt=90&.v=Uk1PMlhZeW5BYXBQTUwwdGE2a3EzcWJTWW1wYWJzNHZ1cmZUVTdDTFRQclM2S3ZwQmdzU3NBSjJQQWs5b2V1d3ZvdUZlR0V0VUdJSjBWaDVNVG95Yk1NM2tzTG5QZ3ZMOGZXYVppeUdSVkE`,
};

const CATEGORIES = [
  { label: "Mac", href: "/mac", icon: "mac" as const },
  { label: "iPad", href: "/ipad", icon: "ipad" as const },
  { label: "iPhone", href: "/iphone", icon: "iphone" as const },
  { label: "Apple Watch", href: "/watch", icon: "watch" as const },
  { label: "Apple Vision Pro", href: "/vision", icon: "vision" as const },
  { label: "AirPods", href: "/airpods", icon: "airpods" as const },
  { label: "TV & Home", href: "/tv", icon: "tv" as const },
  { label: "Beats", href: "#", icon: "beats" as const },
];

const FILTER_CHIPS = [
  "Accessibility",
  "AirTag and Accessories",
  "Apple Vision Pro",
  "Apple Watch Bands",
  "Cases & Protection",
  "Charging Essentials",
  "Creative Tools",
  "Gaming",
  "Headphones & Speakers",
  "Health & Fitness",
  "Home Office",
  "MagSafe",
  "Mice & Keyboards",
  "New Arrivals",
  "Photography",
  "Smart Home Accessories",
  "Software",
  "Storage",
];

interface Product {
  name: string;
  price: string;
  src: string;
  newBadge?: boolean;
}

const NEW_ARRIVALS: Product[] = [
  { name: "iPhone 17 Pro TechWoven Case", price: "$59.00", src: PRODUCT_IMAGES.techwovenCase, newBadge: true },
  { name: "iPhone 17 Silicone Case", price: "$49.00", src: PRODUCT_IMAGES.iphone17SiliconeCase, newBadge: true },
  { name: "iPhone 17e Silicone Case", price: "$49.00", src: PRODUCT_IMAGES.iphone17eSiliconeCase, newBadge: true },
  { name: "Crossbody Strap", price: "$59.00", src: PRODUCT_IMAGES.crossbodyStrap, newBadge: true },
  { name: "iPhone Air Case", price: "$49.00", src: PRODUCT_IMAGES.iphoneAirCase, newBadge: true },
  { name: "Apple Pencil Pro", price: "$129.00", src: PRODUCT_IMAGES.applePencilPro },
];

const IPAD_PRODUCTS: Product[] = [
  { name: "Magic Keyboard for iPad Air 13\" (M4) — Black", price: "$319.00", src: PRODUCT_IMAGES.magicKeyboardIpadAirBlack },
  { name: "Magic Keyboard for iPad Pro 11\" (M5) — White", price: "$299.00", src: PRODUCT_IMAGES.magicKeyboardIpadProWhite },
  { name: "Smart Folio for iPad Air 11\" (M4) — Sage", price: "$79.00", src: PRODUCT_IMAGES.smartFolioIpadAirSage },
  { name: "Apple Pencil Pro", price: "$129.00", src: PRODUCT_IMAGES.applePencilPro },
  { name: "Apple Pencil (USB-C)", price: "$79.00", src: PRODUCT_IMAGES.applePencilUsbC },
];

const MAC_PRODUCTS: Product[] = [
  { name: "Studio Display", price: "From $1,599.00", src: PRODUCT_IMAGES.studioDisplay, newBadge: true },
  { name: "Studio Display XDR", price: "From $3,299.00", src: PRODUCT_IMAGES.studioDisplayXDR, newBadge: true },
  { name: "Magic Keyboard with Touch ID and Numeric Keypad", price: "$199.00", src: PRODUCT_IMAGES.magicKeyboardTouchId },
  { name: "Magic Mouse", price: "$99.00", src: PRODUCT_IMAGES.magicMouse },
  { name: "40W Dynamic Power Adapter", price: "$39.00", src: PRODUCT_IMAGES.powerAdapter40W },
];

const WATCH_BANDS: Product[] = [
  { name: "Sport Loop (Pride Edition)", price: "$49.00", src: PRODUCT_IMAGES.sportLoopPride, newBadge: true },
  { name: "Sport Band", price: "$49.00", src: PRODUCT_IMAGES.sportBand },
  { name: "Milanese Loop", price: "$99.00", src: PRODUCT_IMAGES.milaneseLoop },
  { name: "Nike Sport Loop", price: "$49.00", src: PRODUCT_IMAGES.nikeSportLoop },
  { name: "Braided Solo Loop (Only at Apple)", price: "$99.00", src: PRODUCT_IMAGES.braidedSoloLoop },
];

const BENEFITS = [
  {
    title: "Fast delivery or pickup",
    body: "Two-hour delivery from an Apple Store, free standard delivery, or easy in-store pickup.",
    cta: "Learn more ›",
    icon: "truck" as const,
  },
  {
    title: "Free and easy returns",
    body: "Complete your return online or take it to any Apple Store. We make it simple.",
    cta: "Learn more ›",
    icon: "return" as const,
  },
  {
    title: "Shop with Apple Card",
    body: "Get 3% Daily Cash back when you shop at Apple with Apple Card.",
    cta: "Learn more ›",
    icon: "card" as const,
  },
];

function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <Link
      href="#"
      className={`group flex flex-col rounded-2xl bg-appleGray-100 p-6 hover-lift ${
        large ? "" : ""
      }`}
    >
      {product.newBadge && (
        <p className="text-[11px] font-semibold uppercase tracking-widest text-appleBlue">
          New
        </p>
      )}
      <div className={`flex items-center justify-center ${large ? "aspect-[4/3]" : "aspect-square"} mt-2 overflow-hidden rounded-xl bg-white p-4`}>
        <HotlinkImage
          src={product.src}
          fallback={img(400, 400, product.name.slice(0, 18), "light")}
          alt={product.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-appleGray-900">
        {product.name}
      </h3>
      <p className="mt-1 text-[15px] text-appleGray-700">{product.price}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm text-appleBlue group-hover:underline">
        Buy ›
      </span>
    </Link>
  );
}

function ProductRow({ products, title }: { products: Product[]; title: string }) {
  return (
    <section className="section-light py-12">
      <div className="mx-auto max-w-appleWide px-6">
        <div className="flex items-end justify-between gap-6 reveal">
          <h2 className="text-2xl font-semibold text-appleGray-900">{title}</h2>
          <Link href="#" className="hidden text-sm text-appleBlue hover:underline md:inline-block">
            Shop all ›
          </Link>
        </div>
        <div className="-mx-6 mt-6 overflow-x-auto px-6 pb-4 scroll-smooth">
          <ul className="flex min-w-max gap-4 snap-x">
            {products.map((p, i) => (
              <li
                key={p.name}
                className={`shrink-0 w-[260px] snap-start parallax-up delay-${(i % 4) + 1}`}
              >
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function AccessoriesPage() {
  return (
    <div className="bg-white">
      {/* Page title */}
      <section className="bg-appleGray-100 pt-16 pb-10">
        <div className="mx-auto max-w-appleWide px-6">
          <h1 className="headline-xl reveal">Accessories</h1>
          <p className="mt-4 text-lg text-appleGray-700 reveal delay-1">
            Find the perfect accessories for every Apple device.
          </p>
        </div>
      </section>

      {/* Shop by product category */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Shop by product.
          </h2>
          <div className="-mx-6 mt-8 overflow-x-auto px-6">
            <ul className="flex min-w-max gap-4">
              {CATEGORIES.map((c, i) => (
                <li
                  key={c.label}
                  className={`shrink-0 parallax-up delay-${(i % 4) + 1}`}
                >
                  <Link
                    href={c.href}
                    className="group flex w-[150px] flex-col items-center text-center"
                  >
                    <div className="flex h-[140px] w-[140px] items-center justify-center rounded-3xl bg-appleGray-100 transition-transform group-hover:scale-105">
                      <CategoryIcon icon={c.icon} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-appleGray-900">
                      {c.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* iPhone MagSafe banner */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-appleWide px-6">
          <Link href="#" className="block overflow-hidden rounded-3xl reveal hover-lift">
            <HotlinkImage
              src={BANNER_IMAGES.iphoneMagsafe}
              fallback={img(2880, 960, "iPhone MagSafe", "light")}
              alt="iPhone MagSafe accessories"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <ProductRow products={NEW_ARRIVALS} title="New arrivals." />

      {/* Shop by category chips */}
      <section className="bg-appleGray-100 py-12">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Shop by category.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 reveal delay-1">
            {FILTER_CHIPS.map((chip) => (
              <Link
                key={chip}
                href="#"
                className="rounded-full bg-white px-5 py-2.5 text-sm text-appleGray-900 hover:bg-appleGray-200 transition-colors"
              >
                {chip}
              </Link>
            ))}
            <Link
              href="#"
              className="rounded-full bg-appleGray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
            >
              Browse all ›
            </Link>
          </div>
        </div>
      </section>

      {/* iPad accessories row */}
      <ProductRow products={IPAD_PRODUCTS} title="iPad essentials." />

      {/* AirPods engraving banner */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-appleWide px-6">
          <Link href="#" className="block overflow-hidden rounded-3xl reveal hover-lift">
            <HotlinkImage
              src={BANNER_IMAGES.airpodsEngraving}
              fallback={img(2140, 462, "AirPods Engraving", "light")}
              alt="AirPods engraving"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* Mac accessories row */}
      <ProductRow products={MAC_PRODUCTS} title="Mac essentials." />

      {/* Mac cables banner */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-appleWide px-6 space-y-4">
          <Link href="#" className="block overflow-hidden rounded-3xl bg-appleGray-100 p-8 reveal hover-lift">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 mb-2">
              Thunderbolt 4 Pro Cable
            </p>
            <h3 className="text-2xl font-semibold mb-4">Thunderbolt 4 (USB-C) Pro Cable</h3>
            <HotlinkImage
              src={BANNER_IMAGES.macThunderbolt}
              fallback={img(1972, 116, "Thunderbolt cable", "light")}
              alt="Thunderbolt 4 cable"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
          <Link href="#" className="block overflow-hidden rounded-3xl bg-appleGray-100 p-8 reveal delay-1 hover-lift">
            <p className="text-sm font-semibold uppercase tracking-widest text-appleGray-500 mb-2">
              MagSafe 3 Cable
            </p>
            <h3 className="text-2xl font-semibold mb-4">USB-C to MagSafe 3 Cable (2 m)</h3>
            <HotlinkImage
              src={BANNER_IMAGES.macMagsafe}
              fallback={img(2304, 240, "MagSafe 3 cable", "light")}
              alt="MagSafe 3 cable"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* Watch bands row */}
      <ProductRow products={WATCH_BANDS} title="Apple Watch bands." />

      {/* HomePod mini banner */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-appleWide px-6">
          <Link href="#" className="block overflow-hidden rounded-3xl reveal hover-lift">
            <HotlinkImage
              src={BANNER_IMAGES.homepodMini}
              fallback={img(2140, 532, "HomePod mini", "light")}
              alt="HomePod mini"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* AppleCare+ banner */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-appleWide px-6">
          <Link href="#" className="block overflow-hidden rounded-3xl reveal hover-lift">
            <HotlinkImage
              src={BANNER_IMAGES.appleCarePlusMac}
              fallback={img(1220, 410, "AppleCare+ for Mac", "light")}
              alt="AppleCare+ for Mac"
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      {/* Find a product (tabbed browser) */}
      <AccessoryBrowser />

      {/* Benefits 3-up */}
      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className={`rounded-2xl bg-appleGray-100 p-8 hover-lift reveal delay-${i + 1}`}
              >
                <BenefitIcon icon={b.icon} />
                <h3 className="mt-4 text-lg font-semibold text-appleGray-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-appleGray-700">{b.body}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-sm text-appleBlue hover:underline"
                >
                  {b.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Icons --------------------------------- */

type CatIcon =
  | "mac"
  | "ipad"
  | "iphone"
  | "watch"
  | "vision"
  | "airpods"
  | "tv"
  | "beats";

function CategoryIcon({ icon }: { icon: CatIcon }) {
  const props = {
    width: 64,
    height: 64,
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-appleGray-900",
    "aria-hidden": true,
  };
  switch (icon) {
    case "mac":
      return (
        <svg {...props}>
          <rect x="8" y="14" width="48" height="30" rx="2" />
          <path d="M4 50h56l-3 4H7z" />
          <path d="M28 50h8v4h-8z" />
        </svg>
      );
    case "ipad":
      return (
        <svg {...props}>
          <rect x="14" y="6" width="36" height="52" rx="4" />
          <circle cx="32" cy="52" r="1" fill="currentColor" />
        </svg>
      );
    case "iphone":
      return (
        <svg {...props}>
          <rect x="20" y="6" width="24" height="52" rx="5" />
          <line x1="28" y1="11" x2="36" y2="11" />
          <circle cx="32" cy="52" r="1" fill="currentColor" />
        </svg>
      );
    case "watch":
      return (
        <svg {...props}>
          <path d="M24 6h16v8h-16z" />
          <path d="M24 50h16v8h-16z" />
          <rect x="18" y="14" width="28" height="36" rx="6" />
          <line x1="46" y1="26" x2="50" y2="26" />
        </svg>
      );
    case "vision":
      return (
        <svg {...props}>
          <path d="M4 28c10-12 22-12 28-12s18 0 28 12c-2 8-10 18-28 18S6 36 4 28z" />
          <circle cx="22" cy="32" r="4" />
          <circle cx="42" cy="32" r="4" />
        </svg>
      );
    case "airpods":
      return (
        <svg {...props}>
          <path d="M20 8c-4 0-8 4-8 12 0 8 4 12 8 12 2 0 4-1 4-3V11c0-2-2-3-4-3z" />
          <path d="M44 8c4 0 8 4 8 12 0 8-4 12-8 12-2 0-4-1-4-3V11c0-2 2-3 4-3z" />
          <line x1="24" y1="32" x2="24" y2="50" />
          <line x1="40" y1="32" x2="40" y2="50" />
        </svg>
      );
    case "tv":
      return (
        <svg {...props}>
          <rect x="14" y="10" width="36" height="34" rx="2" />
          <path d="M24 50h16" />
        </svg>
      );
    case "beats":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="12" />
        </svg>
      );
  }
}

type BIcon = "truck" | "return" | "card";

function BenefitIcon({ icon }: { icon: BIcon }) {
  const props = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className: "text-appleBlue",
    "aria-hidden": true,
  };
  switch (icon) {
    case "truck":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      );
    case "return":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      );
  }
}
