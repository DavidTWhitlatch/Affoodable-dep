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
// const ingredientRouter = require('./routes/ingredientRouter');
const authRouter = require('./services/auth/authRouter');
const userRouter = require('./routes/userRouter');

const PORT = process.env.port || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));

// allow app to create session for users using SERVER_SECRET key. Other options are boilerplate.
app.use(session({
  secret: app.get(process.env.SERVER_SECRET),
  resave: false,
  saveUninitialized: false,
}));

app.use('/auth', authRouter);

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
app.use('/', homeRouter);
// app.use('/ingredients', ingredientRouter);
// app.use('/', (req, res) => res.send('hello world'));
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
