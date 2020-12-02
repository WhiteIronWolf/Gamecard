const explore = require('./functions/explore');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const home = (req, res) => {
    res.render('index', {
        title: 'Home'
    });
}

const get_signin = (req, res) => {
    res.render('sign_in', {
        title: 'Sign in'
    });
}

const post_signin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        explore.find_post(req, res);
                    }
                });
            }
        }
    });
}

const get_signup = (req, res) => {
    res.render('sign_up', {
        title: 'Sign up'
    });
}

const post_signup = (req, res) => {
    console.log("Post at sign up");
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.username,
            password: hash
        });
        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                explore.find_post(req, res);
            }
        });
    });
}

module.exports = {
    home, 
    get_signin, 
    post_signin, 
    get_signup, 
    post_signup
}