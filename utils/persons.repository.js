pool = require("../utils/db.js");

module.exports = {
    getBlankPerson() {
        return {
            "person_id": 0,
            "person_name": "XXX"

        };
    },
    async getBlankPersons() {
        // ?TODO? move to persons.repository.js
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM persons";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        } catch (err) {
            // TODO: log error / send error
            throw err; // ?return false?
        }
    },
    async getAllPerson() {
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM persons";
            const rows = await conn.query(sql);
            conn.end();
            console.log("persons FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            throw err;
        }
    },
    async getOnePerson(person_id) {
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM persons WHERE person_id = ?";
            const rows = await conn.query(sql, person_id);
            conn.end();
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    },
    async delOnePerson(person_id) {
        try {
            console.log(person_id);
            conn = await pool.getConnection();
            sql = "DELETE FROM persons WHERE person_id = ?";
            const okPacket = await conn.query(sql, person_id);
            conn.end();
            console.log(okPacket); // affectedRows, insertId
            return okPacket.affectedRows;
        } catch (err) {
            throw err;
        }
    },
    async addOnePerson(person_id) {
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO persons person_id VALUES (NULL)";
            const okPacket = await conn.query(sql, person_id);
            conn.end();
            console.log(okPacket); // affectedRows, insertId
            return okPacket.insertId;
        } catch (err) {
            throw err;
        }
    },
    async editOnePerson(person_id, person_name) {
        try {
            conn = await pool.getConnection();
            sql = "UPDATE persons SET person_name=? WHERE person_id=?";
            const okPacket = await conn.query(sql, [person_name, person_id]);
            conn.end();
            console.log(okPacket); // affectedRows, insertId
            return okPacket.affectedRows;
        } catch (err) {
            throw err;
        }
    },
};