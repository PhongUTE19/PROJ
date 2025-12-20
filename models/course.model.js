import db from '../config/database.js';

const tableName = 'courses';

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
    add(course) {
        return db(tableName).insert(course);
    },
    del(id) {
        return db(tableName).where('course_id', id).del();
    },
    edit(id, course) {
        return db(tableName).where('course_id', id).update(course);
    },
};