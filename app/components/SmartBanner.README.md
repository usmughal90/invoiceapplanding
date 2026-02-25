# SmartBanner Component

## Overview
The SmartBanner component displays a smart app banner on mobile devices to promote your mobile app. It uses the [smart-app-banner](https://www.npmjs.com/package/smart-app-banner) npm package for automatic iOS/Android detection.

## Installation
```bash
npm i smart-app-banner
```

## Usage
The component is already integrated into the app layout at `app/layout.tsx`. It will automatically display on mobile devices.

## Configuration

### 1. Update App Store IDs and URL Schemes

#### App Store IDs
In `app/layout.tsx`, replace the placeholder values with your actual app store IDs:

```typescript
export const metadata: Metadata = {
  // ... other metadata
  other: {
    // iOS App Store - Replace with your actual iOS App ID
    'apple-itunes-app': 'app-id=YOUR_IOS_APP_ID',
    // Google Play Store - Already configured
    'google-play-app': 'app-id=codematics.universal.tv.remote.control',
  }
};
```

#### Custom URL Schemes
In `app/components/SmartBanner.tsx`, update the URL schemes to match your app's configuration:

**For iOS** (in `checkIfAppInstalled` and `getAppScheme` functions):
```typescript
const appScheme = 'universaltvremote://' // Replace with your iOS app's custom URL scheme
```

**For Android** (in `getAppScheme` function):
```typescript
return 'intent://open#Intent;scheme=universaltvremote;package=codematics.universal.tv.remote.control;end'
```

> **Note**: Make sure these URL schemes match what's configured in your mobile apps:
> - iOS: Set in your app's Info.plist under `CFBundleURLSchemes`
> - Android: Set in your AndroidManifest.xml as an intent filter

### 2. Customize Banner Settings
In `app/components/SmartBanner.tsx`, you can customize the banner configuration:

```typescript
new SmartBanner({
  daysHidden: 0,   // Days to hide banner after close button is clicked (0 = always show)
  daysReminder: 0, // Days to hide banner after button is clicked (0 = always show)
  appStoreLanguage: 'us', // Language code for App Store
  title: 'Universal TV Remote',
  author: 'Universal TV Remote Team',
  button: buttonText, // Dynamically set to "OPEN" or "INSTALL"
  store: {
    ios: 'On the App Store',
    android: 'In Google Play',
    windows: 'In Windows Store'
  },
  price: {
    ios: 'FREE',
    android: 'FREE',
    windows: 'FREE'
  }
})
```

## 🎯 Dynamic Button Text Feature

The SmartBanner now intelligently detects whether your app is installed and shows the appropriate button:

- **"INSTALL"** - Shown when the app is not installed → Takes user to App Store/Play Store
- **"OPEN"** - Shown when the app is installed → Opens the app directly

### How It Works

1. **Detection**: When the banner loads, it attempts to detect if the app is installed using platform-specific methods:
   - **iOS**: Uses a timeout-based heuristic by trying to open the app's custom URL scheme
   - **Android**: Currently defaults to "INSTALL" (Android doesn't provide reliable detection)

2. **Button Behavior**:
   - If app is **not installed**: Button links to the appropriate app store
   - If app **is installed**: Button opens the app using custom URL schemes

3. **URL Schemes Used**:
   - **iOS**: `universaltvremote://`
   - **Android**: `intent://open#Intent;scheme=universaltvremote;package=codematics.universal.tv.remote.control;end`

### Limitations

- **Android**: There's no reliable way to detect app installation on Android from a web browser. The banner will default to showing "INSTALL" for safety.
- **iOS**: The detection is heuristic-based and may not be 100% accurate in all scenarios.
- **Privacy**: Modern browsers limit app detection capabilities for privacy reasons.

### 3. Customize Appearance
You can customize the banner's appearance by adding CSS to your `globals.css`:

```css
/* Customize smart banner colors */
.smartbanner {
  background: #f4f4f4;
}

.smartbanner-button {
  background: #007aff;
  color: white;
}

.smartbanner-button:hover {
  background: #0051d5;
}
```

## Testing

### Desktop Browser
The banner will NOT appear on desktop browsers. To test:

1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select a mobile device (e.g., iPhone 12 Pro)
4. Refresh the page

### Mobile Device
Simply open the website on a real iOS or Android device.

## How It Works

1. The component dynamically imports the smart-app-banner library only on the client side to avoid SSR issues
2. It reads the meta tags from the page to determine which app store to link to
3. It automatically detects the user's device (iOS/Android) and shows the appropriate banner
4. The banner remembers user preferences (if they closed it or clicked "VIEW") using localStorage

## Browser Support
- iOS Safari 6+
- Android Chrome 4.4+
- Modern browsers with localStorage support

## Troubleshooting

### Banner not showing?
1. Make sure you're testing on a mobile device or using mobile emulation
2. Check the browser console for any errors
3. Verify that the meta tags are correctly set in `layout.tsx`
4. Clear localStorage if you previously closed the banner

### TypeScript errors?
The package doesn't include TypeScript declarations, but we've added `@ts-ignore` comments to suppress the errors. This is normal and safe.
