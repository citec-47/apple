import Link from "next/link";
import { IMG } from "@/lib/img";

const SHOWS = [
  { title: "Ted Lasso", img: IMG.showTedLasso },
  { title: "Severance", img: IMG.showSeverance },
  { title: "Foundation", img: IMG.showFoundation },
  { title: "The Morning Show", img: IMG.showMorningShow },
];

const DEVICES = [
  { name: "Apple TV 4K", sub: "From $129", img: IMG.appleTV },
  { name: "HomePod", sub: "$299", img: IMG.homepod },
];

export default function TVPage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 text-center">
        <div className="mx-auto max-w-appleWide px-6">
          <p className="text-sm uppercase tracking-widest opacity-80 reveal">Apple TV+</p>
          <h1 className="mt-3 headline-xxl reveal delay-1">
            <span className="gradient-text">Original stories</span> from the world's greatest storytellers.
          </h1>
          <div className="mt-6 flex justify-center gap-4 reveal delay-2">
            <button className="btn-pill btn-pill-primary">Stream now</button>
            <button className="btn-pill btn-pill-ghost">7 days free, then $9.99/mo</button>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-appleWide px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SHOWS.map((s, i) => (
              <div
                key={s.title}
                className={`aspect-video overflow-hidden rounded-xl bg-appleGray-900 parallax-up delay-${(i % 4) + 1}`}
              >
                <img src={s.img} alt={s.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="mx-auto max-w-appleWide px-6 text-center">
          <h2 className="headline-lg reveal">Bring the cinema home.</h2>
          <p className="mt-4 text-appleGray-700 reveal delay-1">
            Stream from the Apple TV app on Apple TV 4K, HomePod, and more.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {DEVICES.map((d, i) => (
              <div
                key={d.name}
                className={`rounded-2xl bg-appleGray-100 p-10 text-center hover-lift parallax-up delay-${i + 1}`}
              >
                <img src={d.img} alt={d.name} className="mx-auto h-60 w-auto object-contain" />
                <p className="mt-4 text-xl font-semibold">{d.name}</p>
                <p className="mt-2 text-appleGray-700">{d.sub}</p>
                <Link href="#" className="mt-4 inline-block text-sm text-appleBlue hover:underline">
                  Learn more ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
