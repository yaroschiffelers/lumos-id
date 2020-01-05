# Lumos ID 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lumos ID is the main authentication and user identity service used by all Lumos products.  

## Setup

Clone this repository, cd into the source directory and run ```yarn``` to install all dependencies. After doing this, 
get your credentials and add them to the ```.env``` file in the root folder of the project.     

### Migrations

Run the following command to run startup migrations.

```shell script
adonis migration:run
```

## Development 

Run the following command to start the HTTP Server:

```shell script
adonis serve --dev
```

## Types Definitions 

Add the ```/types``` directory as Javascript library to your project. 

- IntelliJ Platforms (IDEA/WebStorm/etc): ```File | Settings | Languages & Frameworks | JavaScript | Libraries, Add...```

### Commons 

```javascript
/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
/** @typedef {import('@adonisjs/framework/src/Env')} Env */
/** @typedef {import('@adonisjs/lucid/src/Factory')} Factory */
/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
/** @typedef {import('@adonisjs/ignitor/src/Helpers')} Helpers */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/Route/Manager'} RouteManager */
/** @typedef {import('@adonisjs/lucid/src/Schema')} Schema */
/** @typedef {import('@adonisjs/framework/src/Server')} Server */
/** @typedef {import('@adonisjs/session/src/Session')} Session */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
/** @type {typeof import('app/Models/User')} */
```

More info and sources:   
- [https://blog.adonisjs.com/adonis-intellisence/](https://blog.adonisjs.com/adonis-intellisence/)
- [https://github.com/tiansin/adonis-quick-start-typescript](https://github.com/tiansin/adonis-quick-start-typescript)

## GraphQL

### Resources 

- [Apollo GraphQL for Adonis Docs](https://www.apollographql.com/docs/apollo-server/v1/servers/adonis/)
- [Adonis GraphQL Docs](https://github.com/RomainLanz/adonis-graphql)
