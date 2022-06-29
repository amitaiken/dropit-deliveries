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
    port: process.env.PORT,
    TOKEN_LIFE_TIME_H: 1000000,
    CHECK_TOKEN: true,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  },
  swagger: {
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    schemes: ['https', 'http'],
    security: [{ JWT: [] }],
    host: process.env.SWAGGER_HOST || 'localhost:3000',
  },
  saml: {
    path: process.env.SAML_CALLBACK,
    entryPoint: process.env.SAML_ENTRYPOINT,
    issuer: process.env.SAML_ISSUER,
    cert: process.env.SAML_CERT,
  },
  redis: {},
  mysql: {
    debug: {
      enabled: false,
      result: false,
      executionTime: true,
    },
  },
  mysqlRedis: {
    cacheOptions: {
      expire: 1,// seconds
    }
  },
  metrics: {
    enabled: true,
  }
};
