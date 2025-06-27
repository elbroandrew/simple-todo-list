const API_URL = 'http://localhost:8080'; // URL Go-бэкенда

// Общая функция для API запросов
async function makeRequest(method, endpoint, data = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    credentials: 'include'
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Обновляем access token если он пришел
    const newAccessToken = response.headers.get('New-Access-Token');
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
}

// Получение всех задач
export async function getTasks() {
  return makeRequest('GET', '/tasks');
}

// Создание задачи
export async function createTask(title) {
  return makeRequest('POST', '/tasks', { title });
}

// Удаление конкретной задачи
export async function deleteTask(id) {
  return makeRequest('DELETE', `/tasks/${id}`);
}

// Удаление всех задач
export async function deleteAllTasks() {
  return makeRequest('DELETE', '/tasks');
}

// Обновление статуса задачи
export async function updateTask(id, completed) {
  return makeRequest('PUT', `/tasks/${id}`, { completed });
}
