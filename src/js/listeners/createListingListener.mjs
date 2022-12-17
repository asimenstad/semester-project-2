import { baseUrl, listingsUrl } from "../constants/url.mjs";
import { createListing } from "../api/createListing.mjs";

export function createListingListener() {
  const form = document.getElementById("createListingForm");
  const { title, description, tags, media, ending } = document.getElementById("createListingForm").elements;

  let mediaArray = [];
  let tagsArray = [];

  mediaArray.push(media);
  tagsArray.push(tags);

  const mediaBtn = document.getElementById("mediaBtn");
  const tagsBtn = document.getElementById("tagsBtn");

  mediaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const lastMediaElement = mediaArray[mediaArray.length - 1];
    if (lastMediaElement.value !== "") {
      const newMediaInput = lastMediaElement.cloneNode(true);
      newMediaInput.value = "";
      lastMediaElement.after(newMediaInput);
      mediaArray.push(newMediaInput);
    } else {
      const errorContainer = document.getElementById("errorMedia");
      errorContainer.innerHTML = `Please fill in the current input before adding another one.`;
      setTimeout(() => {
        errorContainer.innerHTML = "";
      }, 5000);
    }
  });

  tagsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const lastTagsElement = tagsArray[tagsArray.length - 1];

    if (lastTagsElement.value !== "") {
      const newTagInput = lastTagsElement.cloneNode(true);
      newTagInput.value = "";
      lastTagsElement.after(newTagInput);
      tagsArray.push(newTagInput);
    } else {
      const errorContainer = document.getElementById("errorTags");
      errorContainer.innerHTML = `Please fill in the current input before adding another one.`;
      setTimeout(() => {
        errorContainer.innerHTML = "";
      }, 5000);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newMediaArray = [];
    const newTagsArray = [];

    mediaArray.forEach((input) => {
      if (input.value !== "") {
        newMediaArray.push(input.value);
      }
    });
    tagsArray.forEach((input) => {
      if (input.value !== "") {
        newTagsArray.push(input.value);
      }
    });
    const data = {
      title: title.value,
      description: description.value,
      tags: newTagsArray,
      media: newMediaArray,
      endsAt: ending.value,
    };

    if (media.value === "") {
      delete data.media;
    }

    createListing(`${baseUrl}${listingsUrl}`, data);
  });
}
