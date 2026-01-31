import { Router } from 'express';
import { AiController } from './ai.controller';

const router = Router();

router.post('/breakdown', AiController.breakdown);
router.post('/priority', AiController.priority);
router.post('/summary', AiController.summary);

export default router;
