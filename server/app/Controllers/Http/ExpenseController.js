'use strict'

const Budget = use('App/Models/Budget')
const Expense = use('App/Models/Expense')

class ExpenseController {
    //POST
    async create({ request, response, auth }) {

        let queryBudget = await Budget.with('user')
            .where('current', true)
            .where('user_id', auth.user._id)
            .first()

        if (queryBudget === null)
            return response.notFound('Budget not found, cant create the expense')

        const { type, price, description, location } = request.all()

        const expense = new Expense({
            user_id: auth.user._id,
            budget_id: queryBudget._id,
            type: type,
            price: price,
            description: description,
            location: location
        })

        return await expense.save() ? response.created('Expense created') : response.noContent()
    }

    //GET
    async all({ response, auth, params }) {

        let query = await Expense.with('user')
            .where('user_id', auth.user._id)
            .sort({ created_at: -1 })
            .paginate(params.page, 10)
        query = query.toJSON();

        return query.total > 0 ? response.accepted(query) : response.noContent()
    }

    //GET
    async show({ response, auth, params }) {
        const query = await Expense.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .first()

        return response.accepted(query)
    }

    //PUT
    async edit({ request, response, auth, params }) {

        const { type, price, description, location } = request.all()

        const query = await Expense.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .update({
                type: type,
                price: price,
                description: description,
                location: location
            })

        return query.result.n === 1 ? response.accepted('Expense updated') : response.noContent()
    }

    //DELETE
    async delete({ response, auth, params }) {
        const query = await Expense.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .delete()

        return query.result.n === 1 ? response.accepted('Expense deleted') : response.noContent()
    }
}

module.exports = ExpenseController
