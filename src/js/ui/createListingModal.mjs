export function toggleCreateListingModal(btn) {
  const createListingModal = document.getElementById("createListingModal");
  const exitModal = document.getElementById("closeCreateListingModal");
  btn.addEventListener("click", () => {
    createListingModal.classList.toggle("hidden");
  });

  exitModal.addEventListener("click", () => {
    createListingModal.classList.toggle("hidden");
  });
}
