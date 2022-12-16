import { accessToken } from "../constants/storage.mjs";
import { displayError } from "../components/errorMessage.mjs";

/**
 * Lets user edit their own listings
 * @param {string} url - The URL for the put request
 * @param {object} data - The new listing data
 */
export async function editListing(url, data) {
  try {
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, putData);
    const json = await response.json();

    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      const errorMessage = json.errors[0].message;
      displayError(errorMessage);
    } else {
      const form = document.getElementById("editListingForm");
      form.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
