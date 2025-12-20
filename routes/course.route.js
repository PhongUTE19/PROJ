import express from 'express';
import courseController from '../controllers/course.controller.js';

const router = express.Router();

router.get('/list', courseController.list);
router.get('/detail', courseController.detail);
router.get('/search', courseController.search);

export default router;