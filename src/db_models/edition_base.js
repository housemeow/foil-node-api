import to from 'await-to-js';
const { db } = require('./db.js');

async function get(edition_base_id) {
  return await to(db.one(
    'SELECT * FROM edition_base where edition_base_id=$1', edition_base_id
  ));
}

async function getByAbbreviation(abbreviation) {
  return await to(db.one(
    'SELECT * FROM edition_base where abbreviation=$1', abbreviation
  ));
}

async function add(payload) {
  return await to(db.one(
    'INSERT INTO edition_base(abbreviation) VALUES(${abbreviation}) RETURNING edition_base_id', payload
  ));
}

export default {
  get,
  add,
  getByAbbreviation
}
