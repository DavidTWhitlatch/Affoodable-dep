const db = require('../config/connection');

function findAll() {
  return db.many(`
    SELECT id, recipe_title, directions, ingredients, creator_id FROM
    (SELECT r.id AS id,
        r.name AS recipe_title,
        r.content AS directions,
        r.creator_id AS creator_id,
        string_agg(i.name, ' ') AS ingredients,
        r.isVisible AS isVisible
        FROM recipes r
        JOIN recipes_ingredients x ON r.id = x.recipe_id
        JOIN ingredients i ON i.id = x.ingredient_id
        GROUP BY r.name, r.content, r.isVisible, r.id, r.creator_id
        ORDER BY r.name) results
        WHERE isVisible = 't'
    `);
}

function findByInput(att, input) {
  const inputArr = input.split(' ');
  const newArr = inputArr.map(idx => `%${idx}%`);
  let query = `SELECT id, recipe_title, directions, ingredients, creator_id FROM
    (SELECT r.id AS id
        r.name AS recipe_title,
        r.content AS directions,
        r.creator_id AS creator_id,
        string_agg(i.name, ' ') AS ingredients,
        r.isVisible AS isVisible
        FROM recipes r
        JOIN recipes_ingredients x ON r.id = x.recipe_id
        JOIN ingredients i ON i.id = x.ingredient_id
        GROUP BY r.name, r.content, r.isVisible, r.id, r.creator_id
        ORDER BY r.name) results
        WHERE isVisible = 't'`;
  newArr.map((ell, idx) => query += ` AND ${att} LIKE $${idx + 1} `);
  return db.many(query, newArr);
}

function findById(id) {
  debugger;
  return db.one(`
      SELECT id, recipe_title, directions, ingredients, creator_id FROM
      (SELECT r.id AS id,
      r.name AS recipe_title,
      r.content AS directions,
      r.creator_id AS creator_id,
      string_agg(i.name, ' ') AS ingredients,
      r.isVisible AS isVisible
      FROM recipes r
      JOIN recipes_ingredients x ON r.id = x.recipe_id
      JOIN ingredients i ON i.id = x.ingredient_id
      GROUP BY r.name, r.content, r.isVisible, r.id, r.creator_id
      ORDER BY r.name) results
      WHERE isVisible = 't'
      AND id = $1
    `, id);
}

function findRecipeId(id) {
  return db.one(`
    SELECT * from recipes
    WHERE id = $1
    `, id);
}

function destroy(id) {
  return db.none(`
      DELETE FROM quotes
      WHERE id = $1
    `, id);
}

function newIngredient(ingredient) {
  return db.one(`INSERT INTO ingredients (name)
      VALUES ($1)
      RETURNING *`, ingredient);
}

function findIngredient(ingredient) {
  return db.any('SELECT * FROM ingredients WHERE name = $1', ingredient);
}

function save(recipe, creatorId) {
  return db.one(`INSERT INTO recipes ( name, content, creator_id)
    Values ($/name/, $/content/, $/creatorId/)
    RETURNING *`, { ...recipe, creatorId });
}

function update(id, recipe) {
  return db.one(`UPDATE recipes ( name, content)
    Values ($/name/, $/content/)
    WHERE id = $/id/`, { id, ...recipe });
}

function matchIngredient(recipe, ingredient) {
  return db.one(`INSERT INTO recipes_ingredients (ingredient_id, recipe_id)
  VALUES ( $1, $2 )
  RETURNING *`, [ingredient.id, recipe.id]);
}

function removeMatchIngredient(id) {
  return db.many(`DELETE FROM recipes_ingredients
  WHERE recipe_id = $1
  `, id);
}

module.exports = {
  findAll,
  findByInput,
  findById,
  findIngredient,
  newIngredient,
  save,
  update,
  matchIngredient,
  removeMatchIngredient,
  findRecipeId,
  destroy,
};
