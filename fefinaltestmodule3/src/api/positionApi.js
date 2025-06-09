import axios from 'axios';

const API = 'http://localhost:3001/api';

export const getPositions = () =>
  axios.get(`${API}/teacher-positions`);

export const createPosition = (data) =>
  axios.post(`${API}/teacher-positions`, data);
