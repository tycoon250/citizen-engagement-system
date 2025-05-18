import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const login = async (form) => {
  const res = await API.post('/auth/login', form);
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const register = async (form) => {
  const res = await API.post('/auth/register', form);
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return res.data;
};
