'use strict'

class RegisterUser {
  get rules() {
    return {
      name: 'required|alpha_numeric|unique:users,name',
      email: 'email|unique:users,email',
      password: 'required',
      currency: 'required|in:CHF,EUR,USD'
    }
  }

  get messages() {
    return {
      unique: 'The {{field}} is already taken',
      required: "Field can't be empty",
      alpha_numeric: 'Field has invalid character(s)',
      email: 'Enter valid email address',
      currency: 'The {{filed}} is not valid.',
    }
  }
  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = RegisterUser
