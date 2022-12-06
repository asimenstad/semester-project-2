import { baseUrl, profileUrl, editAvatarUrl } from "../constants/url.mjs";
import { editAvatar } from "../api/editAvatar.mjs";

export function editAvatarListener() {
  const form = document.getElementById("editAvatarForm");
  const { avatar } = document.getElementById("editAvatarForm").elements;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      avatar: avatar.value,
    };
    editAvatar(`${baseUrl}${profileUrl}${editAvatarUrl}`, data);
  });
}
