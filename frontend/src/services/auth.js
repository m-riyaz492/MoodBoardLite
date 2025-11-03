import api from './api';
import axios from "axios";

export const signup = async (form) => {
  return axios.post("http://localhost:5000/api/auth/signup", form);
};
export const login = (payload) => api.post('/auth/login', payload);