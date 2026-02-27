"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const DownloadButton = ({ className = "" }) => {
  // Replace YOUR_APP_ID with your actual app IDs
  const androidStore =
    "https://play.google.com/store/apps/details?id=codematics.business.invoice.billing.receipt.generator";
  const iosStore =
    "https://apps.apple.com/us/app/invoice-maker-estimate-app/id6462679827";

  const [storeUrl, setStoreUrl] = useState(androidStore);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const ua = navigator.userAgent.toLowerCase();
  //   if (/iphone|ipad|ipod/.test(ua)) {
  //     setStoreUrl(iosStore);
  //   }
  // }, [androidStore, iosStore]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      setStoreUrl(iosStore);
    }
    // Android detection
    else if (/android/i.test(ua)) {
      setStoreUrl(androidStore);
    }
    // Desktop (Mac Safari / Chrome / Windows etc.)
    else {
      // Optional: choose what desktop should open
      // If you prefer iOS for Mac Safari:
      if (/Macintosh/.test(ua)) {
        setStoreUrl(iosStore);
      } else {
        setStoreUrl(androidStore);
      }
    }
  }, []);

  return (
    <Link
      target="_blank"
      href={storeUrl}
      // className={`bg-white hover:bg-gray-100 text-[#0F172A] text-sm sm:text-lg py-3 px-6 sm:px-6 rounded-full shadow-2xl transform transition hover:scale-105 active:scale-95 text-center inline-block ${className}`}\
      className={`bg-white hover:bg-gray-100 
text-[#0F172A] text-sm sm:text-lg 
rounded-full shadow-2xl 
transform transition hover:scale-105 active:scale-95 
text-center inline-flex items-center justify-center
${className}`}
    >
      Download Now
    </Link>
  );
};

export default DownloadButton;
