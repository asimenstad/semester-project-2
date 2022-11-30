import { accessToken } from "../constants/storage.mjs";
import { baseUrl, listingsUrl } from "../constants/url.mjs";

async function createListing(url, data) {
  try {
    const postData = {
      method: "POST",
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
      console.log(error);
    } else {
      const form = document.getElementById("createListingForm");
      form.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

export function createListingListener() {
  const form = document.getElementById("createListingForm");
  const { title, description, tags, media, ending } = document.getElementById("createListingForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userData = {
      title: title.value,
      description: description.value,
      tags: [tags.value],
      media: [media.value],
      endsAt: ending.value,
    };
    createListing(`${baseUrl}${listingsUrl}`, userData);
  });
}
