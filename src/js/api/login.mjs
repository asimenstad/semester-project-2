import { baseUrl, loginUrl } from "../constants/url.mjs";
import { displayError } from "../components/errorMessage.mjs";

const errorContainer = document.getElementById("formError");

async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    localStorage.setItem("username", json.name);
    localStorage.setItem("avatar", json.avatar);
    localStorage.setItem("accessToken", json.accessToken);

    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      displayError(errorContainer);
    } else {
      window.location.href = "profile.html";
    }
    const form = document.getElementById("loginForm");
    form.reset();
  } catch (error) {
    console.log(error);
  }
}

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