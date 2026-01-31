import app from './app';
import { env } from './config/env';
import { logger } from './shared/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
