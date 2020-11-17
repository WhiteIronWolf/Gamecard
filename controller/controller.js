const express = require('express');
const Post = require('../models/posts');

const find_post = (req, res) => {
    Post.find((err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                posts: posts,
                title: 'home'
            });
        }
    }).sort({
        createdAt: -1
    })
}

const create_post = (req, res) => {
    res.render('create', {
        title: 'Create'
    })
}

const new_post = (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
    });
    post.save();
    res.redirect('/')
}

const router = express.Router();

router.get('/', find_post);
router.get('/create', create_post);
router.post('/create', new_post);

module.exports = router;