import { Task } from './task.types';
import { prisma } from '../../config/database';




export const TaskRepository = {
	async create(data: Parameters<typeof prisma.task.create>[0]['data']) {
		return prisma.task.create({ data });
	},

	async findAll() {
		return prisma.task.findMany();
	},


	async findById(id: string) {
		return prisma.task.findUnique({ where: { id: id } });
	},


	async update(id: string, data: Partial<Task>) {
		return prisma.task.update({ where: { id: id }, data });
	},


	async delete(id: string) {
		return prisma.task.delete({ where: { id: id } });
	},
};
