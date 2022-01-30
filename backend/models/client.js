const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressErrors");
const userLoginSchema = require("../schemas/userLogin.json");

class Client {
  static async authenticate(email, password) {
    const result = await db.query(
      `SELECT email, password, first_name, last_name, zipcode, favorite_stylists FROM clients WHERE email = $1`,
      [email]
    );

    const client = result.rows[0];
    if (client) {
      const isValid = await bcrypt.compare(password, client.password);
      if (isValid === true) {
        delete client.password;
        return client;
      }
    }
    throw new UnauthorizedError("Invalid email/password");
  }

  static async register({ email, password, first_name, last_name, zipcode }) {
    const duplicateCheck = await db.query(
      `SELECT email from clients WHERE email = $1`,
      [email]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Account with email ${email} already created`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO clients(email, password, first_name, last_name, zipcode) VALUES ($1, $2, $3, $4, $5) RETURNING email, first_name, last_name, zipcode, favorite_stylists`,
      [email, hashedPassword, first_name, last_name, zipcode]
    );
    return result.rows[0];
  }

  static async getByEmail(email) {
    const results = await db.query(
      "SELECT email, first_name, last_name, zipcode, favorite_stylists FROM clients WHERE email=$1",
      [email]
    );

    const client = results.rows[0];
    if (!client) throw new NotFoundError(`No client with email: ${email}`);
    return client;
  }

  static async update(email, first_name, last_name, zipcode) {
    const results = await db.query(
      "UPDATE clients SET first_name=$1, last_name=$2, zipcode=$3 WHERE email=$4 RETURNING first_name, last_name, zipcode",
      [first_name, last_name, zipcode, email]
    );

    const client = results.rows[0];
    if (!client) throw new NotFoundError(`No client with email: ${email}`);
    return client;
  }

  static async remove(email) {
    const result = await db.query("DELETE FROM clients where email=$1", [
      email,
    ]);
    const client = result.rows[0];
    if (!client) throw new NotFoundError(`No client with email: ${email}`);
  }

  static async addFavorite(client_email, stylist_email) {
    const queryFavorites = await db.query(
      "SELECT favorite_stylists->>'favorite_stylists' FROM clients where email=$1",
      [client_email]
    );
    let currentFavorites = queryFavorites.rows[0]["?column?"];
    console.log(currentFavorites);
    const parsed = JSON.parse(currentFavorites);
    parsed.push(stylist_email);
    const str = JSON.stringify(parsed);
    console.log(str, typeof str);
    const result = await db.query(
      `UPDATE CLIENTS SET favorite_stylists='{"favorite_stylists": ${str}}' WHERE email='${client_email}'`
    );
    console.log(result);
    return result.rows[0]
      ? result.rows[0]
      : new BadRequestError("Error adding stylist to favorites");
  }
}

module.exports = Client;
