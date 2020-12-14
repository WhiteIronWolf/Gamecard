const express = require('express');

const searchController = require('../controllers/searchController');

const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect('/sign_in')
    }
    next();
}

router.get('/', requireLogin, searchController.get_search);
router.get('/:id', requireLogin, searchController.get_game);


module.exports = router;