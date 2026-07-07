/**
 * Register page logic.
 * Handles form validation, API call, and redirect on success.
 */

document.addEventListener("DOMContentLoaded", () => {
  redirectIfAuthenticated();

  const form = document.getElementById("registerForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const registerBtn = document.getElementById("registerBtn");
  const messageBox = document.getElementById("messageBox");

  /* Auto-focus first input */
  usernameInput.focus();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage(messageBox);

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    /* Client-side validation */
    const usernameError = validateUsername(username);
    if (usernameError) {
      showMessage(messageBox, usernameError, "error");
      usernameInput.focus();
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      showMessage(messageBox, passwordError, "error");
      passwordInput.focus();
      return;
    }

    setLoading(registerBtn, true, "Registering...");

    try {
      const successMessage = await registerUser(username, password);
      showMessage(messageBox, successMessage, "success");

      /* Redirect to login after a brief delay */
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } catch (error) {
      showMessage(messageBox, error.message, "error");
      setLoading(registerBtn, false);
    }
  });
});
