
const express = require('express');
const cors = require('cors');
const path = require('path'); // Модуль для работы с путями к файлам
const axios = require('axios');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000; // Порт, на котором будет работать ваш Express сервер
const API_URL = 'http://localhost:8080'; // Go-бэкенд

// --- Настройка CORS ---
// Опция 1: Разрешить доступ со всех доменов (НЕ РЕКОМЕНДУЕТСЯ ДЛЯ ПРОДАКШЕНА)
// app.use(cors());

// Опция 2: Разрешить доступ с конкретного источника (например, ваш фронтенд на другом порту)
// Предположим, ваш фронтенд (который может быть отдельным приложением или даже клиентом)
// запущен на http://localhost:3000.

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
];

const corsOptions = {
  origin: allowedOrigins, // Укажите URL вашего фронтенда
  optionsSuccessStatus: 200, // Для старых браузеров
  credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// --- Сервирование статических файлов ---
// Express будет искать файлы в папке 'src' 
app.use(express.static(path.join(__dirname, 'src')));

// Прокси для API запросов
app.use('/api', async (req, res) => {
  try {
    const { method, originalUrl, body, headers, cookies } = req;
    
    // Формируем заголовки для Go-бэкенда
    const backendHeaders = {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': headers.authorization || ''
    };

    // Удаляем лишние заголовки
    delete backendHeaders.host;
    delete backendHeaders.origin;
    delete backendHeaders.referer;

    const response = await axios({
      method,
      url: `${API_URL}${originalUrl.replace('/api', '')}`,
      data: body,
      headers: backendHeaders,
      withCredentials: true
    });

    // Передаем cookies и заголовки от бэкенда
    if (response.headers['set-cookie']) {
      res.setHeader('Set-Cookie', response.headers['set-cookie']);
    }
    if (response.headers['new-access-token']) {
      res.setHeader('New-Access-Token', response.headers['new-access-token']);
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


// Все остальные запросы -> index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// --- Дополнительный пример: API endpoint ---
// Этот endpoint будет доступен для запросов с фронтенда
// и покажет, как CORS работает.
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Данные успешно получены с Express API!',
    timestamp: new Date().toISOString()
  });
});

// --- Запуск сервера ---
app.listen(PORT, () => {
  console.log(`Сервер Express запущен на http://localhost:${PORT}`);
  console.log(` Ваш index.html доступен по адресу http://localhost:${PORT}`);
  console.log(` API endpoint /api/data доступен по адресу http://localhost:${PORT}/api/data`);
  console.log(` Разрешен доступ для origin: ${corsOptions.origin}`);
});
