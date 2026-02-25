"use client";

import Image from "next/image";
import Slider from "react-slick";
import SectionHeading from "../shared/SectionHeading";
import { slidesForHome } from "@/_data/home";

export default function ScreenshotsSlider() {
  const settings: Slider["props"] = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, centerMode: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerMode: false },
      },
    ],
  };

  return (
    <section id="tv-brands" className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-18 ">
        <SectionHeading title="App screens" className="text-[#3359E7]" />

        <div className="mt-10">
          <div className="slick-wrap">
            <Slider {...settings}>
              {slidesForHome.map((s) => (
                <div key={s.src} className="px-2">
                  <div className="mx-auto w-72 md:w-[320px] py-4">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={600}
                      height={900}
                      className="h-[350px] md:h-[400px] lg:h-[450px] w-full object-contain mx-auto rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
