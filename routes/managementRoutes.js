const express = require('express');
const app = express();
const router = express.Router();

const management = require('../controllers/managementContoller');
app.route('/').get(management.allunansweredtickets);

router.get('/answered', management.allansweredtickets);

app.route('/:id').get(management.readForm).patch(management.respondToForm);

module.exports = app;
