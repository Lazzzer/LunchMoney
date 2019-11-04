'use strict'

const Budget = use('App/Models/Budget')
const Expense = use('App/Models/Expense')
const ObjectID = require("mongodb").ObjectID
const { validateAll } = use('Validator')

class BudgetController {

    //GET
    async all({ response, auth }) {
        const query = await Budget.with('user')
            .with('expenses')
            .setVisible(['_id', 'limit', 'created_at'])
            .where('current', false)
            .where('user_id', auth.user._id)
            .sort({ created_at: -1 })
            .fetch()

        return response.accepted(query)
    }

    //GET
    async show({ response, auth, params }) {
        const query = await Budget.with('user')
            .setVisible(['_id', 'limit', 'created_at'])
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .first()

        return response.accepted(query)
    }

    //GET
    async current({ response, auth }) {
        const query = await Budget.with('user')
            .with('expenses')
            .setVisible(['_id', 'limit', 'created_at'])
            .where('current', true)
            .where('user_id', auth.user._id)
            .first()

        return response.accepted(query)
    }

    //GET
    async expenses({ response, auth, params }) {
        const query = await Budget.with('user')
            .with('expenses')
            .setVisible(['_id', 'limit', 'created_at', 'current'])
            .where('_id', params.id)
            .where('user_id', auth.user._id)
            .first()

        return response.accepted(query)
    }

    //POST
    async create({ request, response, auth }) {
        const rules = {
            limit: 'required|number|range:0.9999,10000.0009',
        }

        const messages = {
            required: "The {{field}} can't be empty",
            number: "The {{field}} should be a valid number",
            range: "The {{field}} should be in a range of 1 to 10'000"
        }

        const validation = await validateAll(request.all(), rules, messages)

        if (validation.fails()) {
            return response.badRequest(validation.messages())
        } else {
            await Budget.with('user')
                .where('current', true)
                .where('user_id', auth.user._id)
                .update({ current: false })

            const { limit } = request.all()

            const budget = new Budget({
                user_id: auth.user._id,
                limit,
                current: true
            })
            await budget.save()

            return response.created('Budget created!')
        }
    }

    //PUT
    async edit({ request, response, auth, params }) {

        const rules = {
            limit: 'required|number|range:0.9999,10000.0009',
        }

        const messages = {
            required: "The {{field}} can't be empty",
            number: "The {{field}} should be a valid number",
            range: "The {{field}} should be in a range of 1 to 10'000"
        }

        const validation = await validateAll(request.all(), rules, messages)

        if (validation.fails()) {
            return response.badRequest(validation.messages())
        } else {
            const { limit } = request.all()

            const query = await Budget.with('user')
                .where('user_id', auth.user._id)
                .where('_id', params.id)
                .update({ limit: limit })

            return query.result.n === 1 ? response.accepted('Budget updated') : response.noContent()
        }
    }

    //PUT
    async archive({ response, auth, params }) {

        const query = await Budget.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .update({ current: false })

        return query.result.n === 1 ? response.accepted('Budget archived') : response.noContent()
    }

    //DELETE
    async delete({ response, auth, params }) {

        await Expense.with(['user', 'budget'])
            .where('user_id', auth.user._id)
            .where('budget_id', ObjectID(params.id))
            .delete()

        const query = await Budget.with('user')
            .where('user_id', auth.user._id)
            .where('_id', params.id)
            .delete()

        return query.result.n === 1 ? response.accepted('Budget deleted') : response.noContent()
    }
}

module.exports = BudgetController
