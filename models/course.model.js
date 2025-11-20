import db from '../utils/db.js';

const tableName = 'courses_PROJ';

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('course_id', id).first();
    },
    findByCategory(id) {
        return db(tableName).where('category_id', id);
    },
    findPage(limit, offset) {
        return db(tableName)
            .limit(limit)
            .offset(offset);
    },
    findPageByCategory(id, limit, offset) {
        return db(tableName)
            .where('category_id', id)
            .limit(limit)
            .offset(offset);
    },
    count() {
        return db(tableName).count('course_id as amount').first();
    },
    countByCategory(id) {
        return db(tableName)
            .where('category_id', id)
            .count('course_id as amount')
            .first();
    },
    search(q) {
        return db(tableName)
            .whereRaw(`fts @@ to_tsquery(remove_accents('${q}'))`);
        // .whereRaw(`fts @@ to_tsquery(remove_accents(?))`, [q]);
    },
    add(product) {
        return db(tableName).insert(product);
    }
};