const db = require('../config/connection');

module.exports = {
  findAll() {
    // TODO: use pgpromise to get all rows
    return db.many(`
      SELECT
        *
      FROM recipes r
      JOIN recipes_ingredients x ON r.id = x.recipes_id
      JOIN ingredients i ON i.id = x.ingredients_id
    `);
  },
};
