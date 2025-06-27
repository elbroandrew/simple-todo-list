import { drawApp } from "./drawApp.js";
import { add_todo } from "./addTodo.js";
import { removeAll } from "./removeAllTodos.js";
import { removeSelected } from "./removeSelectedTodos.js";
import { isAuthenticated } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!isAuthenticated() && !window.location.pathname.endsWith('login.html')) {
    window.location.href = '/login.html';
    return;
  }

  drawApp(document.querySelector(".container"));
});

// // Инициализация приложения
// function initApp() {
//   drawApp(document.querySelector(".container"));
  
//   // Проверка авторизации
//   if (!localStorage.getItem('accessToken')) {
//     // Перенаправление на страницу логина или показ формы
//     console.log('User not authenticated');
//   }
  
//   setupEventListeners();
// }

// function setupEventListeners() {
//   document.querySelector(".input-block__add-button-elem")?.addEventListener("click", add_todo);
//   document.querySelector(".remove-todos-button")?.addEventListener("click", removeAll);
//   document.querySelector(".remove-selected-todos-button")?.addEventListener("click", removeSelected);
// }

// document.addEventListener("DOMContentLoaded", initApp);