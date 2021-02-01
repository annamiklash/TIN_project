const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');

class AuthorModel {
    tableName = 'author';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const {columnSet, values} = multipleColumnSet(params);

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        console.log("params " + params);
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE id = ${params}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    findMatching = async (params) => {
        let searchParameter = params.search;
        let sql;

        if (searchParameter.split(/\W+/).length === 1) {
            sql = `SELECT * FROM ${this.tableName}
            WHERE first_name LIKE '%${params.search}%' 
            OR last_name LIKE '%${params.search}%'`;
        }

        if (searchParameter.split(/\W+/).length === 2) {
            let stringArray = searchParameter.split(" ");
            let first = stringArray[0];
            let last = stringArray[1];
            sql = `SELECT * FROM ${this.tableName}
            WHERE first_name LIKE '%${first}%' AND last_name LIKE '%${last}%'
            OR first_name LIKE '%${last}%' AND last_name LIKE '%${first}%'`;
        }

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        const {columnSet, values} = multipleColumnSet(params)

        return await query(sql, [...values]);

    }

    create = async (params) => {
        const {columnSet, values} = multipleColumnSet(params);
        let sql = "";
        console.log(params)
        if (!params.death_date) {
            console.log("NO DEATH DATE");
            sql =
                `INSERT INTO ${this.tableName}
                (first_name, last_name, nationality, birth_date, image) 
                    VALUES ('${params.first_name}', '${params.last_name}',
                    '${params.nationality}', '${params.birthdate}',
                     '${params.image}')`;
        } else if (params.body.death_date) {
            sql = `INSERT INTO ${this.tableName}
                  (first_name, last_name, nationality, birth_date, death_date, image) 
                    VALUES ('${params.first_name}', '${params.last_name}','${params.nationality}', 
                   '${params.birthdate}','${params.deathdate}'),
                    '${params.image}')`;
        }
        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params);

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

module.exports = new AuthorModel;
