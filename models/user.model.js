import db from '../config/database.js';

const tableName = 'users';

export default {
    add(user) {
        return db(tableName).insert(user);
    },
    findByUsername(username) {
        return db(tableName).where('username', username).first();
    },
    patch(id, user) {
        return db(tableName).where('id', id).update(user);
    },
};