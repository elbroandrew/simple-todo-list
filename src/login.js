
import { login } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await login(email, password);
    window.location.href = '/'; // Перенаправляем на главную после успешного входа
  } catch (error) {
    alert('Login failed. Please check your credentials.');
  }
});