const express = require('express');
const recipeController = require('../controllers/recipeController');
const viewController = require('../controllers/viewController');

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
  .get(recipeController.index, viewController.showAll);

recipeRouter.route('/search').get(recipeController.getSome, viewController.showAll);

// recipeRouter.route('/:id')
//   .exports(showJSON)
//   .use(showJSON)
//   .delete(showJSON);

recipeRouter.get('/:id/edit', (req, res) => {
  res.send('Display edit submition form');
});
recipeRouter.get('/new', viewController.showForm);

recipeRouter.use(handle404);

module.exports = recipeRouter;
