import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/MongoDB.js'; // cần .js nếu là ES module
import teacherRoutes from './routes/teacher.routes.js'; // <- thiếu dòng này

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api', teacherRoutes); // <- đây cần dòng import phía trên

app.get('/', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
