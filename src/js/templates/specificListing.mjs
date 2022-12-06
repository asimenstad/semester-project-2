import { bidOnListing } from "../api/bid.mjs";
import { baseUrl, listingsUrl, bidUrl } from "../constants/url.mjs";

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

  /// Containers
  const listing = document.createElement("div");
  const mediaContainer = document.createElement("div");
  const infoAndBidsContainer = document.createElement("div");

  /// Media
  const mediaImg = document.createElement("img");

  mediaImg.src = media[0];
  if (media.length <= 0) {
    mediaImg.src = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
  }

  /// Info
  const infoContainer = document.createElement("div");
  const listingHeader = document.createElement("div");
  const listingSeller = document.createElement("p");
  const listingCreated = document.createElement("p");
  const listingTitle = document.createElement("h1");
  const listingDescription = document.createElement("p");
  const bidEndingContainer = document.createElement("div");
  const bidTitle = document.createElement("h2");

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
  bidTitle.textContent = "Bid on listing";

  let highestBid = "None";
  if (bids.length >= 1) {
    highestBid = `${bids.reverse()[0].amount} $`;
  }

  bidEndingContainer.innerHTML = `<div class="flex flex-col"><p class="uppercase">Highest bid</p><p class="font-medium">${highestBid}</p></div>
  <div class="flex flex-col"><p class="uppercase">Ending</p><p class="font-medium">${endsAtFormatted}</p></div>`;

  /// Bid form
  const bidFormContainer = document.createElement("div");
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const bidBtn = document.createElement("button");

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
  bidTitle.classList.add("font-medium", "text-lg", "mt-4");
  bidFormContainer.classList.add("flex", "items-center");
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

  /// Append
  mediaContainer.append(mediaImg);
  listingHeader.append(listingSeller, listingCreated);
  form.append(label, input, bidBtn);
  bidFormContainer.append(form);
  infoContainer.append(listingHeader, listingTitle, listingDescription, bidEndingContainer, bidTitle, bidFormContainer);
  bidsContainer.append(bidsHeader, allBids);
  infoAndBidsContainer.append(infoContainer, bidsContainer);
  listing.append(mediaContainer, infoAndBidsContainer);

  return listing;
}