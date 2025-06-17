const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 4003;
const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));
// req.body req.query req.params
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static('public'));
app.use(cookieParser('keyboard cat'));
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
