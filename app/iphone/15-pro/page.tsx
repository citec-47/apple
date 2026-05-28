import Link from "next/link";
import { IMG } from "@/lib/img";

const SPECS = [
  { k: "Display", v: '6.1" or 6.7" Super Retina XDR display with ProMotion' },
  { k: "Chip", v: "A17 Pro chip — built on 3nm, 6-core GPU" },
  { k: "Camera", v: "48MP Main, 12MP Ultra Wide, 12MP Telephoto with 3x or 5x zoom" },
  { k: "Build", v: "Aerospace-grade titanium with textured matte glass" },
  { k: "Battery", v: "Up to 29 hours of video playback" },
  { k: "Connector", v: "USB-C with USB 3 (up to 10Gb/s)" },
];

const COLORS = [
  { name: "Natural Titanium", hex: "#9a8e7d" },
  { name: "Blue Titanium", hex: "#3a4d5d" },
  { name: "White Titanium", hex: "#e3e3e3" },
  { name: "Black Titanium", hex: "#2d2c2b" },
];

export default function IPhone15Pro() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80 reveal">iPhone 15 Pro</p>
          <h1 className="mt-3 headline-xxl reveal delay-1">
            <span className="gradient-text">Titanium.</span> So strong. So light. So Pro.
          </h1>
          <div className="mt-6 flex justify-center gap-4 reveal delay-2">
            <button className="btn-pill btn-pill-primary">Buy</button>
            <Link href="#design" className="btn-link">Watch the film</Link>
          </div>
          <img
            src={IMG.iphone15ProHero}
            alt="iPhone 15 Pro in Natural Titanium"
            className="mx-auto mt-12 max-h-[640px] rounded-2xl parallax-up"
          />
        </div>
      </section>

      {/* Design */}
      <section id="design" className="section-dark py-24">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">Design</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            Forged in titanium. Engineered to handle the day.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-appleGray-300 reveal delay-2">
            iPhone 15 Pro features a strong and light aerospace-grade titanium design
            with a textured matte glass back. It also features a Ceramic Shield front
            that's tougher than any smartphone glass.
          </p>
        </div>
      </section>

      {/* Color picker */}
      <section className="section-dark py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h3 className="headline-lg reveal">Pick your hue.</h3>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 reveal delay-1">
            {COLORS.map((c) => (
              <div key={c.name} className="text-center">
                <span
                  className="mx-auto block h-14 w-14 rounded-full ring-2 ring-white/20 hover:ring-white/60 hover-lift"
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
                <p className="mt-3 text-sm text-appleGray-300">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chip */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">A17 Pro chip</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            <span className="gradient-text">A monster win for gaming.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-appleGray-300 reveal delay-2">
            A17 Pro is an entirely new class of iPhone chip. The all-new pro-class GPU is
            up to 20% faster and unlocks new experiences with hardware-accelerated ray
            tracing.
          </p>
        </div>
      </section>

      {/* Specs */}
      <section className="section-light py-24">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Tech specs.</h2>
          <dl className="mx-auto mt-12 max-w-3xl divide-y divide-appleGray-200">
            {SPECS.map((s, i) => (
              <div
                key={s.k}
                className={`grid grid-cols-1 gap-2 py-5 md:grid-cols-3 reveal delay-${(i % 4) + 1}`}
              >
                <dt className="text-sm font-semibold text-appleGray-500">{s.k}</dt>
                <dd className="md:col-span-2 text-appleGray-900">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-light pb-24">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h3 className="headline-lg reveal">Ready to upgrade?</h3>
          <div className="mt-6 flex justify-center gap-4 reveal delay-1">
            <button className="btn-pill btn-pill-primary">Buy iPhone 15 Pro</button>
            <Link href="/iphone" className="btn-pill btn-pill-ghost">
              Compare all iPhone
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
