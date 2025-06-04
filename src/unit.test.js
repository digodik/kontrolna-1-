import { test, expect } from "vitest";

test("Email validation works correctly", () => {
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = "test@example.com";

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    expect(isValidEmail).toBe(true);

    emailInput.value = "invalid-email";
    const isInvalidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    expect(isInvalidEmail).toBe(false);
});

test("Password validation works correctly", () => {
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";

    passwordInput.value = "Password1";
    const isValidPassword = /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(passwordInput.value);
    expect(isValidPassword).toBe(true);

    passwordInput.value = "pass";
    const isInvalidPassword = /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(passwordInput.value);
    expect(isInvalidPassword).toBe(false);
});

test("Confirm password validation works correctly", () => {
    const passwordInput = document.createElement("input");
    const confirmPasswordInput = document.createElement("input");

    passwordInput.value = "Password1";
    confirmPasswordInput.value = "Password1";

    const isPasswordMatch = passwordInput.value === confirmPasswordInput.value;
    expect(isPasswordMatch).toBe(true);

    confirmPasswordInput.value = "Password2";
    const isPasswordMismatch = passwordInput.value === confirmPasswordInput.value;
    expect(isPasswordMismatch).toBe(false);
});

test("Submit button is disabled when form is invalid", () => {
    document.body.innerHTML = `
    <form id="simpleform">
      <input id="email" type="email" />
      <input id="password" type="password" />
      <input id="confirm-password" type="password" />
      <input id="agreement" type="checkbox" />
      <button type="submit" disabled>Submit</button>
    </form>
  `;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const agreementInput = document.getElementById("agreement");
    const submitButton = document.querySelector("button");

    emailInput.value = "test@example.com";
    passwordInput.value = "Password1";
    confirmPasswordInput.value = "Password1";
    agreementInput.checked = false;

    const isFormValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) &&
        /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(passwordInput.value) &&
        passwordInput.value === confirmPasswordInput.value &&
        agreementInput.checked;

    submitButton.disabled = !isFormValid;
    expect(submitButton.disabled).toBe(true);
});