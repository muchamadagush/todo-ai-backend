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
