export function displayListingsCount(listings) {
  const listingsCount = document.getElementById("listingsCount");
  listingsCount.textContent = `${listings.length} Listings`;
}
