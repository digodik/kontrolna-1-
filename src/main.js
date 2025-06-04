const form = document.getElementById("simpleform");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const agreementInput = document.getElementById("agreement");
const submitButton = form.querySelector("button");

const emailError = document.getElementById("erroremail");
const passwordError = document.getElementById("errorpassword");
const confirmPasswordError = document.getElementById("errorconfirm");

function validateEmail() {
  const email = emailInput.value.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  emailError.style.display = isValidEmail ? "none" : "block";
  return isValidEmail;
}

function validatePassword() {
  const password = passwordInput.value.trim();
  const isValidPassword = /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(password);
  passwordError.style.display = isValidPassword ? "none" : "block";
  return isValidPassword;
}

function validateConfirmPassword() {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const isPasswordMatch = password === confirmPassword;
  confirmPasswordError.style.display = isPasswordMatch ? "none" : "block";
  return isPasswordMatch;
}

function validateForm() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isAgreementChecked = agreementInput.checked;

  submitButton.disabled = !(isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreementChecked);
}

form.addEventListener("input", validateForm);
form.addEventListener("change", validateForm);

emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
