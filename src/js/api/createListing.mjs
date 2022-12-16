import { accessToken } from "../constants/storage.mjs";
import { displayError } from "../components/errorMessage.mjs";

/**
 * Lets user create listing
 * @param {string} url - The URL for the post request
 * @param {object} data - The data for the listing
 */
export async function createListing(url, data) {
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
      const errorMessage = json.errors[0].message;
      displayError(errorMessage);
    } else {
      const form = document.getElementById("createListingForm");
      form.reset();
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
