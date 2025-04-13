import {Router} from 'express';
import AuthController from '../controller/auth.controller.js';

const router = Router();

//Auth router
router.post('/auth/login',AuthController.login)

export default router