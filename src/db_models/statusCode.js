/**
 * 200 OK
 * 201 Created
 * 204 No content
 */
const OK = 200; // get list, get item
const CREATED = 201; // add item
const NO_CONTENT = 204; // delete item
const BAD_REQUEST = 400; // create item duplicated
const NOT_FOUND = 404; // resource not found

export default {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND
}
