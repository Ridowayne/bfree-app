const express = require('express');
const app = express();
const router = express.Router();

const iTContoller = require('../controllers/iTController');
app.route('/').get(iTContoller.allunansweredtickets);

router.get('/answered', iTContoller.allansweredtickets);

app.route('/:id').get(iTContoller.readForm).patch(iTContoller.respondToForm);

module.exports = app;
