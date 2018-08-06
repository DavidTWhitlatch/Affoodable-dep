const db = require('../config/connection');

module.exports = {

  findAll() {
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
  },

  findByInput(att, input) {
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
  },


  // save(quote) {
  //   return db.one(`
  //     INSERT INTO quotes (content , author, creator_id)
  //     VALUES ($/content/, $/author/, $/creator_id/)
  //     RETURNING *
  //   `, quote);
  // },

};
