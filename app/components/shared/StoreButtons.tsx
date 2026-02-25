import Image from "next/image";

type Props = {
  className?: string;
  size?: "md" | "lg";
  color?: "white" | "black";
};

export default function StoreButtons({ className = "", size = "md", color = "black" }: Props) {
  const appStoreH = size === "lg" ? "h-12 sm:h-14" : "h-11 sm:h-12";
  const playStoreH = size === "lg" ? "h-12 sm:h-14" : "h-11 sm:h-12";

  return (
    <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-3 ${className}`}>
      <a
        href="https://apps.apple.com/sa/app/universal-tv-remote-control/id1492122256"
        aria-label="Download on the App Store"
        className="inline-flex transition-all shadow-lg transform hover:scale-102 active:scale-95"
        target="_blank"
      >
        {color === "white" ? <Image
          src="/images/app-store-white.png"
          alt="Download on the App Store"
          width={170}
          height={56}
          className={`${appStoreH} w-auto`}
        /> :<Image
        src="/images/app-store.svg"
        alt="Download on the App Store"
        width={170}
        height={56}
        className={`${appStoreH} w-auto`}
      />}
      </a>
      {/* <a href="https://play.google.com/store/apps/details?id=codematics.universal.tv.remote.control" aria-label="Get it on Google Play" className="inline-flex" target="_blank">
        {color === "white" ? <Image
          src="/images/play-store-white.png"
          alt="Get it on Google Play"
          width={190}
          height={56}
          className={`${playStoreH} w-auto transition-all shadow-lg transform hover:scale-102 active:scale-95`}
        /> : <Image
        src="/images/play-store.svg"
        alt="Get it on Google Play"
        width={190}
        height={56}
        className={`${playStoreH} w-auto`}
      />}
      </a> */}
    </div>
  );
}


