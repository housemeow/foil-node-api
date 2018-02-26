import to from 'await-to-js'
import EditionBase from './edition_base';
import { UNIQUE_VIOLATION } from 'pg-error-constants';
import { db } from './db.js';

async function list() {
  return await to(db.any('SELECT * FROM edition'));
}

async function add(payload) {
  const { edition_base_id, abbreviation } = payload;

  if(!edition_base_id) {
    const [err, editionBase] = await EditionBase.add(payload);
    if(editionBase) {
      payload.edition_base_id = editionBase.edition_base_id;
    } else if(err.code === UNIQUE_VIOLATION) {
      const [err, editionBase] = await EditionBase.getByAbbreviation(abbreviation);
      payload.edition_base_id = editionBase.edition_base_id;
    } else {
      return [err, editionBase];
    }
  }
  return await to(db.one(
    'INSERT INTO edition(edition_base_id, language_id, name) VALUES(${edition_base_id}, ${language_id}, ${name}) RETURNING edition_id, edition_base_id', payload));
}

async function get(edition_id) {
  return await to(db.one('SELECT e.edition_id, e.name, e.language_id, eb.edition_base_id, eb.abbreviation, eb.icon FROM edition as e, edition_base as eb WHERE edition_id=$1 AND e.edition_base_id = eb.edition_base_id', edition_id));
}

async function update(edition_id, payload) {
  const { edition_base_id, name, abbreviation, language_id } = payload;
  let [err, ] = await to(db.query(
    'UPDATE edition SET name=${name}, language_id=${language_id} WHERE edition_id=${edition_id}', payload
  ));
  console.log('eeee', err);
  if(err) {
    return [err];
  }

  [err, ] = await to(db.query(
    'UPDATE edition_base SET abbreviation=$1 WHERE edition_base_id = $2', [abbreviation, edition_base_id]
  ));

  if(err && err.code === UNIQUE_VIOLATION) {
    return [err];
  }

  return get(edition_id);
}

export default {
  list,
  add,
  get,
  update
}
