import Link from "next/link";
import { IMG } from "@/lib/img";

const MODELS = [
  {
    name: "iPad Pro",
    tagline: "Supercharged by M2.",
    sub: "From $799",
    img: IMG.ipadPro,
  },
  {
    name: "iPad Air",
    tagline: "Serious power. Serious fun.",
    sub: "From $599",
    img: IMG.ipadAir,
  },
  {
    name: "iPad",
    tagline: "Lovable. Drawable. Magical.",
    sub: "From $449",
    img: IMG.ipad,
  },
  {
    name: "iPad mini",
    tagline: "Mega power. Mini sized.",
    sub: "From $499",
    img: IMG.ipadMini,
  },
];

const ACCESSORIES = [
  { name: "Apple Pencil", desc: "The other half of iPad." },
  { name: "Magic Keyboard", desc: "Type at home. Or anywhere." },
  { name: "Smart Folio", desc: "Protects front and back." },
];

export default function IPadPage() {
  return (
    <div className="bg-white">
      <section className="bg-appleGray-100 pt-16 pb-12 text-center">
        <h1 className="headline-xxl reveal">iPad</h1>
        <p className="mt-4 text-xl text-appleGray-700 reveal delay-1">
          Lovable. Drawable. Magical.
        </p>
      </section>

      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-appleGray-500 reveal">iPad Pro</p>
          <h2 className="mt-3 headline-xl reveal delay-1">
            <span className="gradient-text">Supercharged.</span> By M2.
          </h2>
          <div className="mt-6 flex justify-center gap-4 reveal delay-2">
            <button className="btn-pill btn-pill-primary">Learn more</button>
            <button className="btn-pill btn-pill-ghost">Buy</button>
          </div>
          <img
            src={IMG.ipadProHero}
            alt="iPad Pro"
            className="mx-auto mt-12 max-h-[520px] rounded-2xl parallax-up"
          />
        </div>
      </section>

      <section className="section-gray py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Get to know iPad.</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {MODELS.map((m, i) => (
              <div
                key={m.name}
                className={`rounded-2xl bg-white p-6 text-center hover-lift parallax-up delay-${i + 1}`}
              >
                <img src={m.img} alt={m.name} className="mx-auto h-44 w-auto object-contain" />
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

      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6">
          <h2 className="headline-lg text-center reveal">Take note of these accessories.</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ACCESSORIES.map((a, i) => (
              <div
                key={a.name}
                className={`rounded-2xl bg-appleGray-100 p-10 text-center reveal delay-${i + 1}`}
              >
                <p className="text-xl font-semibold">{a.name}</p>
                <p className="mt-2 text-appleGray-700">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
