import to from 'await-to-js'
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
var pgp = require('pg-promise')(/*options*/);
var db = pgp(`postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);

app.get('/tests', async (req, res) => {
  [err, tests] = await to(db.one('select  * from test'));
  res.send('Hello world');
});

app.get('/books', async(req, res) => {
  res.send([1, 2, 3])
});

const server = app.listen(3000, () => {
  console.log('Foil api server listen in port 3000.');
});

module.exports = server
