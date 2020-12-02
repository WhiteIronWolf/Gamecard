const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const chalk = require('chalk');

// express app
const app = express();

// Create or connect to mongo database
mongoose.connect('mongodb://localhost:27017/gamecard_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// about
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// routes
app.use('/', routes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(3000, (err) => {
  console.log(chalk.green('Server is running at port 3000'));
})