import db from '../config/database.js';

const tableName = 'courses';

const baseQuery = () => db(tableName);

// READ
const findAll = () => {
    return baseQuery();
};

const findById = (id) => {
    return baseQuery()
        .where('course_id', id)
        .first();
};

const findByCategory = (categoryId) => {
    return baseQuery()
        .where('category_id', categoryId);
};

const findPage = (limit, offset) => {
    return baseQuery()
        .limit(limit)
        .offset(offset);
};

const findPageByCategory = (categoryId, limit, offset) => {
    return baseQuery()
        .where('category_id', categoryId)
        .limit(limit)
        .offset(offset);
};

const count = () => {
    return baseQuery()
        .count('course_id as amount')
        .first();
};

const countByCategory = (categoryId) => {
    return baseQuery()
        .where('category_id', categoryId)
        .count('course_id as amount')
        .first();
};

const search = (q) => {
    return baseQuery()
        .whereRaw(`fts @@ to_tsquery(remove_accents('${q}'))`);
};

// WRITE
const add = (course) => {
    return baseQuery().insert(course);
};

const del = (id) => {
    return baseQuery()
        .where('course_id', id)
        .del();
};

const edit = (id, course) => {
    return baseQuery()
        .where('course_id', id)
        .update(course);
};

export default {
    findAll,
    findById,
    findByCategory,
    findPage,
    findPageByCategory,
    count,
    countByCategory,
    search,
    add,
    del,
    edit,
};
