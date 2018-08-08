DROP TABLE IF EXISTS fridge;
DROP TABLE IF EXISTS recipes_ingredients;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  password_digest VARCHAR(255),
  date_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ingredients
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE
);

CREATE TABLE recipes
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  content TEXT,
  creator_id INT REFERENCES users(id),
  isVisible BOOLEAN DEFAULT 't'
);

CREATE TABLE fridge
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  ingredient_id INT REFERENCES ingredients(id),
  quantity INT
);

CREATE TABLE recipes_ingredients
(
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id INT REFERENCES ingredients(id)
);