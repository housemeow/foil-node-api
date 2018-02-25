import runner from "node-pg-migrate";
require('dotenv').config({ path: '.env.test' });

const { db, DB_URL } = require('../src/db_models/db.js');

function doMigrate() {
  return db.query('DROP SCHEMA public CASCADE').then(data=> {
    return db.query('CREATE SCHEMA public');
  }).then(data => {
    return db.query('GRANT ALL ON SCHEMA public TO foil_test');
  }).then(data => {
    return db.query('GRANT ALL ON SCHEMA public TO public');
  }).then(data=> {
    return runner({
      dryRun: false,
      database_url: DB_URL,
      dir: "migrations",
      ignorePattern: "",
      schema: "public",
      migrations_schema: undefined,
      migrations_table: "pgmigrations",
      count: undefined,
      timestamp: false,
      file: undefined,
      checkOrder: true,
      typeShorthands: {},
      create_schema: false,
      create_migrations_schema: false,
      direction: "up",
      noLock: false
    })
  })
}

export default doMigrate;
