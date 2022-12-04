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
  const bidFormContainer = document.createElement("div");

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
  bidTitle.textContent = "Bid on item";

  let highestBid = "None";
  if (bids.length >= 1) {
    highestBid = `${bids.reverse()[0].amount} $`;
  }

  bidEndingContainer.innerHTML = `<div class="flex flex-col"><p class="uppercase">Highest bid</p><p class="font-medium">${highestBid}</p></div>
  <div class="flex flex-col"><p class="uppercase">Ending</p><p class="font-medium">${endsAtFormatted}</p></div>`;

  bidFormContainer.innerHTML = `<form class="my-2 flex w-full gap-2">
  <label for="bid" class="sr-only">Bid on listing</label>
  <input type="number"
  name="bid"
  id="bid"
  class="border-none rounded-sm p-1 w-full"
  required></input>
  <button type="submit"
  class="btn border border-main w-full bg-main text-white mx-auto px-4 py-1.5 rounded-sm hover:bg-black hover:text-white hover:border-black">Bid</button>
  </form>`;

  /// Bids
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
  infoContainer.classList.add("p-6", "shrink");
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
  bidsContainer.classList.add("p-6", "bg-white", "shrink-0", "grow");
  bidsHeader.classList.add("font-medium", "text-lg");
  allBids.classList.add("divide-y", "divide-gray", "my-4", "capitalize");

  /// Append
  mediaContainer.append(mediaImg);
  listingHeader.append(listingSeller, listingCreated);
  infoContainer.append(listingHeader, listingTitle, listingDescription, bidEndingContainer, bidTitle, bidFormContainer);
  bidsContainer.append(bidsHeader, allBids);
  infoAndBidsContainer.append(infoContainer, bidsContainer);
  listing.append(mediaContainer, infoAndBidsContainer);

  return listing;
}
