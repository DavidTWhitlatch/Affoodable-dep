const db = require('../models/recipes');

module.exports = {

  index(req, res, next) {
    db.findAll()
      .then((recipes) => {
        res.locals.data = recipes;
        next();
      })
      .catch(e => next(e));
  },

  getSome(req, res, next) {
    db.findByInput(req.query.attribute, req.query.input_text)
      .then((recipes) => {
        res.locals.data = recipes;
        next();
      })
      .catch(e => next(e));
  },

  getOne(req, res, next) {
    const recipeId = req.params.id;
    db.findById(recipeId)
      .then((recipe) => {
        res.locals.data = recipe;
        next();
      })
      .catch(e => next(e));
  },

  checkIngredients(req, res, next) {
    const ingArr = req.body.ingredients.split(' ');
    const promiseArr = [];
    ingArr.forEach((ing, idx) => {
      db.findIngredient(ing)
        .then((ingData) => {
          if (ingData.length === 0) {
            promiseArr.push(db.newIngredient(ing));
          } else {
            promiseArr.push(db.findIngredient(ing));
          };
          if (idx === ingArr.length - 1) {
            res.locals.ingArr = promiseArr;
            next();
          }
        })
        .catch(e => next(e));
    });
  },

  resolveIngredientPromises(req, res, next) {

    Promise.all(res.locals.ingArr)
      .then((data) => {
        res.locals.ingredients = data;
        next();
      })
      .catch(e => next(e));
  },

  addIngredients(req, res, next) {
    const ingArr = req.body.ingredients.split(' ');
    const promiseArr = ingArr.map(ing => db.findIngredient(ing));
    Promise.all(promiseArr)
      .then((resArr) => {
        res.locals.ingredients = resArr;
        next();
      })
      .catch(e => next(e));
  },

  addRecipe(req, res, next) {
    db.save({ ...req.body, creator_id: req.session.user.id })
      .then((resData) => {
        res.locals.recipe = resData;
        next();
      });
  },

  updateRecipe(req, res, next) {
    db.update(req.params.id, req.body)
      .then((resData) => {
        res.locals.recipe = resData;
        next();
      })
      .catch(e => next(e));
  },

  addRecipeIngredients(req, res, next) {
    const promiseArr = [];
    res.locals.ingredients.forEach((ing, idx) => {
      promiseArr.push(db.matchIngredient(res.locals.recipe, ing));
      if (idx === res.locals.ingredients.length - 1) {
        res.locals.joinArr = promiseArr;
        next();
      }
    });
  },

  resolveJoinerPromises(req, res, next) {
    Promise.all(res.locals.joinArr)
      .then((data) => {
        res.redirect('/recipes');
      })
      .catch(e => next(e));
  },

  removeRecipeIngredients(req, res, next) {
    db.removeMatchIngredient(req.params.id)
      .then(() => {
        next();
      })
      .catch(e => next(e));
  },

  destroy(req, res, next) {
    db.destroy(req.params.id)
      .then(() => {
        next();
      })
      .catch(e => next(e));
  },

};
