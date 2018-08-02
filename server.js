const express = require('express');
const recipeRouter = require('./routes/recipeRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Affoodable');
});

app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
