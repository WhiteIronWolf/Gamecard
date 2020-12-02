const Post = require('../../models/posts');

function find_post(req, res) {
    Post.find((err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render('explore', {
                posts: posts,
                title: 'Explore'
            });
        }
    }).sort({
        createdAt: -1
    })
}

/*
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
    res.redirect('/explore')
}
*/

module.exports = {
    find_post
}