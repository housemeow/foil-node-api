const express = require('express');

function restRouter(app, option) {
  const router = express.Router();

  router.get('', async (req, res) => {
    const [err, models] = await option.model.list();
    if(models) {
      res.send(models);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.post('', async (req, res) => {
    const [err, model] = await option.model.add(req.body);
    if(model) {
      res.send(model);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.get('/:id', async (req, res) => {
    const [err, model] = await option.model.get(req.params.id);
    if(model) {
      res.send(model);
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.put('/:id', async (req, res) => {
    const [err, model] = await option.model.update(req.params.id, req.body);
    if(model) {
      res.send(model)
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  });

  router.delete('/:id', async (req, res) => {
    const [err, model] = await option.model.delete(req.params.id);
    if(model) {
      res.send(model)
    } else {
      res.status(err.statusCode).send(err.detail);
    }
  })

  app.use(option.path, router);
}

export default restRouter;
