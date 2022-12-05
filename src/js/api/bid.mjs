import { accessToken } from "../constants/storage.mjs";

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

    console.log(json);
    if ((json.statusCode === 400) | (json.statusCode === 500)) {
      console.log("error");
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
