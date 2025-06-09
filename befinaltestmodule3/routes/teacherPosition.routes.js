import express from 'express';
import { getAllPositions, createPosition } from '../controllers/Position.controller.js';

const router = express.Router();

router.get('/teacher-positions', getAllPositions);
router.post('/teacher-positions', createPosition);

export default router;
