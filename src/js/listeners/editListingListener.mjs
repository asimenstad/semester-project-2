import { baseUrl, specificListingUrl } from "../constants/url.mjs";
import { editListing } from "../api/editListing.mjs";

export function editListingListener() {
  const form = document.getElementById("editListingForm");
  const { titleInput, descriptionInput, tagsInput, mediaInput } = document.getElementById("editListingForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      title: titleInput.value,
      description: descriptionInput.value,
      tags: [tagsInput.value],
      media: [mediaInput.value],
    };

    editListing(`${baseUrl}${specificListingUrl}`, data);
  });
}
