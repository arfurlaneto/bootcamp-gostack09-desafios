import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import MembershipPlanController from './app/controllers/MembershipPlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

routes.get('/membership-plans', MembershipPlanController.index);
routes.post('/membership-plans', MembershipPlanController.store);
routes.get('/membership-plans/:id', MembershipPlanController.show);
routes.put('/membership-plans/:id', MembershipPlanController.update);
routes.delete('/membership-plans/:id', MembershipPlanController.destroy);

routes.get('/memberships', MembershipController.index);
routes.post('/memberships', MembershipController.store);
routes.get('/memberships/:id', MembershipController.show);
routes.put('/memberships/:id', MembershipController.update);
routes.delete('/memberships/:id', MembershipController.destroy);

routes.get('/answers', AnswerController.index);
routes.post('/answers/:id', AnswerController.store);

export default routes;
