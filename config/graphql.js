'use strict'

/** @typedef {import('@adonisjs/framework/src/Env')} Env */
const Env = use('Env')

const { join } = require('path')

module.exports = {
	options: {

		/*
		|--------------------------------------------------------------------------
		| Debug
		|--------------------------------------------------------------------------
		|
		| Enables logging of GraphQL server internals.
		|
		*/
		debug: Env.get('DEBUG', false),

		/*
		|--------------------------------------------------------------------------
		| endpointURL
		|--------------------------------------------------------------------------
		|
		| Your GraphQL endpoint URL, against which all requests are made.
		|
		*/
		endpointURL: '/'
	},

	/*
	|--------------------------------------------------------------------------
	| Schema
	|--------------------------------------------------------------------------
	|
	| The path to the folder where your GraphQL Schema's reside.
	|
	*/
	schema: join(__dirname, '../app/Schema'),

	/*
	|--------------------------------------------------------------------------
	| Resolvers
	|--------------------------------------------------------------------------
	|
	| The path to the folder where your GraphQL Resolvers reside.
	|
	*/
	resolvers: join(__dirname, '../app/Resolvers'),
}
