// "use client";

import Image from "next/image";
import DownloadButton from "@/app/components/shared/DownloadButton";
import ScrollButton from "../shared/ScrollButton";

interface HeroSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative w-full pt-30 pb-20 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 min-h-screen flex items-center bg-[#3258E1]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/slides/bg header.webp"
          alt="Background"
          fill
          priority={true} // Next.js ko priority dene ke liye
          fetchPriority="high" // Browser ko foran download start karne ke liye
          quality={0}
          className="object-cover"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-30 mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-center">
          {/* Left Side: Content */}
          <div className="w-full text-center  lg:text-left  order-2 lg:order-1 ">
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:5xl xl:text-6xl 2xl:text-7xl">
              {title || <>Invoice Maker Estimate App</>}
            </h1>

            <p className="mt-4 mx-auto max-w-lg text-base leading-relaxed text-white/90 md:text-lg lg:mx-0">
              {subtitle ||
                "Create, send and track business invoices and estimates with ease "}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col md:flex-row items-center lg:items-start gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <DownloadButton className="w-full sm:w-[220px] md:w-[240px] lg:w-[260px] h-[64px] flex items-center justify-center" />

              <ScrollButton />
            </div>
            <div className="mt-8 flex flex-col gap-4 items-center lg:items-start">
              {/* Custom Signature Line - Light Grey/White Gradient with Transparency */}
              <div className="bg-gradient-to-r from-[#f1f1f1e6] to-[#d4d4d4e6] backdrop-blur-sm px-6 py-2 rounded-lg w-fit shadow-sm">
                <p className="text-[#3359E7] text-lg md:text-xl font-semibold">
                  Send invoices with your custom signature & stamp
                </p>
              </div>

              {/* Premium Templates Line - Darker Gradient with Transparency */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#ffffff33] to-[#ffffff1a] border border-white/10 px-4 py-1.5 rounded-md w-fit">
                <span className="text-yellow-400 text-xl">★</span>
                <p className="text-white text-lg font-semibold">
                  1000+ premium templates
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Mockup Image */}
          <div className="w-full  flex items-center justify-center order-1 lg:order-2 ">
            <div className="relative w-full sm:w-[70%] lg:w-full max-w-[580px] aspect-[16/16]">
              <Image
                src="/images/slides/header mobile.webp"
                alt="Mobile app mockup"
                fill
                priority={true}
                loading="eager"
                quality={80}
                className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Robot Decoration */}
      {/* <div className="pointer-events-none absolute bottom-0 left-0 z-10 hidden sm:block">
        <Image
          src="/images/bot.png"
          alt="Decoration"
          width={150}
          height={150}
          className="h-auto w-[100px] lg:w-[150px]"
          priority
        />
      </div> */}
    </section>
  );
}
