// src/drawApp.js
import { getTasks } from './api.js';
import { renderTasks } from './renderTasks.js';

export function drawApp(el) {
  el.innerHTML = `
    <h1>ToDo App</h1>
    <div class="input-block">
      <input type="text" class="input-block__input-elem" maxlength="50" placeholder="Add new task">
      <button class="input-block__add-button-elem">
        <i class="fas fa-plus"></i> Add Task
      </button>
    </div>
    <div class="todo-container">
      <ul class="todo-container__list">
        <!-- Tasks will be rendered here -->
      </ul>
    </div>
    <div class="actions-block">
      <button class="remove-selected-todos-button">
        <i class="fas fa-times-circle"></i> Remove Selected
      </button>
      <button class="remove-todos-button">
        <i class="fas fa-trash-alt"></i> Remove All
      </button>
    </div>
  `;
  
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