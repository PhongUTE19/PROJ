import db from '../config/database.js';

const tableName = 'categories';

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('category_id', id).first();
    },
    add(category) {
        return db(tableName).insert(category);
    },
    del(id) {
        return db(tableName).where('category_id', id).del();
    },
    edit(id, category) {
        return db(tableName).where('category_id', id).update(category);
    },
};