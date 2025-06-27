import { getTasks } from './api.js';
import { renderTasks } from './renderTasks.js';
import { isAuthenticated } from './auth.js';
import { logout } from './auth.js';

export function drawApp(el) {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return;
  }

  el.innerHTML = `
    <div class="header">
      <h1>ToDo App</h1>
      <button id="logoutBtn">
      <i class="fas fa-sign-out-alt"></i>Выход
      </button>
    </div>
    <div class="input-block">
      <input type="text" class="input-block__input-elem" placeholder="Add new task">
      <button class="input-block__add-button-elem">
        <i class="fas fa-plus"></i>Создать задачу
      </button>
    </div>
    <div class="todo-container">
      <ul class="todo-container__list"></ul>
    </div>
    <div class="actions-block">
      <button class="remove-selected-todos-button">
        <i class="fas fa-trash-alt"></i> Удалить выбранные
      </button>
      <button class="remove-todos-button">
        <i class="fas fa-broom"></i> Удалить все
      </button>
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