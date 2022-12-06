import { deleteListing } from "../api/deleteListing.mjs";
import { baseUrl, specificListingUrl } from "../constants/url.mjs";

export function deleteListingListener() {
  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    deleteListing(`${baseUrl}${specificListingUrl}`);
  });
}
