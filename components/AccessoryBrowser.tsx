"use client";

import Link from "next/link";
import { useState } from "react";
import HotlinkImage from "./HotlinkImage";

const CDN = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is";

// Reuse a few real apple.com Store CDN product images for the browser tiles.
const TILE_IMG = {
  iphoneCase: `${CDN}/MGF44?wid=532&hei=582&fmt=png-alpha&.v=U2pkbzQ0MHdwUU54RGE3Ynp2ajY0QUhqc0NvK2RZTVd5TWVhUDFuQlo0MEVMWC9xbVh4KzA2U0tUUXprZWhodmlPT2h0WHpsRlBNRE91R0xWOHdsTGc`,
  applePencil: `${CDN}/MX2D3?wid=532&hei=582&fmt=png-alpha&.v=YVo4RFdhVU5yOEtndnBqTVBDZytYQUhqc0NvK2RZTVd5TWVhUDFuQlo0MlVSVEd3WGxyWkRkbCttOFdLT3Y0VUdXQ1pIVUZFeHUrOEx0QnlPY1lrdWc`,
  magicMouse: `${CDN}/MXK63?wid=532&hei=582&fmt=png-alpha&.v=QnNzVEw4ZWFrcDAyd0dVR2h6eGpMUUhqc0NvK2RZTVd5TWVhUDFuQlo0MFgyc213MCtPWGVtdXJJZ0RZeUVsYTAyRDl6R2VMekg2TUo4L1RVSE5EZ2c`,
  magicKeyboardMac: `${CDN}/MXK83?wid=532&hei=582&fmt=png-alpha&.v=eFlJa0thaHg0Zk5Uc3lIcElEZThBZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MWlQcU93cWwvb0J4b2lHc01aQ3FTRmpTVDErb2pvVFNyNGl4TzdpOGhXQnc`,
  sportLoopPride: `${CDN}/MJ5C4_FV401?wid=1420&hei=930&fmt=png-alpha&.v=NXVDTHJVenFsZTJpUFFKMzI4cVRwRUJTMHZrdGM3YVhOamhhQWtVbXVxSEhxZjQyanFrTDN5a241WlpqRHdlVHNEeTNpVDdUQU16MlRpT3dBQ3U4L3c`,
  milaneseLoop: `${CDN}/MGJ44ref_FV401?wid=532&hei=582&fmt=png-alpha&.v=azFJTFNCR0xtc09ReHZYa1RNeEZVZjFsZmNiME9WSGpaazRyMjZBZXNDYlRmMUFhaXkzWVI4b3hpbGUzQlh3YVpxZTBKWGNjQkI0NTVJVTA1UlpiNGc`,
  powerAdapter: `${CDN}/MGKN4?wid=532&hei=582&fmt=png-alpha&.v=T0lOcnNHdkZoVHZXUE1wQk9tZ1A4d0hqc0NvK2RZTVd5TWVhUDFuQlo0M0NzdzNDT1N4VEJGYnliSWtxOW1wYWxkajZ1cGQ5WVZidWhPak1Ga21BOGc`,
  airpodsProHero:
    "https://www.apple.com/v/airpods/ae/images/overview/hero_endframe__calpooy4ucr6_large.jpg",
  visionProHero:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3DxBo99HJvxybARA2JFX2iglDJU/hf_20260528_204552_15903848-b3ee-451d-a25a-f0f3da32b54d.png",
  homepodMiniBanner: `${CDN}/homepod-mini-accessories-202110?wid=2140&hei=532&fmt=jpeg&qlt=90&.v=aE9lTjA3MVZ1TzRkdVVQVW5JOHBJdVFPK3JlTEtyd0VIWFFDYmN6Rm16ZVhsTitNWlY2Z050L3A0WDFSNUY0QWJGcXNRQnFCV0w3WVRjTExvdm1ic2FWOE5SM2k4dGZwUXpkRE5DVlZVTVVVRk5BYjU4dkMrYjBKSjFqVXFOVGg`,
  crossbodyStrap: `${CDN}/MHYX4?wid=532&hei=582&fmt=png-alpha&.v=dEtBeEVIaTMzc3hFNmQ5aEpmTloxZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MDZLa0ZhcGhyM3hZZHkxT051RDA2d21kT1hCTDRBV1Z2MHFvcUcvQkFCM0E`,
};

