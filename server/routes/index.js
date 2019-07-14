const express = require('express');
const router = express.Router();

//! Controllers
const usersController = require('../controllers/users');

/***************************** REMINDER ****************************/
router.post('/users', usersController.createUser);
router.put('/users/:userId', usersController.updateUser);
router.get('/users', usersController.readAll );
router.delete('/users/:userId', usersController.deleteUser);

module.exports = router;
