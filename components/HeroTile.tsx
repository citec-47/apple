import Link from "next/link";

type Theme = "light" | "dark";
type Size = "full" | "half";

interface HeroTileProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  bgClass?: string;
  bgImage?: string;
  theme?: Theme;
  size?: Size;
  ctaLearn?: string;
  ctaBuy?: string;
  align?: "top" | "bottom";
}

export default function HeroTile({
  eyebrow,
  title,
  subtitle,
  href = "#",
  bgClass = "bg-appleGray-100",
  bgImage,
  theme = "light",
  size = "full",
  ctaLearn = "Learn more",
  ctaBuy = "Buy",
  align = "top",
}: HeroTileProps) {
  const dark = theme === "dark";
  return (
    <article
      className={`relative overflow-hidden rounded-none ${bgClass} ${
        size === "half" ? "min-h-[560px]" : "min-h-[640px] md:min-h-[720px]"
      } reveal`}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <div
        className={`relative z-10 mx-auto flex h-full max-w-appleWide flex-col px-6 ${
          align === "top" ? "pt-12 md:pt-16" : "justify-end pb-12"
        } text-center ${dark ? "text-white" : "text-appleGray-900"}`}
      >
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold tracking-wide opacity-90">{eyebrow}</p>
        )}
        <h2 className="headline-xl">{title}</h2>
        {subtitle && (
          <p className="mt-3 text-lg md:text-xl opacity-90">{subtitle}</p>
        )}
        <div className="mt-5 flex items-center justify-center gap-4">
          <Link href={href} className="btn-pill btn-pill-primary">
            {ctaLearn}
          </Link>
          <Link href={href} className="btn-pill btn-pill-ghost">
            {ctaBuy}
          </Link>
        </div>
      </div>
    </article>
  );
}
