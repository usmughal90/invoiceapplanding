type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({ title, subtitle, className }: Props) {
  return (
    <div className={`text-center ${className ?? ""}`}>
      <h2 className="text-2xl font-bold tracking-tight  sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {/* <div className="mx-auto mt-3 h-0.5 w-10 rounded bg-[var(--color-primary)]" /> */}
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-7  ">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}


