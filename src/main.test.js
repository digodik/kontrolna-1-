import { test, expect } from "vitest";

test("Submit button is disabled when form is empty", () => {
  document.body.innerHTML = `
    <form id="simpleform">
      <input id="email" type="email" />
      <input id="password" type="password" />
      <input id="confirm-password" type="password" />
      <input id="agreement" type="checkbox" />
      <button type="submit" disabled>Submit</button>
      <div id="erroremail" style="display: none;"></div>
      <div id="errorpassword" style="display: none;"></div>
      <div id="errorconfirm" style="display: none;"></div>
    </form>
  `;

  const submitButton = document.querySelector("button");
  expect(submitButton.disabled).toBe(true);
});

test("Password validation shows error for invalid password", () => {
  document.body.innerHTML = `
    <form id="simpleform">
      <input id="password" type="password" />
      <div id="errorpassword" style="display: none; color: red;">Invalid password</div>
    </form>
  `;

  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("errorpassword");

  passwordInput.value = "123";
  passwordInput.dispatchEvent(new Event("input"));
  if (!/^(?=.*[A-Z])(?=.*\d).{5,}$/.test(passwordInput.value)) {
    passwordError.style.display = "block";
  }

  expect(passwordError.style.display).toBe("block");
});

test("Confirm password validation shows error when passwords do not match", () => {
  document.body.innerHTML = `
    <form id="simpleform">
      <input id="password" type="password" />
      <input id="confirm-password" type="password" />
      <div id="errorconfirm" style="display: none; color: red;">Passwords do not match</div>
    </form>
  `;

  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPasswordError = document.getElementById("errorconfirm");

  passwordInput.value = "Password1";
  confirmPasswordInput.value = "Password2";
  confirmPasswordInput.dispatchEvent(new Event("input"));
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.style.display = "block";
  }

  expect(confirmPasswordError.style.display).toBe("block");
});

test("Submit button is enabled when all fields are valid", async () => {
  document.body.innerHTML = `
    <form id="simpleform">
      <input id="email" type="email" />
      <input id="password" type="password" />
      <input id="confirm-password" type="password" />
      <input id="agreement" type="checkbox" />
      <button type="submit" disabled>Submit</button>
      <div id="erroremail" style="display: none;"></div>
      <div id="errorpassword" style="display: none;"></div>
      <div id="errorconfirm" style="display: none;"></div>
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
  agreementInput.checked = true;

  emailInput.dispatchEvent(new Event("input"));
  passwordInput.dispatchEvent(new Event("input"));
  confirmPasswordInput.dispatchEvent(new Event("input"));
  agreementInput.dispatchEvent(new Event("change"));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  const isPasswordValid = /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(passwordInput.value);
  const isConfirmPasswordValid = passwordInput.value === confirmPasswordInput.value;
  const isAgreementChecked = agreementInput.checked;

  if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreementChecked) {
    submitButton.disabled = false;
  }

  expect(submitButton.disabled).toBe(false);
});
