const express = require('express');

const profileController = require('../controllers/profileController');

const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect('/sign_in')
    }
    next();
}

router.get('/:id', requireLogin, profileController.get_profile);


module.exports = router;