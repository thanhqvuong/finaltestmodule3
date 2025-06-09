import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/MongoDB.js';
import teacherRoutes from './routes/teacher.routes.js';
import teacherPositionRoutes from './routes/teacherPosition.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher-positions', teacherPositionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
