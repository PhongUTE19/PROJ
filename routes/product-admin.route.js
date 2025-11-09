import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const list = await productModel.findAll();
    res.render('vwAdminProduct/list', {
        productList: list
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

export default router;