import express from 'express';
import categoryModel from '../models/category.model.js';
import productModel from '../models/product.model.js';

const router = express.Router();

router.get('/byCategory', async function (req, res) {
    const id = req.query.catid || 0;

    let categoryName = '?';
    const category = await categoryModel.findById(id);
    if (category) {
        categoryName = category.catname;
    }
    // const list = await productModel.findByCategory(id);
    // res.render('vwProducts/byCategory', {
    //     productList: list,
    //     categoryName: categoryName
    // });

    const limit = 4;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const list = await productModel.findPageByCategory(id, limit, offset);
    const total = await productModel.countByCategory(id);
    const nPages = Math.ceil(total.amount / limit);
    const pageNumbers = [];

    const currPage = parseInt(page);
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: i === currPage
        });
    }

    const prevPage = currPage - 1;
    const nextPage = currPage + 1;

    res.render('vwProduct/byCategory', {
        productList: list,
        categoryName: categoryName,
        catid: id,
        pageNumbers: pageNumbers,
        prevPage: prevPage,
        nextPage: nextPage,
    });
});

router.get('/detail', async function (req, res) {
    const id = req.query.proid || 0;
    const product = await productModel.findById(id);
    if (!product) {
        return res.redirect('/');
    }
    res.render('vwProduct/detail', {
        product: product
    });
});

router.get('/search', async function (req, res) {
    const q = req.query.q || '';
    if (q.length === 0) {
        res.render('vwProduct/byCategory', {
            q: q,
            empty: true,
        });
    }

    const keywords = q.replace(/ /g, ' & ');
    const productList = await productModel.search(keywords);
    res.render('vwProduct/byCategory', {
        q: q,
        empty: productList.length === 0,
        productList: productList,
        pages: [],
    });
});

export default router;