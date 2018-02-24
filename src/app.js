import to from 'await-to-js'
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
const db = require('./db.js')(`postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

app.get('/languages', async(req, res) => {
  res.send(await db.any('SELECT * FROM language'));
});

app.post('/languages', async(req, res) => {
  const [err, language] = await to(db.one('INSERT INTO language(abbreviation, description) VALUES(${abbreviation}, ${description}) RETURNING language_id', req.body));
  console.log('language', language);
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

app.get('/languages/:languageId', async(req, res) => {
  const [err, language] = await to(db.one('SELECT * FROM language WHERE language_id=$1', req.params.languageId));
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

module.exports = app
