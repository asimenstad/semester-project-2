import { accessToken } from "../constants/storage.mjs";
import { profileTemplate } from "../templates/profile.mjs";

/**
 * Fetches the users profile
 * @param {string} url - The URL for the get request
 * @returns {array} - Users own profile
 */
export async function fetchProfile(url) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    profileTemplate(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
