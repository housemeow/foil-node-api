import to from "await-to-js";
import EditionBase from "./edition_base";
import { UNIQUE_VIOLATION } from "pg-error-constants";
import { db } from "./db.js";
import statusCode from "./statusCode";

async function list() {
  return await to(
    db.any(
      "SELECT \
e.edition_id,\
eb.edition_base_id,\
eb.abbreviation,\
eb.icon,\
e.language_id,\
e.name FROM edition as e, edition_base as eb WHERE e.edition_base_id = eb.edition_base_id"
    )
  );
}

async function add(payload) {
  let [err, edition] = await to(
    db.one(
      "INSERT INTO edition(edition_base_id, language_id, name) VALUES(${edition_base_id}, ${language_id}, ${name}) RETURNING edition_id, edition_base_id",
      payload
    )
  );
  if (err) {
    err = {
      statusCode: statusCode.BAD_REQUEST,
      ...err
    };
  }
  return [err, edition];
}

async function get(edition_id) {
  let [err, edition] = await to(
    db.one(
      "SELECT e.edition_id, e.name, e.language_id, eb.edition_base_id, eb.abbreviation, eb.icon FROM edition as e, edition_base as eb WHERE edition_id=$1 AND e.edition_base_id = eb.edition_base_id",
      edition_id
    )
  );
  if (err) {
    err = {
      statusCode: statusCode.NOT_FOUND,
      ...err
    };
  }
  return [err, edition];
}

async function update(edition_id, payload) {
  let [err, edition] = await to(
    db.query(
      "UPDATE edition SET name=${name}, language_id=${language_id} WHERE edition_id=${edition_id}",
      payload
    )
  );

  if (err) {
    return [
      {
        statusCode: statusCode.BAD_REQUEST,
        ...err
      },
      edition
    ];
  }

  return await get(edition_id);
}

export default {
  list,
  add,
  get,
  update
};
