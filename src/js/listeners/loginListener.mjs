import { baseUrl, loginUrl } from "../constants/url.mjs";
import { loginUser } from "../api/login.mjs";

export function loginUserListener() {
  const form = document.getElementById("loginForm");
  const { email, password } = document.getElementById("loginForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };
    loginUser(`${baseUrl}${loginUrl}`, userData);
  });
}
