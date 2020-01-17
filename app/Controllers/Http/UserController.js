'use strict'

/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
const Hash = use('Hash')

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Logger')} */
	// const Logger = use('Logger')

const debug = require('debug')('usercontroller')
const { createUser } = require('../../Models/User')

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

		const body = request.post()

		const user = await createUser({ ...body })

		await user.save()

		return user
	}

	// @todo endpoint implementation.
	async update() {
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
