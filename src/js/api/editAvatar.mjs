import { accessToken } from "../constants/storage.mjs";
import { baseUrl, profileUrl, editAvatarUrl } from "../constants/url.mjs";
import { displayError } from "../components/errorMessage.mjs";

const errorContainer = document.getElementById("formError");

async function editAvatar(url, data) {
  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    console.log(json);
    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      displayError(errorContainer);
    } else {
      const form = document.getElementById("createListingForm");
      form.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

export function editAvatarListener() {
  const form = document.getElementById("editAvatarForm");
  const { avatar } = document.getElementById("editAvatarForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      avatar: avatar.value,
    };
    editAvatar(`${baseUrl}${profileUrl}${editAvatarUrl}`, data);
  });
}
