import express from 'express';
import adminCategoryController from '../../controllers/admin/category.controller.js';

const router = express.Router();

router.get('/list', adminCategoryController.list);
router.get('/add', adminCategoryController.addPage);
router.get('/edit', adminCategoryController.editPage);

router.post('/add', adminCategoryController.add);
router.post('/edit', adminCategoryController.edit);
router.post('/del', adminCategoryController.del);

export default router;