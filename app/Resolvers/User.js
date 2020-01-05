'use strict'

/** @typedef {typeof import('@adonisjs/lucid/src/Lucid/Model')} Model */
const User = use('App/Models/User')

/** @type {typeof import('adonis-graphql/src/Error')} */
const GraphQLError = use('GraphQLError')

module.exports = {
	Query: {
		user: async (parent, args, context, info) => {

			if (!args.email) {
				throw new GraphQLError('Error Message', ['email argument cannot be empty'])
			}

			try {
				return await User
					.query()
					.where('email', args.email)
					.first()
			} catch (e) {
				throw new GraphQLError('Error Message', ['error while fetching User object'])
			}
		}
	},

	Mutation: {
		createUser: UserInput => {
			//
		},

		updateUser: (id, UserInput) => {
			//
		}
	}
}
