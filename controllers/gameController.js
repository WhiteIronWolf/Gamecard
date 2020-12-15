const User = require('../models/user');

const get_want = (req, res) => {
    const { id, name } = req.params;
    res.render('game/game', {
        id: id,
        name: name,
        user: req.session.user_id,
        path: 'want'
    })

};

const patch_want = (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate( req.session.user_id, { $pull: { want: { _id: id } } } )
    .then(() => {
        res.redirect(`/profile/${req.session.user_id}`)
    })
    .catch(() => {
        console.log('could not delete');
        res.redirect(`/profile/${req.session.user_id}`)
    })
}

const get_played = (req, res) => {
    const { id, name } = req.params;
    res.render('game/game', {
        id: id,
        name: name,
        user: req.session.user_id,
        path: 'played'
    })

};

const patch_played = (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate( req.session.user_id, { $pull: { played: { _id: id } } } )
    .then(() => {
        res.redirect(`/profile/${req.session.user_id}`)
    })
    .catch(() => {
        console.log('could not delete');
        res.redirect(`/profile/${req.session.user_id}`)
    })
}

module.exports = {
    get_want,
    patch_want,
    get_played,
    patch_played
}