const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class UserModel {
    tableName = 'user';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const {columnSet, values} = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    addBookToUserLibraryWithStatus = async (params) => {
        const {columnSet, values} = multipleColumnSet(params);
        console.log(params)
        let userId = params.user_id;
        let isbn = params.ISBN;
        let status = params.status;

        const sql = `INSERT INTO user_book (user_id, book_ISBN, status) VALUES (${userId}, '${isbn}', '${status}')`;

        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    isBookInUserLibrary = async (params) => {
        const {columnSet, values} = multipleColumnSet(params);
        let user_id = params.user_id;
        let ISBN = params.ISBN;

        const sql = `SELECT EXISTS (SELECT * FROM user_book 
        WHERE user_id = ${user_id}
         AND book_ISBN = '${ISBN}') as book_exists`;

        const result = await query(sql, [...values]);

        return result[0];
    }


    create = async (params) => {
        const {columnSet, values} = multipleColumnSet(params);
        const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, email, role, birth_date) VALUES ('${params.username}', '${params.password}',
         '${params.first_name}', '${params.last_name}', '${params.email}', '${params.role = Role.SuperUser}',
          '${params.birthdate}')`;

        console.log(sql)
        console.log(params.birthdate)
        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;
