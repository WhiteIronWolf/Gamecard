const express = require('express');

const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', homeController.home);
router.get('/sign_in', homeController.get_signin);
router.post('/sign_in', homeController.post_signin);
router.get('/sign_up', homeController.get_signup);
router.post('/sign_up', homeController.post_signup);

module.exports = router;