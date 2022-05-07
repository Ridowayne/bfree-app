const express = require('express');
const app = express();
const router = express.Router();

const teamleadController = require('../controllers/teamLeadContoller');
app.route('/').get(teamleadController.allunansweredtickets);

router.get('/answered', teamleadController.allansweredtickets);


app
  .route('/:id')
  .get(teamleadController.readForm)
  .patch(teamleadController.respondToForm);

module.exports = app;
