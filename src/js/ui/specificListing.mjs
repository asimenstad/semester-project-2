import { specificListingTemplate } from "../templates/specificListing.mjs";

export function displayListing(listing) {
  document.title = `${listing.title} | AuctionHouse`;
  const container = document.getElementById("listingContainer");
  container.innerHTML = "";
  container.append(specificListingTemplate(listing));
  console.log(listing);
}
