import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { authMiddleware } from './middleware/authMiddleware.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'PadosiPro API is running',
  });
});
app.get('/api/test-auth', authMiddleware,(req,res)=>{
  res.json({
    success:true,
    message:'Authentication successful',
    user:req.user
  })
})
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes)
app.use('/api/tasks',taskRoutes)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});