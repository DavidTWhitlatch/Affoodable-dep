const pgp = require('pg-promise')();
const config = require('./dbConfig');

module.exports = pgp(config);
