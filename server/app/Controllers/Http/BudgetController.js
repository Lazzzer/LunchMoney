'use strict'

const User = use('App/Models/User')
const Budget = use('App/Models/Budget')

class BudgetController {
    //GET
    async current({ response, auth }) {
        const query = await Budget.with('user').setVisible(['_id', 'limit', 'currentBalance', 'expenses', 'created_at']).where('current', true).where('user_id', auth.user._id).fetch()

        return response.accepted(query)

    }

    //POST
    async create({ request, response, auth }) {
        //Dans la vérification, checkez que limit soit bien un nombre.
        await Budget.with('user').where('current', true).where('user_id', auth.user._id).update({ current: false })

        const { limit } = request.only([
            'limit'
        ])
        const budget = new Budget({
            user_id: auth.user._id,
            currentBalance: 0,
            limit,
            current: true,
            expenses: []
        })
        await budget.save()

        return response.created('Budget created!')
    }
}

module.exports = BudgetController
