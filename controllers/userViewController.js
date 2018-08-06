module.exports = {
  handleUserProfile(req, res) {
    res.redirect('/users/profile');
  },

  handleLogout(req, res) {
    res.redirect('/');
  },

  showUserProfile(req, res) {
    res.render('index', {
      user: req.session.user,
    });
  },

};
