"use client";

export default function ScrollButton() {
  return (
    <button
      onClick={() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="w-full sm:w-[220px] md:w-[240px] lg:w-[260px] 
                h-[64px] 
                flex items-center justify-center
                bg-[#689BFF]  
                text-white text-sm sm:text-lg 
                rounded-full shadow-2xl 
                transform transition hover:scale-105 active:scale-95 text-center"
    >
      How it works
    </button>
  );
}