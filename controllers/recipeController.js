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
    const promiseArr = ingArr.map((ing) => {
      db.findIngredient(ing)
        .then((ingData) => {
          if (!ingData) {
            return db.newIngredient(ing);
          }
        });
    });
    Promise.all(promiseArr)
      .then((data) => {
        console.log(data);
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
    debugger;
    db.save({ ...req.body, creator_id: req.session.user.id })
      .then((resData) => {
        res.locals.recipe = resData;
        next();
      });
  },

  addRecipeIngredients(req, res, next) {
    debugger;
    const promiseArr = res.locals.ingredients.map((ing) => {
      return db.matchIngredient(res.locals.recipe, ing);
    });
    Promise.all(promiseArr)
      .then((data) => {
        res.redirect('/recipes');
      });
  },

};
