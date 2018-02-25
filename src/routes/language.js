var express = require('express');
var router = express.Router();
import Language from '../db_models/language';

router.get('', async(req, res) => {
  const [err, language] = await Language.list()
  res.send(language);
});

router.post('', async(req, res) => {
  const [err, language] = await Language.add(req.body);
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

router.get('/:language_id', async(req, res) => {
  const [err, language] = await Language.get(req.params.language_id);
  console.log('err, language', err, language);
  if(language) {
    res.send(language);
  } else {
    res.status(403).send(err);
  }
});

router.put('/:language_id', async(req, res) => {
  const [err, language] = await Language.update(req.params.language_id, req.body);
  if(language) {
    res.send(language);
  } else {
    res.send(err);
  }
});

module.exports = router;
