'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  //POST
  async register({ request, response }) {

    const rules = {
      name: 'required|alpha_numeric|min:3|max:14|unique:users,name',
      email: 'email|unique:users,email',
      password: 'required|min:4',
      currency: 'required|in:CHF,EUR,USD'
    }

    const messages = {
      min: 'The {{field}} is too short',
      max: 'The {{field}} is too long',
      unique: 'The {{field}} is already taken',
      required: "The {{field}} can't be empty",
      alpha_numeric: 'The {{field}} has invalid character(s)',
      email: 'Enter a valid email address',
      in: 'The {{field}} is not valid.',
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    } else {
      const { name, email, password, currency } = request.all()
      const user = new User({
        name,
        email,
        password,
        currency,
        defaultBudget: false,
        defaultValue: 0
      })
      await user.save()
      return response.created('User created!')
    }
  }

  //POST
  async login({ request, response, auth }) {

    const rules = {
        name: 'required',
        password: 'required'
      }
  
      const messages = {
        required: "The {{field}} can't be empty",
      }
  
      const validation = await validateAll(request.all(), rules, messages)

      if (validation.fails()) {
        return response.badRequest(validation.messages())
      } else {
        const { name, password } = request.all()

        const token = await auth.withRefreshToken().attempt(name, password)
        const user = await User.query().setVisible(['name']).where('name', name).fetch()

        return response.accepted({ token, user })
      }
  }

  //POST
  async logout({ request, response, auth }) {
    const refreshToken = Encryption.decrypt(request.header('refresh-token'))

    const deletedToken = await auth.user.tokens().where('token', refreshToken).delete()

    return deletedToken.result.n === 1 ? response.accepted('Logged out') : response.notFound('Missing Token')
  }

  //POST
  async refresh({ request, response, auth }) {
    const refreshToken = request.header('refresh-token')
    try {
      return response.created(await auth.newRefreshToken().generateForRefreshToken(refreshToken))
    } catch (error) {
      return response.unauthorized({ message: 'Missing or invalid refresh token.' })
    }
  }
  //GET
  async show({ response, auth }) {
    return response.accepted([auth.user.name, auth.user.email, auth.user.currency, auth.user.defaultBudget, auth.user.defaultValue])
  }
}

module.exports = UserController
