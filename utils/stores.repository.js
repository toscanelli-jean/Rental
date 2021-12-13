pool = require("../utils/db.js");

module.exports = {
  getBlankStore(){
    return { 
      "store_id": 0, 
      "store_name": "XXX", 
      "store_localisation": "XXX", 
      "store_size": 0,
      "store_stock": 0,
      "store_brandNb": 0 

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
  async getAllStore() {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM stores ORDER BY store_id";
      const rows = await conn.query(sql);
      conn.end();
      console.log("stores FETCHED: "+rows.length);
      return rows;
    } catch (err) {
      throw err;
    }
  },
  async getOneStore(store_id) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM stores WHERE store_id = ?";
      const rows = await conn.query(sql, store_id);
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
  async delOneStore(store_id) {
    try {
      console.log(store_id);
      conn = await pool.getConnection();
      sql = "DELETE FROM stores WHERE store_id = ?";
      const okPacket = await conn.query(sql, store_id); 
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  async addOneStore() {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO stores (store_id) VALUES (NULL)";
      const okPacket = await conn.query(sql);
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.insertId; 
    } catch (err) {
      throw err;
    }
  },
  async editOneStore(store_id, store_name, store_localisation, store_size, store_stock,store_brandNb) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE stores SET store_name=?, store_localisation=?, store_size=?, store_stock=?, store_brandNb=? WHERE store_id=?";
      const okPacket = await conn.query(sql, 
            [store_name, store_localisation, store_size, store_stock, store_brandNb, store_id]);
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.affectedRows; 
    } catch (err) {
      throw err;
    }
  },
};