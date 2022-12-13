import { baseUrl, profileUrl, editAvatarUrl } from "../constants/url.mjs";
import { editAvatar } from "../api/editAvatar.mjs";
import { avatar } from "../constants/storage.mjs";

export function editAvatarListener() {
  const currentAvatarContainer = document.getElementById("currentAvatar");
  const avatarDisplay = document.createElement("img");
  avatarDisplay.src = avatar;
  avatarDisplay.classList.add("rounded-sm", "avatar");
  currentAvatarContainer.append(avatarDisplay);
  const form = document.getElementById("editAvatarForm");
  const { avatarInput } = document.getElementById("editAvatarForm").elements;
  avatarInput.addEventListener("blur", () => {
    avatarDisplay.src = avatarInput.value;
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      avatar: avatarInput.value,
    };
    editAvatar(`${baseUrl}${profileUrl}${editAvatarUrl}`, data);
  });
}
