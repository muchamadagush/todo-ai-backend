import dotenv from 'dotenv';
dotenv.config();

export const env = {
	DB_USER: process.env.DB_USER || '',
	DB_PASS: process.env.DB_PASS || '',
	DB_NAME: process.env.DB_NAME || '',
	DB_HOST: process.env.DB_HOST || '',
	DB_PORT: process.env.DB_PORT || '',
	DB_TIMEZONE: process.env.DB_TIMEZONE || '',
	OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
};
