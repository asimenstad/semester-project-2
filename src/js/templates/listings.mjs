export function listingTemplate(data) {
  const {
    id,
    seller: { name },
    title,
    description,
    media,
    endsAt,
    created,
    updated,
    bids,
  } = data;

  /// Container
  const listing = document.createElement("a");
  const listingContainer = document.createElement("div");

  listing.href = `specific-listing.html?id=${id}`;

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
  const listingSeller = document.createElement("h3");
  const listingCreated = document.createElement("p");
  const listingTitle = document.createElement("h4");
  const listingDescription = document.createElement("p");
  const bidEndingContainer = document.createElement("div");

  const sortedBids = bids.sort((a, b) => b.amount - a.amount);
  let highestBid = "None";
  if (bids.length >= 1) {
    highestBid = `${sortedBids[0].amount} $`;
  }

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

  bidEndingContainer.innerHTML = `<div class="flex flex-col"><p class="uppercase">Highest bid</p><p class="font-medium">${highestBid}</p></div>
  <div class="flex flex-col"><p class="uppercase">Ending</p><p class="font-medium">${endsAtFormatted}</p></div>`;

  /// Classes
  listing.classList.add(
    "container",
    "rounded-sm",
    "bg-lightGray",
    "text-black",
    "flex",
    "flex-col",
    "mx-auto",
    "listing",
    "overflow-hidden"
  );
  mediaContainer.classList.add("media-container");
  mediaImg.classList.add("w-full", "mx-auto", "media-img");
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
  listingDescription.classList.add("truncate");
  bidEndingContainer.classList.add("flex", "justify-between", "mt-4");

  // Append
  mediaContainer.append(mediaImg);
  listingHeader.append(listingSeller, listingCreated);
  infoContainer.append(listingHeader, listingTitle, listingDescription, bidEndingContainer);
  listingContainer.append(mediaContainer, infoContainer);
  listing.append(listingContainer);

  return listing;
}
