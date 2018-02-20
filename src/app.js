import to from 'await-to-js'
import express from 'express';
const app = express();
var pgp = require('pg-promise')(/*options*/);
var db = pgp(`postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);


(async function() {
  let err, languages;
  [ err, languages ] = await to(db.one('SELECT * FROM Language'));
  if(languages)
    console.log('async languages', languages);
  else
    console.log('async ERROR', err)
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
