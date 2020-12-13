const Post = require('../../models/posts');
const User = require('../../models/user');

function explore(req, res) {
  Post.find().sort({ createdAt: -1 })
  .then(result => {
    res.render('explore', { posts: result, title: 'Explore' });
  })
  .catch(err => {
    console.log(err);
  });
}

function new_post(req, res) {
  User.findById(req.session.user_id, function (err, creatorsName) {
    const post = new Post({
      author: creatorsName.name,
      title: req.body.title,
      text: req.body.text,
      image: req.body.image
    });
    post.save();
    res.redirect('/explore')
  });
}

module.exports = { explore, new_post };