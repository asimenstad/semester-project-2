import { baseUrl, registerUrl } from "../constants/url.mjs";
import { displayError } from "../components/errorMessage.mjs";

const errorContainer = document.getElementById("formError");

async function registerUser(url, data) {
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

    console.log(json);

    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      displayError(errorContainer);
    } else {
      window.location.href = "login.html";
    }
    const form = document.getElementById("signUpForm");
    form.reset();
  } catch (error) {
    console.log(error);
  }
}

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
