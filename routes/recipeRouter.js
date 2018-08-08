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
  .post(recipeController.checkIngredients, recipeController.resolveIngredientPromises, recipeController.addRecipe, recipeController.addRecipeIngredients, recipeController.index, viewController.showAll)
  .get(recipeController.index, viewController.showAll);

recipeRouter.route('/search')
  .get(recipeController.getSome, viewController.showAll);

// recipeRouter.route('/:id')
//   .delete(showJSON);

recipeRouter.get('/:id/edit', (req, res) => {
  res.send('Display edit submition form');
});

recipeRouter.get('/new', viewController.showForm);

recipeRouter.use(handle404);

module.exports = recipeRouter;
