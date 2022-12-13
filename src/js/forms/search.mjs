import { listingTemplate } from "../templates/listings.mjs";

export function searchListings(listings) {
  const listingArray = [...listings];
  const search = document.getElementById("search");

  search.addEventListener("input", (e) => {
    e.preventDefault();
    const searchValue = search.value;
    const filteredListings = listingArray.filter((listing) => {
      const {
        title,
        seller: { name },
      } = listing;

      if (
        title.toLowerCase().includes(searchValue.toLowerCase()) ||
        name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
    });
    const container = document.getElementById("listingsContainer");
    container.innerHTML = "";
    filteredListings.forEach((listing) => {
      container.append(listingTemplate(listing));
    });
  });
  if (window.location.reload) {
    search.value = "";
  }
}
