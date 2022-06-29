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
- database backup data at the folder: SQL/dropit_shopping_202206290906.sql

### Generate APIs and definitions

run generate - create generate, a folder you can find APIs generated from swagger: in the `routes` directory and definitions in the `definitions` directory

```
npm run generate
```

**Important**: all of the existing APIs and definitions are deleted when this script is called. This does not affect the controllers in the `routes` directory and files in the `definitions` directory.

Names of the generated directories can be changed in the `generate.js`.

More information about the swagger-js-codegen: https://github.com/voicenter/swagger-js-codegen (Multi-class generation)

### Environment
You must use local .env file, or system environment variables to set project environment.
Also, you should set NODE_ENV to current environment, to use corresponding config file in ./config folder

##### Development

Example `.env` file structure:

```
GOOGLE_API_KEY='A....n...o';
DB_HOST=XXX.XXX.XXX.XXX;
DB_USERNAME=dropit_shopping_b;
DB_PASSWORD=judygtkXXXXX;
DB_DATABASE=dropit_shopping;
DB_DOCS_DATABASE=dropit_shopping_doc;
SEND_SMS_URL=http://XXX.XXX.XXX.XXX:5000/;
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
