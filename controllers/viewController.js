module.exports = {
  showAll(req, res) {
    debugger;
    res.render('recipeSearch', { recipes: res.locals.data });
  },
  showHome(req, res) {
    res.render('index');
  },
  showForm(req, res) {
    res.render('recipeForm');
  },
  
};
