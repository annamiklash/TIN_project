const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');


class AuthorModel {
    tableName = 'author';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const {columnSet, values} = multipleColumnSet(params)
        // sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
}

module.exports = new AuthorModel;
