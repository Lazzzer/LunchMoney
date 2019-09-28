'use strict'

class LoginUser {
  get rules() {
    return {
      name: 'required',
      password: 'required'
    }
  }
  get messages() {
    return {
      required: "Field can't be empty",
    }
  }
  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = LoginUser
