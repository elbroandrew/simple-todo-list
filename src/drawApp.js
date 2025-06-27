import { getTasks } from './api.js';
import { renderTasks } from './renderTasks.js';
import { isAuthenticated } from './auth.js';

export function drawApp(el) {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }

  el.innerHTML = `
    <div class="header">
      <h1>ToDo App</h1>
      <button id="logoutBtn">Logout</button>
    </div>
    <div class="input-block">
      <input type="text" class="input-block__input-elem" placeholder="Add new task">
      <button class="input-block__add-button-elem">Add Task</button>
    </div>
    <div class="todo-container">
      <ul class="todo-container__list"></ul>
    </div>
    <div class="actions-block">
      <button class="remove-selected-todos-button">Remove Selected</button>
      <button class="remove-todos-button">Remove All</button>
    </div>
  `;

  // Добавляем обработчик logout
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      await logout();
      window.location.href = '/login.html';
    } catch (error) {
      console.error('Logout error:', error);
    }
  });
  
  // Загружаем и отображаем задачи
  loadAndRenderTasks();
}

async function loadAndRenderTasks() {
  try {
    const tasks = await getTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
    alert('Failed to load tasks. Please try again.');
  }
}