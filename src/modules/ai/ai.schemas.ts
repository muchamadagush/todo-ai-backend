import { z } from 'zod';

export const BreakdownOutputSchema = z.object({
	subtasks: z.array(z.object({
		id: z.number(),
		task: z.string().optional(),
		task_name: z.string().optional(),
		description: z.string(),
		status: z.string().optional()
	}))
});

export const PriorityOutputSchema = z.object({
	priority: z.number().int().min(1).max(100),
});

export const SummaryOutputSchema = z.object({
	summary: z.string().min(1),
});
