import { listingTemplate } from "../templates/listings.mjs";

export function displayListings(listings) {
  const container = document.getElementById("listingsContainer");
  const listingsArray = [...listings];
  listingsArray.forEach((listing) => {
    container.append(listingTemplate(listing));
  });
}
