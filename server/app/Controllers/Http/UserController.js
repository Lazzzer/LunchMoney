'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')


class UserController {
    //POST
    async register({ request, response }) {
        // TODO Add verification
        const { name, email, password } = request.only([
            'name', 'email', 'password'
        ])
        const user = new User({
            name,
            email,
            password
        })
        await user.save()

        return response.created('User created')
    }

    //POST
    async login({ request, response, auth }) {
        //TODO Add verification via middleware??
        const { name, password } = request.all()
        let token = await auth.withRefreshToken().attempt(name, password)
        let user = await User.query().where('name', name).fetch()

        return response.accepted({ token, user })
    }

    async logout({ request, response, auth }) {
        //TODO Add verification via middleware??
        const refreshToken = Encryption.decrypt(request.header('refresh_Token'))

        await auth.user.tokens().where('token', refreshToken).delete()
        return response.accepted('Logged Out!')
    }

    //POST
    async refresh({ request, response, auth }) {
        const refreshToken = request.header('refresh_Token')
        try {
            return response.created(await auth.generateForRefreshToken(refreshToken))
        } catch (error) {
            return response.unauthorized({message: 'Missing or invalid refresh token.'})
        }
    }

    //GET
    async show({ response, auth, params }) {
        const user = await User.find(params.id)

        return user._id.equals(auth.user._id) ? response.accepted([user.name, user.email]) : response.unauthorized({ message: 'Wrong credentials!' })
    }

    //TODO LOGOUT AND REVOKE REFRESH TOKEN

}

module.exports = UserController
