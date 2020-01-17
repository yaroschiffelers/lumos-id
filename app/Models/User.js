'use strict'

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const Model = use('Model')

/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
const Hash = use('Hash')


class User extends Model {

	static boot() {
		super.boot()

		/** @typedef {typeof import('./Hooks/UserHooks')} UserHook.hashPassword */
		this.addHook('beforeCreate', 'UserHook.hashPassword')

		/** @typedef {typeof import('./Hooks/UserHooks')} UserHook.validate */
		this.addHook('beforeCreate', 'UserHook.validate')
	}

	/**
	 * The primary key for the model.
	 *
	 * @return {String} Mongodb ObjectId
	 */
	// static get primaryKey () {
	// 	return '_id'
	// }

	/**
	 * Aggregates and combinations of existing fields.
	 *
	 * @returns {[string]}
	 */
	static get computed() {
		return [ 'fullName' ]
	}

	/**
	 * Computed property: fullName
	 *
	 * @param {Object} name - user.name
	 *
	 * @returns {string} - fullName
	 */
	getFullName({ name }) {
		const { first, middle, last } = name
		return `${first}${middle ? '' + middle + '' : ''}${last}`
	}

	/**
	 * A relationship on tokens is required for auth to
	 * work. Since features like `refreshTokens` or
	 * `rememberToken` will be saved inside the
	 * tokens table.
	 *
	 * @method tokens
	 *
	 * @return {Object}
	 */
	tokens () {
		return this.hasMany('App/Models/Token', _, _)
	}
}

module.exports = User
