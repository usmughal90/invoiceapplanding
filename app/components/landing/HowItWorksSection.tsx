 import { steps } from "@/_data/home";
import { HowItWorksStepType } from "@/app/types/home";

 function TimelineItem({
  step,
  isLast,
}: {
  step: HowItWorksStepType;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-6">
      {/* Left Circle + Line */}
      <div className="relative flex flex-col items-center">
        {/* Circle */}
        <span className="h-4 w-4 rounded-full bg-white z-10 shrink-0" />
        {/* Line */}
        {!isLast && (
          <span className="flex-1 w-px bg-white/70 mt-0" />
        )}
      </div>

      {/* Right Content Box */}
      {/* Yahan 'pb-12' add kiya gaya hai headings ke darmiyan gap ke liye */}
      <div className={`relative ${!isLast ? "pb-12" : "pb-0"}`}> 
        <div className="pl-6">
          <h3 className="text-xl font-bold text-white leading-none">
            {step.title}
          </h3>
          <p className="text-white/80 leading-relaxed mt-3">
            {step.description}
          </p>
        </div>
      </div>
    </li>
  );
}

interface HowItWorksSectionProps {
  title?: string;
}

export default function HowItWorksSection({ title }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="bg-[#3359E7] py-24 px-6 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        
        {/* LEFT SIDE (Phone Image Only) */}
        <div className="flex justify-center lg:justify-center relative order-last lg:order-first ">
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[420px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div> */}

          {/* Physical Phone Frame */}
          <div className="relative z-10 w-full max-w-[220px]  overflow-hidden shadow-none">
          {/* <div className="relative z-10 w-full max-w-[220px] h-[420px] p-[2px] bg-gray-100 dark:bg-[#1a1a1a] rounded-[3rem] border-[6px] border-gray-300 dark:border-[#333] shadow-2xl overflow-hidden"> */}
            {/* Notch */}
            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 dark:bg-[#1a1a1a] rounded-b-2xl z-20"></div> */}

            <div className="rounded-[2.2rem] overflow-hidden bg-gray-100 h-full">
              <video
                src="/videos/invoice-video.mp4"
                className="w-auto h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Timeline) */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tighter capitalize">
            {title || "How Invoice Maker Estimate Works?"}
          </h2>

          <ul className="mt-10  ">
            {steps.map((step, idx) => (
              <TimelineItem
                key={step.title}
                step={step}
                isLast={idx === steps.length - 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}