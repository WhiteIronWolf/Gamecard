const express = require('express');

const exploreController = require('../controllers/exploreController');

const router = express.Router();

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect('/sign_in')
    }
    next();
}

router.get('/', requireLogin, exploreController.get_explore);
router.post('/', requireLogin, exploreController.post_create);
router.get('/create', requireLogin, exploreController.get_create);

router.get('/:id', requireLogin, exploreController.get_comment);
router.patch('/:id', requireLogin, exploreController.patch_comment);

module.exports = router;