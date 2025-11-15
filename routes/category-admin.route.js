import express from 'express';
import categoryModel from '../models/category.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const categories = await categoryModel.findAll();
    res.render('vwAdminCategory/list', {
        categories: categories
    });
});

router.get('/add', function (req, res) {
    res.render('vwAdminCategory/add');
});

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const category = await categoryModel.findById(id);
    if (category === null) {
        return res.redirect('/admin/category');
    }

    res.render('vwAdminCategory/edit', {
        category: category
    });
});

router.post('/add', async function (req, res) {
    const category = {
        catname: req.body.catname
    };
    await categoryModel.add(category);
    res.render('vwAdminCategory/add');
});

router.post('/del', async function (req, res) {
    const id = req.body.id;
    await categoryModel.del(id);
    res.redirect('/admin/category');
});

router.post('/edit', async function (req, res) {
    const id = req.body.id;
    const category = {
        catname: req.body.catname
    };
    await categoryModel.edit(id, category);
    res.redirect('/admin/category');
});

export default router;