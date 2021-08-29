import { Router } from 'express';
import { appRoutes } from './app.routes';
import { authenticateRoutes } from './authenticate.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use("/app", appRoutes);
router.use("/user", userRoutes);
router.use("/sessions", authenticateRoutes);

export { router };