const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect('/sign_in')
    }
    next();
}

router.get('/want/:id/:name', requireLogin, gameController.get_want);
router.patch('/want/:id', requireLogin, gameController.patch_want);

router.get('/played/:id/:name', requireLogin, gameController.get_played);
router.patch('/played/:id', requireLogin, gameController.patch_played);


module.exports = router;