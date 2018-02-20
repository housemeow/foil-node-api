const express = require('express');
const app = express();
import config from './config.js';
var pgp = require('pg-promise')(/*options*/);
var db = pgp(`postgres://${config.DB_USER_NAME}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`);

(async function() {
  let languages = await db.one('SELECT * FROM Language');
  console.log('async languages', languages);
})()

db.one('SELECT * FROM Language').then(function(data) {
  console.log('DATA:', data);
})
.catch(function(error) {
  console.log('ERROR:', error);
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log('Foil api server listen in port 3000.');
});
