import { Router } from 'express';
import { AiController } from './ai.controller';

const router = Router();

router.post('/breakdown', AiController.breakdown);

export default router;
