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

  /// Container
  const listing = document.createElement("div");

  /// Media
  const mediaContainer = document.createElement("div");
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

  /// Bids
  const bidFormContainer = document.createElement("div");
  const bidsHeader = document.createElement("h2");
  const bidsContainer = document.createElement("div");

  bidFormContainer.innerHTML = `<form class="my-6">
  <label for="bid" class="sr-only">Bid on listing</label>
  <input type="number"
  name="bid"
  id="bid"
  class="border-none rounded-sm p-1"
  required></input>
  <button type="submit"
  class="btn border border-main bg-main text-white mx-auto px-4 py-1 rounded-sm hover:bg-black hover:text-white hover:border-black">Bid</button>
  </form>`;

  bidsHeader.textContent = `All bids (${bids.length})`;

  bids.forEach((bid) => {
    const { amount, bidderName, created } = bid;
    const createdFormatted = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
    bidsContainer.innerHTML += `<div class="flex items-center justify-between py-4"><div><p>${bidderName}</p><p>${createdFormatted}</p></div><div><p>${amount} $</p></div></div>`;
  });

  /// Classes
  listing.classList.add("flex", "flex-col", "bg-lightGray", "rounded-sm", "mx-auto", "md:flex-row");
  infoContainer.classList.add("p-6");
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
  bidEndingContainer.classList.add("flex", "justify-between", "my-4");
  bidFormContainer.classList.add("flex", "items-center");
  bidsHeader.classList.add("font-medium", "text-lg");
  bidsContainer.classList.add("divide-y", "divide-gray", "my-4", "capitalize");

  /// Append
  mediaContainer.append(mediaImg);
  listingHeader.append(listingSeller, listingCreated);
  infoContainer.append(
    listingHeader,
    listingTitle,
    listingDescription,
    bidEndingContainer,
    bidFormContainer,
    bidsHeader,
    bidsContainer
  );
  listing.append(mediaContainer, infoContainer);

  return listing;
}
