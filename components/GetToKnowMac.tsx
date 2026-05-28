"use client";

import { useEffect, useState } from "react";
import HotlinkImage from "./HotlinkImage";

export interface DetailImage {
  src: string;
  fallback: string;
  alt: string;
}
export interface DetailBlock {
  heading: string;
  body: string;
  image?: DetailImage;
}
export interface Topic {
  title: string;
  sub: string;
  bg: string;
  src: string;
  fallback: string;
  blocks: DetailBlock[];
}

interface Props {
  topics: Topic[];
}

export default function GetToKnowMac({ topics }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  const active = openIndex !== null ? topics[openIndex] : null;

  return (
    <section className="section-light py-24">
      <div className="mx-auto max-w-appleWide px-6">
        <h2 className="headline-lg reveal">Get to know Mac.</h2>

        <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-4">
          <ul className="flex min-w-max gap-5 snap-x">
            {topics.map((t, i) => (
              <li
                key={t.title}
                className={`snap-start shrink-0 w-[280px] md:w-[320px] parallax-up delay-${(i % 4) + 1}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Expand ${t.title}. ${t.sub}`}
                  className="group relative block w-full aspect-[3/4] overflow-hidden rounded-3xl text-left"
                  style={{ backgroundColor: t.bg }}
                >
                  <HotlinkImage
                    src={t.src}
                    fallback={t.fallback}
                    alt={t.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
                  <div className="absolute left-6 right-6 top-6 text-white">
                    <p className="text-[13px] font-semibold leading-tight">{t.title}</p>
                    <p className="mt-1 text-[22px] font-semibold leading-tight">{t.sub}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-appleGray-900 shadow-sm transition group-hover:bg-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="get-to-know-modal-title"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm md:p-8"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative my-4 w-full max-w-3xl rounded-3xl bg-white shadow-2xl md:my-10 menu-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-appleGray-200 text-appleGray-700 transition-colors hover:bg-appleGray-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <div className="px-6 pt-12 pb-10 md:px-12 md:pt-14 md:pb-14">
              <p className="text-[13px] font-semibold text-appleGray-900">{active.title}</p>
              <h2
                id="get-to-know-modal-title"
                className="mt-1 text-3xl font-semibold leading-tight text-appleGray-900 md:text-4xl"
              >
                {active.sub}
              </h2>

              <div className="mt-10 space-y-6">
                {active.blocks.map((block, i) => (
                  <article
                    key={`${block.heading}-${i}`}
                    className="rounded-2xl bg-appleGray-100 p-6 md:p-7"
                  >
                    <p className="text-[15px] leading-relaxed">
                      <span className="font-semibold text-appleGray-900">
                        {block.heading}{" "}
                      </span>
                      <span className="text-appleGray-700">{block.body}</span>
                    </p>
                    {block.image && (
                      <div className="mt-5 overflow-hidden rounded-xl">
                        <HotlinkImage
                          src={block.image.src}
                          fallback={block.image.fallback}
                          alt={block.image.alt}
                          className="block w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
