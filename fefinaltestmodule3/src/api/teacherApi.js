import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const createTeacher = (teacherData) => {
  return axios.post(`${API_BASE_URL}/teachers`, teacherData);
};

// Đặt giá trị mặc định page=1, limit=10 tránh bị undefined
export const getTeachers = (page = 1, limit = 10) => {
  return axios.get(`${API_BASE_URL}/teachers?page=${page}&limit=${limit}`);
};
