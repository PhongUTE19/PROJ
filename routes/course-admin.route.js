import express from 'express';
import courseModel from '../models/course.model.js';

const router = express.Router();

router.get('/list', async function (req, res) {
    const courses = await courseModel.findAll();
    res.render('vwAdminCourse/list', {
        courses: courses
    });
});

router.get('/add', function (req, res) {
    res.render('vwAdminCourse/add');
});

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const course = await courseModel.findById(id);
    if (course === null) {
        return res.redirect('/admin/course/list');
    }

    res.render('vwAdminCourse/edit', {
        course: course
    });
});

router.post('/add', async function (req, res) {
    const course = {
        name: req.body.name,
        category_id: req.body.categoryId,
        short_des: req.body.shortDes,
        long_des: req.body.longDes,
        // keywords: req.body.keywords ? req.body.keywords.split(',').map(k => k.trim()) : null,,
    }
    await courseModel.add(course);
    res.render('vwAdminCourse/add');
});

router.post('/del', async function (req, res) {
    const id = req.body.id;
    await courseModel.del(id);
    res.redirect('/admin/course/list');
});

router.post('/edit', async function (req, res) {
    const id = req.body.id;
    const course = {
        name: req.body.name,
        category_id: req.body.categoryId,
        short_des: req.body.shortDes,
        long_des: req.body.longDes,
        updated_at: new Date(),
        // keywords: req.body.keywords ? req.body.keywords.split(',').map(k => k.trim()) : null,,
    };
    await courseModel.edit(id, course);
    res.redirect('/admin/course/list');
});

export default router;