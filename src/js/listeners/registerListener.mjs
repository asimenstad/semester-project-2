import { baseUrl, registerUrl } from "../constants/url.mjs";
import { registerUser } from "../api/register.mjs";

export function registerUserListener() {
  const form = document.getElementById("signUpForm");
  const { name, email, avatar, password } = document.getElementById("signUpForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userData = {
      name: name.value,
      email: email.value,
      avatar: avatar.value,
      password: password.value,
    };
    registerUser(`${baseUrl}${registerUrl}`, userData);
  });
}
