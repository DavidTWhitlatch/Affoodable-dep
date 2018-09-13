module.exports = {
  showAll(req, res) {
    res.render('recipeSearch', { recipes: res.locals.data, user: req.session.user });
  },
  showOne(req, res) {
    res.render('oneRecipe', { recipe: res.locals.data, user: req.session.user });
  },
  
  showHome(req, res) {
    res.render('index', { user: { name: 'Login' } });
  },
  showForm(req, res) {
    res.render('recipeForm', { user: req.session.user });
  },
  showEdit(req, res) {
    res.render('recipeEdit', { recipe: res.locals.data, user: req.session.user });
  },
};
