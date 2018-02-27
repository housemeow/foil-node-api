import to from 'await-to-js'
import { db } from './db.js';

async function list() {
  return await to(db.any('SELECT * FROM language'));
}

async function add(payload) {
  let [err, language] = await to(db.one('INSERT INTO language(abbreviation, description) VALUES(${abbreviation}, ${description}) RETURNING language_id', payload));
  if(err) {
    err = { ...err, statusCode: 403 };
  }
  return [err, language];
}

async function get(language_id) {
  let [err, language] = await to(db.one('SELECT * FROM language WHERE language_id=$1', language_id));
  if(err) {
    err = { ...err, statusCode: 403 };
  }
  return [err, language];
}

async function update(language_id, payload) {
  let [err] = await to(db.query(
    "\
    UPDATE language SET\
      abbreviation=${abbreviation},\
      description=${description}\
    WHERE language_id=${language_id}", { ...payload, language_id }));

  if(err) {
    return [{ ...err, statusCode: 403 }]
  }
  return await get(language_id);
}

async function deleteAll() {
  return await db.query('DELETE FROM language WHERE true');
}

export default {
  list,
  add,
  get,
  update,
  deleteAll
}
