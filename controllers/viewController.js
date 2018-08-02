module.exports = {
  showAll(req, res) {
    res.format({
      html() {
        res.render('index.ejs');
      },

      json() {
        res.json(res.locals.data);
      },
    });
  },
};
