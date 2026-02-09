import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { BreakdownOutputSchema } from './ai.schemas';
import { PROMPT_BREAKDOWN } from './ai.prompts';
import { AiFeature } from './ai.types';
import { logger } from '../../shared/logger';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

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
			const model = genAI.getGenerativeModel({ 
				model: 'gemini-3-flash-preview',
				generationConfig: {
					temperature: 0.7,
					maxOutputTokens: 2048,
				}
			});
			const result = await model.generateContent(fullPrompt);
			aiResponse = result.response.text();
			
			// Clean markdown code blocks if present
			const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
			
			// Gemini API does not provide token usage directly
			parsed = schema.safeParse(JSON.parse(cleanResponse));
			if (!parsed.success) {
				logger.error({ aiResponse, cleanResponse, error: parsed.error }, 'AI response validation failed');
				throw new Error('Validation failed: Invalid AI response format');
			}
		} catch (err: any) {
			status = 'failed';
			const errorMessage = err?.message || 'Unknown error';
			const errorStatus = err?.status || err?.statusCode || 500;
			logger.error({ error: err, aiResponse, errorMessage, errorStatus }, 'AI orchestrator error');
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
