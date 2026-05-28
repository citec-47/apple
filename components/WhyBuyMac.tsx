"use client";

import { useEffect, useRef, useState } from "react";
import HotlinkImage from "./HotlinkImage";

export interface WhyBuyBlock {
  heading: string;
  body: string;
}
export interface WhyBuyItem {
  eyebrow: string;
  headline: string;
  description: string;
  src: string;
  fallback: string;
  blocks: WhyBuyBlock[];
}

interface Props {
  items: WhyBuyItem[];
}

export default function WhyBuyMac({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  const scrollBy = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div ref={scrollerRef} className="-mx-6 overflow-x-auto px-6 pb-4 snap-x scroll-smooth">
        <ul className="flex min-w-max gap-4">
          {items.map((item, i) => (
            <li key={item.eyebrow} className="snap-start">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Expand ${item.eyebrow}: ${item.headline}`}
                className="group relative flex aspect-[3/4] w-[260px] flex-col rounded-2xl bg-white p-6 text-left hover-lift md:w-[280px]"
              >
                <p className="text-[12px] font-medium text-appleGray-700">{item.eyebrow}</p>
                <h3 className="mt-2 text-xl font-semibold leading-tight text-appleGray-900">
                  {item.headline}
                </h3>
                <p className="mt-2 text-[13px] leading-snug text-appleGray-700">
                  {item.description}
                </p>
                <div className="mt-auto flex items-end justify-center pt-6">
                  <HotlinkImage
                    src={item.src}
                    fallback={item.fallback}
                    alt={item.headline}
                    className="max-h-[170px] w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-appleGray-900 text-white transition-colors group-hover:bg-black"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-320)}
          aria-label="Scroll left"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-appleGray-200 text-appleGray-900 transition-colors hover:bg-appleGray-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(320)}
          aria-label="Scroll right"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-appleGray-200 text-appleGray-900 transition-colors hover:bg-appleGray-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="why-buy-modal-title"
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
              <p className="text-[13px] font-semibold text-appleGray-700">{active.eyebrow}</p>
              <h2
                id="why-buy-modal-title"
                className="mt-1 text-3xl font-semibold leading-tight text-appleGray-900 md:text-4xl"
              >
                {active.headline}
              </h2>
              <p className="mt-3 text-base text-appleGray-700">{active.description}</p>

              <div className="mt-8 flex items-center justify-center rounded-xl bg-appleGray-100 p-8">
                <HotlinkImage
                  src={active.src}
                  fallback={active.fallback}
                  alt={active.headline}
                  className="max-h-[240px] w-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-8 space-y-4">
                {active.blocks.map((block, i) => (
                  <article
                    key={`${block.heading}-${i}`}
                    className="rounded-2xl bg-appleGray-100 p-6"
                  >
                    <p className="text-[15px] leading-relaxed">
                      <span className="font-semibold text-appleGray-900">
                        {block.heading}{" "}
                      </span>
                      <span className="text-appleGray-700">{block.body}</span>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
