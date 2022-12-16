import { bidOnListing } from "../api/bid.mjs";
import { baseUrl, listingsUrl, bidUrl } from "../constants/url.mjs";
import { username } from "../constants/storage.mjs";
import { accessToken } from "../constants/storage.mjs";

export function specificListingTemplate(data) {
  const {
    bids,
    created,
    description,
    endsAt,
    media,
    seller: { name },
    tags,
    title,
    updated,
    id,
  } = data;

  if (media.length === 0) {
    media.push("https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg");
  }

  const listing = document.createElement("div");

  /// Carousel
  const mediaContainer = document.createElement("div");
  const slides = document.createElement("ul");
  const btnLeft = document.createElement("button");
  const btnRight = document.createElement("button");
  const indicators = document.createElement("div");

  media.forEach((img) => {
    slides.innerHTML += `<li class="absolute inset-0 opacity-0 transition-opacity duration-200 ease-in-out"><img src="${img}" alt="${title}" class="block media-img" /></li>`;
    indicators.innerHTML += `<span><i class="fa-solid fa-circle"></i></span>`;
  });

  slides.firstChild.dataset.active = true;
  indicators.firstChild.dataset.active = true;

  btnLeft.innerHTML = `<i data-carousel-btn="left" class="fa-solid fa-angle-left z-20"></i><span class="sr-only">Previous</span>`;
  btnRight.innerHTML = `<i data-carousel-btn="right" class="fa-solid fa-angle-right z-20"></i><span class="sr-only">Next</span>`;

  btnLeft.dataset.carouselBtn = "left";
  btnRight.dataset.carouselBtn = "right";

  mediaContainer.append(slides, btnLeft, btnRight, indicators);

  /// Carousel function
  if (media.length === 1) {
    btnLeft.classList.add("hidden");
    btnRight.classList.add("hidden");
    indicators.classList.add("hidden");
  }
  btnLeft.addEventListener("click", carousel);
  btnRight.addEventListener("click", carousel);

  function carousel(e) {
    const offset = e.target.dataset.carouselBtn === "right" ? 1 : -1;
    const activeSlide = slides.querySelector("[data-active]");
    const activeIndicator = indicators.querySelector("[data-active]");

    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) {
      newIndex = slides.children.length - 1;
    } else if (newIndex >= slides.children.length) {
      newIndex = 0;
    }
    slides.children[newIndex].dataset.active = true;
    indicators.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    delete activeIndicator.dataset.active;
  }

  /// Info
  const infoAndBidsContainer = document.createElement("div");
  const infoContainer = document.createElement("div");
  const listingHeader = document.createElement("div");
  const listingSeller = document.createElement("p");
  const listingCreated = document.createElement("p");
  const listingTitle = document.createElement("h1");
  const listingDescription = document.createElement("p");
  const bidEndingContainer = document.createElement("div");

  const createdFormatted = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
  const updatedFormatted = new Date(updated).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
  const endsAtFormatted = new Date(endsAt).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });

  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  listingSeller.textContent = name;
  listingCreated.textContent = createdFormatted;
  if (created !== updated) {
    listingCreated.textContent = `${updatedFormatted} (Updated)`;
  }
  listingTitle.textContent = title;
  listingDescription.textContent = description;

  let highestBid = "None";
  if (bids.length >= 1) {
    highestBid = `${sortedBids[0].amount} $`;
  }

  bidEndingContainer.innerHTML = `<div class="flex flex-col"><p class="uppercase">Highest bid</p><p class="font-medium">${highestBid}</p></div>
  <div class="flex flex-col"><p class="uppercase">Ending</p><p class="font-medium">${endsAtFormatted}</p></div>`;

  /// Bid form
  const bidFormContainer = document.createElement("div");
  const bidTitle = document.createElement("h2");
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const bidBtn = document.createElement("button");
  const error = document.createElement("p");

  bidTitle.textContent = "Bid on listing";

  form.id = "bidForm";

  label.textContent = "Amount";
  label.setAttribute("for", "amount");

  input.setAttribute("type", "number");
  input.setAttribute("name", "amount");
  input.setAttribute("required", "");
  input.placeholder = "Amount";

  bidBtn.textContent = "Bid";
  bidBtn.setAttribute("type", "submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (accessToken) {
      const data = {
        amount: parseInt(input.value),
      };
      bidOnListing(`${baseUrl}${listingsUrl}/${id}${bidUrl}`, data);
    } else {
      error.innerHTML = `<a class="text-main hover:font-medium" href="login.html">Log in</a> or <a class="text-main hover:font-medium" href="signup.html">sign up</a> to bid`;
    }
  });

  /// Edit and delete
  const editDeleteContainer = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  editBtn.textContent = "Edit listing";
  deleteBtn.textContent = "Delete listing";

  if (name === username) {
    bidFormContainer.classList.add("hidden");
  } else {
    editDeleteContainer.classList.add("hidden");
  }

  //// Edit listing modal
  const editModal = document.getElementById("editListingModal");
  const closeEditModal = document.getElementById("closeEditListingModal");

  const { titleInput, descriptionInput, tagsInput, mediaInput } = document.getElementById("editListingForm").elements;

  editBtn.addEventListener("click", () => {
    editModal.classList.toggle("hidden");
  });

  closeEditModal.addEventListener("click", () => {
    editModal.classList.toggle("hidden");
  });

  titleInput.value = title;
  descriptionInput.value = description;
  tagsInput.value = tags;
  mediaInput.value = media;

  //// Delete listing modal
  const deleteModal = document.getElementById("deleteListingModal");
  const closeDeleteModal = document.getElementById("closeDeleteListingModal");

  deleteBtn.addEventListener("click", () => {
    deleteModal.classList.toggle("hidden");
  });

  closeDeleteModal.addEventListener("click", () => {
    deleteModal.classList.toggle("hidden");
  });

  /// Bids displayed
  const bidsContainer = document.createElement("div");
  const bidsHeader = document.createElement("h2");
  const allBids = document.createElement("div");

  bidsHeader.textContent = `All bids (${bids.length})`;

  sortedBids.forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const createdFormatted = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
    allBids.innerHTML += `<div class="flex items-center justify-between py-4"><div><p>${bidderName}</p><p>${createdFormatted}</p></div><div><p>${amount} $</p></div></div>`;
  });

  /// Classes
  listing.classList.add(
    "flex",
    "flex-col",
    "container",
    "lg:flex-row",
    "gap-5",
    "rounded-sm",
    "mx-auto",
    "overflow-hidden"
  );
  infoAndBidsContainer.classList.add("flex", "flex-col", "justify-between", "bg-lightGray", "flex-auto");
  infoContainer.classList.add("p-6", "flex-auto");
  listingHeader.classList.add(
    "flex",
    "flex-wrap",
    "gap-x-1",
    "justify-between",
    "items-center",
    "text-midGray",
    "capitalize"
  );
  listingTitle.classList.add("font-medium", "text-lg", "mt-4");
  listingDescription.classList.add("max-w-lg");
  bidEndingContainer.classList.add("flex", "justify-between", "py-4", "border-b", "border-gray");
  bidFormContainer.classList.add("flex", "items-center", "flex-wrap", "mt-4");
  bidTitle.classList.add("font-medium", "text-lg", "w-full");
  bidsContainer.classList.add("p-6", "bg-white", "flex-auto");
  bidsHeader.classList.add("font-medium", "text-lg");
  allBids.classList.add("divide-y", "divide-gray", "my-4", "capitalize");
  form.classList.add("flex", "my-2", "w-full", "gap-2");
  label.classList.add("sr-only");
  input.classList.add("border-none", "rounded-sm", "p-1.5", "w-full");
  bidBtn.classList.add(
    "btn",
    "border",
    "border-main",
    "w-full",
    "bg-main",
    "text-white",
    "mx-auto",
    "px-4",
    "py-1.5",
    "rounded-sm",
    "hover:bg-black",
    "hover:text-white",
    "hover:border-black"
  );
  editDeleteContainer.classList.add("flex", "items-center", "gap-2", "mt-6");
  editBtn.classList.add(
    "btn",
    "border",
    "border-main",
    "w-full",
    "bg-main",
    "text-white",
    "mx-auto",
    "px-4",
    "py-1.5",
    "rounded-sm",
    "hover:bg-black",
    "hover:text-white",
    "hover:border-black"
  );
  deleteBtn.classList.add(
    "btn",
    "border",
    "border-main",
    "w-full",
    "bg-none",
    "text-main",
    "mx-auto",
    "px-4",
    "py-1.5",
    "rounded-sm",
    "hover:bg-main",
    "hover:text-white",
    "hover:border-main"
  );
  mediaContainer.classList.add("relative", "w-full", "h-fit", "flex-auto", "lg:max-w-xl");
  slides.classList.add("relative", "overflow-hidden", "media-img");
  btnLeft.classList.add(
    "top-2/4",
    "left-5",
    "z-30",
    "flex",
    "items-center",
    "justify-center",
    "absolute",
    "text-main",
    "bg-white",
    "rounded-full",
    "w-5",
    "h-5",
    "hover:bg-main",
    "hover:text-white",
    "btn"
  );
  btnRight.classList.add(
    "top-2/4",
    "right-5",
    "z-30",
    "flex",
    "items-center",
    "justify-center",
    "absolute",
    "text-main",
    "bg-white",
    "rounded-full",
    "w-5",
    "h-5",
    "hover:bg-main",
    "hover:text-white",
    "btn"
  );
  indicators.classList.add(
    "text-midGray",
    "flex",
    "items-center",
    "justify-center",
    "gap-3",
    "mt-1",
    "indicators",
    "text-xs"
  );
  error.classList.add("form-error");

  /// Append

  listingHeader.append(listingSeller, listingCreated);
  form.append(label, input, bidBtn);
  bidFormContainer.append(bidTitle, form, error);
  editDeleteContainer.append(editBtn, deleteBtn);
  infoContainer.append(
    listingHeader,
    listingTitle,
    listingDescription,
    bidEndingContainer,
    bidFormContainer,
    editDeleteContainer
  );
  bidsContainer.append(bidsHeader, allBids);
  infoAndBidsContainer.append(infoContainer, bidsContainer);
  listing.append(mediaContainer, infoAndBidsContainer);

  return listing;
}
