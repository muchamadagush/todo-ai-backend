import { Request, Response } from 'express';
import { AiService } from './ai.service';
import { TaskService } from '../task/task.service';
import { sendSuccess, sendError } from '../../shared/response';

export const AiController = {
	async breakdown(req: Request, res: Response) {
		try {
			const { title, description } = req.body;

			// Create parent task first
			const parentTask = await TaskService.createTask({
				title,
				description,
				priority: 50,
				status: 'todo'
			});

			// Get AI breakdown for the parent task
			const suggestion = await AiService.runFeature('breakdown', {
				title: parentTask.title,
				description: parentTask.description
			});

			// Return both parent task and suggestion
			return sendSuccess(res, {
				parentTask,
				...suggestion
			}, 'AI breakdown suggestion');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},
};
