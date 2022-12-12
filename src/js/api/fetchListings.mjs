import { accessToken } from "../constants/storage.mjs";
import { listingTemplate } from "../templates/listings.mjs";
import { searchListings } from "../forms/search.mjs";
import { popularListingsTemplate } from "../templates/popularListings.mjs";

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
    searchListings(json);
    displayCarousel(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}

function displayListings(listings) {
  const container = document.getElementById("listingsContainer");
  const listingsArray = [...listings];
  listingsArray.forEach((listing) => {
    container.append(listingTemplate(listing));
  });
}

function displayListingsCount(listings) {
  const listingsCount = document.getElementById("listingsCount");
  listingsCount.textContent = `${listings.length} Listings`;
}

function displayCarousel(listings) {
  const container = document.getElementById("popularListings");
  const listingsArray = [...listings];
  const sortedArray = listingsArray.sort((a, b) => b.bids.length - a.bids.length);
  for (let i = 0; i < sortedArray.length; i++) {
    if (i === 5) {
      break;
    }
    const listing = sortedArray[i];
    container.append(popularListingsTemplate(listing));
  }
  container.firstChild.dataset.active = true;
  const buttons = document.querySelectorAll("[data-carousel-btn]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const offset = btn.dataset.carouselBtn === "right" ? 1 : -1;
      const activeSlide = container.querySelector("[data-active]");
      console.log(activeSlide);

      let newIndex = [...container.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) {
        newIndex = container.children.length - 1;
      } else if (newIndex >= container.children.length) {
        newIndex = 0;
      }
      container.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
}
