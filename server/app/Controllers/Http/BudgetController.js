'use strict'

const User = use('App/Models/User')
const Budget = use('App/Models/Budget')

class BudgetController {
    //GET
    async current({ response, auth }) {
        const query = await Budget.with('user').setVisible(['_id', 'limit', 'currentBalance', 'expenses', 'created_at']).where('current', true).fetch()
        const queryJSON = query.toJSON()
        const currentBudget = {
            _id: queryJSON[0]._id,
            currentBalance: queryJSON[0].currentBalance,
            limit: queryJSON[0].limit,
            expenses: queryJSON[0].expenses,
            created_at: queryJSON[0].created_at,
        }
        return response.accepted(currentBudget)
    }

    //POST
    async create({ request, response, auth }) {
        //Dans la vérification, checkez que limit soit bien un nombre.

        await Budget.where('current', true).update({ current: false })

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
