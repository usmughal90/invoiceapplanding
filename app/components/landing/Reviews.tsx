import ReviewSlider from "@/app/components/shared/ReviewSlider";

const reviews = [
  {
    id: 1,
    name: " Alice",
    role: "August 28, 2025",
    text: " Excellent app. Would be awesome if paid & unpaid invoices could be calculated automatically.",
  },
  {
    id: 2,
    name: "junaid Mir",
    role: " October 11, 2024",
    text: "Very useful application. If add some more free templates that's good.. ",
  } 
  ,
   
   
    {
    id: 3,
    name: "Olin_Laportee",
    role: "August 08 , 2025",  // date
    text: "This app is very helpful for making invoices quickly and sending them to clients without hassle. The layout is clean and simple to understand which makes it perfect for small businesses."
  },
  {
    id: 4,
    name: "Berryman Holder",
    role: " January 01 /2025",  // date
    text: "User friendly and smooth app for making receipts. It helps me stay organized and keep my accounts clear. Works great without any confusion."
  }
   
   
   
];

export default function Review() {
  return (
    <section
      id="reviews"
      className="bg-[#3359E7] py-24 px-6 lg:px-12 overflow-hidden min-h-[70vh] flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center w-full">
        <h2 className="text-2xl sm:text-4xl  font-extrabold mb-4 tracking-tighter capitalize">
          Reviews
        </h2>

        <ReviewSlider reviews={reviews}/>
      </div>
    </section>
  );
}
