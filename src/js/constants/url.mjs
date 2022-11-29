import { username } from "./storage.mjs";

export const baseUrl = "https://api.noroff.dev/api/v1/auction";

export const registerUrl = "/auth/register";
export const loginUrl = "/auth/login";
export const profileUrl = `/profiles/${username}`;
export const listingsUrl = `/profiles/${username}/listings`;

export const listingsFlag = "_listings=true";
export const sellerFlag = "_seller=true";
export const bidsFlag = "_bids=true";
