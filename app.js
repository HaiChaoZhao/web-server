const express = require('express');
const morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

require('./config/passport');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://zhc:cs19980722@ds163182.mlab.com:63182/poor',{ useNewUrlParser: true });

const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 7200000 },
    secret: 'haichao',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // res.locals.success_messages = req.flash('success');
    // res.locals.error_messages = req.flash('error');
    res.locals.isAuthenticated = req.user ? true : false;
    next();
});

app.use('/users', require('./routes/users'));
app.use('/phs',require('./routes/poorHouse'));
app.use('/phr',require('./routes/poorRelation'));

app.use((req, res, next) => {
    res.status(404).json({RetCode:0,RetVal:'page not found'});
});

const port = 5050

app.listen(port, () => console.log(`Server started listening on port ${port}!`));