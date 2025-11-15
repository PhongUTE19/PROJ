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
        proname: req.body.proname,
        price: parseInt(req.body.price),
        quantity: parseInt(req.body.quantity),
        catid: req.body.catid,
        tinydes: req.body.tinydes,
        fulldes: req.body.fulldes,
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