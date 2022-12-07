import { bidOnListing } from "../api/bid.mjs";
import { baseUrl, listingsUrl, bidUrl } from "../constants/url.mjs";
import { username } from "../constants/storage.mjs";

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

  const listing = document.createElement("div");

  /// Media carousel
  const mediaContainer = document.createElement("div");
  const carouselContainer = document.createElement("div");
  const sliderLeft = document.createElement("button");
  const sliderRight = document.createElement("button");

  media.forEach((img) => {
    carouselContainer.innerHTML += `<div class="duration-700 ease-in-out hidden" data-carousel-item><img src="${img}" alt="${title}" class=" absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" /></div>`;
    carouselContainer.firstChild.dataset.carouselItem = "active";
  });

  sliderLeft.innerHTML = `<i class="fa-solid fa-circle-chevron-left text-2xl text-main hover:text-black"></i><span class="sr-only">Previous</span>`;
  sliderRight.innerHTML = `<i class="fa-solid fa-circle-chevron-right text-2xl text-main hover:text-black"></i><span class="sr-only">Previous</span>`;

  mediaContainer.id = "controls-carousel";
  mediaContainer.dataset.carousel = "static";
  sliderLeft.dataset.carouselPrev = "";
  sliderRight.dataset.carouselNext = "";

  mediaContainer.classList.add("relative");
  carouselContainer.classList.add("relative", "overflow-hidden", "h-96");
  sliderLeft.classList.add("top-2/4", "left-5", "z-30", "flex", "items-center", "absolute", "btn");
  sliderRight.classList.add("top-2/4", "right-5", "z-30", "flex", "items-center", "absolute", "btn");

  mediaContainer.append(carouselContainer, sliderLeft, sliderRight);

  /*
  const sliderContainer = document.createElement("div");
  

  

  mediaContainer.classList.add("relative", "z-0");
  sliderContainer.classList.add("flex", "m-auto", "w-100", "overflow-hidden");
  

  if (media.length === 0) {
    const mediaImg = document.createElement("img");
    mediaImg.classList.add("media-img");
    mediaImg.src = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
    mediaContainer.append(mediaImg);
  } else {
    media.forEach((img) => {
      const mediaImg = document.createElement("img");
      const mediaSlide = document.createElement("div");
      mediaImg.src = img;
      mediaImg.classList.add("media-img");
      mediaSlide.classList.add("max-w-full", "shrink-0");
      mediaSlide.append(mediaImg);
      sliderContainer.append(mediaSlide);
      mediaContainer.append(sliderContainer, sliderLeft, sliderRight);

      let slideCounter = 0;

      sliderRight.addEventListener("click", () => {
        slideCounter++;
        console.log(mediaContainer);
        
        mediaSlide.forEach((slide) => {
          slide.style.transform += `translateX(-${slide.width}px)`;
        });
        
      });
    });
  }
*/
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

  listingSeller.textContent = name;
  listingCreated.textContent = createdFormatted;
  if (created !== updated) {
    listingCreated.textContent = `${updatedFormatted} (Updated)`;
  }
  listingTitle.textContent = title;
  listingDescription.textContent = description;

  let highestBid = "None";
  if (bids.length >= 1) {
    highestBid = `${bids.reverse()[0].amount} $`;
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
    const data = {
      amount: parseInt(input.value),
    };
    bidOnListing(`${baseUrl}${listingsUrl}/${id}${bidUrl}`, data);
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

  bids.forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const createdFormatted = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
    allBids.innerHTML += `<div class="flex items-center justify-between py-4"><div><p>${bidderName}</p><p>${createdFormatted}</p></div><div><p>${amount} $</p></div></div>`;
  });

  /// Classes
  listing.classList.add("flex", "flex-col", "rounded-sm", "mx-auto");
  infoAndBidsContainer.classList.add("flex", "flex-col", "justify-between", "bg-lightGray", "lg:flex-row");
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

  /// Append

  listingHeader.append(listingSeller, listingCreated);
  form.append(label, input, bidBtn);
  bidFormContainer.append(bidTitle, form);
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
