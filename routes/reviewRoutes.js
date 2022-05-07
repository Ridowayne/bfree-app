const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });

const reviewContoller = require('../controllers/reveiwController');

// still needs to restrict reviewing to onling ams and other things should be for other people
app
  .route('/am')
  .post(reviewContoller.writeReview)

module.exports = app;
