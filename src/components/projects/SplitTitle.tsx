"use client";

/**
 * SplitTitle
 * Wraps each character in an overflow:hidden container + an inner
 * .split-char span so GSAP / Anime.js can translateY individual chars.
 */
export default function SplitTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} split-title-container`}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "baseline",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: "1.1",
          }}
        >
          <span
            className="split-char"
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : undefined,
              // start hidden — GSAP sets translateY(110%) before reveal
              transform: "translateY(110%)",
              opacity: 0,
              filter: "blur(6px)",
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}
