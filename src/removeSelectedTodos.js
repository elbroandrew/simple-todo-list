// src/removeSelectedTodos.js
import { deleteTask } from './api.js';

export async function removeSelected() {
  const selected = Array.from(
    document.querySelectorAll('.task-checkbox:checked')
  );
  
  if (selected.length === 0) {
    alert('No tasks selected');
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
    alert('Failed to delete selected tasks');
  }
}