const db = require('../config/connection');

module.exports = {

  findAll() {
    return db.many(`
      SELECT r.name AS recipeTitle,
      r.content AS directions,
      i.name AS ingredients
      FROM recipes r
      JOIN recipes_ingredients x ON r.id = x.recipe_id
      JOIN ingredients i ON i.id = x.ingredient_id
    `);
  },

};
