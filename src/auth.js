import { makeRequest } from './api.js';
import { showToast } from './showToast.js';

export async function login(email, password) {
  try {
    const response = await makeRequest('POST', '/auth/login', { email, password });
    localStorage.setItem('accessToken', response.token);
    return response.user;
  } catch (error) {
    console.error('Login failed:', error);
    showToast("Login failed. Please check your credentials.");
    throw error;
  }
}

export async function logout() {
  try {
    await makeRequest('POST', '/auth/logout');
    localStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Logout failed:', error);
    showToast("Logout failed");
    throw error;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}