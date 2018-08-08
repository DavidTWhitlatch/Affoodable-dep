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

  checkIngredients(req, res, next) {
    debugger;
    const ingArr = req.body.ingredients.split(' ');
    const promiseArr = [];
    ingArr.forEach((ing, idx) => {
      db.findIngredient(ing)
        .then((ingData) => {
          debugger;
          if (ingData.length === 0) {
            debugger;
            promiseArr.push(db.newIngredient(ing));
          } else {
            promiseArr.push(db.findIngredient(ing));
          };
          if (idx === ingArr.length - 1) {
            res.locals.ingArr = promiseArr;
            next();
          }
        });
    });
  },

  resolveIngredientPromises(req, res, next) {
    Promise.all(res.locals.ingArr)
      .then((data) => {
        res.locals.ingredients = data;
        next();
      });
  },

  addIngredients(req, res, next) {
    debugger;
    const ingArr = req.body.ingredients.split(' ');
    const promiseArr = ingArr.map(ing => db.findIngredient(ing));
    Promise.all(promiseArr)
      .then((resArr) => {
        res.locals.ingredients = resArr;
        next();
      });
  },

  addRecipe(req, res, next) {
    db.save({ ...req.body, creator_id: req.session.user.id })
      .then((resData) => {
        res.locals.recipe = resData;
        next();
      });
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
      });
  },

};
