import express from 'express';
import { getAllTeachers } from '../controllers/Teacher.controller.js';

const router = express.Router();

router.get('/teachers', getAllTeachers);

export default router;
