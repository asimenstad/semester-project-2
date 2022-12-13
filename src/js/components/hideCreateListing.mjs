import { accessToken } from "../constants/storage.mjs";

export function hideCreateListingBtn() {
  if (accessToken) {
    const createListingBtn = document.getElementById("createListingBtn");

    createListingBtn.classList.remove("hidden");
  } else {
    const createListingBtn = document.getElementById("createListingBtn");

    createListingBtn.classList.add("hidden");
  }
}
