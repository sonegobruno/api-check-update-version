import { Router } from 'express';
import AppController from './controllers/AppController';

const router = Router();

const appController = new AppController();

router.get('/app/:id', appController.show);
router.post('/app', appController.create);
router.put('/app', appController.update);
router.delete('/app/:id', appController.delete);

export default router;