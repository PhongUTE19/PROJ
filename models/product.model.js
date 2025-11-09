import db from '../utils/db.js';

const tableName = 'products';
// const databas = db(tableName); // shouldn't: use same query builder instance
// const products = () => db(tableName); // should: create a new query builder each time

export default {
    findAll() {
        return db(tableName);
    },
    findById(id) {
        return db(tableName).where('proid', id).first();
    },
    findByCategory(id) {
        return db(tableName).where('catid', id);
    },
    findPageByCategory(id, limit, offset) {
        return db(tableName)
            .where('catid', id)
            .limit(limit)
            .offset(offset);
    },
    countByCategory(id) {
        return db(tableName)
            .where('catid', id)
            .count('catid as amount')
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