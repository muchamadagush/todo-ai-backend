import { TaskRepository } from './task.repository';
import { TaskCreateSchema, TaskUpdateSchema } from './task.schema';
import { AppError } from '../../shared/errors';

export const TaskService = {
	async createTask(input: any) {
		const parsed = TaskCreateSchema.safeParse(input);
		if (!parsed.success) throw new AppError('Validation failed', 400, parsed.error);
		return TaskRepository.create(parsed.data);
	},

	async getTasks() {
		return TaskRepository.findAll();
	},


	async getTaskById(id: string) {
		const task = await TaskRepository.findById(id);
		if (!task) throw new AppError('Task not found', 404);
		return task;
	},


	async updateTask(id: string, input: any) {
		const parsed = TaskUpdateSchema.safeParse(input);
		if (!parsed.success) throw new AppError('Validation failed', 400, parsed.error);
		return TaskRepository.update(id, parsed.data);
	},


	async deleteTask(id: string) {
		return TaskRepository.delete(id);
	},
};
