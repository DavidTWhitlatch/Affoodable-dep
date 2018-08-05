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

};
