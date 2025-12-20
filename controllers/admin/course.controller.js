import courseService from '../../services/course.service.js';

const list = async (req, res) => {
    const courses = await courseService.getAll();
    res.render('pages/admin/course/list', {
        courses
    });
};

const addPage = (req, res) => {
    res.render('pages/admin/course/add');
};

const editPage = async (req, res) => {
    const course = await courseService.getById(req.query.id);
    if (!course)
        return res.redirect('/admin/course/list');

    res.render('pages/admin/course/edit', {
        course
    });
};

const add = async (req, res) => {
    await courseService.create(req.body);
    res.render('pages/admin/course/add');
};

const edit = async (req, res) => {
    await courseService.update(req.body.id, req.body);
    res.redirect('/admin/course/list');
};

const del = async (req, res) => {
    await courseService.remove(req.body.id);
    res.redirect('/admin/course/list');
};

export default {
    list,
    addPage,
    editPage,
    add,
    edit,
    del
};
