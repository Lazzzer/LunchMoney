'use strict'

const User = use('App/Models/User')
const Budget = use('App/Models/Budget')

class BudgetController {

    //GET
    async all({ response, auth }) {
        //can remove 'expenses' from setVisible ??
        const query = await Budget.with('user').setVisible(['_id', 'limit', 'currentBalance', 'expenses', 'created_at'])
            .where('current', false)
            .where('user_id', auth.user._id)
            .sort({ created_at: -1 })
            .fetch()

        return response.accepted(query)
    }

    //GET
    async show({ response, auth, params }) {
        const query = await Budget.with('user')
            .setVisible(['_id', 'limit', 'currentBalance', 'expenses', 'created_at'])
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .fetch()

        return response.accepted(query)
    }

    //GET
    async current({ response, auth }) {
        const query = await Budget.with('user')
            .setVisible(['_id', 'limit', 'currentBalance', 'expenses', 'created_at'])
            .where('current', true)
            .where('user_id', auth.user._id)
            .fetch()

        return response.accepted(query)
    }

    //GET
    async expenses({ response, auth, params }) {
        const query = await Budget.with('user')
            .with('expenses')
            .setVisible(['_id', 'limit', 'currentBalance', 'created_at'])
            .where('_id', params.id)
            .where('user_id', auth.user._id)
            .first()

        return response.accepted(query)
    }

    //POST
    async create({ request, response, auth }) {
        //Dans la vérification, checkez que limit soit bien un nombre.
        await Budget.with('user')
            .where('current', true)
            .where('user_id', auth.user._id)
            .update({ current: false })

        const { limit } = request.only([
            'limit'
        ])
        const budget = new Budget({
            user_id: auth.user._id,
            currentBalance: 0,
            limit,
            current: true
        })
        await budget.save()

        return response.created('Budget created!')
    }

    //PUT
    async edit({ request, response, auth, params }) {
        const { limit } = request.only([
            'limit'
        ])

        const query = await Budget.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .update({ limit: limit })

        return query.result.n === 1 ? response.accepted('Budget updated') : response.noContent()
    }

    //DELETE
    async delete({ response, auth, params }) {
        const query = await Budget.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .delete()

        return query.result.n === 1 ? response.accepted('Budget deleted') : response.noContent()
    }
}

module.exports = BudgetController
