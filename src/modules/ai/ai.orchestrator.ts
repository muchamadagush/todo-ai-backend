import OpenAI from 'openai';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { BreakdownOutputSchema } from './ai.schemas';
import { PROMPT_BREAKDOWN } from './ai.prompts';
import { AiFeature } from './ai.types';
import { logger } from '../../shared/logger';

const openai = new OpenAI({
	apiKey: env.LLAMA_API_KEY || 'ollama',
	baseURL: env.LLAMA_BASE_URL || 'http://localhost:11434/v1',
});

const featureConfig = {
	breakdown: { prompt: PROMPT_BREAKDOWN, schema: BreakdownOutputSchema },
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
			const modelName = env.LLAMA_MODEL || 'llama3.2';
			const response = await openai.chat.completions.create({
				model: modelName,
				messages: [
					{ role: 'system', content: prompt },
					{ role: 'user', content: `Context: ${JSON.stringify(context)}` }
				],
				temperature: 0.7,
				max_tokens: 2048,
				response_format: { type: 'json_object' }
			});

			aiResponse = response.choices[0]?.message?.content || '';
			tokens = response.usage?.total_tokens || 0;
			
			// Parse response
			const cleanResponse = aiResponse.trim();
			parsed = schema.safeParse(JSON.parse(cleanResponse));
			if (!parsed.success) {
				logger.error({ aiResponse, cleanResponse, error: parsed.error }, 'AI response validation failed');
				throw new Error('Validation failed: Invalid AI response format');
			}
		} catch (err: any) {
			status = 'failed';
			const errorMessage = err?.message || 'Unknown error';
			logger.error({ error: err, aiResponse, errorMessage }, 'AI orchestrator error');
		}
		
		// Log to database
		try {
			await prisma.aiLog.create({
				data: {
					feature,
					prompt: fullPrompt,
					response: aiResponse || '',
					tokens_used: tokens,
					status,
				},
			});
		} catch (logErr) {
			logger.error({ error: logErr }, 'Failed to log AI request');
		}
		
		if (status === 'failed') {
			throw new Error('AI service is currently unavailable. Please try again later.');
		}
		
		return parsed.data;
	},
};
