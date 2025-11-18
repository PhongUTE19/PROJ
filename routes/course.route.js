import express from 'express';
import categoryModel from '../models/category.model.js';
import courseModel from '../models/course.model.js';

const router = express.Router();

router.get('/list', async function (req, res) {
    const categoryId = req.query.categoryId || 0;

    let categoryName = '';
    if (categoryId == 0) {
        categoryName = 'Tất cả khóa học';
    }
    else {
        const category = await categoryModel.findById(categoryId);
        if (category) {
            categoryName = category.name;
        }
    }

    const limit = 9;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const courses = categoryId == 0 ?
        await courseModel.findPage(limit, offset) :
        await courseModel.findPageByCategory(categoryId, limit, offset);
    const total = categoryId == 0 ?
        await courseModel.count() :
        await courseModel.countByCategory(categoryId);
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

    res.render('vwCourse/list', {
        courses: courses,
        categoryName: categoryName,
        categoryId: categoryId,
        pageNumbers: pageNumbers,
        prevPage: prevPage,
        nextPage: nextPage,
    });
});

router.get('/detail', async function (req, res) {
    const courseId = req.query.courseId || 0;
    const course = await courseModel.findById(courseId);
    if (!course) {
        return res.redirect('/');
    }
    res.render('vwCourse/detail', {
        course: course
    });
});

router.get('/search', async function (req, res) {
    const q = req.query.q || '';
    if (q.length === 0) {
        res.render('vwCourse/list', {
            q: q,
            empty: true,
        });
    }

    const keywords = q.replace(/ /g, ' & ');
    const courses = await courseModel.search(keywords);
    res.render('vwCourse/list', {
        q: q,
        empty: courses.length === 0,
        courses: courses,
        pages: [],
    });
});

export default router;