'use strict'

/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
const Hash = use('Hash')

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Logger')} */
const Logger = use('Logger')

const debug = require('debug')('usercontroller')

/**
 * User controller
 */
class UserController {
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

		debug(`'create' called`)

		const { email, password } = request.post()

		debug(`registering email: ${email}`)
		debug(`password provided: ${password ? 'true' : 'false'}`)

		const user = new User()

		user.email = email
		user.password = await Hash.make(password)

		await user.save()

		return user
	}

	// @todo endpoint implementation.
	async read({ request }) {
		debug(`'read' called`)
		throw new Error('endpoint not implemented')
	}

	// @todo endpoint implementation.
	async update({ request }) {
		debug(`'update' called`)
		throw new Error('endpoint not implemented')
	}

	// @todo endpoint implementation.
	async delete({ request }) {
		debug(`'delete' called`)
		throw new Error('endpoint not implemented')
	}
}

module.exports = UserController
