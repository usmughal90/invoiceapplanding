"use client";

import { useState, useEffect } from "react";

export default function ReviewSlider({ reviews }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
      setFade(true);
    }, 400);
  };

  const handleDotClick = (index) => {
    if (index === activeIndex) return;

    setFade(false);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(true);
    }, 400);
  };

  const activeReview = reviews[activeIndex];

  return (
    <>
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-in-out transform
        ${
          fade
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {activeReview.name}
        </h3>

        <p className="text-grey-300 text-sm font-semibold mb-8 uppercase tracking-[0.2em]">
          {activeReview.role}
        </p>

        <div className="min-h-[140px] flex items-center justify-center mb-10 px-4">
          <p className="text-xl md:text-3xl text-gray-100 leading-relaxed max-w-7xl font-light italic">
            "{activeReview.text}"
          </p>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
