import { z } from 'zod';

export const BreakdownOutputSchema = z.object({
	subtasks: z.array(z.string().min(1)),
});

export const PriorityOutputSchema = z.object({
	priority: z.number().int().min(1).max(100),
});

export const SummaryOutputSchema = z.object({
	summary: z.string().min(1),
});
