# Dropit-deliveriesAPI
## Documentation
API for manage deliveries
- SwaggerAPI: https://app.swaggerhub.com/apis/amitaiken/deliveiesAPI/1.0.0#/

for explain about swaggerHub generate 
https://github.com/voicenter/MySwaggerHub

### Installation

Server:
- Local:

```
npm install
npm run serve
```
- Deploy:

```
npm run start
```

### DataBase
MySql 
- database schema at the folder: SQL/dropit_shopping_schema.sql
- database example data at the folder: SQL/dropit_shopping_exampleData.dcomp

### Generate APIs and definitions

Generate APIs in the `routes_generated` directory and definitions in the `definitions_generated` directory:

```
npm run generate
```

**Important**: all of the existing APIs and definitions are deleted when this script is called. This does not affect the controllers in the `routes` directory and files in the `definitions` directory.

Names of the generated directories can be changed in the `generate.js`.

More information about the swagger-js-codegen: https://github.com/voicenter/swagger-js-codegen (Multi-class generation)

### Generate SQL files

```
npm run generate-sql
```

Generated files are based on the provided JSON.

### Testing

Generate tests for the APIs:

```
npm run generate-tests
```

**Important**: all of the existing tests are deleted when this script is called.

Run the tests:

```
npm run test
```

### Environment
You must use local .env file, or system environment variables to set project environment.
Also, you should set NODE_ENV to current environment, to use corresponding config file in ./config folder

##### Development

Example `.env` file structure:

```
NODE_ENV = development
SWAGGER_HOST = localhost:3000
DB_URI = mysql://\[USER]:\[PASSWORD]@\[HOST_NAME]/\[DB_NAME]
DB_TEST_URI = mysql://\[USER]:\[PASSWORD]@\[HOST_NAME]/\[DB_NAME]
```




### Project Development

#### Naming Conventions

##### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.  They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

##### Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.


##### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

##### Use kebab-case for file names.

There is no official rule that you have to follow while naming your js file,
but the practice of using a hyphenated name like "some-name.js" is the most widely followed naming convention.
