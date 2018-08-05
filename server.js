const express = require('express');
const logger = require('morgan');

const homeRouter = require('./routes/homeRouter');
const recipeRouter = require('./routes/recipeRouter');
// const ingredientRouter = require('./routes/ingredientRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use('/', homeRouter);
app.use('/recipes', recipeRouter);
// app.use('/ingredients', ingredientRouter);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
