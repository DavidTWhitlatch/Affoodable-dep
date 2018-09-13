module.exports = process.env.DATABASE_URL || {
  database: 'affoodable',
  host: 'localhost',
  port: 5432,
};
