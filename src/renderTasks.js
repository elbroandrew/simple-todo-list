import { deleteTask, updateTask } from './api.js';

export function renderTasks(tasks) {
  const list = document.querySelector('.todo-container__list');
  
  list.innerHTML = tasks.map(task => `
    <li class="task-item" data-id="${task.id}">
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${task.completed ? 'checked' : ''}
      >
      <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
      <button class="delete-task-btn">
        <i class="fas fa-trash"></i>
      </button>
    </li>
  `).join('');

  // Добавляем обработчики событий
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', async (e) => {
      const taskId = e.target.closest('.task-item').dataset.id;
      try {
        await updateTask(taskId, e.target.checked);
        e.target.nextElementSibling.classList.toggle('completed');
      } catch (error) {
        e.target.checked = !e.target.checked; // Откатываем изменение
        alert('Failed to update task');
      }
    });
  });

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