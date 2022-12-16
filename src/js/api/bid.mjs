import { accessToken } from "../constants/storage.mjs";
import { displayError } from "../components/errorMessage.mjs";

/**
 * Lets registered user bid on listings
 * @param {string} url - URL for the post request
 * @param {object} data - The amount of the bid
 */
export async function bidOnListing(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      const errorContainer = document.getElementById("bidError");
      const errorMessage = json.errors[0].message;
      displayError(errorContainer, errorMessage);
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
