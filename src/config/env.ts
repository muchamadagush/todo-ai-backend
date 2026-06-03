import dotenv from 'dotenv';
dotenv.config();

export const env = {
	DB_USER: process.env.DB_USER || '',
	DB_PASS: process.env.DB_PASS || '',
	DB_NAME: process.env.DB_NAME || '',
	DB_HOST: process.env.DB_HOST || '',
	DB_PORT: process.env.DB_PORT || '',
	DB_TIMEZONE: process.env.DB_TIMEZONE || '',
	LLAMA_BASE_URL: process.env.LLAMA_BASE_URL || '',
	LLAMA_API_KEY: process.env.LLAMA_API_KEY || '',
	LLAMA_MODEL: process.env.LLAMA_MODEL || '',
};
