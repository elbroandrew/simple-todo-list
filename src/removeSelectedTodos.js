import { deleteTask } from './api.js';
import { showToast } from './showToast.js';

export async function removeSelected() {
  const selected = Array.from(
    document.querySelectorAll('.task-checkbox:checked')
  );
  
  if (selected.length === 0) {
    showToast('No tasks selected');
    return;
  }
  
  if (!confirm(`Delete ${selected.length} selected tasks?`)) return;
  
  try {
    // Создаем массив промисов для удаления
    const deletePromises = selected.map(checkbox => {
      const taskId = checkbox.closest('.task-item').dataset.id;
      return deleteTask(taskId);
    });
    
    // Ждем завершения всех удалений
    await Promise.all(deletePromises);
    
    // Удаляем элементы из DOM
    selected.forEach(checkbox => {
      checkbox.closest('.task-item').remove();
    });
    
  } catch (error) {
    console.error('Delete selected error:', error);
    showToast('Failed to delete selected tasks');
  }
}