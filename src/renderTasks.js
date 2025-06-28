import { deleteTask } from './api.js';
import { setupTaskUpdate } from './updateTask.js';
import { showToast } from './showToast.js';


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
      const taskItem = e.target.closest('.task-item');
      const taskId = taskItem.dataset.id;
      const taskTitle = taskItem.querySelector('span').textContent;
      if (confirm('Delete this task?')) {
        try {
          const res = await deleteTask(taskId);
          if (res && res.status === 'success'){
            taskItem.remove();
            showToast(`Задача "${taskTitle}" удалена`);
          }else{
            showToast("Неожиданный ответ от сервера");
            throw new Error("Unexpected response from server.")
          }
        } catch (error) {
          showToast(`Не удалось удалить задачу ${taskTitle}`);
        }
      }
    });
  });
}