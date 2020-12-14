const axios = require('axios')
const User = require('../models/user');
const https = require('https')

const get_search = (req, res) => {
    res.render('search/search', { title: 'Search', id: req.session.user_id})
}

const get_game = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=05d8fd67c4be4a8487be0fdadcec9020`)
    .then((response) => {
        console.log(response.data);
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



module.exports = {
    get_search,
    get_game
}