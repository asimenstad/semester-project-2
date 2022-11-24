import { openMenu } from "./components/hamburger.mjs";
import { registerUserListener } from "./api/register.mjs";

const path = location.pathname;

openMenu();

if (path === "/signup.html") {
  registerUserListener();
}
