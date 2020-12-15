const User = require('../models/user');

const get_profile = (req, res) => {
    const { id } = req.params;
    User.findById(req.session.user_id, function (err, user) {
        res.render('profile/profile', {
            title: user.name,
            user: user.name,
            want: user.want,
            played: user.played,
            playing: user.playing,
            id: id
        }) 
    });
}


module.exports = {
    get_profile,
}