import Link from "next/link";
import { IMG } from "@/lib/img";

const MODELS = [
  {
    name: "AirPods Pro 2",
    tagline: "Adaptive Audio. Now playing.",
    sub: "$249",
    img: IMG.airpodsPro2,
  },
  {
    name: "AirPods (3rd generation)",
    tagline: "Spatial sound. Smarter design.",
    sub: "$179",
    img: IMG.airpods3,
  },
  {
    name: "AirPods (2nd generation)",
    tagline: "An iconic combination.",
    sub: "$129",
    img: IMG.airpods2,
  },
  {
    name: "AirPods Max",
    tagline: "Computational audio. Listen, it's powerful.",
    sub: "$549",
    img: IMG.airpodsMax,
  },
];

const FEATURES = [
  { t: "Adaptive Audio", d: "Dynamically blends Transparency and Active Noise Cancellation." },
  { t: "Personalized Spatial Audio", d: "An immersive listening experience built just for you." },
  { t: "Conversation Awareness", d: "Lower volume and enhance voices when you start speaking." },
];

export default function AirPodsPage() {
  return (
    <div className="bg-white">
      <section className="bg-appleGray-100 pt-16 pb-12 text-center">
        <h1 className="headline-xxl reveal">AirPods</h1>
        <p className="mt-4 text-xl text-appleGray-700 reveal delay-1">
          Personalized listening. Magical experience.
        </p>
      </section>

      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">AirPods Pro 2</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            <span className="gradient-text">Adaptive Audio.</span> Now playing.
          </h2>
          <img
            src={IMG.airpodsProHero}
            alt="AirPods Pro 2"
            className="mx-auto mt-10 max-h-[480px] rounded-2xl parallax-up"
          />
        </div>
      </section>

      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Pick your perfect AirPods.</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {MODELS.map((m, i) => (
              <div
                key={m.name}
                className={`rounded-2xl bg-white p-6 text-center hover-lift parallax-up delay-${(i % 4) + 1}`}
              >
                <img src={m.img} alt={m.name} className="mx-auto h-44 w-auto object-contain" />
                <p className="mt-4 text-base font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-appleGray-500">{m.tagline}</p>
                <p className="mt-4 text-sm text-appleGray-700">{m.sub}</p>
                <Link href="#" className="mt-3 inline-block text-sm text-appleBlue hover:underline">
                  Buy ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.t}
                className={`rounded-2xl bg-appleGray-100 p-10 reveal delay-${i + 1}`}
              >
                <p className="text-xl font-semibold">{f.t}</p>
                <p className="mt-3 text-appleGray-700">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
