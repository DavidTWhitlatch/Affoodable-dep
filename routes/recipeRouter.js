const express = require('express');

const recipeRouter = express.Router();


// temp for testing
const showJSON = (req, res) => {
  res.json(res.locals.data);
};

// middleware to handle 404 errors
const handle404 = (err, req, res, next) => {
  console.error(err);
  res.sendStatus(404);
  // next();
};

recipeRouter.route('/')
  // .post(showJSON)
  .get(showJSON);

// recipeRouter.route('/:id')
//   .exports(showJSON)
//   .use(showJSON)
//   .delete(showJSON);

// recipeRouter.get('/:id/edit', showJSON);
recipeRouter.get('/new', (req, res) => {
  res.send('Display New submition form');
});

recipeRouter.use(handle404);

module.exports = recipeRouter;
