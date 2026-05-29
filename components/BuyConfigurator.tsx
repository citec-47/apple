"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HotlinkImage from "./HotlinkImage";
import { addToCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { Product, ProductOptionChoice } from "@/db/schema";

type ProductOptions = NonNullable<Product["options"]>;
type OptionKey = keyof ProductOptions;

const OPTION_LABELS: Record<string, string> = {
  chip: "Chip",
  memory: "Memory",
  storage: "Storage",
  color: "Color",
  size: "Size",
  band: "Band",
  applecare: "AppleCare+ coverage",
};

const OPTION_ORDER: OptionKey[] = ["chip", "memory", "storage", "size", "color", "band", "applecare"];

interface Props {
  product: Product;
}

export default function BuyConfigurator({ product }: Props) {
  const router = useRouter();
  const optionGroups = useMemo(() => {
    const opts = (product.options ?? {}) as ProductOptions;
    return OPTION_ORDER
      .filter((k) => Array.isArray(opts[k]) && opts[k]!.length > 0)
      .map((k) => ({ key: k, choices: opts[k]! }));
  }, [product.options]);

  const [selection, setSelection] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    optionGroups.forEach((g) => {
      initial[g.key] = 0;
    });
    return initial;
  });

  const total = useMemo(() => {
    let cents = product.basePriceCents;
    for (const g of optionGroups) {
      const idx = selection[g.key] ?? 0;
      cents += g.choices[idx]?.priceDeltaCents ?? 0;
    }
    return cents;
  }, [product.basePriceCents, optionGroups, selection]);

  const monthly = Math.round((total / 100) / 12);

  const buildConfiguration = (): Record<string, string> => {
    const config: Record<string, string> = {};
    for (const g of optionGroups) {
      const choice = g.choices[selection[g.key] ?? 0];
      if (choice) config[g.key] = choice.label;
    }
    return config;
  };

  const handleAddToCart = () => {
    addToCart({
      productSlug: product.slug,
      productName: product.name,
      heroImage: product.heroImage,
      configuration: buildConfiguration(),
      unitPriceCents: total,
      quantity: 1,
    });
    router.push("/cart");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-appleWide px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left — sticky product preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold text-appleGray-500">{product.name}</p>
            <h1 className="mt-2 text-3xl font-semibold text-appleGray-900 md:text-4xl">
              Customize your {product.name}.
            </h1>
            {product.tagline && (
              <p className="mt-3 text-appleGray-700">{product.tagline}</p>
            )}
            <div className="mt-8 overflow-hidden rounded-2xl bg-appleGray-100 p-8">
              <HotlinkImage
                src={product.heroImage ?? ""}
                fallback={product.heroImage ?? ""}
                alt={product.name}
                className="mx-auto w-full max-w-md object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* Right — option groups */}
          <div className="space-y-10">
            {optionGroups.map((group) => (
              <OptionGroup
                key={group.key}
                title={OPTION_LABELS[group.key] ?? group.key}
                choices={group.choices}
                selectedIndex={selection[group.key] ?? 0}
                basePriceCents={product.basePriceCents}
                onSelect={(idx) =>
                  setSelection((s) => ({ ...s, [group.key]: idx }))
                }
                isColor={group.key === "color"}
              />
            ))}
          </div>
        </div>

        {/* Sticky summary footer */}
        <div className="sticky bottom-0 -mx-6 mt-12 border-t border-appleGray-200 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-appleWide flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-appleGray-500">
                Your total
              </p>
              <p className="text-2xl font-semibold text-appleGray-900">{formatMoney(total)}</p>
              <p className="text-xs text-appleGray-700">
                or ${monthly}/mo. for 12 mo. interest-free with Apple Card◊
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-appleBlue px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#0077ed]"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({
  title,
  choices,
  selectedIndex,
  onSelect,
  isColor,
}: {
  title: string;
  choices: ProductOptionChoice[];
  selectedIndex: number;
  basePriceCents: number;
  onSelect: (i: number) => void;
  isColor?: boolean;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-appleGray-900">{title}</h2>

      {isColor ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {choices.map((c, i) => {
            const selected = i === selectedIndex;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={selected ? "true" : "false"}
                title={c.label}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all ${
                  selected
                    ? "border-appleBlue bg-appleBlue/5"
                    : "border-appleGray-200 hover:border-appleGray-300"
                }`}
              >
                <span
                  className="block h-8 w-8 rounded-full ring-1 ring-appleGray-300"
                  style={{ backgroundColor: c.swatch ?? "#c8c9cc" }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-appleGray-900">{c.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {choices.map((c, i) => {
            const selected = i === selectedIndex;
            const delta = c.priceDeltaCents ?? 0;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={selected ? "true" : "false"}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 p-5 text-left transition-all ${
                    selected
                      ? "border-appleBlue bg-appleBlue/5"
                      : "border-appleGray-200 hover:border-appleGray-300"
                  }`}
                >
                  <span className="text-sm font-medium text-appleGray-900">{c.label}</span>
                  <span className="text-sm text-appleGray-700">
                    {delta > 0 ? `+${formatMoney(delta)}` : "Included"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
