import { openMenu } from "./components/hamburger.mjs";
import { registerUserListener } from "./api/register.mjs";
import { loginUserListener } from "./api/login.mjs";
import { fetchData } from "./api/fetchData.mjs";
import { baseUrl, profileUrl } from "./constants/url.mjs";

const path = location.pathname;

openMenu();

if (path === "/signup.html") {
  registerUserListener();
} else if (path === "/login.html") {
  loginUserListener();
} else if (path === "/profile.html") {
  fetchData(`${baseUrl}${profileUrl}`);
}
