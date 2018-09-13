const express = require('express');
const viewController = require('../controllers/viewController');

const homeRouter = express.Router();

// middleware to handle 404 errors
const handle404 = (err, req, res, next) => {
console.log('thing');
  console.error(err);
  res.sendStatus(500);
  // next();
};

homeRouter.use(handle404);
homeRouter.route('/')
  .get(viewController.showHome);


module.exports = homeRouter;
