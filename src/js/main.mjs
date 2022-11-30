import { openMenu } from "./components/hamburger.mjs";
import { registerUserListener } from "./api/register.mjs";
import { loginUserListener } from "./api/login.mjs";
import { fetchProfile } from "./api/fetchProfile.mjs";
import {
  baseUrl,
  profileUrl,
  listingsUrl,
  listingsFlag,
  sellerFlag,
  bidsFlag,
  sortCreatedFlag,
  orderDescFlag,
} from "./constants/url.mjs";
import { fetchListings } from "./api/fetchListings.mjs";
import { createListingListener } from "./api/createListing.mjs";

const path = location.pathname;

openMenu();

if (path === "/signup.html") {
  registerUserListener();
} else if (path === "/login.html") {
  loginUserListener();
} else if (path === "/profile.html") {
  fetchProfile(`${baseUrl}${profileUrl}?${listingsFlag}`);
  fetchListings(`${baseUrl}${profileUrl}${listingsUrl}?${sellerFlag}&${bidsFlag}`);
  createListingListener();
} else if (path === "/index.html") {
  fetchListings(`${baseUrl}${listingsUrl}?${sellerFlag}&${bidsFlag}&${sortCreatedFlag}&${orderDescFlag}`);
  createListingListener();
}
