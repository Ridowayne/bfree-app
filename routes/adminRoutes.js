const express = require('express');
const app = express();
const router = express.Router;

const adminController = require('../controllers/adminController');
const reviewContoller = require('../controllers/reveiwController');

const { restrictTo } = require('../controllers/authController');

app.use(restrictTo('admin'));

app.get('/stats', reviewContoller.statsOfReview);
app.get('/allreviews', reviewContoller.allReviews);


app.get('/:id', adminController.getFeedback);
app.get('/answered', adminController.answeredTickets);
app.get('/unanswered', adminController.unansweredTickets);
app.get('/ratings', adminController.ratingsAndReviwsStats);

app
  .route('/') 
  .get(adminController.getAllFeedbacks)
  
module.exports = app;
