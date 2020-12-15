const axios = require('axios')
const User = require('../models/user');

const get_search = (req, res) => {
    res.render('search/search', { title: 'Search', id: req.session.user_id})
}

const get_game = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=05d8fd67c4be4a8487be0fdadcec9020`)
    .then((response) => {
        res.render('search/game', {
            title: 'Game',
            id: id,
            user: req.session.user_id,
            data: response.data
        })
    })
    .catch((e) => {
        console.log(e);
    })
};

const patch_want = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=05d8fd67c4be4a8487be0fdadcec9020`)
    .then((response) => {
        const game = {
            name: response.data.name,
            image: response.data.background_image
        };
        User.updateOne({_id: req.session.user_id}, { $push: {want: game} })
        .then(() => {
        res.redirect(`/profile/${req.session.user_id}`)
        })
        .catch(() => {
        console.log('promise rejected');
        res.redirect('/search')
        })
    })
    .catch((e) => {
        console.log(e);
    })
}

const patch_playing = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=05d8fd67c4be4a8487be0fdadcec9020`)
    .then((response) => {
        const game = {
            name: response.data.name,
            image: response.data.background_image
        };
        User.updateOne({_id: req.session.user_id}, { $pop: {playing: -1} })
        .then(() => {
            User.updateOne({_id: req.session.user_id}, { $push: {playing: game} })
            .then(() => {
                res.redirect(`/profile/${req.session.user_id}`)
            })
            .catch(() => {
                console.log('promise rejected at push');
                res.redirect('/search')
            })
        })
        .catch(() => {
        console.log('promise rejected at pop');
        res.redirect('/search')
        })
    })
    .catch((e) => {
        console.log(e);
    })
}

const patch_played = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=05d8fd67c4be4a8487be0fdadcec9020`)
    .then((response) => {
        const game = {
            name: response.data.name,
            image: response.data.background_image
        };
        User.updateOne({_id: req.session.user_id}, { $push: {played: game} })
        .then(() => {
        res.redirect(`/profile/${req.session.user_id}`)
        })
        .catch(() => {
        console.log('promise rejected');
        res.redirect('/search')
        })
    })
    .catch((e) => {
        console.log(e);
    })
}


module.exports = {
    get_search,
    get_game,
    patch_want,
    patch_played,
    patch_playing
}