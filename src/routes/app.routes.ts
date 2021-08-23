import { Router } from 'express';
import { CreateAppController } from '../modules/app/useCases/CreateApp/CreateAppController';
import { UpdateAppController } from '../modules/app/useCases/UpdateApp/UpdateAppController';
import { ListAppByIdController } from '../modules/app/useCases/ListAppById/ListAppByIdController';
import { RemoveAppByIdController } from '../modules/app/useCases/RemoveAppById/RemoveAppByIdController';

const appRoutes = Router();

const createAppController = new CreateAppController();
const listAppByIdController = new ListAppByIdController();
const removeAppByIdController = new RemoveAppByIdController();
const updateAppController = new UpdateAppController();

appRoutes.get('/:id', listAppByIdController.handle);
appRoutes.post('/', createAppController.handle);
appRoutes.put('/', updateAppController.handle);
appRoutes.delete('/:id', removeAppByIdController.handle);

export { appRoutes }