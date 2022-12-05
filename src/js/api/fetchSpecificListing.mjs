import { accessToken } from "../constants/storage.mjs";
import { specificListingTemplate } from "../templates/specificListing.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
export const id = params.get("id");

export async function fetchSpecificListing(url) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    displayListing(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}

function displayListing(listing) {
  document.title = `${listing.title} | AuctionHouse`;
  const container = document.getElementById("listingContainer");
  container.append(specificListingTemplate(listing));
  console.log(listing);
}
