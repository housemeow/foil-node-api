import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Language from '../db_models/language';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/languages', async(req, res) => {
  const [err, language] = await Language.getLanguages()
  res.send(language);
});

app.post('/languages', async(req, res) => {
  const [err, language] = await Language.addLanguage(req.body);
  console.log('language', language);
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

app.get('/languages/:language_id', async(req, res) => {
  const [err, language] = await Language.getLanguage(req.params.language_id);
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

app.put('/languages/:language_id', async(req, res) => {
  const [err, language] = await Language.updateLanguage(res.params.Language_id, res.body);
  if(language) {
    console.log('language', language);
    res.send(language);
  } else {
    res.send(err);
  }
});

module.exports = app
