# Good Hair

## Description
---
Good Hair is a website that allows users to sign in as a client and search for stylists in their area who are registered as offering ethnic hair services, resolving the struggle of trying to find stylists who have these capabilities. 



## Installation
---
Install [Node JS](https://nodejs.org/en/download/) if not already installed on your machine.

Once the project is cloned onto your own machine and the main directory is open in the terminal, run npm install to download all required dependencies.

```
cd backend
npm install
```
Next, create the PostreSQL database for the stylists and clients to be saved

```
psql
createdb goodHair
\c goodHair
psql goodHair < schema.sql
```
You can also pre-seed the database with mock stylist data by running the following command:
````
node seed.sh
````
Now that the dependencies are installed and the database is created, the server can be started up.

```
nodemon server.js
```
To load the front end, open a second terminal and run the commands:
````
cd frontend
npm install
npm start
````
## Resources & Technologies
---
- API
https://www.zip-codes.com/zip-code-api-documentation.asp

 -Node
 -Express
 -React
 -Boostrap
 - PostgreSQL



