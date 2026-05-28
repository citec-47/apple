import Link from "next/link";
import { IMG } from "@/lib/img";

const MODELS = [
  {
    name: "Apple Watch Ultra 2",
    tagline: "Next-level adventure.",
    sub: "From $799",
    img: IMG.watchUltra,
  },
  {
    name: "Apple Watch Series 9",
    tagline: "Smarter. Brighter. Mightier.",
    sub: "From $399",
    img: IMG.watchSeries9,
  },
  {
    name: "Apple Watch SE",
    tagline: "A great deal to love.",
    sub: "From $249",
    img: IMG.watchSE,
  },
];

const FEATURES = [
  { t: "Health", d: "Mindfulness, Sleep tracking, ECG, and more." },
  { t: "Fitness", d: "Track workouts and progress with Activity rings." },
  { t: "Connectivity", d: "Stay in touch from your wrist, even without iPhone." },
  { t: "Safety", d: "Crash Detection, Fall Detection, and Emergency SOS." },
];

export default function WatchPage() {
  return (
    <div className="bg-white">
      <section className="bg-appleGray-100 pt-16 pb-12 text-center">
        <h1 className="headline-xxl reveal">Apple Watch</h1>
        <p className="mt-4 text-xl text-appleGray-700 reveal delay-1">
          Smarter. Brighter. Mightier.
        </p>
        <div className="mt-6 flex justify-center gap-4 reveal delay-2">
          <Link href="#models" className="btn-pill btn-pill-primary">Shop Apple Watch</Link>
          <Link href="#" className="btn-link">Compare all models</Link>
        </div>
      </section>

      <section className="section-dark py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-sm uppercase tracking-widest opacity-80 reveal">Apple Watch Ultra 2</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            <span className="gradient-text">Next-level</span> adventure.
          </h2>
          <img
            src={IMG.watchUltraHero}
            alt="Apple Watch Ultra 2"
            className="mx-auto mt-10 max-h-[520px] rounded-2xl parallax-up"
          />
        </div>
      </section>

      <section id="models" className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Find your fit.</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MODELS.map((m, i) => (
              <div
                key={m.name}
                className={`rounded-2xl bg-appleGray-100 p-8 text-center hover-lift parallax-up delay-${i + 1}`}
              >
                <img src={m.img} alt={m.name} className="mx-auto h-56 w-auto object-contain" />
                <p className="mt-4 text-lg font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-appleGray-500">{m.tagline}</p>
                <p className="mt-4 text-sm text-appleGray-700">{m.sub}</p>
                <Link href="#" className="mt-3 inline-block text-sm text-appleBlue hover:underline">
                  Learn more ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Engineered for your wellbeing.</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.t}
                className={`rounded-2xl bg-white p-8 reveal delay-${i + 1}`}
              >
                <p className="text-lg font-semibold">{f.t}</p>
                <p className="mt-2 text-sm text-appleGray-700">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
