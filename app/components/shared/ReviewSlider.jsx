// "use client";

// import { useState, useEffect } from "react";

// export default function ReviewSlider({ reviews }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [activeIndex]);

//   const handleNext = () => {
//     setFade(false);
//     setTimeout(() => {
//       setActiveIndex((prev) => (prev + 1) % reviews.length);
//       setFade(true);
//     }, 400);
//   };

//   const handleDotClick = (index) => {
//     if (index === activeIndex) return;

//     setFade(false);
//     setTimeout(() => {
//       setActiveIndex(index);
//       setFade(true);
//     }, 400);
//   };

//   const activeReview = reviews[activeIndex];

//   return (
//     <>
//       <div
//         className={`flex flex-col items-center transition-all duration-700 ease-in-out transform
//         ${
//           fade
//             ? "opacity-100 translate-y-0 scale-100"
//             : "opacity-0 translate-y-8 scale-95"
//         }`}
//       >
//         <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
//           {activeReview.name}
//         </h3>

//         <p className="text-grey-300 text-sm font-semibold mb-8 uppercase tracking-[0.2em]">
//           {activeReview.role}
//         </p>

//         <div className="min-h-[140px] flex items-center justify-center mb-10 px-4">
//           <p className="text-xl md:text-3xl text-gray-100 leading-relaxed max-w-7xl font-light italic">
//             "{activeReview.text}"
//           </p>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-3 mt-4">
//         {reviews.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
//               index === activeIndex
//                 ? "bg-white scale-125"
//                 : "bg-white/40 hover:bg-white/70"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </>
//   );
// } "use client"; 
// 
 "use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSlider({ reviews }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 2,
    pauseOnHover: true,
    adaptiveHeight: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[98%] lg:max-w-[1600px] mx-auto reviews-wrap mt-10">
      <Slider {...settings}>
        {reviews.map((review) => {
          // Dynamic rating logic: agar rating property na ho to 5 dikhao
          const ratingCount = review.rating || 5;

          return (
            <div key={review.id} className="px-3 pb-12 h-full"> 
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg text-left flex flex-col h-full min-h-[350px] justify-between border border-gray-100 transition-all hover:shadow-xl">
                
                <div>
                  {/* 1. Name */}
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] mb-4">
                    {review.name}
                  </h3>

                  {/* 2. Review Text */}
                  <p className="text-[#475569] text-sm md:text-lg leading-relaxed italic">
                    "{review.text}"
                  </p>

                  {/* ⭐ Dynamic Stars - Based on review.rating */}
                  <div className="flex items-center gap-1 mt-5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl md:text-2xl ${i < ratingCount ? "opacity-100" : "opacity-20 text-gray-400"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Role / Date at bottom */}
                <div className="mt-8 border-t pt-5 border-gray-50">
                  <p className="text-[#0F172A] text-xs md:text-sm font-bold uppercase tracking-widest">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <style jsx global>{`
        .reviews-wrap .slick-dots {
          bottom: -10px;
        }
        .reviews-wrap .slick-dots li button:before {
          color: white !important;
          font-size: 12px;
          opacity: 0.5;
        }
        .reviews-wrap .slick-dots li.slick-active button:before {
          color: white !important;
          opacity: 1;
        }

        .slick-track {
          display: flex !important;
          align-items: stretch;
        }
        .slick-slide {
          height: inherit !important;
        }
        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
}