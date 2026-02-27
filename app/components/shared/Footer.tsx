export default function Footer() {
  return (
    <footer className="bg-[#3359E7] px-6 md:px-16 py-8 text-center text-xs text-[#ffffff] border-t border-white/10 flex flex-col  items-center justify-between gap-4">
      {/* <div className="flex gap-4">
        <a href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms-conditions" className="text-white/60 hover:text-white transition-colors">Terms and Conditions</a>
      </div> */}
      <p>
        Copyrights © 2023 - 2026{" "}
        <a
          href={`${process.env.NEXT_PUBLIC_API_DOMAIN ? process.env.NEXT_PUBLIC_API_DOMAIN : "/"}`}
          target="_blank"
          className="text-white hover:text-white/80 underline"
        >
          Invoice Maker Estimate App
        </a>
        . Product by{" "}
        <a
          href="https://www.codematics.co/"
          target="_blank"
          className="text-white hover:text-white/80 underline"
        >
          Codematics Services (Private) Limited
        </a>
        .
      </p>
    </footer>
  );
}
