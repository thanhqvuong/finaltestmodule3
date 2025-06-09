import express from 'express';
import { getAllTeachers, createTeacher } from '../controllers/Teacher.controller.js';

const router = express.Router();

router.get('/teachers', getAllTeachers);
router.post('/teachers', createTeacher);

export default router;
