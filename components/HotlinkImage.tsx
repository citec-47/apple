"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
}

// <img> wrapper that gracefully swaps to a placeholder if the primary URL fails
// to load (e.g. CDN rotates the file, hotlink is blocked, offline). Keeps the
// rest of the layout intact so we never show a broken-image icon.
export default function HotlinkImage({
  src,
  alt,
  fallback,
  className,
  loading = "lazy",
  decoding = "async",
}: Props) {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={() => setErrored(true)}
    />
  );
}
