"use client";

import CountUp from "react-countup";

type CounterProps = {
  value: number | string;
  duration?: number;
  separator?: string;
  preserveValueFormatting?: boolean;
};

function parseNumericValue(value: string | number): number {
  if (typeof value === "number") return value;
  const numeric = Number(value.replace(/[^\d.-]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function extractSuffix(value: string | number): string {
  if (typeof value !== "string") return "";

  // Keep anything after the last digit as a suffix (e.g. "1,200+" -> "+")
  const match = value.match(/\d[\d,.\s]*([^\d].*)$/);
  return match?.[1]?.trim() ?? "";
}

export default function Counter({
  value,
  duration = 1.2,
  separator = ",",
  preserveValueFormatting = true,
}: CounterProps) {
  const end = parseNumericValue(value);
  const suffix = preserveValueFormatting ? extractSuffix(value) : "";

  return (
    <CountUp
      end={end}
      duration={duration}
      separator={separator}
      suffix={suffix ? ` ${suffix}` : ""}
      preserveValue
      enableScrollSpy={true}
      scrollSpyOnce={true}
    />
  );
}

