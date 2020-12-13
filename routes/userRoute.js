const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.index);
router.get('/sign_in', userController.get_signin);
router.post('/sign_in', userController.post_signin);
router.get('/sign_up', userController.get_signup);
router.post('/sign_up', userController.post_signup);
router.post('/logout', userController.logout);

module.exports = router;