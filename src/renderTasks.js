import { deleteTask } from './api.js';
import { setupTaskUpdate } from './updateTask.js';


export function renderTasks(tasks) {
  const list = document.querySelector('.todo-container__list');
  
  list.innerHTML = tasks.map(task => `
    <li class="task-item" data-id="${task.ID}">
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${task.completed ? 'checked' : ''}
      >
      <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
      <button class="delete-task-btn">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `).join('');

  setupTaskUpdate();

  document.querySelectorAll('.delete-task-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const taskId = e.target.closest('.task-item').dataset.id;
      if (confirm('Delete this task?')) {
        try {
          await deleteTask(taskId);
          e.target.closest('.task-item').remove();
        } catch (error) {
          alert('Failed to delete task');
        }
      }
    });
  });
}