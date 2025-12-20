import courseService from '../services/course.service.js';

const list = async (req, res) => {
    const data = await courseService.getCourseList(req.query);
    res.render('pages/course/list', data);
};

const detail = async (req, res) => {
    const data = await courseService.getCourseDetail(req.query.courseId);
    if (!data) return res.redirect('/');
    res.render('pages/course/detail', data);
};

const search = async (req, res) => {
    const data = await courseService.searchCourses(req.query.q);
    res.render('pages/course/list', data);
};

export default { list, detail, search };
