import { accessToken } from "../constants/storage.mjs";
import { displayListings } from "../ui/listings.mjs";
import { displayListingsCount } from "../ui/listingCount.mjs";
import { searchListings } from "../forms/search.mjs";

/**
 * Fetches users own listings
 * @param {string} url - The URL for the get request
 * @returns {array} - Listings
 */
export async function fetchProfileListings(url) {
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
    searchListings(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}
