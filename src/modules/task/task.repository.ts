import { Task } from './task.types';
import { prisma } from '../../config/database';




export const TaskRepository = {
	async create(data: any) {
		return prisma.task.create({
			data,
			include: {
				dependencies: {
					include: { dependsOn: true }
				}
			}
		});
	},

	async findAll() {
		return prisma.task.findMany({
			include: {
				dependencies: {
					include: { dependsOn: true }
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		});
	},

	async findById(id: string) {
		return prisma.task.findUnique({
			where: { id },
			include: {
				dependencies: {
					include: { dependsOn: true }
				}
			}
		});
	},

	async update(id: string, data: any) {
		return prisma.task.update({
			where: { id },
			data,
			include: {
				dependencies: {
					include: { dependsOn: true }
				}
			}
		});
	},

	async delete(id: string) {
		return prisma.$transaction(async (tx) => {
			await tx.taskDependency.deleteMany({ where: { OR: [{ task_id: id }, { depends_on_task_id: id }] } });
			return tx.task.delete({ where: { id } });
		});
	},
};
