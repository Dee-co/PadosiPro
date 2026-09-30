import express from 'express';
import { getSelectedTasks, getTasks, selectTasks } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', authMiddleware, getTasks);
router.post('/select', authMiddleware, selectTasks);
router.get('/selected', authMiddleware, getSelectedTasks);
export default router;