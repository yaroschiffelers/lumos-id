'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

Route.get('/', () => ({ body: 'Welcome to Lumos ID' }))

/**
 * Get a user
 * @route user
 */
Route
	.get('/user', 'UserController.get')
	.validator('User')

/**
 * Create a new user
 * @route user
 */
Route
	.post('/user', 'UserController.create')
	// .validator('User')

/**
 * Update a user
 * @route user
 */
Route
	.put('/user', 'UserController.update')
	.validator('User')

/**
 * Delete a user
 * @route user
 */
Route
	.post('/user/delete', 'UserController.delete')

Route
	.post('/auth', 'UserController.login')
	// .validator('User')

Route
	.get('/auth', 'UserController.logout')
	.validator('User')
