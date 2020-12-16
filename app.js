require('dotenv').config()
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const chalk = require('chalk');
// routes
const userRoute = require('./routes/userRoute');
const exploreRoute = require('./routes/exploreRoute');
const profileRoute = require('./routes/profileRoute');
const searchRoute = require('./routes/searchRoute');
const gameRoute = require('./routes/gameRoute');
// database connection
const dbUrl = process.env.DB_URL;
const dbLocal = 'mongodb://localhost:27017/gamecard_db';

// express app
const app = express();

// Create or connect to mongo database
mongoose.connect( dbUrl || dbLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({ 
  store: new MongoStore({ 
    url: dbUrl || dbLocal, 
    secret: process.env.SECRET,
    touchAfter: 24 * 60 * 60
  }),
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: false 

}));

// about
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// routes
app.use('/', userRoute);
app.use('/explore', exploreRoute);
app.use('/profile', profileRoute);
app.use('/search', searchRoute);
app.use('/game', gameRoute);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  console.log(chalk.green(`Server is running at port ${port}`));
})