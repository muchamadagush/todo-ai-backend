import { Response } from 'express';


function replacer(_key: string, value: any) {
	return typeof value === 'bigint' ? value.toString() : value;
}

export function sendSuccess(res: Response, data: any, message = 'OK') {
	return res.setHeader('Content-Type', 'application/json')
		.send(JSON.stringify({ success: true, message, data }, replacer));
}

export function sendError(res: Response, error: any, status = 400) {
	return res.status(status)
		.setHeader('Content-Type', 'application/json')
		.send(JSON.stringify({ success: false, message: error.message || 'Error', details: error.details || undefined }, replacer));
}
