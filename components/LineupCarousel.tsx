"use client";

import { useRef } from "react";
import Link from "next/link";
import HotlinkImage from "./HotlinkImage";

export interface LineupModel {
  id: string;
  name: string;
  tagline: string;
  isNew?: boolean;
  colors: string[];
  src: string;
  fallback: string;
  href: string;
  price: string;
  monthly: string;
}

interface Props {
  models: LineupModel[];
}

export default function LineupCarousel({ models }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="-mx-6 overflow-x-auto px-6 pb-4 snap-x scroll-smooth"
      >
        <ul className="flex min-w-max gap-4">
          {models.map((m) => (
            <li key={m.id} className="snap-start">
              <article className="flex h-full w-[260px] md:w-[280px] flex-col rounded-2xl bg-white p-6 hover-lift">
                {m.isNew && (
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-appleBlue">
                    New
                  </p>
                )}
                <div className="mt-3 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-appleGray-100">
                  <HotlinkImage
                    src={m.src}
                    fallback={m.fallback}
                    alt={m.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-grow flex-col">
                  <h3 className="text-base font-semibold leading-tight text-appleGray-900">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-appleGray-700">
                    {m.tagline}
                  </p>
                  {m.colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      {m.colors.map((c, i) => (
                        <span
                          key={`${m.id}-color-${i}`}
                          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-appleGray-300"
                          style={{ backgroundColor: c }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-sm font-semibold text-appleGray-900">{m.price}</p>
                  <p className="text-[12px] text-appleGray-700">{m.monthly}</p>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href={m.href}
                    className="inline-flex items-center justify-center rounded-full bg-appleBlue px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0077ed]"
                  >
                    Learn more
                  </Link>
                  <Link href={m.href} className="text-xs text-appleBlue hover:underline">
                    Buy ›
                  </Link>
                </div>
              </article>
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
    </div>
  );
}
