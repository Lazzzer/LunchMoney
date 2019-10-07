'use strict'

const User = use('App/Models/User')
const Budget = use('App/Models/Budget')
const Expense = use('App/Models/Expense')

class ExpenseController {
    //POST
    async create({ request, response, auth }) {

        let queryBudget = await Budget.with('user')
            .where('current', true)
            .where('user_id', auth.user._id)
            .first()

        if(queryBudget === null)
            return response.notFound('Budget not found, cant create the expense')

        const { type, product, price, description, location } = request.all()

        const expense = new Expense({
            user_id: auth.user._id,
            budget_id: queryBudget._id,
            type: type,
            product: product,
            price: price,
            description: description,
            location: location
        })
        await expense.save()

        queryBudget.currentBalance = parseFloat(queryBudget.currentBalance) + parseFloat(expense.price)

        return await queryBudget.save() ? response.created('Expense created') : response.noContent()
    }
}

module.exports = ExpenseController
