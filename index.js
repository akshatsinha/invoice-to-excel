var morgan = require('morgan')
var express = require('express')
var bodyParser = require('body-parser')
var loginRoutes = require('./routes/login')
var registerRoutes = require('./routes/register')
var dashboardRoutes = require('./routes/dashboard')
var invoiceRoutes = require('./routes/invoice')
var logoutRoutes = require('./routes/logout')
var session = require('client-sessions')
var auth = require('./lib/auth')
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
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true
}))
app.use(csrf())
app.use(auth.updateUserObjIfLoggedIn) // removes password from going back to the client
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/dashboard', auth.requireLogin, dashboardRoutes)
app.use('/invoice', auth.requireLogin, invoiceRoutes)
app.use('/logout', logoutRoutes)

// Go to the index page
app.get('/', function(req, res) {
    res.render('index.jade');
});


app.listen('3000')