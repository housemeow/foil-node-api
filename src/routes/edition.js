var express = require('express');
var router = express.Router();
import Edition from '../db_models/edition';

router.get('', async (req, res) => {
  const [err, editions] = await Edition.list();
  res.send(editions);
});

router.post('', async (req, res) => {
  const [err, edition] = await Edition.add(req.body);
  if(edition) {
    res.send(edition);
  } else {
    res.status(403).send(err.detail);
  }
});

export default router;
