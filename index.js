var morgan = require('morgan')
var express = require('express')
var bodyParser = require('body-parser')
var loginRoutes = require('./routes/login')
var registerRoutes = require('./routes/register')
var dashboardRoutes = require('./routes/dashboard')
var billRoutes = require('./routes/bills')
var logoutRoutes = require('./routes/logout')
var baccountRoutes = require('./routes/baccounts')
var dealerRoutes = require('./routes/dealers')
var session = require('client-sessions')
var auth = require('./lib/auth')
var utils = require('./lib/utils')
var csrf = require('csurf')
var passport = require('passport')
const flash = require('connect-flash');

var app = express();
app.set('view engine', 'jade');

// middleware
app.use(morgan('[:date[iso]] :method :url :status'))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    cookieName: 'session',
    secret: 'fegregregreabhrehajt34r4fr',
//    duration: 48 * 60 * 60 * 1000 // 2 days
    duration: 4 * 30 * 24 * 60 * 60 * 1000, // 4 months
    activeDuration: 5 * 60 * 1000,
    httpOnly: true
}))

app.use(csrf())
app.use(function (req, res, next) {
    res.cookie("XSRF-TOKEN",req.csrfToken());
    return next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', loginRoutes)
app.use('/signup', registerRoutes)
app.use('/dashboard', auth.requireLogin, dashboardRoutes)
app.use('/bills', auth.requireLogin, billRoutes)
app.use('/baccounts', auth.requireLogin, baccountRoutes)
app.use('/dealers', auth.requireLogin, dealerRoutes)
app.use('/logout', logoutRoutes)

// Go to the index page
app.get('/', auth.redirectToDashbaordIfLoggedIn, function(req, res) {
    res.render('index.jade');
});


app.listen('3000')