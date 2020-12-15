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

router.patch('/want/:id', requireLogin, searchController.patch_want);
router.patch('/played/:id', requireLogin, searchController.patch_played);
router.patch('/playing/:id', requireLogin, searchController.patch_playing);


module.exports = router;