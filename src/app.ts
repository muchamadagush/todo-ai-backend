import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './modules/task/task.routes';
import aiRoutes from './modules/ai/ai.routes';
import { logger } from './shared/logger';

const app = express();

// CORS configuration
app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:5173',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/ai', aiRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
	logger.error(err);
	res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Internal server error' });
});

export default app;
