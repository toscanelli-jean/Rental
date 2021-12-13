pool = require("./db.js");

module.exports = {
  getBlankBike(){
    return { 
      "bike_id": 0, 
      "bike_name": "XXX", 
      "bike_price": 0, 
      "bike_height": 0.0,
      "bike_brand": "XXX",
      "bike_person": 0 

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
  async getAllBike() {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM bikes INNER JOIN persons ON bike_person=person_id ORDER BY bike_id";
      const rows = await conn.query(sql);
      conn.end();
      console.log("bikes FETCHED: "+rows.length);
      return rows;
    } catch (err) {
      throw err;
    }
  },
  async getOneBike(bike_id) {
    try {
      conn = await pool.getConnection();
      sql = "SELECT * FROM bikes INNER JOIN persons ON bike_person=person_id WHERE bike_id = ?";
      const rows = await conn.query(sql, bike_id);
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
  async delOneBike(bike_id) {
    try {
      console.log(bike_id);
      conn = await pool.getConnection();
      sql = "DELETE FROM bikes WHERE bike_id = ?";
      const okPacket = await conn.query(sql, bike_id); 
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  async addOneBike(person_id) {
    try {
      conn = await pool.getConnection();
      sql = "INSERT INTO bikes (bike_id, bike_person) VALUES (NULL, ?)";
      const okPacket = await conn.query(sql, person_id);
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.insertId; 
    } catch (err) {
      throw err;
    }
  },
  async editOneBike(bike_id, bike_name, bike_price, bike_height, bike_brand,bike_person) {
    try {
      conn = await pool.getConnection();
      sql = "UPDATE bikes SET bike_name=?, bike_price=?, bike_height=?, bike_brand=?, bike_person=? WHERE bike_id=?";
      const okPacket = await conn.query(sql, 
            [bike_name, bike_price, bike_height, bike_brand, bike_person, bike_id]);
      conn.end();
      console.log(okPacket); // affectedRows, insertId
      return okPacket.affectedRows; 
    } catch (err) {
      throw err;
    }
  },
};