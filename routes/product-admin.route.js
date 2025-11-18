import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const products = await productModel.findAll();
    res.render('vwAdminProduct/list', {
        products: products
    });
});

router.get('/add', function (req, res) {
    res.render('vwAdminProduct/add');
});

router.post('/add', async function (req, res) {
    const product = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        shortDes: req.body.shortDes,
        longDes: req.body.longDes,
    }
    await productModel.add(product);
    res.render('vwAdminProduct/add');
});

router.post('/del', async function (req, res) {
    const id = req.body.id;
    await productModel.del(id);
    res.redirect('/admin/product');
});

export default router;