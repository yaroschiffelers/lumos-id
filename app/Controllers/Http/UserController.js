'use strict'

/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
const Hash = use('Hash')

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Logger')} */
// const Logger = use('Logger')

const debug = require('debug')('usercontroller')

const createUser = async ({ email = '', password = null, firstName = '', middleName = '', lastName = '' } = {}) => {

	// Create a new instance
	const user = new User()

	// Set the applicable fields
	user.email = email
	user.firstName = firstName
	user.middleName = middleName
	user.lastName = lastName
	user.permissionLevel = 1

	/**
	 * Password get hashed by the models beforeCreate hook. So no need to do it here, otherwise we'll
	 * be storing a hash of a hash.
	 *
	 * @see UserHook.hashPassword
	 */
	user.password = password

	// return the new instance
	return user
}

/**
 * User controller
 */
class UserController {

	/**
	 * Get the current users' information object
	 *
	 * @param request
	 *
	 * @returns {Promise<void>}
	 */
	async get({ request }) {

		debug(`'get' called`)

		const { email } = request.get()

		try {
			return await User
				.query()
				.where('email', email)
				.first()

		} catch (error) {
			return error
		}
	}

	/**
	 * Register (create) a new user
	 *
	 * @call POST
	 * @header Content-type:application/json
	 *
	 * @param {object} ctx
	 * @param {Object} ctx.request
	 *
	 * @returns {Promise<void>} user
	 */
	async create({ request }) {

		debug('create called')

		const body = request.post()

		// const user = new User()
		// user.email = email
		// user.password = await Hash.make(password)
		// user.firstName = 1
		// user.middleName = 1
		// user.lastName = 1
		// user.permissionLevel = 1

		const user = await createUser({ ...body })

		debug(user)

		await user.save()

		return user
	}

	// @todo endpoint implementation.
	async update({ request }) {

		debug(`'update' called`)
		throw new Error('endpoint not implemented')
	}

	async delete({ request }) {

		const { email } = request.post()

		try {
			const user = await User
				.query()
				.where('email', email)
				.first()

			return user.delete()
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Login a excising user
	 *
	 * @call POST
	 *
	 * @param request
	 * @param auth
	 * @param session
	 *
	 * @returns {Promise<*|Object>}
	 */
	async login({ request, auth }) {

		debug(`'login' called`)

		const { email, password } = request.post()
		return await auth.attempt(email, password)
		// try {
		// 	return await auth.attempt(email, password)
		// } catch (error) {
		// 	return { error: 'Invalid Login Credentials' }
		// }
	}

	/**
	 * Logout a logged in user
	 *
	 * @param auth
	 * @param session
	 *
	 * @returns {Promise<*|void>}
	 */
	async logout({ auth, session }) {

		debug(`'logout' called`)

		try {
			return await auth.logout()
		} catch (error) {
			session.flash({ error: 'Invalid Login Credentials' })
			return error
		}
	}
}

module.exports = UserController
