import db from '../utils/db.js';

const tableName = 'categories';

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('catid', id).first();
    },
    add(category) {
        return db(tableName).insert(category);
    },
    del(id) {
        return db(tableName).where('catid', id).del();
    },
    patch(id, category) {
        return db(tableName).where('catid', id).update(category);
    },
};