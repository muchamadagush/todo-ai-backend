import { PrismaClient } from '@prisma/client';
import { env } from './env';

const mysqlUrl = `mysql://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?connection_limit=5&timezone=${encodeURIComponent(env.DB_TIMEZONE)}`;

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: mysqlUrl,
		},
	},
});