type TabKey = "product" | "category";

interface Tile {
  name: string;
  count: string;
  bg: string;
  dark?: boolean;
  image: string;
}

const BY_PRODUCT: Tile[] = [
  { name: "Mac Accessories", count: "210+", bg: "#e8e2f4", image: TILE_IMG.magicMouse },
  { name: "iPad Accessories", count: "180+", bg: "#d6f0ff", image: TILE_IMG.applePencil },
  { name: "iPhone Accessories", count: "260+", bg: "#ffe3d6", image: TILE_IMG.iphoneCase },
  { name: "Apple Watch Bands", count: "120+", bg: "#d4f0d6", image: TILE_IMG.milaneseLoop },
  { name: "AirPods Accessories", count: "60+", bg: "#f7e8cf", image: TILE_IMG.airpodsProHero },
  { name: "Vision Pro Accessories", count: "20+", bg: "#1d1d1f", dark: true, image: TILE_IMG.visionProHero },
];

const BY_CATEGORY: Tile[] = [
  { name: "Cases & Protection", count: "320+", bg: "#ffe3d6", image: TILE_IMG.iphoneCase },
  { name: "Charging Essentials", count: "150+", bg: "#d6f0ff", image: TILE_IMG.powerAdapter },
  { name: "Headphones & Speakers", count: "90+", bg: "#1d1d1f", dark: true, image: TILE_IMG.airpodsProHero },
  { name: "Photography", count: "65+", bg: "#f7e8cf", image: TILE_IMG.crossbodyStrap },
  { name: "MagSafe", count: "85+", bg: "#e892b5", image: TILE_IMG.iphoneCase },
  { name: "Smart Home", count: "70+", bg: "#d4f0d6", image: TILE_IMG.homepodMiniBanner },
  { name: "Mice & Keyboards", count: "45+", bg: "#e8e2f4", image: TILE_IMG.magicKeyboardMac },
  { name: "Storage", count: "55+", bg: "#bce4ff", image: TILE_IMG.powerAdapter },
];

export default function AccessoryBrowser() {
  const [tab, setTab] = useState<TabKey>("product");
  const items = tab === "product" ? BY_PRODUCT : BY_CATEGORY;

  return (
    <section className="section-light py-16">
      <div className="mx-auto max-w-appleWide px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-appleGray-900 reveal">
            Find a product.
          </h2>
          <div className="flex gap-2 rounded-full bg-appleGray-100 p-1">
            <button
              type="button"
              onClick={() => setTab("product")}
              aria-pressed={tab === "product" ? "true" : "false"}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "product"
                  ? "bg-appleGray-900 text-white"
                  : "text-appleGray-900 hover:bg-appleGray-200"
              }`}
            >
              Browse by Product
            </button>
            <button
              type="button"
              onClick={() => setTab("category")}
              aria-pressed={tab === "category" ? "true" : "false"}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === "category"
                  ? "bg-appleGray-900 text-white"
                  : "text-appleGray-900 hover:bg-appleGray-200"
              }`}
            >
              Browse by Category
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <Link
              key={item.name}
              href="#"
              className={`group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl p-6 hover-lift parallax-up delay-${(i % 4) + 1}`}
              style={{ backgroundColor: item.bg }}
            >
              {/* Product image — centered, scales on hover */}
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6">
                <HotlinkImage
                  src={item.image}
                  fallback={item.image}
                  alt={item.name}
                  className="h-[60%] w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text content on top of the image */}
              <div className={`relative z-10 ${item.dark ? "text-white" : "text-appleGray-900"}`}>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  {item.count} items
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight">
                  {item.name}
                </h3>
              </div>
              <span
                className={`relative z-10 inline-flex items-center gap-1 text-sm font-medium ${
                  item.dark ? "text-white" : "text-appleGray-900"
                }`}
              >
                Shop now ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
