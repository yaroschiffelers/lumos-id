'use strict'

/** @typedef {import('@adonisjs/framework/src/Hash')} Hash */
const Hash = use('Hash')

const UserHook = exports = module.exports = {}

/**
 * A hook to hash the user password before saving
 * it to the database.
 *
 * @param user
 * @param user.dirty
 * @param user.dirty.password
 * @param user.password
 *
 * @returns {Promise<void>}
 */
UserHook.hashPassword = async user => {
	if (user.dirty.password) {
		user.password = await Hash.make(user.password)
	}
}

/**
 * Validate new data before saving to the database, aborts the database
 * operations if there are validation errors by throwing exceptions.
 *
 * @param user
 * @param user.email
 *
 * @returns {Promise<void>}
 */
UserHook.validate = async user => {
	if (!user.email) {
		throw new Error('[UserHook][validate] Email is required!')
	}
}
