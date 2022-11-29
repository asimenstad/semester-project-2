import { accessToken } from "../constants/storage.mjs";
import { profileTemplate } from "../templates/profile.mjs";

export async function fetchData(url) {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    profileTemplate(json);

    return json;
  } catch (error) {
    console.log(error);
  }
}
