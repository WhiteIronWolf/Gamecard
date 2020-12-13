const use = require('./functions/explore');

const get_explore = (req, res) => {
    use.explore(req, res);
}

const get_create = (req, res) => {
    res.render('create', {
        title: 'Create'
    })
}

const post_create = (req, res) => {
    use.new_post(req, res);
}

module.exports = {
    get_explore,
    get_create,
    post_create
}