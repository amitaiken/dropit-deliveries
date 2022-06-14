const fastify = require('fastify')({ logger: true })
const fs = require('fs');
const config = require('config');
global['classes'] = {};

const generatedControllersPath = `${__dirname}/routes_generated`;
const generatedDefinitionsPath = `${__dirname}/definitions_generated`;
const staticControllersPath = `${__dirname}/routes`;
const staticDefinitionsPath = `${__dirname}/definitions`;
const instances = [];

// sync read of the generated definitions
let gD = [];
if (fs.existsSync(generatedDefinitionsPath)) {
    gD = fs.readdirSync(generatedDefinitionsPath);
}

// sync read of the static definitions
let sD = [];
if (fs.existsSync(staticDefinitionsPath)) {
    sD = fs.readdirSync(staticDefinitionsPath);
}

// load static and generated definitions into the global scope TODO: improve
gD.forEach((definition) => {
    const source = sD.includes(definition) ? staticDefinitionsPath : generatedDefinitionsPath;
    global.classes[definition] = require(`${source}/${definition}/${definition}.js`);
});

// sync read generated controllers
let gC = [];
if (fs.existsSync(generatedControllersPath)) {
    gC = fs.readdirSync(generatedControllersPath);
}

// sync read stationary controllers
let sC = [];
if (fs.existsSync(staticControllersPath)) {
    sC = fs.readdirSync(staticControllersPath);
}
// load static and generated controllers TODO: improve
gC.forEach((item) => {
    // load source file and get all of the available methods from the class
    const source = sC.includes(item) ? staticControllersPath : generatedControllersPath;
    const Instance = require(`${source}/${item}/${item}.controller.js`);
    instances.push(Object.getOwnPropertyDescriptors(Instance.prototype));
});

// pass all of the methods from controllers to openapi-glue
function Service() {
}

Service.prototype = {};
instances.forEach((item) => {
    delete item.constructor;
    Object.defineProperties(Service.prototype, item);
});
const service = new Service;
const swaggerOptions = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {...require(__dirname + '/docs/Swagger.v2.json'), ...config['swagger']}
};

fastify
    .register(require('fastify-swagger'), swaggerOptions)
// run the server
if (process.env.NODE_ENV !== 'test')
    fastify.listen(3000,'0.0.0.0', (err) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.log.info(`Server listening on ${fastify.server.address().port}, env: ${process.env.NODE_ENV}`)
    });

module.exports = fastify;
