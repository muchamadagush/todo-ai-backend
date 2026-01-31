import { z } from 'zod';

export const TaskStatusEnum = z.enum(['todo', 'doing', 'done']);

export const TaskCreateSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().optional().nullable(),
	priority: z.number().int().min(1).max(100),
	deadline: z.coerce.date().optional().nullable(),
	status: TaskStatusEnum.default('todo'),
	ai_generated: z.boolean().optional(),
});

export const TaskUpdateSchema = TaskCreateSchema.partial();
