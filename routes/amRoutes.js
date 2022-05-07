const express = require('express');

const amController = require('../controllers/amController');
const reviewRoutes = require('./reviewRoutes');

const app = express();

app.use('/:formId/reviews', reviewRoutes);

// routes partaining to agents and forms
app.route('/').get(amController.readForms).post(amController.sendForm);

// Routes for for handling specific form
app.route('/:id').get(amController.readForm).patch(amController.respondToForm);


// exporting it
module.exports = app;
