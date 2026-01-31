import { Request, Response } from 'express';
import { AiService } from './ai.service';
import { sendSuccess, sendError } from '../../shared/response';

export const AiController = {
	async breakdown(req: Request, res: Response) {
		try {
			const suggestion = await AiService.runFeature('breakdown', req.body);
			return sendSuccess(res, suggestion, 'AI breakdown suggestion');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},
	async priority(req: Request, res: Response) {
		try {
			const suggestion = await AiService.runFeature('priority', req.body);
			return sendSuccess(res, suggestion, 'AI priority suggestion');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},
	async summary(req: Request, res: Response) {
		try {
			const suggestion = await AiService.runFeature('summary', req.body);
			return sendSuccess(res, suggestion, 'AI summary suggestion');
		} catch (err: any) {
			return sendError(res, err, err.statusCode || 400);
		}
	},
};
