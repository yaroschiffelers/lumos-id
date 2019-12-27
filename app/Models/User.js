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
	 * Aggregates and combinations of existing fields.
	 *
	 * @returns {[string]}
	 */
	static get computed() {
		return [ 'fullname' ]
	}

	/**
	 * Computed property: fullname
	 *
	 * @param {string} firstname   - user.firstname
	 * @param {string} middlename  - user.middlename
	 * @param {string} lastname    - user.lastname
	 *
	 * @returns {string} - fullname
	 */
	getFullname({ firstname, middlename, lastname }) {
		return `${firstname} ${middlename ? middlename + '' : ''}${lastname}`
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
