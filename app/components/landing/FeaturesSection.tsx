import { features } from "@/_data/home";
import SectionHeading from "../shared/SectionHeading";

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
}

export default function FeaturesSection({ title, subtitle }: FeaturesSectionProps) {
  return (
    <section id="features" className="bg-[#F9FAFB] min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-18">
        <SectionHeading
          title={title || "Features Invoice Maker"}
          className="text-[#0F172A] "
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[#3359E7] bg-[#ffffff] px-7 py-7 shadow-[0_8px_30px_rgba(16,24,40,0.06)]  hover:shadow-xl transition-all transform hover:scale-103 active:scale-95"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#335ae725]    ">
                  <img
                    src={f.iconSrc}
                    alt={f.iconAlt}
                    className="h-6 w-6"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    {f.description}
                  </p>
                </div>   
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


