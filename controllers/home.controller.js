import courseService from '../services/course.service.js';
import faqService from '../services/faq.service.js';
import { CONST } from '../config/constant.js';

const index = async (req, res) => {
    const courses = await courseService.getAll();
    res.render('pages/common/home', {
        courses: courses.slice(0, CONST.CAROUSEL_ITEMS),
    });
};

const faqs = async (req, res) => {
    const faqs = await faqService.getAll();
    res.render('pages/common/faqs', {
        faqs,
    });
};


const about = async (req, res) => {
    res.render('pages/common/about');
};

export default {
    index,
    faqs,
    about
};
