import { Router } from 'express';
import { TaskController } from './task.controller';

const router = Router();

router.post('/', TaskController.create);
router.get('/', TaskController.list);
router.get('/:id', TaskController.get);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.remove);

export default router;
