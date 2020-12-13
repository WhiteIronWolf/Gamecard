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

function new_comment(req, res) {
  const { id } = req.params;
  User.findById(req.session.user_id, function (err, creatorsName) {
    const comment = {
      author: creatorsName.name,
      text: req.body.text
    };
    Post.updateOne({_id: id}, { $push: {comments: comment} })
    .then(() => {
      res.redirect('/explore')
    })
    .catch(() => {
      console.log('promise rejected');
      res.redirect('/explore/:id')
    })

  });
}

module.exports = { explore, new_post, new_comment };