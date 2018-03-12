import to from "await-to-js";
import { db } from "./db.js";
import statusCode from './statusCode';

async function get(edition_base_id) {
  let [err, editionBase] = await to(
    db.one(
      "SELECT * FROM edition_base where edition_base_id=$1",
      edition_base_id
    )
  );
  if (err) {
    err = {
      statusCode: statusCode.NOT_FOUND,
      detail: error.detail
    };
  }
  return [err, editionBase];
}

async function update(edition_base_id, payload) {
  const { abbreviation } = payload
  let [err, edition_base] = await to(
    db.query(
      "UPDATE edition_base SET abbreviation=${abbreviation} WHERE edition_base_id=${editionBaseId}",
      [ abbreviation, edition_base_id]
    )
  );

  if (err) {
    return [
      {
        statusCode: statusCode.BAD_REQUEST,
        ...err
      },
      edition_base
    ];
  }

  return await get(edition_base_id);
}

async function add(payload) {
  let [err, editionBase] = await to(
    db.one(
      "INSERT INTO edition_base(abbreviation) VALUES(${abbreviation}) RETURNING edition_base_id",
      payload
    )
  );
  if (err) {
    err = {
      statusCode: statusCode.BAD_REQUEST,
      ...err
    };
  }
  return [err, editionBase];
}

export default {
  get,
  add,
  update
};
