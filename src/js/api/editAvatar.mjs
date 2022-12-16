import { accessToken } from "../constants/storage.mjs";
import { displayError } from "../components/errorMessage.mjs";

/**
 * Lets user edit their avatar image
 * @param {string} url - The URL for the put request
 * @param {object} data - The new avatar data
 */
export async function editAvatar(url, data) {
  try {
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, putData);
    const json = await response.json();

    console.log(json);
    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      const errorMessage = json.errors[0].message;
      displayError(errorMessage);
    } else {
      localStorage.setItem("avatar", json.avatar);
      const form = document.getElementById("editAvatarForm");
      form.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
