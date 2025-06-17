var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var logger = require('morgan');

require("dotenv").config();  // .env
const cors = require('cors');
const nunjucks = require("nunjucks");

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var resRouter = require('./routes/reservation');
var payRouter = require('./routes/pay');
var cleanerRouter = require('./routes/cleaner');
var loingRouter = require('./routes/login');
const {ne} = require("nunjucks/src/tests");

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
   secret: 'a0123456789',
   resave: false,
   saveUninitialized: false,
   cookie: {
     httpOnly: false,
     secure: false,
   },
   name: "session-cookie",
}))

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/reservation', resRouter);
app.use('/pay', payRouter);
app.use('/cleaner', cleanerRouter);
app.use('/login', loingRouter);

module.exports = app;
