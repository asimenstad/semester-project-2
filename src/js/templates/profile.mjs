export function profileTemplate(data) {
  const {
    name,
    _count: { listings },
    credits,
    avatar,
  } = data;

  // Containers
  const container = document.getElementById("profileContainer");
  const profileContainer = document.createElement("div");
  const avatarContainer = document.createElement("div");
  const infoContainer = document.createElement("div");

  // Elements
  /// Avatar
  const profileAvatar = document.createElement("img");
  if (avatar !== "") {
    profileAvatar.src = avatar;
  } else {
    profileAvatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }
  profileAvatar.alt = name;

  /// Info
  const profileName = document.createElement("h1");
  const counts = document.createElement("div");

  profileName.textContent = name;
  counts.innerHTML = `<p>${listings} Listings</p> | <p>${credits} Credits</p>`;

  /// Buttons
  const buttons = document.createElement("div");
  const avatarBtn = document.createElement("button");
  const createListingBtn = document.createElement("button");

  avatarBtn.textContent = "Edit avatar";
  createListingBtn.textContent = "Create new listing";

  /// Modals
  const createListingModal = document.getElementById("createListingModal");
  const exitModal = document.getElementById("closeCreateListingModal");
  createListingBtn.addEventListener("click", () => {
    createListingModal.classList.toggle("hidden");
  });

  exitModal.addEventListener("click", () => {
    createListingModal.classList.toggle("hidden");
  });

  const editAvatarModal = document.getElementById("editAvatarModal");
  const exitAvatarModal = document.getElementById("closeEditAvatarModal");
  avatarBtn.addEventListener("click", () => {
    editAvatarModal.classList.toggle("hidden");
  });

  exitAvatarModal.addEventListener("click", () => {
    editAvatarModal.classList.toggle("hidden");
  });

  // Classes
  profileContainer.classList.add(
    "container",
    "mx-auto",
    "rounded-sm",
    "bg-lightGray",
    "text-black",
    "flex",
    "flex-col",
    "max-w-md",
    "md:max-w-full",
    "md:flex-row"
  );
  avatarContainer.classList.add("mx-auto", "md:mx-0", "p-8", "md:p-0");
  profileAvatar.classList.add("aspect-square", "max-w-xs");
  infoContainer.classList.add("flex", "flex-col", "p-8", "text-center", "justify-center", "gap-4", "md:text-left");
  profileName.classList.add("font-display", "text-2xl", "capitalize");
  counts.classList.add("flex", "gap-2", "mx-auto", "md:mx-0");
  buttons.classList.add("flex", "mx-auto", "gap-2", "flex-col", "md:flex-row");
  avatarBtn.classList.add(
    "btn",
    "border",
    "border-main",
    "text-main",
    "px-4",
    "py-1.5",
    "rounded-sm",
    "hover:bg-main",
    "hover:border-main",
    "hover:text-white"
  );
  createListingBtn.classList.add(
    "btn",
    "border",
    "border-main",
    "bg-main",
    "text-white",
    "px-4",
    "py-1.5",
    "rounded-sm",
    "hover:bg-black",
    "hover:border-black",
    "hover:text-white"
  );

  // Append
  avatarContainer.append(profileAvatar);
  buttons.append(avatarBtn, createListingBtn);
  infoContainer.append(profileName, counts, buttons);
  profileContainer.append(avatarContainer, infoContainer);
  container.append(profileContainer);
}
