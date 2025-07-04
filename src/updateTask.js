import { updateTask } from './api.js';
import { showToast } from './showToast.js';


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
        showToast("Неверный ID задачи")
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
        if (error.message.includes("Задача не найдена")){
          taskItem.remove();
        }
        showToast(error.message || 'Ошибка обновления задачи');
      }
    });
  });
}