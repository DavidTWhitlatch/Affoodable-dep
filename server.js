const express = require('express');
const logger = require('morgan');

const recipeRouter = require('./routes/recipeRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
