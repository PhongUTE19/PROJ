import express from 'express';
import homeController from '../controllers/home.controller.js';

const router = express.Router();

router.get('/', homeController.index);
router.get('/faqs', homeController.faqs);
router.get('/about', homeController.about);

export default router;
