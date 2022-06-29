require('dotenv').config();

//const initEnv = require('../helpers/init-env');

module.exports = {
  amqp: {
    primaryConnectionOptions: {
      protocol: process.env.AMQP_PRIMARY_PROTOCOL || 'amqp',
      hostname: process.env.AMQP_PRIMARY_HOSTNAME || 'localhost',
      port: process.env.AMQP_PRIMARY_PORT || 5672,
      username: process.env.AMQP_PRIMARY_USERNAME || 'guest',
      password: process.env.AMQP_PRIMARY_PASSWORD || 'guest',
    },
    reserveConnectionOptions: {
      protocol: process.env.AMQP_RESERVE_PROTOCOL || 'amqp',
      hostname: process.env.AMQP_RESERVE_HOSTNAME || 'localhost',
      port: process.env.AMQP_RESERVE_PORT || 5672,
      username: process.env.AMQP_RESERVE_USERNAME || 'guest',
      password: process.env.AMQP_RESERVE_PASSWORD || 'guest',
    },
  },
  app: {
    port: process.env.PORT || 3000,
    //PRIVATE_KEY: initEnv.PRIVATE_KEY,
    //PUBLIC_KEY: initEnv.PUBLIC_KEY,
    TOKEN_LIFE_TIME_H: 72,
    CHECK_TOKEN: true,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  },
  swagger: {
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ JWT: [] }],
  },
  saml: {
    path: process.env.SAML_CALLBACK,
    entryPoint: process.env.SAML_ENTRYPOINT,
    issuer: process.env.SAML_ISSUER,
    cert: process.env.SAML_CERT
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    reconnectDelay: 10000,
  },
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    docsDatabase: process.env.DB_DOCS_DATABASE,
    charset: process.env.DB_CHARSET || 'utf8mb4',
    debug: {
      enabled: false,
    },
  },
  pool: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 100,
    charset: process.env.DB_CHARSET || 'utf8mb4',
  },
  mysqlRedis: {
    cacheOptions: {
      keyPrefix: 'mysql-redis.',
      debug: true,
    },
  }
  ,
  "SmtpList": [
    {
      Host: "smtp.mandrillapp.com",
      Port: 587,  //465
      Password: process.env.SMTP_PASSWORD,
      UserName: "AKK"
    }
  ],
  FromEmail: "AKK@AKK.co.il",
  EmailFailedName: "AKK AKK"
};
