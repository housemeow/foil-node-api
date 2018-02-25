import to from 'await-to-js'
const { db } = require('./db.js');

async function list() {
  return await to(db.any('SELECT * FROM edition'));
}

export default { list };
