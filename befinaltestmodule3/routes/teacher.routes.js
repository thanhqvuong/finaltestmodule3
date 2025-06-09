import express from 'express';
import { getAllTeachers, createTeacher } from '../controllers/Teacher.controller.js';

const router = express.Router();

router.get('/', getAllTeachers);


router.post('/', createTeacher);

export default router;
