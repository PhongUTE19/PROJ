import categoryModel from '../models/category.model.js';
import courseModel from '../models/course.model.js';
import { CONST } from '../utils/constant.js';

const queryList = async ({ categoryId = 0, page = 1 }) => {
    const offset = (page - 1) * CONST.PAGE_ITEMS;

    const [courses, total] = categoryId == 0
        ? [
            await courseModel.findPage(CONST.PAGE_ITEMS, offset),
            await courseModel.count()
        ]
        : [
            await courseModel.findPageByCategory(categoryId, CONST.PAGE_ITEMS, offset),
            await courseModel.countByCategory(categoryId)
        ];

    const nPages = Math.ceil(total.amount / CONST.PAGE_ITEMS);
    const pageNumbers = [];
    const currPage = parseInt(page);
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: i === currPage
        });
    }

    let filterName = 'Tất cả khóa học';
    if (categoryId != 0) {
        const category = await categoryModel.findById(categoryId);
        if (category)
            filterName = `Lọc theo: ${category.name}`;
    }

    return {
        courses,
        filter: { name: filterName, categoryId },
        pageNumbers,
        prevPage: currPage - 1,
        nextPage: currPage + 1,
    };
};

const queryDetail = async (courseId) => {
    if (!courseId) return null;

    const course = await courseModel.findById(courseId);
    if (!course) return null;

    const courses = await courseModel.findPageByCategory(course.category_id, CONST.PAGE_ITEMS, 0);

    return {
        course,
        courses
    };
};

const querySearch = async (q = '') => {
    if (!q) return { q, empty: true };

    const keywords = q.replace(/ /g, ' & ');
    const courses = await courseModel.search(keywords);

    return {
        q,
        courses,
        empty: courses.length === 0,
        pages: [],
    };
};

const getAll = async () => {
    return courseModel.findAll();
};

const getById = async (id) => {
    return courseModel.findById(id);
};

const create = async (data) => {
    const course = {
        name: data.name,
        category_id: data.categoryId,
        short_des: data.shortDes,
        long_des: data.longDes,
    };
    return courseModel.add(course);
};

const update = async (id, data) => {
    const course = {
        name: data.name,
        category_id: data.categoryId,
        short_des: data.shortDes,
        long_des: data.longDes,
        updated_at: new Date(),
    };
    return courseModel.edit(id, course);
};

const remove = async (id) => {
    return courseModel.del(id);
};

export default {
    queryList,
    queryDetail,
    querySearch,
    getAll,
    getById,
    create,
    update,
    remove,
};
