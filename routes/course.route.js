import express from 'express';
import courseModel from '../models/course.model.js';
import courseController from '../controllers/course.controller.js';

const router = express.Router();

router.get('/list', courseController.list);
router.get('/detail', courseController.detail);
router.get('/search', courseController.search);

router.get('/search', async function (req, res) {
    const q = req.query.q || '';
    if (q.length === 0) {
        res.render('pages/course/list', {
            q: q,
            empty: true,
        });
    }

    const keywords = q.replace(/ /g, ' & ');
    const courses = await courseModel.search(keywords);
    res.render('pages/course/list', {
        q: q,
        empty: courses.length === 0,
        courses: courses,
        pages: [],
    });
});

export default router;