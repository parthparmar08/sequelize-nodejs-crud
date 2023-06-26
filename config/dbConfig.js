module.exports = {
  // Hostname or IP address of the MySQL server
  HOST: "localhost",

  // MySQL username
  USER: "parth",

  // MySQL password
  PASSWORD: "password",

  // Name of the MySQL database to connect to
  DB: "empdb",

  // Dialect or type of the database, in this case, MySQL
  dialect: "mysql",

  // Connection pool configuration
  pool: {
    // Maximum number of connections allowed in the pool
    max: 5,

    // Minimum number of connections to be kept in the pool
    min: 0,

    // The maximum time (in milliseconds) to acquire a connection before an error is thrown
    acquire: 30000,

    // The maximum time (in milliseconds) that a connection can be idle before being released
    idle: 10000,
  },
};
