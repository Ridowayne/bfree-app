const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

// router.get('/', userController.getAllUsers);
router.get('/myprofile', authController.protect, authController.getMe);

router.get(
  '/allusers',
  authController.restrictTo('Admin'),
  userController.getAllUsers
);

module.exports = router;
