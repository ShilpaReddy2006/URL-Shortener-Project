/**
 * API module for URL Shortener backend.
 * Base URL: http://localhost:8080
 */

const API_BASE_URL = "http://localhost:8082";
const TOKEN_KEY = "jwtToken";

/* ── Token helpers ─────────────────────────────────────────── */

/** Save JWT token to localStorage. */
function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Retrieve JWT token from localStorage. */
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** Remove JWT token from localStorage. */
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** Returns true if user is authenticated. */
function isAuthenticated() {
  return Boolean(getToken());
}

/** Redirect to login if not authenticated. Call on protected pages. */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

/** Redirect to dashboard if already authenticated. Call on auth pages. */
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = "dashboard.html";
  }
}

/* ── HTTP helpers ──────────────────────────────────────────── */

/**
 * Generic fetch wrapper with error handling.
 * @param {string} endpoint - API path (e.g. "/auth/login")
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>}
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = getToken();
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let response;

  try {
    response = await fetch(url, config);
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  return response;
}

/**
 * Parse error message from API response.
 * @param {Response} response
 * @returns {Promise<string>}
 */
async function parseErrorMessage(response) {
  try {
    const text = await response.text();
    if (text) return text;
  } catch {
    /* fall through */
  }
  return `Request failed with status ${response.status}.`;
}

/* ── Auth API ──────────────────────────────────────────────── */

/**
 * Register a new user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} Success message
 */
async function registerUser(username, password) {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Registration failed. Please try again.");
  }

  return text || "User registered successfully";
}

/**
 * Login and store JWT token.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>} JWT token
 */
async function loginUser(username, password) {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const token = await response.text();

  if (!response.ok) {
    throw new Error(token || "Invalid username or password.");
  }

  if (!token.trim()) {
    throw new Error("Login succeeded but no token was returned.");
  }

  saveToken(token.trim());
  return token.trim();
}

/* ── URL API ───────────────────────────────────────────────── */

/**
 * Create a shortened URL.
 * @param {string} originalUrl
 * @returns {Promise<{ originalUrl: string, shortCode: string }>}
 */
async function createShortUrl(originalUrl) {
  const response = await apiRequest("/api/urls", {
    method: "POST",
    body: JSON.stringify({ originalUrl }),
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
}

/**
 * Build the full shortened URL from a short code.
 * @param {string} shortCode
 * @returns {string}
 */
function buildShortUrl(shortCode) {
  return `${API_BASE_URL}/api/urls/${shortCode}`;
}

/* ── Validation helpers ────────────────────────────────────── */

/**
 * Validate username field.
 * @param {string} username
 * @returns {string|null} Error message or null if valid
 */
function validateUsername(username) {
  if (!username.trim()) {
    return "Username is required.";
  }
  if (username.trim().length < 3) {
    return "Username must be at least 3 characters.";
  }
  return null;
}

/**
 * Validate password field.
 * @param {string} password
 * @returns {string|null} Error message or null if valid
 */
function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

/**
 * Validate URL field.
 * @param {string} url
 * @returns {string|null} Error message or null if valid
 */
function validateUrl(url) {
  if (!url.trim()) {
    return "URL is required.";
  }

  try {
    const parsed = new URL(url.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "URL must start with http:// or https://.";
    }
  } catch {
    return "Please enter a valid URL (e.g. https://example.com).";
  }

  return null;
}

/* ── UI helpers (shared across pages) ──────────────────────── */

/**
 * Show a message in a message container.
 * @param {HTMLElement} element
 * @param {string} message
 * @param {"success"|"error"|"info"} type
 */
function showMessage(element, message, type = "info") {
  element.textContent = message;
  element.className = `message message--${type} visible`;
}

/** Hide a message container. */
function hideMessage(element) {
  element.textContent = "";
  element.className = "message";
}

/**
 * Toggle loading state on a form/button.
 * @param {HTMLButtonElement} button
 * @param {boolean} isLoading
 * @param {string} loadingText
 */
function setLoading(button, isLoading, loadingText = "Please wait...") {
  if (isLoading) {
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || button.innerHTML;
  }
}

/** Copy text to clipboard. Returns true on success. */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* Fallback for older browsers */
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
}
