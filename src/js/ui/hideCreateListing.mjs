import { accessToken } from "../constants/storage.mjs";
import { toggleCreateListingModal } from "./createListingModal.mjs";

export function hideCreateListingBtn() {
  if (accessToken) {
    const createListingBtn = document.getElementById("createListingBtn");
    createListingBtn.classList.remove("hidden");
    createListingBtn.addEventListener("click", toggleCreateListingModal(createListingBtn));
  } else {
    const createListingBtn = document.getElementById("createListingBtn");
    createListingBtn.classList.add("hidden");
  }
}
