import categoryService from '../../services/category.service.js';

const list = async (req, res) => {
    const categories = await categoryService.findAll();
    res.render('pages/admin/category/list', {
        categories
    });
};

const addPage = (req, res) => {
    res.render('pages/admin/category/add');
};

const editPage = async (req, res) => {
    const category = await categoryService.findById(req.query.id);
    if (!category) return res.redirect('/admin/category/list');

    res.render('pages/admin/category/edit', {
        category
    });
};

const add = async (req, res) => {
    await categoryService.create(req.body);
    res.render('pages/admin/category/add');
};

const edit = async (req, res) => {
    await categoryService.update(req.body.id, req.body);
    res.redirect('/admin/category/list');
};

const del = async (req, res) => {
    await categoryService.remove(req.body.id);
    res.redirect('/admin/category/list');
};

export default {
    list,
    addPage,
    editPage,
    add,
    edit,
    del
};
