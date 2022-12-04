import { username } from "./storage.mjs";
import { id } from "../api/fetchSpecificListing.mjs";

export const baseUrl = "https://api.noroff.dev/api/v1/auction";
export const registerUrl = "/auth/register";
export const loginUrl = "/auth/login";
export const profileUrl = `/profiles/${username}`;
export const listingsUrl = "/listings";
export const specificListingUrl = `${listingsUrl}/${id}`;
export const editAvatarUrl = "/media";
export const listingsFlag = "_listings=true";
export const sellerFlag = "_seller=true";
export const bidsFlag = "_bids=true";
export const sortCreatedFlag = "sort=created";
export const orderDescFlag = "sortOrder=desc";
