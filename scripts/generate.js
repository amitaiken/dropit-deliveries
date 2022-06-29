const { CodeGen } = require('swagger-js-codegen');
const fs = require('fs');

const file = 'generated/swagger/Swagger.json';
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
    controllersDirName: '../generated/routes', // [optional] destination directory name for the REST APIs
    definitionsDirName: '../generated/definitions', // [optional] destination directory name for the definitions
  });
}

generate();
