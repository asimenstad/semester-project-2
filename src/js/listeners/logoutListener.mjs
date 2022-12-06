import { accessToken } from "../constants/storage.mjs";

export function logout() {
  const isLoggedIn = document.querySelectorAll(".logged-in");
  const isLoggedOut = document.querySelectorAll(".logged-out");

  if (accessToken !== "") {
    isLoggedIn.forEach((logoutBtn) => {
      logoutBtn.classList.remove("hidden");
    });
    isLoggedOut.forEach((loginBtn) => {
      loginBtn.classList.add("hidden");
    });
  } else {
    isLoggedIn.forEach((logoutBtn) => {
      logoutBtn.classList.add("hidden");
    });
    isLoggedOut.forEach((loginBtn) => {
      loginBtn.classList.remove("hidden");
    });
  }

  console.log(isLoggedOut);
  /* 
  logoutBtns.forEach((logout) => {
    logout.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("avatar");
      window.location.href = "/index.html";
    });
  });
  */
}
