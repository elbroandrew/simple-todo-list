import { deleteAllTasks } from './api.js';
import { showToast } from './showToast.js';


export async function removeAll() {
  if (!confirm('Are you sure you want to delete ALL tasks?')) return;
  
  try {
    await deleteAllTasks();
    // Очищаем список
    document.querySelector('.todo-container__list').innerHTML = '';
  } catch (error) {
    console.error('Delete all error:', error);
    showToast('Failed to delete all tasks');
  }
}