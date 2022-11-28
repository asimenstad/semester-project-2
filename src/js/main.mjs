import { openMenu } from "./components/hamburger.mjs";
import { registerUserListener } from "./api/register.mjs";
import { loginUserListener } from "./api/login.mjs";

const path = location.pathname;

openMenu();

if (path === "/signup.html") {
  registerUserListener();
} else if (path === "/login.html") {
  loginUserListener();
}
