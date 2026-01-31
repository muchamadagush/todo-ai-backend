import OpenAI from 'openai';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { BreakdownOutputSchema, PriorityOutputSchema, SummaryOutputSchema } from './ai.schemas';
import { PROMPT_BREAKDOWN, PROMPT_PRIORITY, PROMPT_SUMMARY } from './ai.prompts';
import { AiFeature } from './ai.types';
import { logger } from '../../shared/logger';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const featureConfig = {
	breakdown: { prompt: PROMPT_BREAKDOWN, schema: BreakdownOutputSchema },
	priority: { prompt: PROMPT_PRIORITY, schema: PriorityOutputSchema },
	summary: { prompt: PROMPT_SUMMARY, schema: SummaryOutputSchema },
};

export const AiOrchestrator = {
	async run(feature: AiFeature, context: any) {
		const { prompt, schema } = featureConfig[feature];
		const fullPrompt = `${prompt}\nContext: ${JSON.stringify(context)}`;
		let aiResponse = '';
		let tokens = 0;
		let status: 'success' | 'failed' = 'success';
		let parsed: any = null;
		try {
			const completion = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: prompt },
					{ role: 'user', content: `Context: ${JSON.stringify(context)}` },
				],
				temperature: 0.2,
			});
			aiResponse = completion.choices[0].message?.content || '';
			tokens = completion.usage?.total_tokens || 0;
			parsed = schema.safeParse(JSON.parse(aiResponse));
			if (!parsed.success) {
				logger.error({ aiResponse, error: parsed.error }, 'AI response validation failed');
				throw new Error('Validation failed');
			}
		} catch (err) {
			status = 'failed';
			logger.error({ error: err, aiResponse }, 'AI orchestrator error');
		}
		await prisma.aiLog.create({
			data: {
				feature,
				prompt: fullPrompt,
				response: aiResponse,
				tokens_used: tokens,
				status,
			},
		});
		if (status === 'failed') throw new Error('AI suggestion failed or invalid');
		return parsed.data;
	},
};
