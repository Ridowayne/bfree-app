const express = require('express');
const app = express();
const router = express.Router();

const hrContoller = require('../controllers/hrController');

app.route('/').get(hrContoller.allunansweredtickets);

router.get('/answered', hrContoller.allansweredtickets);

app.route('/:id').get(hrContoller.readForm).patch(hrContoller.respondToForm);



module.exports = app;
