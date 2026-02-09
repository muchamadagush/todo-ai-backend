export type AiFeature = 'breakdown';

export interface AiLog {
	id: bigint;
	feature: AiFeature;
	prompt: string;
	response: string;
	tokens_used: number;
	status: 'success' | 'failed';
	created_at: Date;
}
