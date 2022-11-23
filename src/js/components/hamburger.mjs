export function openMenu() {
  const hamburgerBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open");
    menu.classList.toggle("hidden");
  });
}
