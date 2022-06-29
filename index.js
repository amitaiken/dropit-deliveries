const fs = require('fs');
const config = require('config');
const fastify = require('fastify')();
const openapiGlue = require('fastify-openapi-glue');
const log = require('./helpers/log');

global['classes'] = {};
const generatedControllersPath = `${__dirname}/generated/routes`;
const generatedDefinitionsPath = `${__dirname}/generated/definitions`;
const staticControllersPath = `${__dirname}/routes`;
const staticDefinitionsPath = `${__dirname}/definitions`;

const instances = [];
// sync read of the generated definitions
let generatedDefinitions = [];
if (fs.existsSync(generatedDefinitionsPath)) {
    generatedDefinitions = fs.readdirSync(generatedDefinitionsPath);
}
// sync read of the static definitions
let staticDefinitions = [];
if (fs.existsSync(staticDefinitionsPath)) {
    staticDefinitions = fs.readdirSync(staticDefinitionsPath);
}
// load static and generated definitions into the global scope
// static definitions have preference over generator ones
// TODO: improve
generatedDefinitions.forEach((definition) => {
    const source = staticDefinitions.includes(definition) ? staticDefinitionsPath : generatedDefinitionsPath;
    // eslint-disable-next-line global-require,import/no-dynamic-require
    global.classes[definition] = require(`${source}/${definition}/${definition}.js`);
});
let generatedControllers = [];
if (fs.existsSync(generatedControllersPath)) {
    generatedControllers = fs.readdirSync(generatedControllersPath);
}
// sync read stationary controllers
let stationaryControllers = [];
if (fs.existsSync(staticControllersPath)) {
    stationaryControllers = fs.readdirSync(staticControllersPath);
}
// load static and generated controllers
// static definitions have preference over generator ones
// TODO: improve
generatedControllers.forEach((item) => {
    // load source file and get all of the available methods from the class
    const source = stationaryControllers.includes(item) ? staticControllersPath : generatedControllersPath;
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const Instance = require(`${source}/${item}/${item}.controller.js`);
    instances.push(Object.getOwnPropertyDescriptors(Instance.prototype));
});

// pass all of the methods from controllers to openapi-glue
function Service() {
}
Service.prototype = {};
instances.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    delete item.constructor;
    Object.defineProperties(Service.prototype, item);
});
const service = new Service();
const swaggerOptions = {
    routePrefix: '/documentation',
    exposeRoute: true,
    // eslint-disable-next-line global-require,import/no-dynamic-require
    swagger: { ...require(`${__dirname}/generated/swagger/Swagger.json`), ...config.swagger },
};

const openAPIGlueOptions = {
    service,
    specification: './generated/swagger/Swagger.json',
};

fastify
    .register(require('fastify-swagger'), swaggerOptions)
    .register(openapiGlue, openAPIGlueOptions);

fastify.addHook('onRequest', async (request) => {
    log.info(`Request: ${request.raw.url}`);
});

fastify.addHook('onSend', async (request, reply, payload) => {
    log.info(`Send: ${request.controllerName}`);
    if (request.entityPermissionDenied) {
        const response = JSON.parse(payload);
        return JSON.stringify(response);
    }
    return payload;
});

fastify.addHook('onClose', async (instance, done) => {
    done();
});

fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' });
});

fastify.listen(config.app.port, '0.0.0.0', (error) => {
    if (error) {
        console.error('server can\'t start listening', error);

        process.exit(1);
    }

    log.info(`Server listening on ${config.app.port} env: ${process.env.NODE_ENV}`);
});

module.exports = fastify;

