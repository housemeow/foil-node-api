const pgp = require('pg-promise')(/*initialization options*/);

const DB_URL = `postgres://\
${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@\
${process.env.DB_HOST}:${process.env.DB_PORT}/\
${process.env.DB_DATABASE}`;
const db = pgp(DB_URL);

module.exports = {
  db,
  DB_URL
};
