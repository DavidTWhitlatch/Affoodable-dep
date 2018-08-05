const express = require('express');
const viewController = require('../controllers/viewController');

const homeRouter = express.Router();

// middleware to handle 404 errors
const handle404 = (err, req, res, next) => {
  console.error(err);
  res.sendStatus(404);
  // next();
};

homeRouter.route('/')
  .get(viewController.showHome);

homeRouter.use(handle404);

module.exports = homeRouter;
