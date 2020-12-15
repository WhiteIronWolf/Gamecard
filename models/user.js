const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  },
  playing: {
    type: [{name: String, image: String}],
    default: [{name: 'Search after a game', image: '../img/posters/add-game.jpg'}, {name: 'Search after a game', image: '../img/posters/add-game.jpg'}]
  },
  played: {
    type: [{name: String, image: String}]
  },
  want: {
    type: [{name: String, image: String}]
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;