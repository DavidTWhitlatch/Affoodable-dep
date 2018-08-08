const db = require('../config/connection');

function findAll() {
  return db.many(`
    SELECT recipe_title, directions, ingredients FROM
    (SELECT r.name AS recipe_title,
        r.content AS directions,
        string_agg(i.name, ' ') AS ingredients,
        r.isVisible AS isVisible
        FROM recipes r
        JOIN recipes_ingredients x ON r.id = x.recipe_id
        JOIN ingredients i ON i.id = x.ingredient_id
        GROUP BY r.name, r.content, r.isVisible
        ORDER BY r.name) results
        WHERE isVisible = 't'
    `);
}

function findByInput(att, input) {
  const inputArr = input.split(' ');
  const newArr = inputArr.map(idx => `%${idx}%`);
  let query = `SELECT recipe_title, directions, ingredients FROM
    (SELECT r.name AS recipe_title,
        r.content AS directions,
        string_agg(i.name, ' ') AS ingredients,
        r.isVisible AS isVisible
        FROM recipes r
        JOIN recipes_ingredients x ON r.id = x.recipe_id
        JOIN ingredients i ON i.id = x.ingredient_id
        GROUP BY r.name, r.content, r.isVisible
        ORDER BY r.name) results
        WHERE isVisible = 't'`;
  newArr.map((ell, idx) => query += ` AND ${att} LIKE $${idx + 1} `);
  return db.many(query, newArr);
}

function findById(id) {
  return db.many(`
    SELECT id, recipe_title, directions, ingredients FROM
    (SELECT r.id AS id
      r.name AS recipe_title,
      r.content AS directions,
      string_agg(i.name, ' ') AS ingredients,
      r.isVisible AS isVisible
      FROM recipes r
      JOIN recipes_ingredients x ON r.id = x.recipe_id
      JOIN ingredients i ON i.id = x.ingredient_id
      GROUP BY r.name, r.content, r.isVisible
      ORDER BY r.name) results
      WHERE isVisible = 't'
      AND id = $1
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

function save(recipe) {
  return db.one(`INSERT INTO recipes ( name, content)
    Values ($/name/, $/content/)
    RETURNING *`, recipe);
}

function matchIngredient(recipe, ingredient) {
  console.log(recipe);
  console.log(ingredient);
  return db.one(`INSERT INTO recipes_ingredients (ingredient_id, recipe_id)
    VALUES ( $1, $2 )
    RETURNING *`, [ingredient.id, recipe.id]);
}

module.exports = {
  findAll,
  findByInput,
  findById,
  findIngredient,
  newIngredient,
  save,
  matchIngredient,
};
