DELETE FROM fridge;
DELETE FROM recipes_ingredients;
DELETE FROM users;
DELETE FROM recipes;
DELETE FROM ingredients;

-- Adding dummy recipe
INSERT INTO recipes ( name, content )
VALUES ('play doh ice cream', 'Extrude your favorite color of play doh into a bowl. (Pro Tip: red is the best flavor)'),
('play doh pizza', 'Flatten a ball of play doh into a disc and add shapes and color to desired taste'),
('mud', 'combine dirt and water');

-- Adding dummy ingredients
INSERT INTO ingredients ( name )
VALUES ( 'play doh' ),
('dirt'),
('water');

-- match ingredients to recipes
INSERT INTO recipes_ingredients ( recipe_id, ingredient_id )
VALUES ( 1, 1 ),
( 2, 1 ),
( 3, 2 ),
( 3, 3 );

INSERT INTO users ( name, password_digest )
VALUES ( 'zane', '$2b$11$TV1/IcP7szIS5om..KsF8OWWJwedJOx5iCC.8hVlaVU.p/gUu4vqC');
