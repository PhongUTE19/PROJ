import express from 'express';
import categoryModel from '../../models/category.model.js';

const router = express.Router();

router.get('/list', async function (req, res) {
    const categories = await categoryModel.findAll();
    res.render('pages/admin/category/list', {
        categories: categories
    });
});

router.get('/add', function (req, res) {
    res.render('pages/admin/category/add');
});

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const category = await categoryModel.findById(id);
    if (category === null) {
        return res.redirect('/admin/category/list');
    }

    res.render('pages/admin/category/edit', {
        category: category
    });
});

router.post('/add', async function (req, res) {
    const category = {
        name: req.body.name,
        description: req.body.description
    };
    await categoryModel.add(category);
    res.render('pages/admin/category/add');
});

router.post('/del', async function (req, res) {
    const id = req.body.id;
    await categoryModel.del(id);
    res.redirect('/admin/category/list');
});

router.post('/edit', async function (req, res) {
    const id = req.body.id;
    const category = {
        name: req.body.name,
        description: req.body.description
    };
    await categoryModel.edit(id, category);
    res.redirect('/admin/category/list');
});

export default router;