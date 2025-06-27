import { createTask } from './api.js';

export async function add_todo() {
  const input = document.querySelector('.input-block__input-elem');
  const title = input.value.trim();
  
  if (!title) {
    alert('Please enter task title');
    return;
  }

  try {
    const newTask = await createTask(title);
    console.log('Task created:', newTask);
    
    // Очищаем поле ввода
    input.value = '';
    
    // Обновляем список задач (реализуйте эту функцию)
    await updateTaskList();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to create task. Please try again.');
  }
}

async function updateTaskList() {
  // Здесь будет логика обновления списка задач
  // Например:
  const tasks = await getTasks();
  renderTasks(tasks);
}