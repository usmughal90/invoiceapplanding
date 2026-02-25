"use client";

import { useEffect } from "react";

/**
 * SmartBanner Component
 * Displays a smart app banner on mobile devices to promote the mobile app.
 * Uses the smart-app-banner package for automatic iOS/Android detection.
 *
 * Configuration:
 * - Add meta tags to layout.tsx for app store links and app details
 * - Customize appearance via CSS variables
 */
export default function SmartBanner() {
  useEffect(() => {
    // Dynamically import smart-app-banner only on the client side to avoid SSR issues
    const loadSmartBanner = async () => {
      try {
        console.log("🔵 SmartBanner: Starting to load...");
        console.log("🔵 User Agent:", navigator.userAgent);

        // Import CSS
        // @ts-ignore - CSS import doesn't have type declarations
        await import("smart-app-banner/dist/smart-app-banner.css");
        console.log("✅ SmartBanner CSS loaded");

        // Import and initialize SmartBanner
        // @ts-ignore - smart-app-banner doesn't have TypeScript declarations
        const { default: SmartBanner } = await import("smart-app-banner");

        // Detect if app is installed
        const isAppInstalled = await checkIfAppInstalled();
        const buttonText = isAppInstalled ? "OPEN" : "INSTALL";

        console.log(
          `📱 App installed: ${isAppInstalled}, Button text: ${buttonText}`,
        );

        // Initialize the banner with configuration
        new SmartBanner({
          daysHidden: 0, // Days to hide banner after close button is clicked
          daysReminder: 0, // Days to hide banner after "VIEW" button is clicked
          appStoreLanguage: "us", // Language code for App Store
          title: "Cover Letter AI & Resume Maker",
          author: "Codematics (codematics.co)",
          button: buttonText,
          store: {
            ios: "On the App Store",
            windows: "In Windows Store",
          },
          price: {
            ios: "FREE",
            android: "FREE",
            windows: "FREE",
          },
        });

        console.log("✅ SmartBanner initialized");

        // Check if banner element was created and update button behavior
        setTimeout(() => {
          const bannerElement = document.querySelector(
            ".smartbanner",
          ) as HTMLElement | null;

          if (bannerElement) {
            console.log("✅ SmartBanner element found in DOM:", bannerElement);
            bannerElement.style.top = "-80px";

            // If app is installed, make the button open the app instead of going to store
            if (isAppInstalled) {
              const button = bannerElement.querySelector(".smartbanner-button");
              if (button) {
                button.addEventListener("click", (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Try to open the app using custom URL scheme
                  const appScheme = getAppScheme();
                  if (appScheme) {
                    window.location.href = appScheme;
                    console.log("🚀 Opening app with scheme:", appScheme);
                  }
                });
              }
            }
          } else {
            console.warn("⚠️ SmartBanner element NOT found in DOM");
            console.log(
              "💡 This is normal on desktop browsers. Try mobile emulation mode.",
            );
          }
        }, 1000);
      } catch (error) {
        console.error("❌ Error loading SmartBanner:", error);
      }
    };

    loadSmartBanner();
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * Check if the app is installed by attempting to open it
 * This is a heuristic approach as there's no reliable way to detect app installation
 */
async function checkIfAppInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    // const isAndroid = /android/.test(userAgent);

    if (!isIOS) {
      resolve(false);
      return;
    }

    // For iOS, we can use a timeout-based approach
    if (isIOS) {
      const appScheme = "coverletterai://"; // Your app's custom URL scheme
      const timeout = 1500;
      const start = Date.now();

      // Try to open the app
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appScheme;
      document.body.appendChild(iframe);

      // If the app is installed, the browser will switch to it
      // and this page will be hidden, so the timer won't fire accurately
      setTimeout(() => {
        document.body.removeChild(iframe);
        const elapsed = Date.now() - start;

        // If significantly less time has passed, the app likely opened
        // This is a heuristic and not 100% reliable
        if (elapsed < timeout + 100) {
          resolve(false); // App not installed
        } else {
          resolve(false); // Default to not installed for safety
        }
      }, timeout);

      return;
    }

    resolve(false);
  });
}

/**
 * Get the appropriate app scheme based on the platform
 */
function getAppScheme(): string | null {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  if (isIOS) {
    return "coverletterai://"; // Your iOS app's custom URL scheme
  }

  return null;
}
