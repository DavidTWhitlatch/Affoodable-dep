// bcrypt will be used to hash the plain text password (register phase) and compare password_digest (login phase)
const bcrypt = require('bcrypt');
const db = require('../../models/user');
const authView = require('./authViewController');

function checkPassword(loginAttempt, userInfo) {
  const validPass = bcrypt.compareSync(loginAttempt.password, userInfo.password_digest);

  if (!validPass) {
    return false;
  }

  return userInfo;
}

function login(req, res, next) {
  const loginAttempt = {
    username: req.body.username,
    password: req.body.password,
  };

  db.findByUsername(loginAttempt.username)
    .then(user => checkPassword(loginAttempt, user))
    .then((isValidAttempt) => {
      if (!isValidAttempt) {
        throw { message: 'Incorrect credentials' }
      }

      req.session.user = isValidAttempt;
      next();
    })
    .catch(() => {
      // redirect back to login page
      authView.loginError(req, res, next);
    });
}

function register(req, res, next) {
  const salt = parseInt(process.env.SALT);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = {
    name: req.body.username,
    password_digest: hash,
  };

  db.createUser(user)
    .then((userData) => {
      console.log(userData);
      if (!userData) {
        throw { message: 'Try again :(' }
      }
      req.session.user = userData;

      next();
    })
    .catch((err) => {
      authView.registerError(req, res, next);
    });
  }
  
function logout(req, res, next) {
  // destroy session
  // next will be called with either an error or undefined.
  // (negative or positive path)
  req.session.destroy(err => next(err));
}

const loginRequired = [
  /* this is either going to resolve to next(false) or next(null) */
  (req, res, next) => next(!req.session.user || null),
  (err, req, res, next) => res.sendStatus(401),
];


module.exports = {
  login,
  logout,
  register,
  loginRequired,
};
