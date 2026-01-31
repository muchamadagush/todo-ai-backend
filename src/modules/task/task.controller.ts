import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { sendSuccess, sendError } from '../../shared/response';

export const TaskController = {
	async create(req: Request, res: Response) {
		try {
			const task = await TaskService.createTask(req.body);
			return sendSuccess(res, task, 'Task created');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},

	async list(req: Request, res: Response) {
		try {
			const tasks = await TaskService.getTasks();
			return sendSuccess(res, tasks);
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},

	async get(req: Request, res: Response) {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			const task = await TaskService.getTaskById(id);
			return sendSuccess(res, task);
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 404);
		}
	},

	async update(req: Request, res: Response) {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			const task = await TaskService.updateTask(id, req.body);
			return sendSuccess(res, task, 'Task updated');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
			await TaskService.deleteTask(id);
			return sendSuccess(res, null, 'Task deleted');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},
};
