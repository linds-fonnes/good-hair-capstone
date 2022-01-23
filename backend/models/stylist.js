const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressErrors");

class Stylist {
  static async authenticate(email, password) {
    const result = await db.query(
      `SELECT email, password, first_name, last_name, salon_name, city, state, zipcode FROM stylists WHERE email = $1`,
      [email]
    );

    const stylist = result.rows[0];
    if (stylist) {
      const isValid = await bcrypt.compare(password, stylist.password);
      if (isValid === true) {
        delete stylist.password;
        return stylist;
      }
    }
    throw new UnauthorizedError("Invalid email/password");
  }

  static async register({
    email,
    first_name,
    last_name,
    password,
    instagram_url,
    facebook_url,
    website_url,
    images,
    services,
    salon_name,
    phone_number,
    street_address,
    city,
    state,
    zipcode,
  }) {
    const duplicateCheck = await db.query(
      `SELECT email from stylists WHERE email = $1`,
      [email]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Account with email ${email} already created`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO stylists(email, password, first_name, last_name, instagram_url, facebook_url, website_url,images, services,salon_name, phone_number, street_address,city,state,zipcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        email,
        hashedPassword,
        first_name,
        last_name,
        instagram_url,
        facebook_url,
        website_url,
        images,
        services,
        salon_name,
        phone_number,
        street_address,
        city,
        state,
        zipcode,
      ]
    );
    const stylist = result.rows[0];
    return stylist;
  }

  static async getAll() {
    const result = await db.query(
      `SELECT email, first_name, last_name, salon_name, city, state, zipcode FROM stylists`
    );
    if (result.rows.length === 0) throw new NotFoundError(`No Stylists Found`);
    return result.rows;
  }

  static async search(radius) {
    const result = await db.query(
      `SELECT first_name, last_name,email, salon_name, city, state, zipcode FROM stylists WHERE zipcode = any($1)`,
      [radius]
    );
    if (result.rows.length === 0)
      throw new NotFoundError(`No Stylists Found in Area`);
    return result.rows;
  }

  static async getByEmail(email) {
    const stylistResults = await db.query(
      "SELECT email, first_name, last_name, instagram_url, facebook_url, website_url, images, services, salon_name, phone_number, street_address, city, state, zipcode FROM stylists WHERE email=$1",
      [email]
    );
    const reviewsResults = await db.query(
      "SELECT * from reviews WHERE stylist_id=$1",
      [email]
    );
    const stylist = stylistResults.rows[0];
    if (!stylist) throw new NotFoundError(`No stylist with email: ${email}`);
    stylist.reviews = reviewsResults.rows;
    return stylist;
  }

  static async update(
    email,
    {
      first_name,
      last_name,
      instagram_url,
      facebook_url,
      website_url,
      images,
      services,
      salon_name,
      phone_number,
      street_address,
      city,
      state,
      zipcode,
    }
  ) {
    const results = await db.query(
      "UPDATE stylists SET first_name=$1, last_name=$2, instagram_url=$3, facebook_url=$4, website_url=$5, images=$6, services=$7, salon_name=$8, phone_number=$9, street_address=$10, city=$11, state=$12, zipcode=$13 WHERE email=$14 RETURNING first_name, last_name, instagram_url, facebook_url, website_url, images, services, salon_name, phone_number, street_address, city, state, zipcode",
      [
        first_name,
        last_name,
        instagram_url,
        facebook_url,
        website_url,
        images,
        services,
        salon_name,
        phone_number,
        street_address,
        city,
        state,
        zipcode,
        email,
      ]
    );
    const stylist = results.rows[0];
    if (!stylist) throw new NotFoundError(`No stylist with email: ${email}`);
    return stylist;
  }

  static async remove(email) {
    const result = await db.query("DELETE FROM stylists where email=$1", [
      email,
    ]);
    const stylist = result.rows[0];
    if (!stylist) throw new NotFoundError(`No stylist with email: ${email}`);
  }

  static async review(review, client_id, stylist_id) {
    const duplicateCheck = await db.query(
      `SELECT review from reviews WHERE client_id = $1 AND stylist_id = $2`,
      [client_id, stylist_id]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Review already created`);
    }

    const result = await db.query(
      `INSERT INTO reviews(review,stylist_id,client_id) VALUES($1, $2, $3)`,
      [review, stylist_id, client_id]
    );

    return result.rows[0];
  }
}

module.exports = Stylist;
