import { displayError } from "../components/errorMessage.mjs";

const errorContainer = document.getElementById("formError");

export async function registerUser(url, data) {
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
      const errorMessage = json.errors[0].message;
      displayError(errorContainer, errorMessage);
    } else {
      window.location.href = "login.html";
    }
    const form = document.getElementById("signUpForm");
    form.reset();
  } catch (error) {
    console.log(error);
  }
}
