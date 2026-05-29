import Link from "next/link";
import { IMG } from "@/lib/img";

const STATS = [
  { k: "Up to 22 hours", v: "of battery life" },
  { k: "Up to 128GB", v: "of unified memory" },
  { k: "Up to 8TB", v: "of fast SSD storage" },
  { k: "Up to 40-core", v: "GPU on M3 Max" },
];

const SPECS = [
  { k: "Chip", v: "Apple M3, M3 Pro, or M3 Max" },
  { k: "Display", v: '14.2" or 16.2" Liquid Retina XDR display with ProMotion' },
  { k: "Memory", v: "Up to 128GB unified memory" },
  { k: "Storage", v: "Up to 8TB" },
  { k: "Battery", v: "Up to 22 hours of video playback" },
  { k: "Ports", v: "MagSafe 3, HDMI, SDXC, 3 × Thunderbolt 4, 3.5mm headphone jack" },
];

export default function MacBookProPage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 text-center">
        <div className="mx-auto max-w-appleWide px-6">
          <p className="text-sm uppercase tracking-widest opacity-80 reveal">MacBook Pro</p>
          <h1 className="mt-3 headline-xxl reveal delay-1">
            <span className="gradient-text">Mind-blowing.</span> Head-turning.
          </h1>
          <p className="mt-4 text-xl text-appleGray-300 reveal delay-2">
            Supercharged by M3, M3 Pro, and M3 Max.
          </p>
          <div className="mt-6 flex justify-center gap-4 reveal delay-2">
            <Link href="/shop/buy/macbook-pro" className="btn-pill btn-pill-primary">Buy</Link>
            <Link href="#specs" className="btn-link">See tech specs</Link>
          </div>
          <img
            src="https://www.apple.com/v/macbook-pro/ax/images/overview/welcome/hero_endframe__fwev9ebh42mq_xlarge.jpg"
            alt="MacBook Pro"
            className="mx-auto mt-12 max-h-[600px] rounded-2xl parallax-up"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.k}
                className={`rounded-2xl bg-appleGray-900 p-8 text-center reveal delay-${(i % 4) + 1}`}
              >
                <p className="text-3xl font-semibold gradient-text">{s.k}</p>
                <p className="mt-2 text-appleGray-300">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-apple px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">M3 Max</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            <span className="gradient-text">The most advanced chip</span> for a personal computer.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-appleGray-300 reveal delay-2">
            With up to 40 GPU cores, hardware-accelerated ray tracing, and a media engine
            built to chew through ProRes, M3 Max takes performance to extreme new heights.
          </p>
        </div>
      </section>

      <section id="specs" className="section-light py-24">
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

      <section className="section-light pb-24 text-center">
        <h3 className="headline-lg reveal">Make it yours.</h3>
        <div className="mt-6 flex justify-center gap-4 reveal delay-1">
          <Link href="/shop/buy/macbook-pro" className="btn-pill btn-pill-primary">Buy MacBook Pro</Link>
          <Link href="/mac" className="btn-pill btn-pill-ghost">Compare all Mac</Link>
        </div>
      </section>
    </div>
  );
}
