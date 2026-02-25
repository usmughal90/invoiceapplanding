import StoreButtons from "../shared/StoreButtons";
import Image from "next/image";
import DownloadButton from "../shared/DownloadButton";
export default function DownloadSection() {
  return (
    <section id="download" className="bg-[#3359E7] overflow-visible pt-28">
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-20">
        <div className="relative rounded-3xl  px-6 py-10 text-white sm:px-10 lg:px-12">
          {/* subtle accents */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-black/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left copy */}
            <div className="order-2 text-center lg:order-1 lg:col-span-6 lg:text-left">
              <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-5xl">
                Start Invoicing Today!
              </h2>
              <p className="mt-4 mx-auto lg:mx-0 max-w-xl text-pretty text-base leading-6 text-[#ffffff] lg:max-w-none">
                Download Invoice Billing and get your finances organized in minutes.
                Download Now – Available on Google Play and App Store.
              </p>

              <div className="mt-7 flex justify-center lg:justify-start">
                <DownloadButton className="w-full sm:w-[220px] md:w-[240px] lg:w-[260px] h-[56px] flex items-center justify-center" />
              </div>
            </div>

            {/* Right images */}
            <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-6 lg:justify-center ">
              <div className="relative h-[260px] w-full max-w-[420px] sm:h-[300px]">
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-30 lg:translate-x-0 w-[140px] sm:w-[180px] lg:w-[200px]">
                  <Image
                    src="/images/slides/header mobile.png"
                    alt="App screenshot preview 2"
                    width={500}
                    height={700}
                    className="h-auto w-full drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
