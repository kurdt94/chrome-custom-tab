const DEFAULT_URL = "https://www.google.com";

const urlInput = document.getElementById("url");
const saveBtn = document.getElementById("save");
const resetBtn = document.getElementById("reset");
const statusEl = document.getElementById("status");

// 1. Try to read instantly from localStorage, then verify with chrome.storage
const cachedUrl = localStorage.getItem("customUrl");
urlInput.value = cachedUrl || DEFAULT_URL;

// Ensure sync storage is up to date (and populate localStorage if empty)
chrome.storage.sync.get({ customUrl: DEFAULT_URL }, (items) => {
  const url = items.customUrl || DEFAULT_URL;
  urlInput.value = url;
  localStorage.setItem("customUrl", url);
});

function showStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.className = isError ? "error" : "success";
  setTimeout(() => {
    statusEl.textContent = "";
    statusEl.className = "";
  }, 2500);
}

saveBtn.addEventListener("click", () => {
  let url = urlInput.value.trim();

  if (!url) {
    showStatus("Please enter a URL", true);
    return;
  }

  // Auto-add https:// if missing
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
    urlInput.value = url;
  }

  try {
    new URL(url); // validate
  } catch {
    showStatus("Invalid URL", true);
    return;
  }

  // 2. Save synchronously to localStorage IMMEDIATELY
  localStorage.setItem("customUrl", url);

  // 3. Save to chrome.storage for persistence/cross-device sync
  chrome.storage.sync.set({ customUrl: url }, () => {
    showStatus("Saved! Open a new tab to see the change.");
  });
});

resetBtn.addEventListener("click", () => {
  // Clear/reset both storages
  localStorage.setItem("customUrl", DEFAULT_URL);

  chrome.storage.sync.set({ customUrl: DEFAULT_URL }, () => {
    urlInput.value = DEFAULT_URL;
    showStatus("Reset to Google");
  });
});