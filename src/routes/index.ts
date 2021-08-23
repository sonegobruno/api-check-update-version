import { Router } from 'express';
import { appRoutes } from './app.routes';

const router = Router();

router.use("/app", appRoutes);

export { router };