require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const homeRouter = require('./routes/homeRouter');
const recipeRouter = require('./routes/recipeRouter');
const authRouter = require('./services/auth/authRouter');
const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// set the secret using the SERVER_SECRET key stored in the .env file
app.set('server_secret', process.env.SERVER_SECRET);

// allow app to create session for users using SERVER_SECRET key. Other options are boilerplate.
app.use(session({
  secret: app.get('server_secret'),
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', authRouter);

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
app.use('/', homeRouter);
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
