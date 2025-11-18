import db from '../utils/db.js';

const tableName = 'courses';

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('courseId', id).first();
    },
    findByCategory(id) {
        return db(tableName).where('categoryId', id);
    },
    findPage(limit, offset) {
        return db(tableName)
            .limit(limit)
            .offset(offset);
    },
    findPageByCategory(id, limit, offset) {
        return db(tableName)
            .where('categoryId', id)
            .limit(limit)
            .offset(offset);
    },
    count() {
        return db(tableName).count('courseId as amount').first();
    },
    countByCategory(id) {
        return db(tableName)
            .where('categoryId', id)
            .count('courseId as amount')
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