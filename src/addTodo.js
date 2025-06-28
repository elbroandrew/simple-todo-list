import { createTask } from './api.js';
import { showToast } from './showToast.js';


export async function add_todo() {
  const input = document.querySelector('.input-block__input-elem');
  const title = input.value.trim();
  
  if (!title) {
    showToast('Please enter task title');
    return;
  }

  try {
    const newTask = await createTask(title);
    console.log('Task created:', newTask);
    showToast(`Новая задача: ${newTask}`)
    
    // Очищаем поле ввода
    input.value = '';
    
    // Обновляем список задач (реализуйте эту функцию)
    await updateTaskList();
  } catch (error) {
    console.error('Error:', error);
    showToast('Failed to create task. Please try again.');
  }
}

async function updateTaskList() {
  const tasks = await getTasks();
  renderTasks(tasks);
}