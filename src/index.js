import { drawApp } from "./drawApp.js";
import { isAuthenticated } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated() && !window.location.pathname.endsWith('login.html')) {
    window.location.href = '/login.html';
    return;
  }

  drawApp(document.querySelector(".container"));
});
