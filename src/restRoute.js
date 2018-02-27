const express = require('express');

function restRouter(app, option) {
  const router = express.Router();
  const { model, path } = option;

  router.get('', async (req, res) => {
    const [err, items] = await model.list();
    if(items) {
      res.send(items);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.post('', async (req, res) => {
    const [err, item] = await model.add(req.body);
    if(item) {
      res.send(item);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.get('/:id', async (req, res) => {
    const [err, item] = await model.get(req.params.id);
    if(item) {
      res.send(item);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.put('/:id', async (req, res) => {
    const [err, item] = await model.update(req.params.id, req.body);
    if(item) {
      res.send(item)
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.delete('/:id', async (req, res) => {
    const [err, item] = await model.delete(req.params.id);
    if(item) {
      res.send(item)
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  })

  app.use(path, router);
}

export default restRouter;
