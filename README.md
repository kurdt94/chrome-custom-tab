# My New Tab – Chrome Extension

Replace Chrome’s New Tab page with any custom URL of your choice.

## Features

- Instant redirect to your preferred page when opening a new tab
- Simple settings page to change the URL
- Settings sync across devices (if signed into Chrome)
- Clean dark UI for the options page

## How to install (Developer Mode)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the folder `my-new-tab-extension`
5. Done! Open a new tab to test.

## How to change the URL

- Click the extension icon in the toolbar, **or**
- Right-click the extension → **Options**
- Enter your desired URL and click **Save**

## Files

- `manifest.json` – Extension configuration
- `redirect.html` + `redirect.js` – The new tab page (performs the redirect)
- `options.html` + `options.js` – Settings page

## Notes

- The redirect is nearly instantaneous.
- Default URL is `https://www.google.com` if none is set.
- Works with any valid `http` or `https` URL.
