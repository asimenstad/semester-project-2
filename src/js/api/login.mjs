import { displayError } from "../components/errorMessage.mjs";

/**
 * Lets user log in
 * @param {string} url - The URL for the post request
 * @param {object} data - The users login information
 * @returns {object} - The users information and access token
 */

export async function loginUser(url, data) {
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
      const errorMessage = json.errors[0].message;
      displayError(errorMessage);
    } else {
      window.location.href = "profile.html";
    }
    const form = document.getElementById("loginForm");
    form.reset();
    return json;
  } catch (error) {
    console.log(error);
  }
}
