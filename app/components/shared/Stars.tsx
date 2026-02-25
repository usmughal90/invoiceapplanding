type StarsProps = {
  rating: number;
  max?: number;
  /**
   * Quantize rating to steps (e.g. 0.5 for half-stars).
   * Leave undefined for exact fractional rendering.
   */
  step?: number;
  rounding?: "none" | "floor" | "round" | "ceil";
  className?: string;
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function quantize(value: number, step: number, rounding: NonNullable<StarsProps["rounding"]>): number {
  if (!Number.isFinite(step) || step <= 0) return value;
  const ratio = value / step;

  const rounded =
    rounding === "floor"
      ? Math.floor(ratio)
      : rounding === "ceil"
        ? Math.ceil(ratio)
        : rounding === "round"
          ? Math.round(ratio)
          : ratio;

  return rounded * step;
}

export default function Stars({
  rating,
  max = 5,
  step,
  rounding = "none",
  className,
}: StarsProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? Math.floor(max) : 5;
  const safeRating = clamp(quantize(Number(rating), step ?? NaN, rounding), 0, safeMax);

  return (
    <div
      className={["flex items-center gap-1", className].filter(Boolean).join(" ")}
      aria-label={`${safeRating} out of ${safeMax}`}
    >
      {Array.from({ length: safeMax }).map((_, idx) => {
        const fill = clamp(safeRating - idx, 0, 1); // 0..1
        const width = `${Math.round(fill * 100)}%`;

        return (
          <span key={idx} className="relative inline-block leading-none" aria-hidden="true">
            <span className="text-zinc-300">★</span>
            <span
              className="absolute left-0 top-0 overflow-hidden text-[#FF9529]"
              style={{ width }}
            >
              ★
            </span>
          </span>
        );
      })}
    </div>
  );
}