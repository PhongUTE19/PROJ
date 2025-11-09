import express from 'express';
import categoryModel from '../models/category.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const list = await categoryModel.findAll();
    res.render('vwAdminCategory/list', {
        categoryList: list
    });
});

router.get('/add', function (req, res) {
    res.render('vwAdminCategory/add');
});

router.post('/add', async function (req, res) {
    const category = {
        // left side must match column name
        // right side must match <input name="">
        catname: req.body.catname
    };
    await categoryModel.add(category);
    res.render('vwAdminCategory/add');
});

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const category = await categoryModel.findById(id);
    if (category === null) {
        // res.redirect() uses absolute URL path, start with "/" 
        return res.redirect('/admin/category');
    }

    res.render('vwAdminCategory/edit', {
        category: category
    });
});

router.post('/del', async function (req, res) {
    const id = req.body.id;
    await categoryModel.del(id);
    res.redirect('/admin/category');
});

router.post('/patch', async function (req, res) {
    const id = req.body.id;
    const category = {
        catname: req.body.catname
    };
    await categoryModel.patch(id, category);
    res.redirect('/admin/category');
});

export default router;