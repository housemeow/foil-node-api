import to from 'await-to-js';
import { db } from './db.js';

async function get(edition_base_id) {
  let [err, editionBase] = await to(db.one(
    'SELECT * FROM edition_base where edition_base_id=$1', edition_base_id
  ));
  if(err) {
    err = { ...err, statusCode: 403 };
  }
  return [err, editionBase];
}

async function add(payload) {
  let [err, editionBase] = await to(db.one(
    'INSERT INTO edition_base(abbreviation) VALUES(${abbreviation}) RETURNING edition_base_id', payload
  ));
  if(err) {
    err = { ...err, statusCode: 403 };
  }
  return [err, editionBase];
}

export default {
  get,
  add
}
