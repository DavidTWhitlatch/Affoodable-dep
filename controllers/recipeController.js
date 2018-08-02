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

};
