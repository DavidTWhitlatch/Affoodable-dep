const express = require('express');
const recipeController = require('../controllers/recipeController');
const viewController = require('../controllers/viewController');

const recipeRouter = express.Router();

// middleware to handle 404 errors
const handle404 = (err, req, res, next) => {
  console.error(err);
  res.sendStatus(404);
  // next();
};

recipeRouter.get('/new', viewController.showForm);

recipeRouter.route('/search')
  .get(recipeController.getSome, viewController.showAll);

recipeRouter.route('/:id/edit')
  .get(recipeController.getOne, viewController.showEdit);

recipeRouter.route('/:id')
  .get(recipeController.getOne, viewController.showOne)
  .put(recipeController.checkIngredients, recipeController.resolveIngredientPromises,
    recipeController.updateRecipe, recipeController.removeRecipeIngredients,
    recipeController.addRecipeIngredients, recipeController.resolveIngredientPromises,
    recipeController.getOne, viewController.showOne)
  .delete(recipeController.destroy, recipeController.index, viewController.showAll);

recipeRouter.route('/')
  .post(recipeController.checkIngredients, recipeController.resolveIngredientPromises,
    recipeController.addRecipe, recipeController.addRecipeIngredients,
    recipeController.index, viewController.showAll)
  .get(recipeController.index, viewController.showAll);

recipeRouter.use(handle404);

module.exports = recipeRouter;
