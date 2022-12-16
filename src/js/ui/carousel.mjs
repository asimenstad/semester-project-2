import { popularListingsTemplate } from "../templates/popularListings.mjs";

export function displayCarousel(listings) {
  const container = document.getElementById("popularListings");
  container.innerHTML = "";
  const listingsArray = [...listings];
  const sortedArray = listingsArray.sort((a, b) => b.bids.length - a.bids.length);
  const indicators = document.getElementById("carouselIndicators");
  for (let i = 0; i < sortedArray.length; i++) {
    if (i === 5) {
      break;
    }

    const listing = sortedArray[i];
    container.append(popularListingsTemplate(listing));
    indicators.innerHTML += `<span><i class="fa-solid fa-circle"></i></span>`;
  }

  container.firstChild.dataset.active = true;
  indicators.firstChild.dataset.active = true;
  const buttons = document.querySelectorAll("[data-carousel-btn]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const offset = btn.dataset.carouselBtn === "right" ? 1 : -1;
      const activeSlide = container.querySelector("[data-active]");
      const activeIndicator = indicators.querySelector("[data-active]");

      let newIndex = [...container.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) {
        newIndex = container.children.length - 1;
      } else if (newIndex >= container.children.length) {
        newIndex = 0;
      }
      container.children[newIndex].dataset.active = true;
      indicators.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
      delete activeIndicator.dataset.active;
    });
  });
}
