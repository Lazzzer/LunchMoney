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
        //Wont need const user after Dashboard modification
        const user = await User.query().setVisible(['name', 'email']).where('name', name).fetch()

        return response.accepted({ token, user })
    }

    //POST
    async logout({ request, response, auth }) {
        const refreshToken = Encryption.decrypt(request.header('refresh_Token'))

        const deletedToken = await auth.user.tokens().where('token', refreshToken).delete()

        return deletedToken.result.n === 1 ?  response.accepted('Logged out') : response.notFound('Token not Found')
    }
    //POST
    async refresh({ request, response, auth }) {
        const refreshToken = request.header('refresh_Token')
        try {
            return response.created(await auth.generateForRefreshToken(refreshToken))
        } catch (error) {
            return response.unauthorized({ message: 'Missing or invalid refresh token.' })
        }
    }
    //GET
    async show({ response, auth }) {
        return response.accepted([auth.user.name, auth.user.email, auth.user.currency])
    }
}

module.exports = UserController
