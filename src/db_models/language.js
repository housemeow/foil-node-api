import to from 'await-to-js'
const db = require('./db.js')(`postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

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
  const [updateErr] = await to(db.query(
    "\
    UPDATE language SET\
      abbreviation=${abbreviation},\
      description=${description}\
    WHERE language_id=${language_id}", { ...payload, language_id }));
  return await get(language_id);
}

export default {
  list,
  add,
  get,
  update
}
