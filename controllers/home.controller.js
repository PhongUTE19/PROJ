import courseService from '../services/course.service.js';
import { CONST } from '../utils/constant.js';

const index = async (req, res) => {
    const courses = await courseService.getAll();
    res.render('pages/common/home', {
        courses: courses.slice(0, CONST.CAROUSEL_ITEMS),
    });
};

export default {
    index
};
