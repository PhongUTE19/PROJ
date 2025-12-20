import db from '../config/database.js';

const tableName = 'users';

const baseQuery = () => db(tableName);

const add = (user) => {
    return baseQuery().insert(user);
};

const findByUsername = (username) => {
    return baseQuery()
        .where('username', username)
        .first();
};

const patch = (id, user) => {
    return baseQuery()
        .where('id', id)
        .update(user);
};

export default {
    add,
    findByUsername,
    patch,
};
