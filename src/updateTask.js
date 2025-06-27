import { updateTask } from './api.js';

export function setupTaskUpdate() {
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', async (e) => {
      const taskItem = e.target.closest('.task-item');
      if (!taskItem) {
        console.error('Задача не найдена');
        return;
      }

      const taskId = taskItem.dataset.id;
      if (!taskId) {
        console.error('ID задачи не определен!');
        return;
      }

      const isCompleted = e.target.checked;
      const textSpan = taskItem.querySelector('span');
      
      // Визуальное обновление
      textSpan.classList.toggle('completed', isCompleted);
      
      try {
        console.log(`Sending PUT /tasks/${taskId}`, { completed: isCompleted });
        await updateTask(taskId, isCompleted);
      } catch (error) {
        // Откат при ошибке
        e.target.checked = !isCompleted;
        textSpan.classList.toggle('completed', !isCompleted);
        alert('Ошибка обновления задачи');
      }
    });
  });
}