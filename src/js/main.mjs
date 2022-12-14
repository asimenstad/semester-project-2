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
import { fetchProfileListings } from "./api/fetchProfileListings.mjs";
import { fetchSpecificListing } from "./api/fetchSpecificListing.mjs";
import { createListingListener } from "./listeners/createListingListener.mjs";
import { editAvatarListener } from "./listeners/editAvatarListener.mjs";
import { editListingListener } from "./listeners/editListingListener.mjs";
import { logout } from "./listeners/logoutListener.mjs";
import { deleteListingListener } from "./listeners/deleteListingListener.mjs";
import { hideCreateListingBtn } from "./ui/hideCreateListing.mjs";

export const path = location.pathname;

openMenu();
logout();

if (path === "/signup.html") {
  registerUserListener();
} else if (path === "/login.html") {
  loginUserListener();
} else if (path === "/profile.html") {
  fetchProfile(`${baseUrl}${profileUrl}?${listingsFlag}`);
  fetchProfileListings(`${baseUrl}${profileUrl}${listingsUrl}?${sellerFlag}&${bidsFlag}`);
  createListingListener();
  editAvatarListener();
} else if (path === "/index.html") {
  fetchListings(`${baseUrl}${listingsUrl}?${sellerFlag}&${bidsFlag}&${sortCreatedFlag}&${orderDescFlag}&${activeFlag}`);
  createListingListener();
  hideCreateListingBtn();
} else if (path === "/specific-listing.html") {
  fetchSpecificListing(`${baseUrl}${specificListingUrl}?${sellerFlag}&${bidsFlag}`);
  editListingListener();
  deleteListingListener();
}
