import { baseUrl, listingsUrl } from "../constants/url.mjs";
import { createListing } from "../api/createListing.mjs";

export function createListingListener() {
  const form = document.getElementById("createListingForm");
  const { title, description, tags, media, ending } = document.getElementById("createListingForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      title: title.value,
      description: description.value,
      tags: [tags.value],
      media: [media.value],
      endsAt: ending.value,
    };
    if (media.value === "") {
      delete data.media;
    }
    createListing(`${baseUrl}${listingsUrl}`, data);
  });
}
