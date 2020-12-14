const User = require('../models/user');

const get_profile = (req, res) => {
    const { id } = req.params;
    User.findById(req.session.user_id, function (err, creatorsName) {
        res.render('profile/profile', {
            title: creatorsName.name,
            user: creatorsName.name,
            id: id
        }) 
    });
}


module.exports = {
    get_profile,
}