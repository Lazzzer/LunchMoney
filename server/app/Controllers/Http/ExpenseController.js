'use strict'

const User = use('App/Models/User')
const Budget = use('App/Models/Budget')
const Expense = use('App/Models/Expense')

class ExpenseController {
    //POST
    async create({ request, response, auth }) {

        const queryBudget = await Budget.with('user')
            .where('current', true)
            .where('user_id', auth.user._id)
            .fetch()
        const currentBudget = queryBudget.toJSON()

        return response.accepted(queryBudget)

        const { type, product, price, description, location } = request.only([
            'type', 'product', 'price', 'description', 'location'
        ])
        const expense = new Expense({
            user_id: auth.user._id,
            budget_id: currentBudget[0]._id,
            type: type,
            product: product,
            price: price,
            description: description,
            location: location
        })
        await expense.save()

        return response.created('Expense created!')
    }
}

module.exports = ExpenseController
