import { accessToken } from "../constants/storage.mjs";
import { listingTemplate } from "../templates/listings.mjs";

export async function fetchListings(url) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    displayListings(json);
    displayListingsCount(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}

function displayListings(listings) {
  const container = document.getElementById("listingsContainer");
  listings.forEach((listing) => {
    console.log(listing);
    container.append(listingTemplate(listing));
  });
}

function displayListingsCount(listings) {
  const listingsCount = document.getElementById("listingsCount");
  listingsCount.textContent = `${listings.length} Listings`;
}
