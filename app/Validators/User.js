'use strict'

/**
 * User Validator
 * @type Validator
 */
class User {

	/**
	 * User validator validation rules
	 * @returns {{password: string, email: string}} - validation rules
	 */
	get rules() {

		// Used to add ignore rules in case the user already exists (for example: when updating user values).
		const userId = this.ctx.params.id

		return {
			// No use in validating email while updating an existing user, therefore
			// we define an ignoreField (id) and ignoreValue (userId).
			// email: `required|email|unique:users,email,id,${userId}`,
			email: `required|email|unique`,
			password: 'required|min:10|max:255',
			firstname: 'alpha|max:255',
			lastname: 'alpha|max:255'
		}
	}

	/**
	 * Custom validation error messages
	 * @returns {{}} - validation error messages
	 */
	get messages () {
		return {
			'email.required': 'You must provide a email address.',
			'email.email': 'You must provide a valid email address.',
			'email.unique': 'This email is already registered.',

			'password.required': 'You must provide a password',
			'password.min': 'Your password is to short',
			'password.max': 'Your password is to long',

			'firstname.alpha': 'Your first name contains illegal characters',
			'firstname.max': 'Your first name is too long',

			'lastname.alpha': 'Your last name contains illegal characters',
			'lastname.max': 'Your last name is too long'
		}
	}

	/**
	 * User Validation sanitization rules - sanitizes data before validation
	 * @returns {{}}
	 */
	get sanitizationRules() {
		return {
			email: 'normalize_email',
			firstname: 'trim',
			lastname: 'trim'
		}
	}
}

module.exports = User
