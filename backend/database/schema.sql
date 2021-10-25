DROP DATABASE IF EXISTS goodHair;

CREATE DATABASE goodHair;

\c goodHair;

CREATE TABLE clients (
  email VARCHAR(75) PRIMARY KEY
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  zipcode VARCHAR(15),
  favorite_stylists TEXT ARRAY
);

CREATE TABLE stylists (
  email VARCHAR(75) PRIMARY KEY
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  instagram_url TEXT,
  facebook_url TEXT,
  website_url TEXT,
  images TEXT ARRAY,
  services TEXT ARRAY,
  salon_name VARCHAR(50),
  phone_number VARCHAR(50),
  street_address VARCHAR(255),
  city VARCHAR(75),
  state VARCHAR(25),
  zipcode VARCHAR(15) NOT NULL
);

CREATE TABLE reviews (
  review TEXT NOT NULL,
  stylist_id VARCHAR(75) NOT NULL
  REFERENCES stylists(email) ON DELETE CASCADE
  ,
  client_id VARCHAR(75) NOT NULL
  REFERENCES clients(email) ON DELETE CASCADE,
  PRIMARY KEY (stylist_id, client_id)
)


