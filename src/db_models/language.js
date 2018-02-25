import to from 'await-to-js'
const { db } = require('./db.js');

async function list() {
  return await to(db.any('SELECT * FROM language'));
}

async function add(payload) {
  return await to(db.one('INSERT INTO language(abbreviation, description) VALUES(${abbreviation}, ${description}) RETURNING language_id', payload));
}

async function get(language_id) {
  return await to(db.one('SELECT * FROM language WHERE language_id=$1', language_id));
}

async function update(language_id, payload) {
  const [err] = await to(db.query(
    "\
    UPDATE language SET\
      abbreviation=${abbreviation},\
      description=${description}\
    WHERE language_id=${language_id}", { ...payload, language_id }));
  if(err) {
    return [err]
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
