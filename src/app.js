import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { languageRouter, editionRouter } from './routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use('/languages', languageRouter);
app.use('/editions', editionRouter);

module.exports = app
