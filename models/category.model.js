import db from '../utils/db.js';

const tableName = 'categories1';

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('categoryId', id).first();
    },
    add(category) {
        return db(tableName).insert(category);
    },
    del(id) {
        return db(tableName).where('categoryId', id).del();
    },
    edit(id, category) {
        return db(tableName).where('categoryId', id).update(category);
    },
};