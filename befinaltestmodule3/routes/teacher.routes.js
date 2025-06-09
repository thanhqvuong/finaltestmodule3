import express from 'express';
import { getAllTeachers, createTeacher } from '../controllers/Teacher.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /api/teachers/ được gọi');
  res.json({ message: 'Danh sách giáo viên' });
});

router.post('/', createTeacher);

export default router;
