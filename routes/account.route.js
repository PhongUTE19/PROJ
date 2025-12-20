import express from 'express';
import accountController from '../controllers/account.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/signup', accountController.signupPage);
router.get('/signin', accountController.signinPage);
router.get('/profile', authMiddleware.requireAuth, accountController.profilePage);
router.get('/change-password', authMiddleware.requireAuth, accountController.changePasswordPage);
router.get('/is-available', accountController.isAvailable);

router.post('/signup', accountController.signup);
router.post('/signin', accountController.signin);
router.post('/signout', accountController.signout);
router.post('/profile', authMiddleware.requireAuth, accountController.updateProfile);
router.post('/change-password', authMiddleware.requireAuth, accountController.changePassword);

export default router;