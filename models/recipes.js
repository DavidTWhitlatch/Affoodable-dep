const pgp = require('pg-promise')();

const db = require('../config/connection');

module.exports = {

  findAll() {
    return db.many(`
      SELECT r.name AS recipe_title,
      r.content AS directions,
      i.name AS ingredients
      FROM recipes r
      JOIN recipes_ingredients x ON r.id = x.recipe_id
      JOIN ingredients i ON i.id = x.ingredient_id
      WHERE r.isVisible = 't'
    `);
  },

  findByInput(att, input) {
    const inputArr = input.split(' ');
    const newArr = inputArr.map(idx => `%${idx}%`);
    let query = `SELECT r.name AS recipe_title,
        r.content AS directions,
        array_agg(i.name) AS ingredients
        FROM recipes r
        JOIN recipes_ingredients x ON r.id = x.recipe_id
        JOIN ingredients i ON i.id = x.ingredient_id
        WHERE r.isVisible = 't'`;

    newArr.map((ell, idx) => query += ` AND ${att}.name LIKE $${idx + 1} `);
    console.log(query);
    query += `GROUP BY r.name, r.content
    ORDER BY r.name`;
    console.log(query);
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
