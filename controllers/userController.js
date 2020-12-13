const User = require('../models/user');
const bcrypt = require("bcrypt");

const index = (req, res) => {
    res.render('index', {
        title: 'Home'
    });
}

const get_signin = (req, res) => {
    res.render('sign_in', {
        title: 'Sign in'
    });
}

const post_signin = async (req, res) => {
    const { password, username } = req.body; 
    const user = await User.findOne({ username: username })
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
        req.session.user_id = user._id;
        res.redirect('/explore')
    } else {
        res.redirect('/sign_in')
    }
}

const get_signup = (req, res) => {
    res.render('sign_up', {
        title: 'Sign up'
    });
}

const post_signup = async (req, res) => {
    const { password, username, name } = req.body; 
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        name: name,
        username: username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/sign_in')
}

const logout = (req, res) => {
    req.session.user_id = null;
    res.redirect('/')
}

module.exports = {
    index, 
    get_signin, 
    post_signin, 
    get_signup, 
    post_signup,
    logout
}