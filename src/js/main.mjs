import { openMenu } from "./components/hamburger.mjs";
import { registerUserListener } from "./listeners/registerListener.mjs";
import { loginUserListener } from "./listeners/loginListener.mjs";
import { fetchProfile } from "./api/fetchProfile.mjs";
import {
  baseUrl,
  profileUrl,
  listingsUrl,
  specificListingUrl,
  listingsFlag,
  sellerFlag,
  bidsFlag,
  sortCreatedFlag,
  orderDescFlag,
  activeFlag,
} from "./constants/url.mjs";
import { fetchListings } from "./api/fetchListings.mjs";
import { fetchSpecificListing } from "./api/fetchSpecificListing.mjs";
import { createListingListener } from "./api/createListing.mjs";
import { editAvatarListener } from "./api/editAvatar.mjs";

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
  editAvatarListener();
} else if (path === "/index.html") {
  fetchListings(`${baseUrl}${listingsUrl}?${sellerFlag}&${bidsFlag}&${sortCreatedFlag}&${orderDescFlag}&${activeFlag}`);
  createListingListener();
} else if (path === "/specific-listing.html") {
  fetchSpecificListing(`${baseUrl}${specificListingUrl}?${sellerFlag}&${bidsFlag}`);
}
