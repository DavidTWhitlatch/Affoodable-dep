DELETE FROM fridge;
DELETE FROM recipes_ingredients;
DELETE FROM users;
DELETE FROM recipes;
DELETE FROM ingredients;

-- Adding dummy recipe
INSERT INTO recipes ( name, content )
VALUES ('play doh ice cream', 'Extrude your favorite color of play doh into a bowl. (Pro Tip: red is the best flavor)');

-- Adding dummy ingredients
INSERT INTO ingredients ( name )
VALUES ( 'play doh' );

-- match ingredients to recipes
INSERT INTO recipes_ingredients ( recipe_id, ingredient_id )
VALUES ( 1, 1 );
