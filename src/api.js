const API_URL = 'http://localhost:8080'; // URL Go-бэкенда

// Общая функция для API запросов
export async function makeRequest(method, endpoint, data = null) {
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

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  // Обновляем access token если он пришел
  const newAccessToken = response.headers.get('New-Access-Token');
  if (newAccessToken) {
    localStorage.setItem('accessToken', newAccessToken);
  }

  if (response.status === 401) {
    // Перенаправляем на страницу логина
    window.location.href = '/login.html';
    throw new Error('Unauthorized');
  }

   // Для DELETE запросов с кодом 204 не пытаемся парсить JSON
  if (method === 'DELETE' && response.status === 204) {
    return { status: 'success' };
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  // Для пустых ответов с кодом 200
  if (response.status === 200 && response.headers.get('content-length') === '0') {
    return { status: 'success' };
  }

  return await response.json();
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
   if (!id) throw new Error('Task ID is required!');
  return makeRequest('PUT', `/tasks/${id}`, { completed });
}
