import express from 'express';
import adminCourseController from '../../controllers/admin/course.controller.js';

const router = express.Router();

router.get('/list', adminCourseController.list);
router.get('/add', adminCourseController.addPage);
router.get('/edit', adminCourseController.editPage);

router.post('/add', adminCourseController.add);
router.post('/edit', adminCourseController.edit);
router.post('/del', adminCourseController.del);

export default router;