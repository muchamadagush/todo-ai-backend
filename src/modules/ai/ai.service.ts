import { AiOrchestrator } from './ai.orchestrator';
import { AppError } from '../../shared/errors';
import { AiFeature } from './ai.types';

export const AiService = {
	async runFeature(feature: AiFeature, context: any) {
		try {
			return await AiOrchestrator.run(feature, context);
		} catch (err: any) {
			throw new AppError('AI suggestion failed', 400, err);
		}
	},
};
