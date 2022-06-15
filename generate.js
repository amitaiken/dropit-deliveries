const { CodeGen } = require('swagger-js-codegen');
const fs = require('fs');

const file = './docs/Swagger.v2.json';
const swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
const className = 'Service';

/**
 * Generate APIs and definitions
 * @returns {Promise<void>}
 */
async function generate() {
  await CodeGen.getNodeCode({
    className, // [required] name of the class (not really used if "multiple" is provided)
    swagger, // [required] JSON
    multiple: true, // [required] specifies that multiple classes should be created
    path: __dirname, // [required] where to create the destination directory
    controllersDirName: 'routes_generated', // [optional] destination directory name for the REST APIs
    definitionsDirName: 'definitions_generated', // [optional] destination directory name for the definitions
  });
}

generate();
