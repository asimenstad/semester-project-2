import { baseUrl, specificListingUrl } from "../constants/url.mjs";
import { editListing } from "../api/editListing.mjs";

export function editListingListener() {
  const form = document.getElementById("editListingForm");
  const { titleInput, descriptionInput, tagsInput, mediaInput } = document.getElementById("editListingForm").elements;

  let mediaArray = [];
  let tagsArray = [];

  mediaArray.push(mediaInput);
  tagsArray.push(tagsInput);

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
      title: titleInput.value,
      description: descriptionInput.value,
      tags: newTagsArray,
      media: newMediaArray,
    };

    if (mediaInput.value === "") {
      delete data.media;
    }

    editListing(`${baseUrl}${specificListingUrl}`, data);
  });
}
