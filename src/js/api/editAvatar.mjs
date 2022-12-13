import { accessToken } from "../constants/storage.mjs";
import { displayError } from "../components/errorMessage.mjs";

const errorContainer = document.getElementById("formError");

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
      displayError(errorContainer, errorMessage);
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
