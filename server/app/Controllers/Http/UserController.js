'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')

class UserController {
    //POST
    async register({ request, response }) {
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
    //POST
    async login({ request, response, auth }) {
        const { name, password } = request.all()
        const token = await auth.withRefreshToken().attempt(name, password)
        const user = await User.query().setVisible(['name', 'email']).where('name', name).fetch()

        return response.accepted({ token, user })
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
