/**
 * Login page logic.
 * Handles form validation, JWT storage, and redirect to dashboard.
 */

document.addEventListener("DOMContentLoaded", () => {
  redirectIfAuthenticated();

  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const messageBox = document.getElementById("messageBox");

  /* Auto-focus first input */
  usernameInput.focus();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage(messageBox);

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    /* Client-side validation */
    if (!username) {
      showMessage(messageBox, "Username is required.", "error");
      usernameInput.focus();
      return;
    }

    if (!password) {
      showMessage(messageBox, "Password is required.", "error");
      passwordInput.focus();
      return;
    }

    setLoading(loginBtn, true, "Logging in...");

    try {
      await loginUser(username, password);
      showMessage(messageBox, "Login successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    } catch (error) {
      showMessage(messageBox, error.message, "error");
      setLoading(loginBtn, false);
    }
  });
});
