// Get Custom Url from Storage
const customUrl = localStorage.getItem("customUrl");

if (customUrl) {
  location.replace(customUrl);
} else {
  // Fallback in case localStorage was cleared
  chrome.storage.sync.get({ customUrl: "https://www.google.com" }, (items) => {
    localStorage.setItem("customUrl", items.customUrl);
    location.replace(items.customUrl);
  });
}