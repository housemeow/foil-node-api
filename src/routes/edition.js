var express = require('express');
var router = express.Router();
import Edition from '../db_models/edition';

router.get('', async (req, res)=> {
  const [err, editions] = await Edition.list();
  res.send(editions);
});

module.exports = router;
