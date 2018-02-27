import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Language, Edition } from './db_models';
import restRoute from './restRoute';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

restRoute(app, { path: '/languages', model: Language});
restRoute(app, { path: '/editions', model: Edition});

module.exports = app
