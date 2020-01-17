'use strict'

// const { createUser } = require('../Models/User')
/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const User = use('App/Models/User')

/** @type {typeof import('adonis-graphql/src/Error')} */
const GraphQLError = use('GraphQLError')

const UserValidator = use('App/Validators/User')
const userValidator = new UserValidator()
const validationRules = userValidator.rules
const { validateAll } = use('Validator')

const debug = require('debug')('userresolver')

const createUser = exports.createUser = async ({ email = '', password = null, firstName = '', middleName = '', lastName = '', initials = '' } = {}) => {

	// Create a new instance
	const user = new User()

	// Set the applicable fields
	user.email = email
	user.name = {
		first: firstName,
		middle: middleName,
		last: lastName,
		initials: initials
	}
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

module.exports = {
	Query: {
		user: async (parent, { email }, context, info) => {

			if (!email) {
				throw new GraphQLError('Error Message', [ 'email argument cannot be empty' ])
			}

			try {
				return await User
					.query()
					.where('email', email)
					.first()
			} catch (e) {
				throw new GraphQLError('Error Message', [ 'error while querying User object', 'error:', e ])
			}
		}
	},

	Mutation: {

		/**
		 * Register (create) a new user
		 *
		 * @param parent
		 * @param args
		 * @param args.input
		 * @param context
		 * @param info
		 *
		 * @returns {Promise<*>} - user
		 */
		createUser: async (parent, { input }, context, info) => {

			const user = await createUser({ ...input })

			// const validation = await validateAll({ user: { ...input } }, validationRules)
			// const validation = await validateAll({ ...user.$attributes }, validationRules)
			//
			// if (validation.fails()) {
			// 	throw new GraphQLError('Validation Failed', validation.messages())
			// }

			try {
				await user.save()
				return user
			} catch (e) {
				throw new GraphQLError('Error Message', [ 'error while creating new User object', 'error:', e ])
			}
		},

		updateUser: (id, UserInput) => {
			//
		}
	}
}
