import { accessToken } from "../constants/storage.mjs";

export async function deleteListing(url) {
  try {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, deleteData);
    if (response.ok) {
      window.location.href = "/profile.html";
    }
  } catch (error) {
    console.log(error);
  }
}
