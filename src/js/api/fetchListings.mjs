import { displayListings } from "../ui/listings.mjs";
import { displayListingsCount } from "../ui/listingCount.mjs";
import { searchListings } from "../forms/search.mjs";
import { displayCarousel } from "../ui/carousel.mjs";

/**
 * Fetches all listings
 * @param {string} url - The URL for get request
 * @returns {array} - All listings
 */
export async function fetchListings(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    displayListings(json);
    displayListingsCount(json);
    searchListings(json);

    displayCarousel(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}
