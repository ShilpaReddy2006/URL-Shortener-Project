/**
 * Dashboard page logic.
 * Handles URL shortening, copy to clipboard, and logout.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* Protect page — redirect to login if no token */
  if (!requireAuth()) return;

  const form = document.getElementById("shortenForm");
  const originalUrlInput = document.getElementById("originalUrl");
  const shortenBtn = document.getElementById("shortenBtn");
  const messageBox = document.getElementById("messageBox");
  const resultBox = document.getElementById("resultBox");
  const originalUrlResult = document.getElementById("originalUrlResult");
  const shortUrlResult = document.getElementById("shortUrlResult");
  const copyBtn = document.getElementById("copyBtn");
  const copyFeedback = document.getElementById("copyFeedback");
  const logoutBtn = document.getElementById("logoutBtn");
  const welcomeUser = document.getElementById("welcomeUser");

  let currentShortUrl = "";

  /* Display username from token payload or localStorage fallback */
  displayWelcomeMessage(welcomeUser);

  /* Auto-focus URL input */
  originalUrlInput.focus();

  /* ── Shorten URL form ─────────────────────────────────────── */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage(messageBox);
    hideCopyFeedback();
    resultBox.classList.remove("visible");

    const originalUrl = originalUrlInput.value.trim();

    const urlError = validateUrl(originalUrl);
    if (urlError) {
      showMessage(messageBox, urlError, "error");
      originalUrlInput.focus();
      return;
    }

    setLoading(shortenBtn, true, "Shortening...");

    try {
      const data = await createShortUrl(originalUrl);
      const shortUrl = buildShortUrl(data.shortCode);

      currentShortUrl = shortUrl;
      originalUrlResult.textContent = data.originalUrl;
      shortUrlResult.textContent = shortUrl;
      resultBox.classList.add("visible");

      showMessage(messageBox, "URL shortened successfully!", "success");
    } catch (error) {
      showMessage(messageBox, error.message, "error");
    } finally {
      setLoading(shortenBtn, false);
    }
  });

  /* ── Copy to clipboard ────────────────────────────────────── */
  copyBtn.addEventListener("click", async () => {
    if (!currentShortUrl) return;

    hideCopyFeedback();

    const success = await copyToClipboard(currentShortUrl);

    if (success) {
      copyFeedback.classList.add("visible");
      showMessage(messageBox, "Short URL copied to clipboard!", "success");

      /* Hide copy feedback after 3 seconds */
      setTimeout(hideCopyFeedback, 3000);
    } else {
      showMessage(messageBox, "Failed to copy. Please copy manually.", "error");
    }
  });

  /* ── Logout ───────────────────────────────────────────────── */
  logoutBtn.addEventListener("click", () => {
    removeToken();
    window.location.href = "login.html";
  });

  /* ── Helpers ──────────────────────────────────────────────── */

  /** Hide the inline copy feedback text. */
  function hideCopyFeedback() {
    copyFeedback.classList.remove("visible");
  }

  /**
   * Try to decode username from JWT payload for welcome message.
   * Falls back to "User" if decoding fails.
   */
  function displayWelcomeMessage(element) {
    const token = getToken();
    if (!token) {
      element.textContent = "User";
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      element.textContent = payload.sub || payload.username || "User";
    } catch {
      element.textContent = "User";
    }
  }
});
