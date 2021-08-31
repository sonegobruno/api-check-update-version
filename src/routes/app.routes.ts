import { Router } from 'express';
import { CreateAppController } from '../modules/app/useCases/CreateApp/CreateAppController';
import { UpdateAppController } from '../modules/app/useCases/UpdateApp/UpdateAppController';
import { ListAppByIdController } from '../modules/app/useCases/ListAppById/ListAppByIdController';
import { ListAppsController } from '../modules/app/useCases/ListApps/ListAppsController';
import { RemoveAppByIdController } from '../modules/app/useCases/RemoveAppById/RemoveAppByIdController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListAppByPackageIdController } from '../modules/app/useCases/ListAppByPackageId/ListAppByPackageIdController';

const appRoutes = Router();

const createAppController = new CreateAppController();
const listAppByIdController = new ListAppByIdController();
const listAppByPackageIdController = new ListAppByPackageIdController();
const listAppsController = new ListAppsController();
const removeAppByIdController = new RemoveAppByIdController();
const updateAppController = new UpdateAppController();

appRoutes.get('/:id', ensureAuthenticated, listAppByIdController.handle);
appRoutes.get('/', ensureAuthenticated,  listAppsController.handle);
appRoutes.post('/', ensureAuthenticated, createAppController.handle);
appRoutes.put('/', ensureAuthenticated, updateAppController.handle);
appRoutes.delete('/:id', ensureAuthenticated, removeAppByIdController.handle);
appRoutes.get('/package/:id_app', listAppByPackageIdController.handle);

export { appRoutes }